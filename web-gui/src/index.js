import {publish , subscribe} from "./ROS2.js";


const range1 = document.getElementById("range-1");
const range2 = document.getElementById("range-2");
function setRangeUpdater(range , onChange) {
    const input = range.children[1].children[1];
    const div = range.children[0].children[1];
    input.addEventListener("input", function () {
        div.innerHTML = input.value;
        onChange(parseFloat(input.value));
    });
}

setRangeUpdater(range1 , (value)=>publish("/forward_speed", "std_msgs/Float32" , value));
setRangeUpdater(range2 , (value)=>publish("/rotation_speed", "std_msgs/Float32" , value));
const ArrowUp = document.getElementById("arrow-up");
const rotateLeft = document.getElementById("rotate-left");
const rotateRight = document.getElementById("rotate-right");
const keys = [{ key: "ArrowUp", object: ArrowUp }, { key: "ArrowLeft", object: rotateLeft }, { key: "ArrowRight", object: rotateRight }];
const ctas = [
    { key: "grip", object: document.getElementById("grip"), message: "grip" }, 
    // line-follow - > stop
    { key: "line-follow", object: document.getElementById("line-follow"), message: "stop" },
    // encoder-reset
    { key: "encoder-reset", object: document.getElementById("encoder-reset"), message: "encoder-reset" },
    // shape-detect -> stop
    {key: "shape-detect", object: document.getElementById("shape-detect"), message: "stop"},
];
let chosenOperation = "stop";

document.addEventListener("keydown", function (e) {
    for (let key of keys) {
        if (e.key === key.key) {
            e.preventDefault();
            key.object.classList.add("!opacity-100");
            if (key.key === chosenOperation) return;
            chosenOperation = key.key
            console.log(key.key);
            publish("/keyboard_input", "std_msgs/String" , key.key);
        }
    }
});

document.addEventListener("keyup", function (e) {
    for (let key of keys) {
        if (e.key === key.key) {
            e.preventDefault();
            key.object.classList.remove("!opacity-100");
            console.log(key.key, "up");
            chosenOperation = "stop";
            publish("/keyboard_input", "std_msgs/String" , "stop");
        }
    }
});

for (let cta of ctas) { 
    cta.object.addEventListener("click", function () {
        if (cta.key == chosenOperation) return;
        else {
            chosenOperation = cta.key;
            publish("/keyboard_input", "std_msgs/String", cta.message);
        }
    });
}

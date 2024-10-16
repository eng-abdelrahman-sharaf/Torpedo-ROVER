import {publish , subscribe} from "./ROS2.js";


const range1 = document.getElementById("range-1");
const range2 = document.getElementById("range-2");
let forwardSpeed = 0;
let rotationSpeed = 0;
let chosenSpeed = 0;

function setRangeUpdater(range , onChange) {
    const input = range.children[1].children[1];
    const div = range.children[0].children[1];

    input.addEventListener("input", function () {
        div.innerHTML = input.value;
        onChange(parseFloat(input.value));
    });
}

setRangeUpdater(range1, (value) => {forwardSpeed = value;});
setRangeUpdater(range2, (value) => {rotationSpeed = value; });
const ArrowUp = document.getElementById("arrow-up");
const rotateLeft = document.getElementById("rotate-left");
const rotateRight = document.getElementById("rotate-right");
const keys = [{ key: "ArrowUp", object: ArrowUp , message : 1 }, { key: "ArrowLeft", object: rotateLeft , message:3 }, { key: "ArrowRight", object: rotateRight , message:2 }];
const ctas = [
    { operation: "grip", object: document.getElementById("grip"),  }, 
    // line-follow - > stop
    { operation: "line-follow", object: document.getElementById("line-follow"),  },
    // encoder-reset
    { operation: "encoder-reset", object: document.getElementById("encoder-reset"),  },
    // shape-detect -> stop
    { operation: "shape-detect", object: document.getElementById("shape-detect"), }
];
let chosenOperation = "stop";

document.addEventListener("keydown", function (e) {
    for (let key of keys) {
        if (e.key === key.key) {
            e.preventDefault();
            key.object.classList.add("!opacity-100");
            let newSpeed;
            if (chosenOperation === "ArrowUp") newSpeed = forwardSpeed;
            else  newSpeed = rotationSpeed;
            if(newSpeed != chosenSpeed) publish("/motor_speed", "std_msgs/Int32", newSpeed);
            if (key.key === chosenOperation) {
                return
            }
            chosenOperation = key.key
            console.log(key.key);
            publish("/keyboard_input", "std_msgs/Int32" , key.message);
        }
    }
});

document.addEventListener("keyup", function (e) {
    for (let key of keys) {
        if (e.key === key.key) {
            e.preventDefault();
            key.object.classList.remove("!opacity-100");
            // console.log(key.key, "up");
            chosenOperation = "stop";
            publish("/keyboard_input", "std_msgs/Int32" , 4);
        }
    }
});

// for (let cta of ctas) {
//     cta.object.addEventListener("click", function () {
//         if (cta.operation == chosenOperation) return;
//         else {
//             chosenOperation = cta.key;
//             publish("/keyboard_input", "std_msgs/String", cta.operation);
//         }
//     });
// }


document.getElementById("shape-detect").addEventListener("click", function () { 
    if (chosenOperation === "shape-detect") publish("/image", "std_msgs/Int32", 0);
    else {
        chosenOperation = "shape-detect";
        publish("/keyboard_input", "std_msgs/Int32", 4 );
        publish("/image", "std_msgs/Int32", 2);
    }
})


document.getElementById("line-follow").addEventListener("click", function () { 
    if (chosenOperation === "line-follow") publish("/image", "std_msgs/Int32", 0);
    else {
        chosenOperation = "line-follow";
        publish("/keyboard_input", "std_msgs/Int32", 4 );
        publish("/image", "std_msgs/Int32", 1);
    }
})


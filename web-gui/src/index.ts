const range1 = document.getElementById("range-1")
const range2 = document.getElementById("range-2")

function setRangeUpdater(range:any) {
    const input = range.children[1].children[1]
    const div = range.children[0].children[1]

    input.addEventListener("input", function() {
        div.innerHTML = input.value
    })
}

setRangeUpdater(range1)
setRangeUpdater(range2)

// // eventlistener for the first range-control
// input1.addEventListener("input", function() {
//     div1[0].innerHTML = input1[0].value;
// });

// div2 = document.querySelector(".range-control:nth-child(3) .variable");
// input2 = document.querySelector(".range-control:nth-child(3) input");

// input2.addEventListener("input", function() {
//     div2[0].innerHTML = input2[0].value;
// });

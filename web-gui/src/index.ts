import "./ros-bridge.js"
import "./eventemitter.js"

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

const ArrowUp = document.getElementById("arrow-up")
const rotateLeft = document.getElementById("rotate-left")
const rotateRight = document.getElementById("rotate-right")

const keys = [{key:"ArrowUp",object:ArrowUp}, {key:"ArrowLeft",object:rotateLeft}, {key:"ArrowRight",object:rotateRight}]


document.addEventListener("keydown", function (e) {
    for(let key of keys) {
        if (e.key === key.key) {
            e.preventDefault()
            key.object?.classList.add("!opacity-100")
            console.log(key.key)
        }
    }

})
document.addEventListener("keyup", function (e) {
    for(let key of keys) {
        if (e.key === key.key) {
            e.preventDefault()
            key.object?.classList.remove("!opacity-100")
            console.log(key.key , "up")
        }
    }
})

// Create ros object to communicate over your Rosbridge connection
const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });

const rosStatus = document?.getElementById("status")

if (rosStatus) {
    alert("Ros2 status")
    // When the Rosbridge server connects, fill the span with id "status" with "successful"
    ros.on("connection", () => {
        rosStatus.innerHTML = "Ros2 connected 🎉";
    });
    
    // When the Rosbridge server experiences an error, fill the "status" span with the returned error
    ros.on("error", (error:any) => {
      rosStatus.innerHTML = `Ros2 errored out ⚠️ (${error}) ⚠️`;
    });
    
    // When the Rosbridge server shuts down, fill the "status" span with "closed"
    ros.on("close", () => {
        rosStatus.innerHTML = "Ros2 closed 🔒";
    });
}


// publishing
function publish(topic :string , messageType:string , message:any) {
    const my_topic_publisher = new ROSLIB!.Topic({
        ros,
        name: topic,
        messageType: messageType,
    });
    const my_message = new ROSLIB!.Message({
        data: message,
    });
    my_topic_publisher.publish(my_message);
}



// subscribing

function subscribe(topic:string ,  messageType : string, messageFunc:(message:any) => void) {
    const my_topic_listener = new ROSLIB!.Topic({
        ros,
        name: topic,
        messageType: messageType,
    });
    
    my_topic_listener.subscribe((message:any) => messageFunc(message));
}

// continuosly listen to the topic 
subscribe("/my_topic", "std_msgs/String", console.log);

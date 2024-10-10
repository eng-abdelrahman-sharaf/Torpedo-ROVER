import "./eventemitter.js";
import "./ros-bridge.js";
// Create ros object to communicate over your Rosbridge connection
const ros = new ROSLIB.Ros({ url: "ws://localhost:9090" });
const rosStatus = document === null || document === void 0 ? void 0 : document.getElementById("status");
if (rosStatus) {
    // When the Rosbridge server connects, fill the span with id "status" with "successful"
    ros.on("connection", () => {
        rosStatus.innerHTML = "Ros2 connected 🎉";
    });
    // When the Rosbridge server experiences an error, fill the "status" span with the returned error
    ros.on("error", (error) => {
        rosStatus.innerHTML = `Ros2 errored out ⚠️ (${error}) ⚠️`;
    });
    // When the Rosbridge server shuts down, fill the "status" span with "closed"
    ros.on("close", () => {
        rosStatus.innerHTML = "Ros2 closed 🔒";
    });
}
// publishing
function publish(topic, messageType, message) {
    const my_topic_publisher = new ROSLIB.Topic({
        ros,
        name: topic,
        messageType: messageType,
    });
    const my_message = new ROSLIB.Message({
        data: message,
    });
    my_topic_publisher.publish(my_message);
}
// subscribing
function subscribe(topic, messageType, messageFunc) {
    const my_topic_listener = new ROSLIB.Topic({
        ros,
        name: topic,
        messageType: messageType,
    });
    my_topic_listener.subscribe((message) => messageFunc(message));
}
// continuosly listen to the topic 
subscribe("/my_topic", "std_msgs/String", console.log);
export { publish, subscribe };

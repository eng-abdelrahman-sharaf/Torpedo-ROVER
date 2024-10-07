#include <Arduino.h>
#include <micro_ros_platformio.h>
#include "communication.h"
#include <system.h>

System motorControl;

// Define external variables
rcl_subscription_t subscriber;
std_msgs__msg__Int32 msg;
rclc_executor_t executor;
rclc_support_t support;
rcl_allocator_t allocator;
rcl_node_t node;
rcl_timer_t timer;

// Callback function for subscriber
void Communication ::subscription_callback(const void *msgin)
{
    const std_msgs__msg__Int32 *msg = (const std_msgs__msg__Int32 *)msgin;
    // digitalWrite(LED_PIN, (msg->data == 0) ? LOW : HIGH);
    Serial.begin(115200);
    Serial.print("-------------");
    Serial.println(msg->data);
    Serial.println("-------");
    if(msg->data==1)
    {
     motorControl.move_forward(255);
    }
    else{
        digitalWrite(22 , HIGH);
    }
}

// Initialize the ROS communication
void Communication::initialize_comms()
{
       motorControl.setup(); 
    Serial.begin(115200);
    set_microros_serial_transports(Serial);

    allocator = rcl_get_default_allocator();

    // Create init_options
    rclc_support_init(&support, 0, NULL, &allocator);

    // Create node
    rclc_node_init_default(&node, "micro_ros_arduino_node", "", &support);

    // Create subscriber
    rclc_subscription_init_default(
        &subscriber,
        &node,
        ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32),
        "keyboard_input");

    // Create executor
    rclc_executor_init(&executor, &support.context, 1, &allocator);
    rclc_executor_add_subscription(&executor, &subscriber, &msg, &subscription_callback, ON_NEW_DATA);
}

// Spin the executor to process callbacks
void Communication :: spin()
{
    delay(100);
    rclc_executor_spin_some(&executor, RCL_MS_TO_NS(100));
    // motorControl.loop();
}

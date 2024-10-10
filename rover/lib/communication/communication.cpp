#include <Arduino.h>
#include <micro_ros_platformio.h>
#include "communication.h"
#include <system.h>

System motorControl; // Object to control motors

int motor_speed = 0;
bool speed_received = false;

// Callback function for movement subscriber
void Communication::movement_subscription_callback(const void *msgin)
{
    const std_msgs__msg__Int32 *msg = (const std_msgs__msg__Int32 *)msgin;

    if (1)
    {
        switch (msg->data)
        {
        case 1:
            // motorControl.move_forward(motor_speed);
            motorControl.move_forward(255);
           
            break;
        case 2:
            motorControl.rotate_right(motor_speed);
            break;
        case 3:
            motorControl.rotate_left(motor_speed);
            break;
        case 4:
            motorControl.stop();
            break;
        default:
            motorControl.stop();
            // digitalWrite(22, LOW);
            break;
        }
    }
    else
    {
        motorControl.stop();
    }
}

// Callback function for speed subscriber
void Communication::speed_subscription_callback(const void *msgin)
{
    const std_msgs__msg__Int32 *msg = (const std_msgs__msg__Int32 *)msgin;
    motor_speed = msg->data;
    speed_received = true;
}
float read_Ir()
{
    float reading=motorControl.calculateDistance();
    return reading;
}

// Function to read ultrasonic sensor data
float read_ultrasonic()
{
    float Distance = motorControl.measureDistance();
    return Distance;
}

// Function to read metal detector state
bool read_metal_detector()
{
    bool detected = motorControl.metal_detect();
    return detected;
}

// Initialize ROS communication
void Communication::initialize_comms()
{
    motorControl.setup();
    Serial.begin(115200);
    set_microros_serial_transports(Serial);

    allocator = rcl_get_default_allocator();

    // Initialize ROS2 communication support
    rclc_support_init(&support, 0, NULL, &allocator);

    // Create a node
    rclc_node_init_default(&node1, "control_node1", "", &support);
    rclc_node_init_default(&node2, "control_node2", "", &support);
    rclc_node_init_default(&node3, "control_node3", "", &support);
    rclc_node_init_default(&node4, "control_node4", "", &support);
    rclc_node_init_default(&node5, "control_node5", "", &support);

    // Create movement and speed subscribers
    rclc_subscription_init_default(&movement_subscriber, &node1, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32), "keyboard_input");
    rclc_subscription_init_default(&speed_subscriber, &node3, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32), "motor_speed");

    // Create ultrasonic publisher
    rclc_publisher_init_default(&ultrasonic_publisher, &node2, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Float32), "ultrasonic_data");

    // ir encodweer
    rclc_publisher_init_default(&ir_publisher, &node3, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Float32), "ir_data");

    // Create metal detector publisher
    rclc_publisher_init_default(&metal_detector_publisher, &node4, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Bool), "metal_detector_data");


    // Initialize the executor with 4 handles (2 for subscriptions and 2 for publishers)
    rclc_executor_init(&executor, &support.context, 6, &allocator);
    rclc_executor_add_subscription(&executor, &movement_subscriber, &movement_msg, &movement_subscription_callback, ON_NEW_DATA);
    rclc_executor_add_subscription(&executor, &speed_subscriber, &speed_msg, &speed_subscription_callback, ON_NEW_DATA);
}

// Function to publish sensor data
void Communication::publish_sensors()
{
    // updating ir sensors
    // motorControl.updateIRCount1();
    // motorControl.updateIRCount2();

    // Publish ultrasonic sensor data
//     ultrasonic_msg.data = read_ultrasonic();
//    rcl_publish(&ultrasonic_publisher, &ultrasonic_msg, NULL);

//     // Publish metal detector data
//     metal_detector_msg.data = read_metal_detector();
//     rcl_publish(&metal_detector_publisher, &metal_detector_msg, NULL);

//     ir_msg.data = read_Ir();
//     // ir_msg.data = 22;
//     rcl_publish(&ir_publisher, &ir_msg, NULL);
    
    // rcl_publish(&ir_publisher, &ir_msg, NULL);
}

// Spin the executor and publish sensor data
void Communication::spin()
{
    // delay(100);
    rclc_executor_spin_some(&executor, RCL_MS_TO_NS(100));

    
    // Publish sensor data
    publish_sensors();
}

#include <Arduino.h>
#include <micro_ros_platformio.h>
#include "communication.h"
#include <system.h>

System motorControl; // Object to control motors

int motor_speed = 0;
int chosenOperation = 0;

// Callback function for movement subscriber
void Communication::movement_subscription_callback(const void *msgin)
{
    const std_msgs__msg__Int32 *msg = (const std_msgs__msg__Int32 *)msgin;
    
    chosenOperation = msg->data;

    switch (msg->data)
    {
    case 1:
        motorControl.move_forward(motor_speed);
        // motorControl.move_forward(255);

    
        break;
    case 2:
        motorControl.stop();
        motorControl.rotate_right(motor_speed);
        break;
    case 3:
        motorControl.stop();
        motorControl.rotate_left(motor_speed);
        break;
    case 4:
        // motorControl.move_forward(0);
        motorControl.stop();
        break;
        case 5:
        // motorControl.move_forward(0);
        motorControl.Reset();
        break;
    default:
        motorControl.stop();
        // digitalWrite(22, LOW);
        break;
    }
}

// Callback function for speed subscriber
void Communication::speed_subscription_callback(const void *msgin)
{
    const std_msgs__msg__Int32 *msg = (const std_msgs__msg__Int32 *)msgin;
    motor_speed = msg->data;
    if(chosenOperation == 1){
        motorControl.move_forward(motor_speed);
    }
    else if(chosenOperation == 2){
        motorControl.rotate_right(motor_speed);
    }
    else if(chosenOperation == 3){
        motorControl.rotate_left(motor_speed);
    }

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
    motor_speed = 0;
    motorControl.setup();
    Serial.begin(115200);
    set_microros_serial_transports(Serial);

    allocator = rcl_get_default_allocator();

    // Initialize ROS2 communication support
    rclc_support_init(&support, 0, NULL, &allocator);

    // Create a node
    rclc_node_init_default(&node, "control_node1", "", &support);
    

    // Create movement and speed subscribers
    rclc_subscription_init_default(&speed_subscriber, &node, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32), "motor_speed");
    rclc_subscription_init_default(&movement_subscriber, &node, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32), "keyboard_input");

    // Create ultrasonic publisher
    rclc_publisher_init_default(&ultrasonic_publisher, &node, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Float32), "ultrasonic_data");

      rclc_publisher_init_default(&logger_publisher, &node, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32), "logger");+




    // ir encodweer
    rclc_publisher_init_default(&ir_publisher, &node, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Float32), "ir_data");

    // Create metal detector publisher
    rclc_publisher_init_default(&metal_detector_publisher, &node, ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Bool), "metal_detector_data");


    // Initialize the executor with 4 handles (2 for subscriptions and 2 for publishers)
    rclc_executor_init(&executor, &support.context, 5, &allocator);
    rclc_executor_add_subscription(&executor, &speed_subscriber, &speed_msg, &speed_subscription_callback, ON_NEW_DATA);
    rclc_executor_add_subscription(&executor, &movement_subscriber, &movement_msg, &movement_subscription_callback, ON_NEW_DATA);
}

// Function to publish sensor data
void Communication::publish_sensors()
{
    // updating ir sensors
    motorControl.updateIRCount1();
    motorControl.updateIRCount2();

    // Publish ultrasonic sensor data
    // ultrasonic_msg.data = read_ultrasonic();
    // rcl_publish(&ultrasonic_publisher, &ultrasonic_msg, NULL);

    // Publish metal detector data
    metal_detector_msg.data = read_metal_detector();
    rcl_publish(&metal_detector_publisher, &metal_detector_msg, NULL);

    ir_msg.data = read_Ir();
    // ir_msg.data = 22;
    rcl_publish(&ir_publisher, &ir_msg, NULL);
    
    
}

// Spin the executor and publish sensor data
void Communication::spin()
{
    // delay(100);
    rclc_executor_spin_some(&executor, RCL_MS_TO_NS(100));

    logger_msg.data = chosenOperation + motor_speed; 
    rcl_publish(&logger_publisher, &logger_msg, NULL);

    // Publish sensor data
    publish_sensors();
}

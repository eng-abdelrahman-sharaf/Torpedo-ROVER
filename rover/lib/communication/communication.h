#ifndef COMMUNICATION_H
#define COMMUNICATION_H

#include <rcl/rcl.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>
#include <std_msgs/msg/int32.h>
#include <std_msgs/msg/float32.h>
#include <std_msgs/msg/int32.h>
#include "std_msgs/msg/bool.h"

class Communication
{
private:
    rcl_subscription_t movement_subscriber; // Subscriber for movement commands
    rcl_subscription_t speed_subscriber;    // Subscriber for motor speed
    std_msgs__msg__Int32 movement_msg;      // Message for movement commands
    std_msgs__msg__Int32 speed_msg;         // Message for motor speed

    rclc_executor_t executor;  // Executor to handle subscriptions
    rclc_support_t support;    // Support structure for ROS 2
    rcl_allocator_t allocator; // Allocator for memory management
    rcl_node_t node;
               // Node for communication
    rcl_timer_t timer;

    // Publisher for ultrasonic sensor data
    rcl_publisher_t ultrasonic_publisher;
    rcl_publisher_t ir_publisher;
    rcl_publisher_t logger_publisher;
    std_msgs__msg__Float32 ir_msg;
    std_msgs__msg__Float32 ultrasonic_msg;
    std_msgs__msg__Int32 logger_msg;

    // Publisher for metal detector data
    rcl_publisher_t metal_detector_publisher;
    std_msgs__msg__Bool metal_detector_msg; // Timer for periodic tasks (if needed)

    // Callback functions for subscribers
    static void movement_subscription_callback(const void *msgin);
    static void speed_subscription_callback(const void *msgin);



    // Function to publish sensor data
    void publish_sensors();

public:
    // Initialize communication and set up subscribers
    void initialize_comms();

    // Spin to process messages and callbacks
    void spin();
};

#endif // COMMUNICATION_H

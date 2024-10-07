#include <micro_ros_platformio.h>
#include <Arduino.h>

#include <stdio.h>
#include <rcl/rcl.h>
#include <rcl/error_handling.h>
#include <rclc/rclc.h>
#include <rclc/executor.h>

#include <std_msgs/msg/int32.h>

rclc_executor_t executor;
rclc_support_t support;
rcl_allocator_t allocator;
rcl_timer_t timer;

rcl_node_t operation_node;
std_msgs__msg__Int32 operation_msg;
rcl_subscription_t operation_sub;

// rcl_node_t speed_node;
// std_msgs__msg__Int32 speed_msg;
// rcl_subscription_t speed_sub; hanndle message subscription

#define LED_PIN 22

#define RCCHECK(fn) { rcl_ret_t temp_rc = fn; if((temp_rc != RCL_RET_OK)){error_loop();}}
#define RCSOFTCHECK(fn) { rcl_ret_t temp_rc = fn; if((temp_rc != RCL_RET_OK)){}}


void error_loop(){
  while(1){
    digitalWrite(LED_PIN, !digitalRead(LED_PIN));
    delay(100);
  }
}


// void operation_callback(const void * msgin)
// {  
//   const std_msgs__msg__Int32 * msg = (const std_msgs__msg__Int32 *)msgin;
//   digitalWrite(LED_PIN, (msg->data == 0) ? LOW : HIGH);  
// }
void operation_callback(const void * msgin)
{  
    //Serial.begin(115200);
  const std_msgs__msg__Int32 * msg = (const std_msgs__msg__Int32 *)msgin;
if (Serial.available())
{
// Use Serial to print actions based on the received message data
  switch (msg->data) {
    case 1:
      Serial.println("Motor forward");
      break;
    case 2:
      Serial.println("Rotate motor right");
      break;
    case 3:
      Serial.println("rotate motor  left");
      break;
    default:
      Serial.println("Unknown operation");
  }
}
  
}

// void speed_callback(const void * msgin)
// {  
//   const std_msgs__msg__Int32 * msg = (const std_msgs__msg__Int32 *)msgin;
//   Serial.begin(115200);
//   Serial.println(msg->data);
// }

void setup() {
  Serial.begin(115200);
  set_microros_serial_transports(Serial);
  
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, HIGH);  
  
  delay(2000);

  allocator = rcl_get_default_allocator();

  //create init_options
  RCCHECK(rclc_support_init(&support, 0, NULL, &allocator));

  // create node
  RCCHECK(rclc_node_init_default(&operation_node, "operations_node", "", &support));
  // RCCHECK(rclc_node_init_default(&speed_node, "speed_node", "", &support));

  // create subscriber
  RCCHECK(rclc_subscription_init_default(
    &operation_sub,
    &operation_node,
    ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32),
    "keyboard_input"));

  // RCCHECK(rclc_subscription_init_default(
  //   &speed_sub,
  //   &speed_node,
  //   ROSIDL_GET_MSG_TYPE_SUPPORT(std_msgs, msg, Int32),
  //   "speed_topic"));


  // create executor
  RCCHECK(rclc_executor_init(&executor, &support.context, 1, &allocator));
  RCCHECK(rclc_executor_add_subscription(&executor, &operation_sub, &operation_msg, &operation_callback, ON_NEW_DATA));
  // RCCHECK(rclc_executor_add_subscription(&executor, &speed_sub, &speed_msg, &speed_callback, ON_NEW_DATA));
}

void loop() {
  delay(100);
  RCCHECK(rclc_executor_spin_some(&executor, RCL_MS_TO_NS(100)));
}
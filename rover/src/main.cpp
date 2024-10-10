#include "system.h"
#include <Arduino.h>
#include "communication.h"
#include <micro_ros_platformio.h>

Communication comm; // Create an instance of the Communication class
System sys;

void setup() { 
  Serial.begin(115200);
  Serial.println("hi");
      pinMode(22 , OUTPUT);
      sys.setup();
      sys.move_forward(255);

        comm.initialize_comms();  
        // Initialize ROS communication
      // Call motorControl's setup method
}

void loop() {

      // Continuously check for speed and control the motor
//    comm.spin();
      return;
}

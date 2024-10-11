#include "system.h"
#include <Arduino.h>
#include "communication.h"
#include <micro_ros_platformio.h>

Communication comm; // Create an instance of the Communication class
System sys;

void setup() { 
  Serial.begin(115200);
  Serial.println("hi");
      sys.setup();
     
    

        comm.initialize_comms();  
}

void loop() {
 
   comm.spin();
      return;
}

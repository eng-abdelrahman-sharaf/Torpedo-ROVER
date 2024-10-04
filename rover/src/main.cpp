#include "system.h"
#include <Arduino.h>
#include <Servo.h>

System motorControl;  // Create an instance of the System class

void setup() {
    motorControl.setup();  // Initialize the system and motor pins
}

void loop() {
    motorControl.loop();  // Continuously check for speed and control the motor
}

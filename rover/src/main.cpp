#include "system.h"
#include <Arduino.h>

System motorControl;

void setup() {
    Serial.begin(9600);        // Initialize Serial communication
    motorControl.setup();      // Call motorControl's setup method
}

void loop() {
    motorControl.loop();  // Continuously check for speed and control the motor
}

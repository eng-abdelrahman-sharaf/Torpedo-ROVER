#include "system.h"
#include <Arduino.h>



// Constructor
System::System() {
    prevState = 0;
}
// Pin definitions (moved from .cpp to .h)
const int System::enablePin = 5;
const int System::wheel1_pin1 = 18;
const int System::wheel1_pin2 = 19;
const int System::enablepin2 = 23;
const int System::wheel2_pin1 = 25;
const int System::wheel2_pin2 = 26;
const int System::trigpin = 32;
const int System::echopin = 33;


const int System::_gripperPin = 27;



// Setup method for initializing the system
void System::setup() {
    motor();  // Initialize motor pins

}

// Motor initialization method
void System::motor() {
    pinMode(enablePin, OUTPUT);
    pinMode(wheel1_pin1, OUTPUT);
    pinMode(wheel1_pin2, OUTPUT);
    pinMode(enablepin2, OUTPUT);
    pinMode(wheel2_pin1, OUTPUT);
    pinMode(wheel2_pin2, OUTPUT);
    pinMode(trigpin, OUTPUT);
    pinMode(echopin, INPUT);
       _gripper.attach(_gripperPin);  // Attach the servo to the gripper pin
      
}

// Main loop for running motor control and reading inputs
void System::loop() {
    int command = 1;  // For now it's hardcoded, adjust it later for user input

    switch (command) {
    case 1:
        setSpeed(100);  // Example motor speed
        break;
    case 2:
        rotate(100);  // Example rotation
        break;
    case 3:
        grip(90);  // Grip at 90 degrees
        break;
    case 4:
        grip(0);  // Release grip
        break;
    case 5:
        measureDistance();  // Measure distance with ultrasonic sensor
        break;
    case 6:
        updateIRCount(); // Update IR count based on readings

        break;
    default:
        Serial.println("Invalid command.");
    }
}

// Method to set motor speed
void System::setSpeed(int speed) {
    if (speed >= 0 && speed <= 255) {
        analogWrite(enablePin, speed);
        analogWrite(enablepin2, speed);
    } else {
        analogWrite(enablePin, 0);  // Stop motor
        analogWrite(enablepin2, 0);  // Stop motor
    }
}

// Method to rotate motors in opposite directions
void System::rotate(int rot_speed) {
    if (rot_speed > 0) {
        // Rotate motor 1 forward, motor 2 stop
        digitalWrite(wheel1_pin1, HIGH);
        digitalWrite(wheel1_pin2, LOW);
        analogWrite(enablePin, rot_speed);

        digitalWrite(wheel2_pin1, LOW);
        digitalWrite(wheel2_pin2, LOW);
        analogWrite(enablepin2, 0);
    } else {
        // Rotate motor 2 forward, motor 1 stop
        digitalWrite(wheel2_pin1, HIGH);
        digitalWrite(wheel2_pin2, LOW);
        analogWrite(enablepin2, rot_speed);

        digitalWrite(wheel1_pin1, LOW);
        digitalWrite(wheel1_pin2, LOW);
        analogWrite(enablePin, 0);
    }
}

// Method to control the servo gripper
void System::grip(int angle) {
    _gripper.write(angle);  // Move the servo to the specified angle
}

// Method to measure distance using ultrasonic sensor
void System::measureDistance() {
    long duration, distance;
    digitalWrite(trigpin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigpin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigpin, LOW);

    duration = pulseIn(echopin, HIGH);
    distance = (duration / 2) * 0.0343;  // Convert to cm

    Serial.print("Distance: ");
    Serial.print(distance);
    Serial.println(" cm");
}

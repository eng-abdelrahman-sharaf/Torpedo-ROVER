#include <Arduino.h>
// Define pins for Wemos Lolin Lite 32
int motorPin1 = 18;  // IN1 on L293D
int motorPin2 = 19;  // IN2 on L293D
int enablePin = 23;  // EN1 on L293D (PWM pin)

// Function to run the motor forward
void forward() {
  digitalWrite(motorPin1, HIGH);
  digitalWrite(motorPin2, LOW);
  analogWrite(enablePin, 255);  // Set speed (0-255)
}

// Function to run the motor in reverse
void reverse() {
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, HIGH);
  analogWrite(enablePin, 255);  // Set speed (0-255)
}

// Function to stop the motor
void stopMotor() {
  digitalWrite(motorPin1, LOW);
  digitalWrite(motorPin2, LOW);
  analogWrite(enablePin, 0);  // Stop the motor
}
void setup() {
  // Set motor pins as output
  pinMode(motorPin1, OUTPUT);
  pinMode(motorPin2, OUTPUT);
  pinMode(enablePin, OUTPUT);
  
  // Initially stop the motor
  stopMotor();
}

void loop() {
  // Run motor forward
  forward();
  delay(2000);  // Run for 2 seconds
  
  // Stop the motor
  stopMotor();
  delay(1000);  // Wait for 1 second
  
  // Run motor in reverse
  reverse();
  delay(2000);  // Run for 2 seconds
  
  // Stop the motor
  stopMotor();
  delay(1000);  // Wait for 1 second
}




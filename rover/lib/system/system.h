#ifndef SYSTEM_H
#define SYSTEM_H
#include <Arduino.h>
#include <ESP32Servo.h>

class System
{
public:
  System();     // Constructor to initialize the system
  void setup(); // Setup function to initialize all components
  void loop();
  void motor();                     // Motor initialization
  void move_forward(int speed);     // Set motor speed
  void rotate_right(int rot_speed); // Rotate the motors
  void rotate_left(int rot_speed);
  void stop();
  void grip(int angle); // Control the servo gripper
  bool metal_detect();
  float measureDistance(); // Measure distance using ultrasonic sensor

private:                            // Main loop to handle system logic

  


  void updateIRCount();      // Method to update IR count based on sensor
  float calculateDistance(); // Method to calculate distance traveled
  // Pin declarations
  static const int enablePin;
  static const int wheel1_pin1;
  static const int wheel1_pin2;
  static const int enablepin2;
  static const int wheel2_pin1;
  static const int wheel2_pin2;
  static const int trigpin;
  static const int echopin;
  static const int _gripperPin;
  static const int IRpin;
   static const int metal;
   const long threshold = 2.5 * 1023 / 3.3;
  Servo _gripper; // Servo object for gripper control

  int pulse_count = 0;              // Pulse counter
  int previous_state = LOW;         // Previous state of the IR sensor
  const float wheel_diameter = 6.5; // Wheel diameter in cm
  const int encoder_slots = 20;     // Number of slots in the encoder
};

#endif

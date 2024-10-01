#ifndef SYSTEM_H
#define SYSTEM_H
#include <Arduino.h>
#include <Servo.h>





class System {
public:
    System();  // Default constructor
    void setup();  // Setup method to initialize the system
    void loop();   // Loop method to continuously read the speed and control the motor
    

private:
    int enablePin;  // PWM pin for motor speed
    int wheel1_pin1;     // Pin for motor direction
    int wheel1_pin2;       // Pin for motor direction
    int enablepin2;
    int wheel2_pin1;
    int wheel2_pin2;
    int trigpin;
    int echopin;
    // Encoder sensor pins
   static int encoderPinA;
   static  int encoderPinB;
    
    // Wheel and encoder properties
    const float _wheelDiameter = 6.5; // Wheel diameter in cm
    const int _encoderTurns = 20;     // Number of encoder turns per wheel rotation
volatile static int encoderCount; 

    void motor();    // Method to initialize the motor control pins
    void setSpeed(int speed);  // Method to set motor speed (only forward)
    void rotate(int speed);
    Servo _gripper;  // Create a Servo object for the gripper
    int _gripperPin; // Pin for the servo
    void grip(int angle);     // Method to control the servo grip
      void measureDistance();  // Method to measure distance ultra
      void calculateWheelDistance();
       static void updateEncoderCount();  // Interrupt handler for encoder
};

#endif // SYSTEM_H













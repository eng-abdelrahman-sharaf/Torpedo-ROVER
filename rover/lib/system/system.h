#ifndef SYSTEM_H
#define SYSTEM_H
#include <Arduino.h>
#include <ESP32Servo.h>



class System {
public:
    System();          // Constructor to initialize the system
    void setup();      // Setup function to initialize all components
    void loop(); 
    private:      // Main loop to handle system logic
    void motor();      // Motor initialization
    void setSpeed(int speed);  // Set motor speed
    void rotate(int rot_speed);  // Rotate the motors
    void grip(int angle);  // Control the servo gripper
    void measureDistance();  // Measure distance using ultrasonic sensor
   void updateIRCount(); // Method to update IR count based on sensor
    float calculateDistance(); // Calculate distance traveled
    static void encoderISR(); // ISR for encoder countin
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
      static constexpr int irPin = 36; // Pin for IR sensor (digital)
    static volatile int encoderCount; // To hold encoder counts
    static volatile int irCount; // To hold IR sensor counts
    int prevState; // Previous state of the IR sensor
      static constexpr float WHEEL_DIAMETER = 6.5; // Wheel diameter in cm
    static constexpr int encoder_slot=20;
    Servo _gripper;  // Servo object for gripper control
};

#endif


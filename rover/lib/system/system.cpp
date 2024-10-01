#include "system.h"
#include <Arduino.h>
#include <Servo.h>

volatile int System::encoderCount = 0;  // Define the static encoder count variable

// Setup method (initializes the system)
void System::setup()
{
    Serial.begin(115200); // Initialize Serial communication
    motor();              // Call motor to set pin modes
    // Attach the servo to its pin
    _gripper.attach(_gripperPin);
    _gripper.write(0); // Initial position of the gripper (0 degrees)
    Serial.println("Enter a number (1 to run motors, 2 for a different task):");
}
// Constructor: Set default pin values
System::System()
{
    enablePin = 5;    // PWM pin for motor speed control
    wheel1_pin1 = 18; // Motor direction pin 1
    wheel1_pin2 = 19; // Motor direction pin 2
    enablepin2 = 23;  // PWM pin for motor 2 speed control
    wheel2_pin1 = 25; // Motor 2 direction pin 1
    wheel2_pin2 = 26; // Motor 2 direction pin 2
    // Attach the servo to its pin
    // Pin for the servo
    _gripperPin = 27; // Adjust this pin based on your wiring
    // Pins for the ultrasonic sensor
    trigpin=32;
    echopin=33;
      // Pins for the encoder sensor
    encoderPinA = 34; // Encoder pin A
    encoderPinB = 35; // Encoder pin B

    // Initialize encoder count
    encoderCount = 0;
}
// Method to initialize motor control pins
void System::motor()
{
    pinMode(enablePin, OUTPUT);
    pinMode(wheel1_pin1, OUTPUT);
    pinMode(wheel1_pin2, OUTPUT);
    pinMode(enablepin2, OUTPUT);
    pinMode(wheel2_pin1, OUTPUT);
    pinMode(wheel2_pin2, OUTPUT);
    pinMode(trigpin, OUTPUT);
    pinMode(echopin, INPUT);
  // Initialize encoder pins
    pinMode(encoderPinA, INPUT_PULLUP);
    pinMode(encoderPinB, INPUT_PULLUP);

    // Attach interrupts for the encoder
    attachInterrupt(digitalPinToInterrupt(encoderPinA), []() {
        System::updateEncoderCount();
    }, CHANGE);
}

// Loop method (continuously runs to read speed and control the motor)
void System::loop()
{
    if (Serial.available())
    {
        int command = Serial.parseInt(); // Read an integer from serial input

        switch (command)
        {
        case 1:
            // Prompt user for speed
            Serial.println("Enter speed (0 to 255):");
            while (true)
            {
                if (Serial.available())
                {
                    int speed = Serial.parseInt(); // Read the speed from input

                    if (speed >= 0 && speed <= 255)
                    {
                        setSpeed(speed); // Set both motors to the specified speed
                        Serial.print("Both motors running at speed: ");
                        Serial.println(speed);
                    }
                    else
                    {
                        Serial.println("Invalid speed. Enter a value between 0 and 255.");
                    }

                    // Break the loop after processing the input
                    break;
                }
            }
            break;
        case 2:

            Serial.println("rotat motor either cw or acw");
            int rotation_speed = Serial.parseInt();
            rotate(rotation_speed);

            break;
        case 3:

            grip(90); // Call the grip function with the specified angle
            Serial.print("Gripper set to angle: 90");
            // Break the loop after processing the input
            break;
        case 4:

            grip(0); // Call the grip function with the specified angle
            Serial.print("Gripper set to angle: 90");
            // Break the loop after processing the input
            break;
            case 5:
                // Call the measure  ultra distance function
                measureDistance();
                break;
                case 6:
                // Calculate and display the distance traveled by the wheels
                calculateWheelDistance();
                break;
        default:
            Serial.println("Invalid command. Enter 1 to run motors or 2 to grip.");
            break;
        }
    }
}

// Private method to set motor speed (only forward)
void System::setSpeed(int speed)
{
    if (speed >= 0 && speed <= 255)
    {
        digitalWrite(wheel1_pin1, HIGH); // Set direction forward
        digitalWrite(wheel1_pin2, LOW);  // Set direction forward
        analogWrite(enablePin, speed);   // Control speed using PWM
        digitalWrite(wheel2_pin1, HIGH); // Set direction forward
        digitalWrite(wheel2_pin2, LOW);  // Set direction forward
        analogWrite(enablepin2, speed);  // Control speed using PWM
    }
    else
    {
        analogWrite(enablePin, 0); // Stop the motor if the speed is out of range
        analogWrite(enablepin2, 0);
    }
}
void System::rotate(int rot_speed)
{
    if (rot_speed > 0) // rot motor 1 stop 2
    {
        digitalWrite(wheel1_pin1, HIGH);   // Set direction forward
        digitalWrite(wheel1_pin2, LOW);    // Set direction forward
        analogWrite(enablePin, rot_speed); // Control speed using PWM
        digitalWrite(wheel2_pin1, LOW);
        digitalWrite(wheel2_pin2, LOW);
        analogWrite(enablepin2, 0);
    }
    else
    {
        digitalWrite(wheel2_pin1, HIGH);    // Set direction forward
        digitalWrite(wheel2_pin2, LOW);     // Set direction forward
        analogWrite(enablepin2, rot_speed); // Control speed using PWM
        digitalWrite(wheel1_pin1, LOW);     // Set direction forward
        digitalWrite(wheel1_pin2, LOW);     // Set direction forward
        analogWrite(enablePin, 0);          // Control speed using PWM
    }
}
// Method to control the servo grip
void System::grip(int angle)
{
    _gripper.write(angle); // Move the servo to the specified angle
}
void System::measureDistance() {
    long duration, distance;
    // Clear the trigger pin
    digitalWrite(trigpin, LOW);
    delayMicroseconds(2);
    // Set the trigger pin high for 10 microseconds
    digitalWrite(trigpin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigpin, LOW);

    // Read the echo pin
    duration = pulseIn(echopin,HIGH);

    // Calculate the distance (in cm)
    distance = (duration / 2) * 0.0343; // Speed of sound is ~0.0343 cm/μs

    // Print the distance to the Serial Monitor
    Serial.print("Distance: ");
    Serial.print(distance);
    Serial.println(" cm");
}
// Method to update encoder count (interrupt handler)
void System::updateEncoderCount() {
    if (digitalRead(encoderPinA) == digitalRead(encoderPinB)) {
        encoderCount++;
    } else {
        encoderCount--;
    }
}

// Method to calculate the distance traveled by the wheels
void System::calculateWheelDistance() {
    // Calculate the wheel circumference
    float wheelCircumference = _wheelDiameter * PI;  // C = π * D
    // Calculate the distance traveled in cm
    float distanceTraveled = (encoderCount / (float)_encoderTurns) * wheelCircumference;

    // Print the calculated distance
    Serial.print("Distance traveled: ");
    Serial.print(distanceTraveled);
    Serial.println(" cm");
}

#include <Arduino.h>

#define echoPin 12
#define trigPin 13 

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  long duration, distance;
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  
  distance = duration * 0.034 / 2; // Speed of sound is 340m/s or 0.034cm/µs
  //if(distance>0)
  //{
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
   
 // }
  
  delay(1000); // Delay for stability
}
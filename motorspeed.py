import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32

class MotorSpeedPublisher(Node):
    def __init__(self):
        super().__init__('motor_speed_publisher')
        self.publisher_ = self.create_publisher(Int32, 'motor_speed', 10)
        self.timer = self.create_timer(1.0, self.publish_speed)

    def publish_speed(self):
        msg = Int32()
        speed = int(input("Enter motor speed (0-255): "))
        msg.data = speed
        self.publisher_.publish(msg)
        self.get_logger().info(f'Published motor speed: {msg.data}')

def main(args=None):
    rclpy.init(args=args)
    motor_speed_publisher = MotorSpeedPublisher()
    rclpy.spin(motor_speed_publisher)
    motor_speed_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()

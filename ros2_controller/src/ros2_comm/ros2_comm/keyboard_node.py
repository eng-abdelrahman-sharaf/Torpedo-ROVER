import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32

class KeyboardPublisher(Node):
    def __init__(self):
        super().__init__('keyboard_publisher')
        self.publisher_ = self.create_publisher(Int32, 'keyboard_input', 10)
    
    def publish_key_press(self):
        while rclpy.ok():
            msg = Int32()
            key_press = input("Press 'w' to turn on LED, any other key to turn it off: ")
            if(key_press=='w'):
              msg.data = 1
            else:
                msg.data=0  
            self.publisher_.publish(msg)
            self.get_logger().info(f'Publishing: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    node = KeyboardPublisher()
    try:
        node.publish_key_press()
    except KeyboardInterrupt:
        pass
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()

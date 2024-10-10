import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32

class KeyboardPublisher(Node):
    def __init__(self):
        super().__init__('keyboard_publisher')
        self.publisher_ = self.create_publisher(Int32, 'keyboard_input', 10) #topic
    
    def publish_key_press(self):
        while rclpy.ok():
            msg = Int32()
            key_press = input("Press 'w' to turn on LED, any other key to turn it off: ").lower()
            if(key_press=='w'):
              msg.data = 1
            elif(key_press=='r'):
                msg.data=2
            elif(key_press=='l'):
                msg.data=3
            elif(key_press=='s'):
                msg.data=4
            elif(key_press=='x'):
                msg.data=5
            elif(key_press=='c'):
                msg.data=6
            else :
                msg.data=7

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

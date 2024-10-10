import sys
if sys.prefix == '/usr':
    sys.real_prefix = sys.prefix
    sys.prefix = sys.exec_prefix = '/home/omarwaleed/Desktop/project/component/Torpedo-ROVER/ros2_controller/install/ros2_comm'

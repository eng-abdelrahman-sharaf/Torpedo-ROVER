import subprocess
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class FileChangeHandler(FileSystemEventHandler):
    def __init__(self, file_to_watch):
        self.file_to_watch = file_to_watch

    def on_modified(self, event):
        if event.src_path.endswith(self.file_to_watch):
            print(f"{self.file_to_watch} was modified. Running 'source install/setup.bash'")
            # Run the source command in a subprocess
            subprocess.run(["bash", "-c", "source /home/omarwaleed/Desktop/project/component/Torpedo-ROVER/ros2_controller/install/setup.bash"], shell=True)

def watch_file(file_to_watch):
    event_handler = FileChangeHandler(file_to_watch)
    observer = Observer()
    observer.schedule(event_handler, ".", recursive=False)  # "." is the directory to watch
    observer.start()

    try:
        while True:
            time.sleep(1)  # keep the script running
    except KeyboardInterrupt:
        observer.stop()

    observer.join()

if __name__ == "__main__":
    # File to watch for changes
    file_to_watch = "/home/omarwaleed/Desktop/project/component/Torpedo-ROVER/ros2_controller/src/ros2_comm/ros2_comm/keyboard_node.py"  # Replace with the actual file you want to watch
    watch_file(file_to_watch)


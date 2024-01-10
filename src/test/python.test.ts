import { fork } from 'child_process';
import { spawn } from 'child_process';


suite('Python Subprocess Test', () => {
    test('should call a Python subprocess', (done) => {
        console.log("Python Subprocess Test");
        const child = spawn(
          "C:/Tools/Python312/python.exe",
          [
            "C:/work/GitHub/db-autotest/db-autotest-mssql/tests/child_process_test.py",
          ],
          {
            stdio: ["pipe", "pipe", "pipe", null, "ipc"],
            serialization: "advanced",
          }
        );

        console.log("child.pid: " + child.pid);

        child.on("message", (data: Buffer) => {
            console.log("Received message...");
            console.log(`message: ${data}`);
        });

        const std_l = child.stdout;

        if (std_l) {
            std_l.on("data", (data: Buffer) => {
                console.log(`stdout: ${data}`);
            });
        }

                if (child.stderr) {
                  child.stderr.on("data", (data: Buffer) => {
                    console.log(`stderr: ${data}`);
                  });
                }

        child.send("Hello from VS Code!");        
        child.send("Hello from VS Code!");     

        setTimeout(() => {
            done();
        }, 10000);
    });
});

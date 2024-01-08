import { spawn } from 'child_process';

const pythonPath = "C:/Tools/Python312/python.exe";
const pythonFilePath = 'C:/work/GitHub/db-autotest/db-autotest-mssql/tests/test_entity.py';
const className = 'TestLoads';
const methodName = 'testLoadInit';

const pythonProcess = spawn(pythonPath, [
  pythonFilePath,
  "-m",
  className,
  methodName,
]);

pythonProcess.stdout.on('data', (data: Buffer) => {
    console.log(`stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data: Buffer) => {
    console.error(`stderr: ${data}`);
});

pythonProcess.on('close', (code: number) => {
    console.log(`child process exited with code ${code}`);
});

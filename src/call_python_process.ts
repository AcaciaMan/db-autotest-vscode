import { spawn } from "child_process";

			const pythonPath = "C:/Tools/Python312/python.exe";
			const pythonFilePath = "C:/work/GitHub/db-autotest/db-autotest-mssql/tests/test_mssql_conn.py";
			const testMethodName = "Test_Config.test_select_alltables";

			const pythonProcess = spawn(
				pythonPath,
				[pythonFilePath, "-v", "--locals" 
				// testMethodName
				],
				{
					env: {
						...process.env,
						PYTHONPATH: "C:/work/GitHub/db-autotest/db-autotest-mssql/src;C:/work/GitHub/db-autotest/Python/src",
					},
					cwd: "C:/work/GitHub/db-autotest/db-autotest-mssql"
				}
			);

pythonProcess.stdout.on('data', (data: Buffer) => {
    console.log(`stdout: ${data}`);
});

pythonProcess.stderr.on('data', (data: Buffer) => {
    console.error(`stderr: ${data}`);
});

pythonProcess.on('close', (code: number) => {
    console.log(`child process exited with code ${code}`);
});

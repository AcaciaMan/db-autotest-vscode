// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as path from 'path';
import * as process from 'process';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "db-autotest" is now active!');

		let disposable = vscode.commands.registerCommand('db-autotest.callPython', () => {
			// The code you place here will be executed every time your command is executed
			
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
		});
	}

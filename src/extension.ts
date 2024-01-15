/* eslint-disable @typescript-eslint/naming-convention */
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { spawn } from 'child_process';
import * as path from 'path';
import * as process from 'process';
import { M_Logging } from './m_utils/call_py/m_logging';
import M_Config from './m_utils/call_py/m_config';
import { PythonMessage, python_message_type } from './m_utils/call_py/python_message';
import { EntityTreeProvider } from './m_utils/m_entity/entity_tree_provider';
import { CommandHandler } from './m_utils/m_command/command_handler';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "db-autotest" is now active!');
	vscode.window.showInformationMessage("Start all tests.");

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(`Context ${context.extensionPath} ${context.workspaceState} ${context.globalState} ${context.subscriptions} ${context.extensionMode}`);

	let m_view = vscode.window.registerTreeDataProvider("VIEW_ID", new EntityTreeProvider());

	  context.subscriptions.push(
      vscode.commands.registerCommand(
        "extension.enterEntityId", CommandHandler.getEntity

      )
    );

		let disposable = vscode.commands.registerCommand('db-autotest.callPython', async () => {
			// The code you place here will be executed every time your command is executed
			// myFunction();
			vscode.window.showInformationMessage("Start all tests 345");
      M_Logging.log("Start of test readTsConfig");

      console.log("Main app:", M_Config.main_app);
      console.log("Config:", M_Config.config);
      console.log("Main con:", M_Config.main_con.child.pid);
      const m_python_message = new PythonMessage(python_message_type.m_json);
      await M_Config.main_con.send(m_python_message);

	  vscode.window.showInformationMessage(M_Config.main_con.child.pid.toString());
	  await M_Config.main_con.sendStr("Hello from VS Code!");
      await M_Config.destroy();
      M_Logging.log("End of test readTsConfig");			
			
		});


	}

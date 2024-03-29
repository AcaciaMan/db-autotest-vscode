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
import { MetaTreeProvider, m_meta_selects_table } from './m_utils/m_meta/meta_tree_provider';
import { Test } from 'mocha';
import { TestCallPython } from './test/test_call_python';
import M_Config_VSCode from './m_utils/m_config_vscode';


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "db-autotest" is now active!');
	vscode.window.showInformationMessage("Start all tests.");

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(`Context ${context.extensionPath} ${context.workspaceState} ${context.globalState} ${context.subscriptions} ${context.extensionMode}`);

	let m_view = vscode.window.registerTreeDataProvider("VIEW_ID", new EntityTreeProvider());
	let m_view_meta = vscode.window.registerTreeDataProvider("VIEW_META_ID", new MetaTreeProvider() );

	  context.subscriptions.push(
      vscode.commands.registerCommand(
        "extension.enterEntityId", CommandHandler.getEntity

      )
    );

		let disposable = vscode.commands.registerCommand('db-autotest.callPython', TestCallPython.test_call);

		let disposable2 = vscode.commands.registerCommand('db-autotest.openFileWithElementInfo', CommandHandler.openTxtFile);

		let disposable3 = vscode.commands.registerCommand(
      "db-autotest.openFileWithEntityInfo",
      CommandHandler.openEntityTxtFile
    );


	}

	// Add on vscode exit function call
	export function deactivate() {
		M_Config.destroy();
		M_Config_VSCode.destroy();
	}

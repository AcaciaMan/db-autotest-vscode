/* eslint-disable @typescript-eslint/naming-convention */
import * as assert from 'assert';
import * as vscode from 'vscode';
import M_Config_VSCode from '../m_utils/m_config_vscode';
import { M_Meta_Selects } from '../m_utils/m_selects/m_meta_selects';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('getAllTableInfo', async () => {

		// Call the function under test
		const result = await M_Meta_Selects.getAllTableInfo();
		console.log(result[0]);

	});

	// Add on vscode exit function call
	suiteTeardown(() => {
		M_Config_VSCode.destroy();
	});
});
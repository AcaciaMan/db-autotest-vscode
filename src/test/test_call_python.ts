/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from "vscode";
import M_Config from "../m_utils/call_py/m_config";
import { PythonMessage, python_message_type } from "../m_utils/call_py/python_message";
import { M_Logging } from "../m_utils/call_py/m_logging";

export class TestCallPython {
  public static async test_call() {
    // The code you place here will be executed every time your command is executed
    // myFunction();
    vscode.window.showInformationMessage("Start all tests 345");
    M_Logging.log("Start of test readTsConfig");

    console.log("Main app:", M_Config.main_app);
    console.log("Config:", M_Config.config);
    console.log("Main con:", M_Config.main_con.child.pid);
    const m_python_message = new PythonMessage(python_message_type.m_json);
    await M_Config.main_con.send(m_python_message);

    vscode.window.showInformationMessage(
      M_Config.main_con.child.pid.toString()
    );
    await M_Config.main_con.sendStr("Hello from VS Code!");
    await M_Config.destroy();
    M_Logging.log("End of test readTsConfig");
  }
}

import * as vscode from "vscode";

export class CommandHandler {


    public static getEntity(element): Thenable<string> {
        let m_promise: Promise<string>; // Declare m_promise variable

        m_promise = new Promise((resolve, reject) => {
            vscode.window.showInputBox({
                prompt: "Enter Entity ID",
            }).then((entityId) => {
                if (entityId) {
                    vscode.window.showInformationMessage(`Entity ID for ${element}: ${entityId}`);
                }
                return entityId;
            });
        });
        
        return m_promise;
    }

    public static async myCommandHandler(...args: any[]): Promise<void> {
        // Your command handler logic here
        vscode.window.showInformationMessage("Command executed");
    }
}


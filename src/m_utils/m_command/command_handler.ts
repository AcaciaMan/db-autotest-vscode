import * as vscode from "vscode";
import { m_meta_selects_table } from "../m_meta/meta_tree_provider";
import { M_PyCall } from "../m_selects/m_py_call";
import { m_meta_selects_entity } from "../m_entity/entity_tree_provider";

export class CommandHandler {
  public static getEntity(element): Thenable<string> {
    let m_promise: Promise<string>; // Declare m_promise variable

    m_promise = new Promise((resolve, reject) => {
      vscode.window
        .showInputBox({
          prompt: "Enter Entity ID",
        })
        .then((entityId) => {
          if (entityId) {
            vscode.window.showInformationMessage(
              `Entity ID for ${element}: ${entityId}`
            );
          }
          return entityId;
        });
    });

    return m_promise;
  }

  public static openTxtFile(element: m_meta_selects_table): Thenable<void> {
    let m_promise: Promise<void>; // Declare m_promise variable

    m_promise = new Promise((resolve, reject) => {
      M_PyCall.getTableEntity(element.m_object_detail_id).then((result) => {
        vscode.workspace
          .openTextDocument({
            language: "yaml",
            content: result.m_result,
          })
          .then((doc) => {
            vscode.window.showTextDocument(doc);
          });
      });
    });

    return m_promise;
  }

  public static openEntityTxtFile(element: m_meta_selects_entity): Thenable<void> {
    let m_promise: Promise<void>; // Declare m_promise variable

    m_promise = new Promise((resolve, reject) => {

        vscode.window
          .showInputBox({
            prompt: "Enter Entity ID",
          })
          .then((entityId) => {
            if (entityId) {
                const entityIdNumber = parseInt(entityId, 10); // Convert entityId to a number
                M_PyCall.getEntityData(element, entityIdNumber).then((result) => {
                    vscode.workspace
                        .openTextDocument({
                            language: "yaml",
                            content: result.m_result,
                        })
                        .then((doc) => {
                            vscode.window.showTextDocument(doc);
                        });
                });
            }

          });

    });

    return m_promise;
  }

  public static async myCommandHandler(...args: any[]): Promise<void> {
    // Your command handler logic here
    vscode.window.showInformationMessage("Command executed");
  }
}


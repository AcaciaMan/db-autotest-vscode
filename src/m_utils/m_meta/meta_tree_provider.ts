import * as vscode from "vscode";

export class MetaTreeProvider implements vscode.TreeDataProvider<string> {
  getTreeItem(element: string): vscode.TreeItem {
    const treeItem = new vscode.TreeItem(element);
    treeItem.command = {
      command: "extension.enterEntityId",
      title: "Enter Entity ID",
      arguments: [element],
    };
    return treeItem;
  }

  getChildren(element?: string): Thenable<string[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(["Item 1", "Item 2", "Item 3"]);
    }
  }
}

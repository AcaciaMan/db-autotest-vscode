import * as vscode from "vscode";

export class EntityTreeProvider implements vscode.TreeDataProvider<string> {
  getTreeItem(element: string): vscode.TreeItem {
    return new vscode.TreeItem(element);
  }

  getChildren(element?: string): Thenable<string[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(["Item 1", "Item 2", "Item 3"]);
    }
  }
}

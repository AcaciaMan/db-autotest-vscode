import * as vscode from "vscode";
import { M_Meta_Selects } from "../m_selects/m_meta_selects";

export type m_meta_selects_table = {
  schema: string;
  name: string;
  created_at: string;
  last_version_id: number;
  last_version_loaded_at: string;
  droped: number;
};



export class MetaTreeProvider
  implements vscode.TreeDataProvider<m_meta_selects_table>
{
  getTreeItem(element: m_meta_selects_table): vscode.TreeItem {
    const treeItem = new vscode.TreeItem(element.name); // Use the 'name' property as the label
    /*
    treeItem.command = {
      command: "extension.enterEntityId",
      title: "Enter Entity ID",
      arguments: [element],
    };
    */
    return treeItem;
  }

  getChildren(
    element?: m_meta_selects_table
  ): Thenable<m_meta_selects_table[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return M_Meta_Selects.getAllTableInfo(); // In the absence of 'element', return the top-level children
      //const m_table_info: m_meta_selects_table[] = [{schema: "schema", name: "name", created_at: "created_at", last_version_id: 1, last_version_loaded_at: "last_version_loaded_at", droped: 0}];
      //return Promise.resolve(m_table_info);
    }
  }
}

import * as vscode from "vscode";
import { M_Meta_Selects } from "../m_selects/m_meta_selects";

export type m_meta_selects_table = {
  m_object_detail_id: number;
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

    treeItem.contextValue = "m_meta_selects_table"; // Use the 'contextValue' property to distinguish TreeItems in the 'onViewItemActivated' function

    treeItem.tooltip = element.schema + " " + element.created_at; // Set the tooltip to the element name

    treeItem.description =
      element.schema +
      " " +
      element.last_version_loaded_at +
      " " +
      element.last_version_id; // Set the description to the element name

    if (element.droped === 1) {
      treeItem.label = `~~${treeItem.label}~~`; // Add strikethrough formatting to the label
    }

    /*
    treeItem.command = {
      command: "extension.openFileWithElementInfo",
      title: "Open File With Element Info",
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

import * as vscode from "vscode";
import { M_Meta_Selects } from "../m_selects/m_meta_selects";

export type m_meta_selects_entity = {
  M_ENTITY_ID: number;
  M_PACKAGE: string;
  M_FILE: string;
  M_CLASS: string;
  IS_M_TABLE: number;
  IS_META_DB: number;
  M_PARENT: string;
};

export class EntityTreeProvider
  implements vscode.TreeDataProvider<m_meta_selects_entity>
{
  getTreeItem(element: m_meta_selects_entity): vscode.TreeItem {
    const treeItem = new vscode.TreeItem(element.M_CLASS); // Use the 'name' property as the label

    treeItem.contextValue = "m_meta_selects_entity";

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
    element?: m_meta_selects_entity
  ): Thenable<m_meta_selects_entity[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return M_Meta_Selects.getAllEntities();
      
      // Promise.resolve(["Item 1", "Item 2", "Item 3"]);
    }
  }
}

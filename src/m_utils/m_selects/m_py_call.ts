/* eslint-disable @typescript-eslint/naming-convention */
import M_Config from "../call_py/m_config";
import { PythonScript } from "../call_py/python_message";
import { m_meta_selects_entity } from "../m_entity/entity_tree_provider";

export type m_result_type = {
    m_result: string;
};

export class M_PyCall {
  public static getTableEntity(
    m_object_detail_id: number
  ): Thenable<m_result_type> {
    return new Promise((resolve, reject) => {
      const m_script = new PythonScript();
      m_script.imports = [
        "from db_autotest.lite_object.c_m_table import C_M_Table",
        "from db_autotest.m_lib.m_utils.m_yaml import M_Yaml",
        "from db_autotest.m_lib.m_config.config import M_Config",
      ];
      m_script.declarations = [{ m_args: { m_id: [m_object_detail_id] } }];
      m_script.code = [
        "cl = C_M_Table()",
        "cl.c_main.load(&{m_args}, con = M_Config.meta)",
        "m_result = M_Yaml().get_yaml(cl.c_main.m_structure)",
      ];
      m_script.m_return = "m_result";

      M_Config.main_con
        .send(m_script)
        .then(() => {
          resolve(M_Config.main_con.result as m_result_type);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public static getEntityData(
    m_entity: m_meta_selects_entity, M_ENTITY_ID: number
  ): Thenable<m_result_type> {
    return new Promise((resolve, reject) => {
      const m_script = new PythonScript();
      m_script.imports = [
        `from ${m_entity.M_FILE} import ${m_entity.M_CLASS}`,
        "from db_autotest.m_lib.m_utils.m_yaml import M_Yaml",
        "from db_autotest.m_lib.m_config.config import M_Config",
      ];
      m_script.declarations = [{ m_args: { m_id: [M_ENTITY_ID] } }];
      m_script.code = [
        `cl = ${m_entity.M_CLASS}()`,
        "cl(&{m_args})",
        "m_result = M_Yaml().get_yaml(cl.main_class.m_structure)",
      ];
      m_script.m_return = "m_result";

      M_Config.main_con
        .send(m_script)
        .then(() => {
          resolve(M_Config.main_con.result as m_result_type);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
/* eslint-disable @typescript-eslint/naming-convention */
import M_Config from "../call_py/m_config";
import { PythonScript } from "../call_py/python_message";

export type m_result_type = {
    m_result: string;
};

export class M_PyCall {


    public static getTableEntity(m_object_detail_id: number): Thenable<m_result_type> {

        return new Promise((resolve, reject) => {

            const m_script = new PythonScript();
            m_script.imports = [
                "from db_autotest.lite_object.c_m_table import C_M_Table",
                "from db_autotest.m_lib.m_utils.m_yaml import M_Yaml",
                "from db_autotest.m_lib.m_config.config import M_Config"
            ];
            m_script.declarations = [{m_args: {m_id: [m_object_detail_id]}}];
            m_script.code = [
              "cl = C_M_Table()",
              "cl.c_main.load(&{m_args}, con = M_Config.meta)",
              "m_result = M_Yaml().get_yaml(cl.c_main.m_structure)",
            ];
            m_script.m_return = "m_result";

            M_Config.main_con.send(m_script).then(() => {
                resolve(M_Config.main_con.result as m_result_type);
            }).catch((error) => {
                reject(error);
            });
            
        });

    }
}
/* eslint-disable @typescript-eslint/naming-convention */
import M_Config_VSCode from "../m_config_vscode";

export class M_Meta_Selects {
  public static async getTableInfo(table_name: string): Promise<any> {

    return new Promise((resolve, reject) => {
    M_Config_VSCode.meta_con.get(
      `SELECT d.m_object_detail_id as m_object_detail_id,
       schema as schema,
       name as name,
       datetime(create_date, 'unixepoch', 'localtime') AS created_at,
       v.m_version_id AS last_version_id,
       datetime(load_date, 'unixepoch', 'localtime') AS last_version_loaded_at,
       droped as droped
  FROM m_object o,
       m_object_detail d,
       m_version v
 WHERE 1 = 1 AND 
       lower(o.name) = lower('${table_name}') AND 
       o.TYPE = 'TABLE' and
       d.m_object_detail_id IN (
           SELECT max(d1.m_object_detail_id) 
             FROM m_object_detail d1,
                  m_version v1,
                  m_env e
            WHERE 1 = 1 AND 
                  d1.m_object_id = o.m_object_id AND 
                  d1.m_version_id = v1.m_version_id AND 
                  v1.m_env_id = e.m_env_id AND 
                  e.name = '${M_Config_VSCode.config.main_env}'
       )
AND 
       v.m_version_id = d.m_version_id`,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );});

  }

  public static async getAllTableInfo(): Promise<any> {

    return new Promise((resolve, reject) => {
    M_Config_VSCode.meta_con.all(
      `SELECT d.m_object_detail_id as m_object_detail_id,
       schema as schema,
       name as name,
       datetime(create_date, 'unixepoch', 'localtime') AS created_at,
       v.m_version_id AS last_version_id,
       datetime(load_date, 'unixepoch', 'localtime') AS last_version_loaded_at,
       droped as droped
  FROM m_object o,
       m_object_detail d,
       m_version v
 WHERE 1 = 1 AND 
   o.TYPE = 'TABLE' and
       d.m_object_detail_id IN (
           SELECT max(d1.m_object_detail_id) 
             FROM m_object_detail d1,
                  m_version v1,
                  m_env e
            WHERE 1 = 1 AND 
                  d1.m_object_id = o.m_object_id AND 
                  d1.m_version_id = v1.m_version_id AND 
                  v1.m_env_id = e.m_env_id AND 
                  e.name = '${M_Config_VSCode.config.main_env}'
       )
AND 
       v.m_version_id = d.m_version_id`,
      [],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );});


  }
}
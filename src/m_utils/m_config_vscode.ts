import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";

// generate a class M_Config_VSCode with static property
// config that contains the parsed db_autotest_vscode.json file
// load the file only once
class M_Config_VSCode {
  static config = M_Config_VSCode.readTsConfig();
  static _meta_con: sqlite3.Database;

  private constructor() {} // Prevent instantiation

  public static destroy() {
    M_Config_VSCode.meta_con.close();
    M_Config_VSCode.meta_con = null;
  }

  static findSrcDirectories(filePath: string): string[] {
    const srcDirectories: string[] = [];

    const currentDirectory = path.dirname(filePath);
    const directories = currentDirectory.split(path.sep);

    for (let i = 0; i < directories.length; i++) {
      const directory = directories.slice(0, i + 1).join(path.sep);
      const stats = fs.statSync(directory);

      if (
        stats.isDirectory() &&
        fs.existsSync(path.join(directory, "db_autotest_vscode.json"))
      ) {
        srcDirectories.push(directory);
      }
    }

    return srcDirectories;
  }

  static readTsConfig(tsConfig?: any) {
    if (!tsConfig) {
      // const currentFilePath = __filename;
      const cwdName = __dirname;
      //const cwdName = process.cwd();

      const srcDirectories = M_Config_VSCode.findSrcDirectories(cwdName);
      const tsConfigPaths: string[] = [];
      for (const srcDirectory of srcDirectories) {
        tsConfigPaths.push(path.join(srcDirectory, "db_autotest_vscode.json"));
      }

      let tsConfigContent = "";
      let foundTsConfigPath = "";

      for (const tsConfigPath of tsConfigPaths) {
        try {
          tsConfigContent = fs.readFileSync(tsConfigPath, "utf-8");
          foundTsConfigPath = tsConfigPath;
          break;
        } catch (error) {
          // File not found, try the next path
        }
      }

      if (!tsConfigContent) {
        throw new Error("Unable to find db_autotest_vscode.json file.");
      }

      console.log("Found db_autotest_vscode.json at:", foundTsConfigPath);

      tsConfig = JSON.parse(tsConfigContent);
    }

    walkJsonTree(tsConfig, (key, value) => {
      // console.log(`Key: ${key}, Value: ${value}`);
    });

    return tsConfig;
  }

  static get meta_con(): sqlite3.Database {
    if (!M_Config_VSCode._meta_con) {
      M_Config_VSCode._meta_con = new sqlite3.Database(
        M_Config_VSCode.config.meta_db.db_path);
    }
    return M_Config_VSCode._meta_con;
  }

  static set meta_con(value: sqlite3.Database) {
    M_Config_VSCode._meta_con = value;
  }
}

function getStringBetweenCurlyBrackets(value: string): string | null {
  const regex = /{([^}]+)}/;
  const match = value.match(regex);
  return match ? match[1] : null;
}

function walkJsonTree(obj: any, callback: (key: string, value: any) => void) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (
        typeof value === "string" &&
        value.includes("{") &&
        value.includes("}")
      ) {
        const m_result = getStringBetweenCurlyBrackets(value);
        if (m_result) {
          if (obj.hasOwnProperty(m_result)) {
            obj[key] = value.replace(`{${m_result}}`, obj[m_result]);
          }
        }
      }
      callback(key, value);
      if (typeof value === "object" && value !== null) {
        walkJsonTree(value, callback);
      }
    }
  }
}

export default M_Config_VSCode;

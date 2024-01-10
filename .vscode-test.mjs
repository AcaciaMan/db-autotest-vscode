import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
  files: "out/test/**/*.test.js",
  useInstallation: { ["fromPath"]: "C:/Tools/VSCode/bin/code.cmd" }, // Path to VS Code executable
  
});

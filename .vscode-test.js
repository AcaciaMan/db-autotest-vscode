const { defineConfig } = require("@vscode/test-cli");

module.exports = defineConfig({
  files: "out/test/**/*.test.js",
  useInstallation: { ["fromPath"]: "C:/Tools/VSCode/bin/code.cmd" },
  mocha: {
    timeout: 20000,
  },
});

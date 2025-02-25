import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Node.js ग्लोबल्स शामिल करें
        ...globals.browser, // यदि ब्राउज़र ग्लोबल्स भी चाहिए
      },
    },
  },
  pluginJs.configs.recommended,
];

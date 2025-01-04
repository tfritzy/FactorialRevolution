import jestPlugin from "eslint-plugin-jest";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default {
  ignores: ["dist/*"],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2020,
      sourceType: "module",
      project: "./tsconfig.json",
    },
  },
  plugins: {
    "@typescript-eslint": tsPlugin,
    react: reactPlugin,
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
    jest: jestPlugin,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "jest/valid-expect": "warn",
    "jest/expect-expect": "warn",
    "react/jsx-key": "warn",
  },
};

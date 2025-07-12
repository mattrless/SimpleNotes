import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
  // Ignorar carpetas y archivos específicos globalmente
  {
    ignores: ["dist/", "node_modules/", "eslint.config.js"],
  },

  // 1. Configuración base recomendada de ESLint
  js.configs.recommended,

  // 2. Configuraciones recomendadas para TypeScript
  ...tseslint.configs.recommended,

  // 3. Configuración para React (JSX/TSX)
  {
    files: ["**/*.{jsx,tsx}"],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Detecta automáticamente tu versión de React
      },
    },
  },

  // 4. Configuración para los hooks de React
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: pluginReactHooks.configs.recommended.rules,
  },

  // 5. Configuraciones y reglas personalizadas (aquí emulamos a `ts-standard`)
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser, // Variables globales del navegador (window, document...)
      },
      parserOptions: {
        project: "./tsconfig.app.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // --- Reglas para emular el estilo de 'standard' ---
      "semi": ["error", "never"], // No usar punto y coma
      "indent": ["error", 2], // Indentación de 2 espacios
      "space-before-function-paren": ["error", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
      "comma-dangle": ["error", "always-multiline"], // Coma final en multilíneas
      "quotes": ["error", "single"], // Usar comillas simples

      // --- Reglas útiles de React y TypeScript ---
      "react/react-in-jsx-scope": "off", // No es necesario en React 17+
      "react/prop-types": "off", // No es necesario con TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Advierte sobre variables no usadas
    },
  }
);
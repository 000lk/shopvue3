import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser'; // 添加 Vue 解析器

export default defineConfig([
  // 基础配置
  {
    ignores: ['**/dist/**', '**/node_modules/**']
  },

  // JS 配置
  js.configs.recommended,

  // Vue 配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    plugins: {
      vue: pluginVue
    },
    rules: {
      // 从插件直接继承规则
      ...pluginVue.configs['vue3-essential'].rules,

      // 自定义规则
      'vue/multi-word-component-names': 'off',
      'no-unexpected-multiline': 'error',
      'vue/no-irregular-whitespace': 'error'
    }
  }
])
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { resolve } = require('path')

export default [
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      'vue/html-self-closing': 'off',
      'vue/attributes-order': 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  },
]

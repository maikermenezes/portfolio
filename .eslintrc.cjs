module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  overrides: [{ files: ['api/**/*.js', 'server/**/*.js', 'vite.config.js'], env: { node: true } }],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/prop-types': 'off',
    'react/no-unknown-property': ['error', { ignore: ['attach', 'args', 'object', 'position', 'rotation', 'geometry', 'transparent', 'depthWrite', 'blending', 'sizeAttenuation', 'uniforms', 'vertexShader', 'fragmentShader', 'array', 'count', 'itemSize'] }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

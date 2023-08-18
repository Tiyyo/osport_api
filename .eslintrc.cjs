module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    "jest/globals": true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  ignorePatterns: ['.eslintrc.cjs'],
  parserOptions: {
    project: `./tsconfig.json`,
  },
  plugins: ["jest"],
  rules: {
    'no-console': 'off',
  },
}
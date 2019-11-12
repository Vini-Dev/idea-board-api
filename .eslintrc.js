module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins : ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "prettier/prettier" : ["error" , {"endOfLine" : "auto"}], //caso o prettier achar um erro o eslint manda um erro
    "class-methods-use-this" : "off", //methods dentro de class usar o this
    "no-param-reassign" : "off", //fazer alterações em um parametro
    "no-unused-vars" : ["error" , { "argsIgnorePattern" : "next" }],//não acusar erro em variaveis não usadas
    "/*sql*/": "off" // Sintaxe sql,
  },
};


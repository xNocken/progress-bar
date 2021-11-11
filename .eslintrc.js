module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    BigInt: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-continue': 'off',
    'no-loop-func': 'off',
    'no-bitwise': 'off',
    'no-await-in-loop': 'off',
    'no-undef': 'off', // jscofig does this
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
    }],
    // some loops need to run infinite to add as many chunks as possible in one packet
    'no-constant-condition': 'off',
  },
};

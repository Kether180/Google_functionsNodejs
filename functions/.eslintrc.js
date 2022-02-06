module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2019,
  },

  plugins: ["promise"],

  extends: "eslint:recommended",

  rules: {

    "no-console": "off",
    "no-regex-spaces": "off",
    quotes: ["error", "double"],
  },
};

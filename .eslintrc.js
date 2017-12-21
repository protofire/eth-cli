module.exports = {
  env: {
    "node": true,
    "es6": true
  },
  extends: [
    "eslint:recommended",
    "prettier"
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "no-console": "off"
  }
};

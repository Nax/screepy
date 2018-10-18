const presets = [
  ["@babel/preset-env", {
    useBuiltIns: "entry",
    targets: {
      "node": "10"
    }
  }],
  "@babel/preset-typescript"
];

module.exports = { presets };

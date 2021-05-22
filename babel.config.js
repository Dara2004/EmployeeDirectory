module.exports = (api) => {
  const presets = [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ];

  const plugins = [
    "react-hot-loader/babel",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties",
  ];

  if (api.env("production")) {
    presets.push([
      "minify",
      {
        removeConsole: { exclude: ["error", "warn", "info"] },
      },
    ]);
  }

  return {
    presets,
    plugins,
  };
};

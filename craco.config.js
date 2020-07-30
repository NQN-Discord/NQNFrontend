const path = require("path").join(
  __dirname,
  "/semantic/src/theme.config",
);

module.exports = {
  plugins: [{ plugin: require('craco-less') }],
  webpack: {
    alias: {
      '../../theme.config$': path,
    },
  },
};
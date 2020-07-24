const path = require("path").join(
  __dirname,
  "/src/semantic-ui/theme.config",
);

module.exports = {
  plugins: [{ plugin: require('craco-less') }],
  webpack: {
    alias: {
      '../../theme.config$': path,
    },
  },
};
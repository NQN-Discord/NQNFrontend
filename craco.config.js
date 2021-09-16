const CracoLess = require('craco-less');

const path = require("path").join(
  __dirname,
  "src/semantic/src/theme.config",
);

module.exports = {
  plugins: [
    { plugin: CracoLess },
  ],
  webpack: {
    alias: {
      '../../theme.config$': path,
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.plugins.forEach(plugin => {
        if (plugin.constructor.name === "InlineChunkHtmlPlugin") {
          plugin.tests =  [ /.+[.]js/ ];
        }
      });
      return webpackConfig
    }
  },
};
require("babel-register")({
  presets: ["es2015", "react", "stage-2"]
});

const router = require("./router").LoggedOutRouter(() => {});
const Sitemap = require("react-router-sitemap").default;

const sitemap = new Sitemap(router);

sitemap.paths = [...new Set(sitemap.paths.filter(path => !path.includes(":")))];

sitemap.build("https://nqn.blue").save("./build/static_sitemap.xml");

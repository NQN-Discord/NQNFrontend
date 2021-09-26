require("babel-register")({
  presets: ["es2015", "react", "stage-2"]
});

const router = require("./router").LoggedOutRouter(true);
const Sitemap = require("react-router-sitemap").default;

(
  new Sitemap(router)
    .build("https://nqn.blue")
    .save("./build/sitemap.xml")
);

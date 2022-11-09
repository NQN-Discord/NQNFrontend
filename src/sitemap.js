require("babel-register")({
  presets: ["es2015", "react", "stage-2"]
});

const LoggedOutRouter = require("./router").LoggedOutRouter;
const Generator = require("react-router-sitemap-generator").default;
const convertor = require("xml-js");
const fs = require("fs");


const generator = new Generator(
  "https://nqn.blue",
  LoggedOutRouter(() => {})
);


const xml = generator.getXML();
const xmljs = convertor.xml2js(xml);

const getPath = (e) => e.elements.find(e => e.name === "loc").elements[0].text;
const includePath = (path) => !path.includes("/:");

const urls = xmljs.elements[0].elements.filter(e => includePath(getPath(e)));
xmljs.elements[0].elements = urls;

fs.writeFileSync("./build/static_sitemap.xml", convertor.js2xml(xmljs));
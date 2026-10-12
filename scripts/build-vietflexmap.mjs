import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = p => fs.readFileSync(path.join(root, p), "utf8");
const put = (p, s) => {
  const abs = path.join(root, p);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, s, "utf8");
};
const copy = (from, to) => {
  const out = path.join(root, to);
  fs.mkdirSync(path.dirname(out), {recursive:true});
  fs.copyFileSync(path.join(root, from), out);
};
const lf = "node_modules/leaflet/dist/";
for (const x of ["leaflet.js", "leaflet.css", "images/marker-icon.png", "images/marker-icon-2x.png", "images/marker-shadow.png", "images/layers.png", "images/layers-2x.png"]) {
  if (!fs.existsSync(path.join(root, lf, x))) throw new Error("Missing leaflet: " + x + ". Run npm install first.");
}
let gis = read("dist/vn-gis.js");
gis = gis.replace("https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/", "https://unpkg.com/vietflexmap@1.0.2/");
gis = gis.replaceAll("assets/vn-flag.svg", "assets/vietnam-flag.svg");
const map = read("dist/vn-map.js");
const leaflet = read(lf + "leaflet.js");
const stylesheet = read(lf + "leaflet.css") + "\n" + read("dist/vn-gis.css") + "\n" + read("dist/vn-map.css");
put("dist/vietflexmap.js", "/*! Vietflexmap 1.0.2 | Long Ngo MIT | includes Leaflet 1.9.4 BSD-2-Clause */\n" + leaflet + "\n;\n" + gis + "\n;\n" + map + "\n");
put("dist/vietflexmap.css", "/* Vietflexmap 1.0.2 includes Leaflet 1.9.4 CSS */\n" + stylesheet);
for (const i of ["marker-icon.png", "marker-icon-2x.png", "marker-shadow.png", "layers.png", "layers-2x.png"]) {
  copy(lf + "images/" + i, "dist/images/" + i);
}
copy("assets/vn-flag.svg", "assets/vietnam-flag.svg");
const leafletLicense = path.join(root, "node_modules/leaflet/LICENSE");
if (fs.existsSync(leafletLicense)) copy("node_modules/leaflet/LICENSE", "LEAFLET-LICENSE.txt");
else throw new Error("Leaflet license not found");
console.log("BUILD OK: Vietflexmap 1.0.2 bundles Leaflet JS/CSS/images");

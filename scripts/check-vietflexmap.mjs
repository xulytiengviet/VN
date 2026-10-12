import fs from "node:fs";
import assert from "node:assert/strict";

const read = file => fs.readFileSync(file, "utf8");
const pkg = JSON.parse(read("package.json"));
const js = read("dist/vietflexmap.js");
const css = read("dist/vietflexmap.css");
const leafletJS = read("node_modules/leaflet/dist/leaflet.js");
const leafletCSS = read("node_modules/leaflet/dist/leaflet.css");

assert.equal(pkg.name, "vietflexmap");
assert.equal(pkg.version, "1.0.2");
assert.ok(leafletJS.length > 100000, "Leaflet JS source unexpectedly small");
assert.ok(leafletCSS.length > 10000, "Leaflet CSS source unexpectedly small");
assert.ok(js.includes(leafletJS), "Leaflet 1.9.4 JS not fully bundled");
assert.ok(css.includes(leafletCSS), "Leaflet 1.9.4 CSS not fully bundled");

for (const s of [
  "Biển Đông",
  "Qđ.Hoàng Sa (Việt Nam)",
  "Qđ.Trường Sa (Việt Nam)",
  "Sẵn sàng",
  "https://unpkg.com/vietflexmap@1.0.2/",
  "assets/vietnam-flag.svg",
  "VNMap", "VNGIS"
]) assert.ok(js.includes(s), "Missing valid UTF-8 content: " + s);

assert.ok(!js.includes("Biá»"), "Mojibake detected");
assert.ok(!js.includes("https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/"), "Old unpinned asset URL detected");

for (const f of [
  "dist/images/marker-icon.png",
  "dist/images/marker-icon-2x.png",
  "dist/images/marker-shadow.png",
  "dist/images/layers.png",
  "dist/images/layers-2x.png",
  "assets/vietnam-flag.svg",
  "LEAFLET-LICENSE.txt"
]) assert.ok(fs.existsSync(f), "Missing asset: " + f);

console.log("CHECK PASSED: UTF-8, full Leaflet JS/CSS, images, SVG, license, version 1.0.2");

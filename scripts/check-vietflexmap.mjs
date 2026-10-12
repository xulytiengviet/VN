import fs from "node:fs";
import assert from "node:assert/strict";
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const js = fs.readFileSync("dist/vietflexmap.js","utf8");
const css = fs.readFileSync("dist/vietflexmap.css","utf8");
assert.equal(pkg.version,"1.0.2");
for (const s of ["Biển Đông","Qđ.Hoàng Sa (Việt Nam)","Qđ.Trường Sa (Việt Nam)","Sẵn sàng","https://unpkg.com/vietflexmap@1.0.2/","assets/vietnam-flag.svg","VNMap","VNGIS"]) {
  assert.ok(js.includes(s), "Missing valid UTF-8 content: " + s);
}
for (const s of ["L.version","leaflet","leaflet-container"]) assert.ok((js+css).toLowerCase().includes(s.toLowerCase()), "Missing Leaflet content: " + s);
assert.ok(css.includes("leaflet-control-zoom"),"Leaflet CSS missing");
assert.ok(!js.includes("Biá»"),"Mojibake detected");
assert.ok(!js.includes("https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/"),"Unpinned asset path");
for(const f of ["dist/images/marker-icon.png","dist/images/marker-shadow.png","dist/images/layers.png","assets/vietnam-flag.svg","LEAFLET-LICENSE.txt"]) assert.ok(fs.existsSync(f),"Missing asset " + f);
console.log("CHECK PASSED: UTF-8, bundled Leaflet, assets, version 1.0.2");

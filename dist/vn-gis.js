/* VN GIS attribution component © 2026 Long Ngo, MIT. No emoji fonts. */
(function (root, factory) {
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.VNGIS = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  var version = "1.0.0";
  var CDN = "https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/";
  var FLAG = CDN + "assets/vn-flag.svg";
  var fallbackSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20"><path fill="#da251d" d="M0 0h30v20H0z"/><path fill="#ff0" d="m15 3.1 1.65 5.1H22l-4.33 3.15 1.66 5.1L15 13.3l-4.33 3.15 1.66-5.1L8 8.2h5.35Z"/></svg>';
  var backupURL = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(fallbackSVG);
  function flag(options) {
    options = options || {};
    var img = document.createElement("img");
    img.className = "vn-gis-flag";
    img.alt = "Quốc kỳ Việt Nam";
    img.width = 22;
    img.height = 15;
    img.decoding = "async";
    img.onerror = function () { img.onerror = null; img.src = backupURL; };
    img.src = options.flagUrl || FLAG;
    return img;
  }
  function credit(options) {
    options = options || {};
    var node = document.createElement("span");
    node.className = "vn-gis-credit";
    node.appendChild(flag(options));
    var link = document.createElement("a");
    link.href = "https://www.openstreetmap.org/copyright";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.title = "© OpenStreetMap contributors";
    link.textContent = "© OpenStreetMap";
    node.appendChild(link);
    return node;
  }
  function labels() {
    var el = document.createElement("div");
    el.className = "vn-gis-labels";
    ["Biển Đông", "Qđ. Hoàng Sa (Việt Nam)", "Qđ. Trường Sa (Việt Nam)"].forEach(function (label) {
      var item = document.createElement("span");
      item.textContent = label;
      el.appendChild(item);
    });
    return el;
  }
  function mount(container, options) {
    var target = typeof container === "string" ? document.querySelector(container) : container;
    if (!target) throw new Error("VNGIS.mount: không tìm thấy container");
    var existing = target.querySelector("[data-vn-gis-credit]");
    if (existing) existing.remove();
    var node = credit(options);
    node.setAttribute("data-vn-gis-credit", "");
    target.appendChild(node);
    return node;
  }
  /* One compact attribution control. Preserve all non-OSM source credits. */
  function addToLeaflet(map, options) {
    if (!map || typeof map.getContainer !== "function" || !rootLeaflet()) throw new Error("VNGIS.addToLeaflet requires Leaflet");
    options = options || {};
    var L = rootLeaflet();
    var key = "_vnGISCreditControl";
    if (map[key]) return map[key];
    // VNMap sets attributionControl:false. For third-party maps, opt in
    // to replacing their native attribution with replaceAttribution:true.
    if (map.attributionControl && !options.replaceAttribution) {
      return map.attributionControl;
    }
    if (map.attributionControl && options.replaceAttribution) {
      map.removeControl(map.attributionControl);
      map.attributionControl = null;
    }
    var sourceHolder;
    function syncSources() {
      if (!sourceHolder) return;
      sourceHolder.replaceChildren();
      var seen = new Set();
      map.eachLayer(function (layer) {
        if (!layer.getAttribution) return;
        var raw = layer.getAttribution();
        if (!raw) return;
        // OSM gets the short visible credit and complete contributor text
        // in the title, aria label, and HTML footer.
        if (/openstreetmap/i.test(raw) && !/<(?!\/?a\b)/i.test(raw)) return;
        if (seen.has(raw)) return;
        seen.add(raw);
        var extra = document.createElement("span");
        extra.className = "vn-gis-extra-credit";
        extra.textContent = " · " + raw.replace(/<[^>]*>/g, "").trim();
        sourceHolder.appendChild(extra);
      });
    }
    var C = L.Control.extend({
      options: { position: options.position || "bottomright" },
      onAdd: function () {
        var el = L.DomUtil.create("div", "vn-gis-leaflet-control");
        var c = credit(options);
        c.setAttribute("role", "contentinfo");
        c.setAttribute("aria-label", "Quốc kỳ Việt Nam. © OpenStreetMap contributors");
        sourceHolder = document.createElement("span");
        sourceHolder.className = "vn-gis-source-credits";
        c.appendChild(sourceHolder);
        el.appendChild(c);
        L.DomEvent.disableClickPropagation(el);
        return el;
      },
      onRemove: function () { map.off("layeradd layerremove", syncSources); }
    });
    var control = new C().addTo(map);
    map[key] = control;
    map.on("layeradd layerremove", syncSources);
    map.on("unload", function () { map[key] = null; });
    syncSources();
    return control;
  }
  function rootLeaflet() { return typeof globalThis !== "undefined" ? globalThis.L : null; }
  return { version:version, cdn:CDN, flagUrl:FLAG, flag:flag, credit:credit, labels:labels, mount:mount, addToLeaflet:addToLeaflet };
});

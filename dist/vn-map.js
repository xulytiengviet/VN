/* VNMap 1.1.0 · MIT © 2026 Long Ngo · Leaflet 1.9.4 adapter */
(function(root,factory){var api=factory(root);if(typeof module==="object"&&module.exports)module.exports=api;root.VNMap=api;})(typeof globalThis!=="undefined"?globalThis:this,function(root){
"use strict";
function getL(){if(!root.L)throw new Error("VNMap: cần tải Leaflet 1.9.4 trước vn-map.js");return root.L;}
function el(tag,cls,text){var x=document.createElement(tag);if(cls)x.className=cls;if(text!==undefined)x.textContent=text;return x;}
function start(target,opts){
 opts=opts||{};var L=getL();var m=L.map(target,{center:opts.center||[16.25,108.2],zoom:opts.zoom||5,zoomControl:false,attributionControl:false,preferCanvas:true,tapHold:true,scrollWheelZoom:opts.scrollWheelZoom!==false});
 var base={},overlays={},active=null;var attribution='© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>';
 var os=L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:attribution});
 base["OpenStreetMap"]=os;active=os;os.addTo(m);
 var geo=L.featureGroup().addTo(m);overlays["Dữ liệu GeoJSON"]=geo;
 var controls=L.control.layers(base,overlays,{collapsed:true,position:"topright"}).addTo(m);
 L.control.zoom({position:"bottomright"}).addTo(m);L.control.scale({position:"bottomleft",metric:true,imperial:false}).addTo(m);
 if(root.VNGIS&&root.VNGIS.addToLeaflet)root.VNGIS.addToLeaflet(m,{position:"bottomright"});
 var measurePoints=[],measureLayer=L.layerGroup().addTo(m),isMeasuring=false,locationMarker=null;
 var toolbar=el("div","vnmap-toolbar");toolbar.setAttribute("role","toolbar");toolbar.setAttribute("aria-label","Công cụ bản đồ");
 var status=el("output","vnmap-status","Sẵn sàng");status.setAttribute("aria-live","polite");
 function notify(t){status.textContent=t;}
 function button(txt,title,handler){var b=el("button","vnmap-btn",txt);b.type="button";b.title=title;b.setAttribute("aria-label",title);b.addEventListener("click",handler);toolbar.appendChild(b);return b;}
 var home=button("⌂","Về Việt Nam",function(){m.setView(opts.center||[16.25,108.2],opts.zoom||5);notify("Đã về vị trí mặc định");});
 button("+","Phóng to",function(){m.zoomIn()});button("−","Thu nhỏ",function(){m.zoomOut()});
 button("◎","Định vị thiết bị",function(){if(!navigator.geolocation){notify("Trình duyệt không hỗ trợ định vị");return;}
  notify("Đang xác định vị trí…");navigator.geolocation.getCurrentPosition(function(p){var pt=[p.coords.latitude,p.coords.longitude];if(locationMarker)m.removeLayer(locationMarker);locationMarker=L.circleMarker(pt,{radius:8,color:"#0558a6",fillColor:"#2da6ee",fillOpacity:0.8}).addTo(m).bindPopup("Vị trí thiết bị (độ chính xác khoảng "+Math.round(p.coords.accuracy)+" m)");m.setView(pt,15);notify("Định vị thành công");},function(e){notify("Không thể định vị: "+e.message);},{enableHighAccuracy:false,timeout:12000,maximumAge:60000});});
 var measureBtn=button("↔","Bật hoặc tắt đo khoảng cách",function(){isMeasuring=!isMeasuring;measureBtn.setAttribute("aria-pressed",String(isMeasuring));measureBtn.classList.toggle("active",isMeasuring);notify(isMeasuring?"Chạm bản đồ để thêm điểm đo":"Đã tắt đo");});
 button("×","Xóa phép đo",function(){measurePoints=[];measureLayer.clearLayers();notify("Đã xóa phép đo");});
 var tools=el("div","vnmap-tools");tools.appendChild(toolbar);tools.appendChild(status);
 var host=m.getContainer().parentNode;host.appendChild(tools);
 m.on("click",function(e){if(!isMeasuring)return;measurePoints.push(e.latlng);L.circleMarker(e.latlng,{radius:4,color:"#d12523"}).addTo(measureLayer);if(measurePoints.length>1){var n=measurePoints.length,d=measurePoints[n-2].distanceTo(measurePoints[n-1]);L.polyline([measurePoints[n-2],measurePoints[n-1]],{color:"#d12523",weight:3}).addTo(measureLayer);var total=0;for(var i=1;i<n;i++)total+=measurePoints[i-1].distanceTo(measurePoints[i]);notify("Khoảng cách xấp xỉ: "+(total/1000).toFixed(2)+" km");}else notify("Chọn điểm thứ hai");});
 function addGeoJSON(data,options){options=options||{};var layer=L.geoJSON(data,{style:options.style||{color:"#da251d",weight:2,fillOpacity:.12},pointToLayer:function(f,ll){return L.circleMarker(ll,{radius:6,color:"#da251d",fillColor:"#fbbf24",fillOpacity:.85});},onEachFeature:function(f,l){if(f.properties){var rows=Object.keys(f.properties).slice(0,12).map(function(k){return k+": "+String(f.properties[k]).slice(0,250);});l.bindPopup(el("div","",rows.join("\n")), {maxWidth:260});}}});geo.addLayer(layer);if(options.fit!==false&&layer.getBounds().isValid())m.fitBounds(layer.getBounds(),{padding:[25,25]});notify("Đã tải GeoJSON");return layer;}
 function addBaseLayer(name,url,options){if(typeof name!=="string"||!name.trim()||typeof url!=="string"||!/^https:\/\//.test(url))throw new Error("Cần tên và URL tile HTTPS");var layer=L.tileLayer(url,Object.assign({maxZoom:19,attribution:"© Nhà cung cấp dữ liệu"},options||{}));base[name]=layer;controls.addBaseLayer(layer,name);return layer;}
 function setBaseLayer(name){var layer=base[name];if(!layer)throw new Error("Không tìm thấy lớp nền "+name);if(active)m.removeLayer(active);layer.addTo(m);active=layer;return layer;}
 function exportGeoJSON(){var data=geo.toGeoJSON();var blob=new Blob([JSON.stringify(data,null,2)],{type:"application/geo+json;charset=utf-8"});var url=URL.createObjectURL(blob);var a=el("a");a.href=url;a.download="vnmap-data.geojson";document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},1000);return data;}
 function loadFile(file){if(!file)return Promise.reject(new Error("Chưa chọn tệp"));if(file.size>15*1024*1024)return Promise.reject(new Error("Tệp vượt 15MB"));return file.text().then(function(s){var data=JSON.parse(s);if(!data||!["Feature","FeatureCollection","GeometryCollection","Point","LineString","Polygon","MultiPoint","MultiLineString","MultiPolygon"].includes(data.type))throw new Error("Không phải GeoJSON");return addGeoJSON(data);});}
 function destroy(){m.remove();tools.remove();}
 return {map:m,addGeoJSON:addGeoJSON,addBaseLayer:addBaseLayer,setBaseLayer:setBaseLayer,exportGeoJSON:exportGeoJSON,loadFile:loadFile,clearData:function(){geo.clearLayers();},setView:function(center,zoom){m.setView(center,zoom);},notify:notify,destroy:destroy};
}
return {version:"1.1.0",create:start};
});

/* Vietflexmap / Mapbasic2 adapter. Does NOT modify npm vietflexmap@1.0.2. */
(function(root){
"use strict";
const R2="https://pub-c4fd9d1f887041be97a2542a7664ff95.r2.dev/basemap.pmtiles";
const OSM="https://tile.openstreetmap.org/{z}/{x}/{y}.png";
let instance=null;
const BASES={mapbasic2:"Mapbasic2 · PMTiles / R2",osm:"OpenStreetMap"};
function requireLib(){if(!root.L)throw Error("Chưa tải lõi Vietflexmap");}
function ui(map){
  root.L.control.zoom({position:"topleft"}).addTo(map);
  root.L.control.scale({position:"bottomleft",metric:true,imperial:false}).addTo(map);
  if(root.VNGIS?.addToLeaflet){
    const ctrl=root.VNGIS.addToLeaflet(map,{position:"bottomright"});
    if(ctrl?.setPosition)ctrl.setPosition("bottomright");
  }
  if(root.VNGIS?.addGeographicLabels)root.VNGIS.addGeographicLabels(map);
}
function mapCreate(target,center,zoom){
  const map=root.L.map(target,{center,zoom,zoomControl:false,attributionControl:false,preferCanvas:true});
  ui(map);return map;
}
function rasterArchiveLayer(archive,header,onError){
  const L=root.L;
  const layer=L.GridLayer.extend({
    createTile:function(coords,done){
      const tile=document.createElement("img");
      tile.alt="";tile.decoding="async";tile.style.width="256px";tile.style.height="256px";
      let live=true,objectUrl=null;
      tile._cleanup=()=>{live=false;if(objectUrl)URL.revokeObjectURL(objectUrl);};
      archive.getZxy(coords.z,coords.x,coords.y).then(result=>{
        if(!live)return;
        if(!result||!result.data){done(null,tile);return;}
        const mime=header.tileType===3?"image/jpeg":header.tileType===4?"image/webp":"image/png";
        objectUrl=URL.createObjectURL(new Blob([result.data],{type:mime}));
        tile.onload=()=>{if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=null;done(null,tile);};
        tile.onerror=()=>{if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=null;done(Error("Không đọc được tile"),tile);};
        tile.src=objectUrl;
      }).catch(err=>{if(live){onError(err);done(err,tile);}});
      return tile;
    }
  });
  return new layer({tileSize:256,minZoom:header.minZoom,maxNativeZoom:header.maxZoom,maxZoom:19,noWrap:true});
}
async function start(options){
  options=options||{};requireLib();
  const mode=options.mode==="osm"?"osm":"mapbasic2";
  const el=document.getElementById(options.target||"map");
  if(!el)throw Error("Không có phần tử bản đồ");
  if(instance){instance.map.remove();instance=null;}
  // When PMTiles is selected, do not construct VNMap.create(): that
  // method unconditionally requests tile.openstreetmap.org.
  const map=mapCreate(el,options.center||[15.7,108.2],options.zoom||5);
  instance={map,mode};
  try{
    if(mode==="osm"){
      root.L.tileLayer(OSM,{maxZoom:19,attribution:"© OpenStreetMap contributors"}).addTo(map);
      return instance;
    }
    if(!root.pmtiles?.PMTiles)throw Error("Chưa tải thư viện pmtiles");
    const archive=new root.pmtiles.PMTiles(R2);
    const header=await archive.getHeader();
    if(![2,3,4].includes(header.tileType))throw Error("Mapbasic2 PMTiles không chứa raster PNG/JPEG/WebP; cần adapter vector riêng");
    const layer=rasterArchiveLayer(archive,header,err=>{if(options.onError)options.onError(err);});
    layer.addTo(map);
    instance.layer=layer;
    instance.archive=archive;
    return instance;
  }catch(err){map.remove();instance=null;throw err;}
}
root.VietflexMapbasic2={start,BASES,archiveUrl:R2};
})(window);

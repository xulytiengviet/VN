# Tích hợp Vietflexmap 1.0.1 trên UNPKG

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<link rel="stylesheet" href="https://unpkg.com/vietflexmap@1.0.1/dist/vietflexmap.css">
<div class="vnmap-shell" style="height:600px"><div id="map" style="height:100%"></div></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/vietflexmap@1.0.1/dist/vietflexmap.js"></script>
<script>
  const app = VNMap.create("map");
  // app.addGeoJSON(yourFeatureCollection);
  // app.exportGeoJSON();
</script>
```

- Quốc kỳ SVG: https://unpkg.com/vietflexmap@1.0.1/assets/vietnam-flag.svg.
- Nhãn: Biển Đông, Qđ.Hoàng Sa (Việt Nam), Qđ.Trường Sa (Việt Nam). Không tự thay đổi GIS, dữ liệu lịch sử hoặc nền bản đồ.
- Giữ ghi công © OpenStreetMap contributors và nhà cung cấp dữ liệu khác theo quy định sử dụng.
- Leaflet 1.9.4 được tải trước bundle; Vietflexmap hiện xuất `VNGIS` và `VNMap` trên `window`, không có API toàn cục `VietflexMap`.
- `1.0.1` là phiên bản npm không thể ghi đè. Phiên bản mới cần được kiểm thử trên trình duyệt trước khi thay URL CDN.

## GitHub Pages

Trang https://xulytiengviet.github.io/VN/ lấy trực tiếp JS, CSS và SVG từ `vietflexmap@1.0.1` qua UNPKG. Mã nguồn nguyên thủy trong repository vẫn được lưu trữ để phát triển tiếp.

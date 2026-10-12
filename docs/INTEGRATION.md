# Tích hợp Vietflexmap 1.0.0 qua UNPKG

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<link rel="stylesheet" href="https://unpkg.com/vietflexmap@1.0.0/dist/vietflexmap.css">
<div class="vnmap-shell" style="height:600px"><div id="map" style="height:100%"></div></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/vietflexmap@1.0.0/dist/vietflexmap.js"></script>
<script>
  const app = VNMap.create("map");
  // app.addGeoJSON(yourFeatureCollection);
  // app.exportGeoJSON();
</script>
```

- Quốc kỳ SVG: https://unpkg.com/vietflexmap@1.0.0/assets/vietnam-flag.svg.
- Attribution cờ SVG + © OpenStreetMap: góc trái dưới của vùng bản đồ.
- Nhãn mặc định: Biển Đông; Qđ.Hoàng Sa (Việt Nam); Qđ.Trường Sa (Việt Nam).
- Hệ thống GIS, nhập/xuất GeoJSON, đo khoảng cách, dữ liệu lịch sử của các ứng dụng tích hợp không bị viết lại.
- Dùng một map Leaflet duy nhất; cần tải Leaflet trước Vietflexmap. Không loại bỏ thông tin ghi công các nhà cung cấp tile/lớp dữ liệu khác.

## Phát hành và đồng bộ

Repository GitHub là nguồn phát triển, còn trang GitHub Pages hiện dùng UNPKG phiên bản cố định `1.0.0`. Khi có chỉnh sửa, xây dựng lại gói, kiểm thử, phát hành phiên bản mới lên npm, rồi thay số phiên bản CDN tại trang này. Không tạo gói npm thứ hai.

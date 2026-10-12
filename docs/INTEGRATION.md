# Tích hợp Leaflet 1.9.4 qua UNPKG và Vietflexmap từ file nguồn UTF-8

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<link rel="stylesheet" href="../dist/vn-gis.css">
<link rel="stylesheet" href="../dist/vn-map.css">
<div class="vnmap-shell" style="height:600px"><div id="map" style="height:100%"></div></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="../dist/vn-gis.js"></script>
<script src="../dist/vn-map.js"></script>
<script>
  const app = VNMap.create("map");
  // app.addGeoJSON(yourFeatureCollection);
  // app.exportGeoJSON();
</script>
```

- Quốc kỳ SVG: ../assets/vn-flag.svg.
- Attribution cờ SVG + © OpenStreetMap: góc trái dưới của vùng bản đồ.
- Nhãn mặc định: Biển Đông; Qđ.Hoàng Sa (Việt Nam); Qđ.Trường Sa (Việt Nam).
- Hệ thống GIS, nhập/xuất GeoJSON, đo khoảng cách, dữ liệu lịch sử của các ứng dụng tích hợp không bị viết lại.
- Dùng một map Leaflet duy nhất; cần tải Leaflet trước Vietflexmap. Không loại bỏ thông tin ghi công các nhà cung cấp tile/lớp dữ liệu khác.

## Phát hành và đồng bộ

Repository GitHub là nguồn phát triển, còn trang GitHub Pages hiện dùng UNPKG phiên bản cố định `1.0.0`. Khi có chỉnh sửa, xây dựng lại gói, kiểm thử, phát hành phiên bản mới lên npm, rồi thay số phiên bản CDN tại trang này. Không tạo gói npm thứ hai.


**Lưu ý UTF-8:** gói npm `1.0.0` đã phát hành bị lỗi tiếng Việt; cho đến khi xuất bản bản sửa `1.0.1`, hãy tải JS/CSS từ các file nguồn GitHub Pages nêu trên. Leaflet CSS/JS luôn dùng UNPKG `1.9.4`.

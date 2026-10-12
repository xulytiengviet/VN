# Tích hợp VNMap (Leaflet 1.9.4)

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/dist/vn-gis.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/dist/vn-map.css">
<div class="vnmap-shell" style="height:600px"><div id="map" style="height:100%"></div></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/dist/vn-gis.js"></script>
<script src="https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/dist/vn-map.js"></script>
<script>
  const app = VNMap.create("map");
  // app.addGeoJSON(yourFeatureCollection);
  // app.addBaseLayer("Nguồn của bạn", "https://example.com/{z}/{x}/{y}.png", {attribution:"© ..."});
  // app.exportGeoJSON();
</script>
```

Mã JS/CSS dự án này do VN phát triển thêm dựa trên API Leaflet; không sao chép mã nguồn Leaflet vào repository. Leaflet là thư viện độc lập BSD-2-Clause. Các mô-đun: pan/zoom chạm, lớp tile HTTPS, bật tắt lớp, nhập và xuất GeoJSON, đo khoảng cách gần đúng theo các đoạn nối, geolocation HTTPS, tỷ lệ xích, custom attribution cờ SVG. Không được thay thế hay loại bỏ attribution dữ liệu từ OSM và các nhà cung cấp khác. Nút định vị yêu cầu HTTPS và sự đồng ý của người dùng. Khoảng cách là chiều dài geodesic nối các điểm, không phải lộ trình đường bộ. Label vùng biển chỉ là chữ giao diện; dữ liệu địa lý thực cần nguồn GIS phù hợp.

## GitHub Pages

Truy cập Settings → Pages → Build and deployment → Source = Deploy from a branch → Branch = main → /(root) → Save. Nếu Pages đã hoạt động thì không thay đổi cấu hình. Địa chỉ dự kiến: https://xulytiengviet.github.io/VN/ .

Đối với sản phẩm dùng CDN, khóa phiên bản bằng commit hoặc tag thay vì @main.

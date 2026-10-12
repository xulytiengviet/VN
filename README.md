# Vietflexmap — WebGIS Việt Nam

Thư viện **vietflexmap@1.0.0** phân phối từ npm qua UNPKG, sử dụng **Leaflet 1.9.4**. Mã nguồn phát triển duy trì tại [xulytiengviet/VN](https://github.com/xulytiengviet/VN). Không tạo thêm thư viện CDN hoặc tên package khác.

## Sử dụng CDN

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<link rel="stylesheet" href="https://unpkg.com/vietflexmap@1.0.0/dist/vietflexmap.css">
<div class="vnmap-shell" style="height:600px"><div id="map" style="height:100%"></div></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/vietflexmap@1.0.0/dist/vietflexmap.js"></script>
<script>const app = VNMap.create("map");</script>
```

Ảnh cờ Việt Nam dạng SVG: https://unpkg.com/vietflexmap@1.0.0/assets/vietnam-flag.svg. Cờ không phụ thuộc font emoji. Attribution được đặt ở góc trái dưới, liên kết tới [© OpenStreetMap](https://www.openstreetmap.org/copyright) và giữ ghi công các nhà cung cấp dữ liệu bổ sung.

Những nhãn riêng hiển thị trên bản đồ: **Biển Đông**, **Qđ.Hoàng Sa (Việt Nam)** và **Qđ.Trường Sa (Việt Nam)**. Chúng là điểm neo nhãn tham khảo, không thay đổi đường biên, tile nền hoặc dữ liệu GIS lịch sử. Các công cụ đo, định vị và nhập/xuất GeoJSON tiếp tục thuộc API `VNMap.create`.

## Quy trình bảo trì

Các tệp nguồn `dist/vn-gis.*` và `dist/vn-map.*` tiếp tục được bảo quản trong repository. Các tệp gộp `dist/vietflexmap.js`, `dist/vietflexmap.css` và SVG được xuất bản theo version bất biến trên npm. Trang GitHub Pages sử dụng gói `vietflexmap@1.0.0` đã phát hành. Khi thay đổi mã, phải thử nghiệm và xuất bản phiên bản npm mới trước khi đổi CDN của trang; **không thể ghi đè 1.0.0**.

Giấy phép phần bổ sung MIT © 2026 Long Ngo; Leaflet BSD-2-Clause; OpenStreetMap và nguồn dữ liệu khác giữ quy định ghi công riêng.

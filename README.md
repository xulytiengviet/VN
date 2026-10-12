# Vietflexmap 1.0.1 — WebGIS Việt Nam

Trang demo: https://xulytiengviet.github.io/VN/ · Gói npm: https://www.npmjs.com/package/vietflexmap · Giấy phép MIT © 2026 Long Ngo.

## Tích hợp UNPKG (khóa phiên bản)

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
<link rel="stylesheet" href="https://unpkg.com/vietflexmap@1.0.1/dist/vietflexmap.css">
<div class="vnmap-shell" style="height:600px"><div id="map" style="height:100%"></div></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script src="https://unpkg.com/vietflexmap@1.0.1/dist/vietflexmap.js"></script>
<script>const app = VNMap.create("map");</script>
```

Ảnh quốc kỳ SVG: https://unpkg.com/vietflexmap@1.0.1/assets/vietnam-flag.svg. Bản `1.0.1` thay `1.0.0` bị lỗi mã hóa tiếng Việt. Tải Leaflet 1.9.4 trước khi tải Vietflexmap; một bản đồ chỉ cần một khởi tạo `VNMap.create`.

Bản đồ giữ công cụ GIS, lớp dữ liệu lịch sử và nhập/xuất GeoJSON. Nhãn hiển thị: **Biển Đông**, **Qđ.Hoàng Sa (Việt Nam)**, **Qđ.Trường Sa (Việt Nam)**; nhãn chỉ là lớp phủ tham khảo, không thay đổi đường biên, tile nền hay dữ liệu địa lý. Attribution © OpenStreetMap và các nguồn bổ sung phải được duy trì theo giấy phép.

## Bảo trì

Nguồn phát triển trong GitHub: `dist/vn-gis.*`, `dist/vn-map.*`, `assets/vn-flag.svg`. Gói `vietflexmap@1.0.1` là bản phát hành npm bất biến, được phân phối trên UNPKG. Khi thay đổi mã nguồn, xây dựng, kiểm thử và publish version mới rồi cập nhật URL đã khóa phiên bản; không ghi đè phiên bản cũ. Xem [hướng dẫn tích hợp](docs/INTEGRATION.md).

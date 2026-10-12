# VN GIS — SVG Flag CDN

Biểu tượng quốc kỳ Việt Nam bằng SVG, không phụ thuộc font emoji Windows/Chrome/Zalo.

## Tệp
- `assets/vn-flag.svg` — tài nguyên SVG độc lập.
- `dist/vn-gis.css` — CSS responsive.
- `dist/vn-gis.js` — UMD component, tự fallback sang SVG data URL nếu ảnh CDN lỗi.
- `index.html` — trang demo Leaflet, **không phải** bản đồ GIS đầy đủ của bất kỳ dự án nào.

## Tích hợp CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/dist/vn-gis.css">
<script src="https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/dist/vn-gis.js"></script>
```

Khi bản đồ Leaflet đã tồn tại:
```js
VNGIS.addToLeaflet(map);
```
Không xóa attribution cũ vì các nền bản đồ/nguồn dữ liệu khác có yêu cầu riêng. Nếu không dùng Leaflet:
```html
<div id="my-credit"></div>
<script>VNGIS.mount("#my-credit");</script>
```
API bổ sung: `VNGIS.flag()`, `VNGIS.credit()`, `VNGIS.labels()`.

URL ảnh: `https://cdn.jsdelivr.net/gh/xulytiengviet/VN@main/assets/vn-flag.svg`.

**Production:** đổi `@main` sang commit SHA hoặc tag bất biến để tránh CDN stale. Có thể dùng đường dẫn local làm nguồn ảnh, JS có fallback inline SVG khi ảnh từ CDN không tải được. Server phải cho phép tải SVG theo CSP `img-src`; script theo `script-src`.

## Lưu ý GIS
Thành phần UI chỉ hiển thị các nhãn chữ `Biển Đông`, `Qđ. Hoàng Sa (Việt Nam)`, `Qđ. Trường Sa (Việt Nam)`; **không tự nhận là dữ liệu địa lý có tọa độ**. Các nhãn không can thiệp bản đồ nền, PMTiles, GeoJSON, lịch sử, style hay georeferencing. Muốn hiển thị nhãn đúng vị trí thực tế cần lớp GIS dữ liệu đã được kiểm định. Bản đồ nền OSM có thể có nhãn gốc do nhà cung cấp tile tạo; mã này không chỉnh sửa ảnh tile.

## Pháp lý
Mã nguồn MIT © 2026 Long Ngo. Leaflet theo BSD-2-Clause; ghi công contributors OpenStreetMap và tuân thủ ODbL, tile usage policy. Không xóa các ghi công mà những lớp khác yêu cầu.

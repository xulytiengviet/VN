# Vietflexmap + Mapbasic2: hai nền bản đồ, không sửa npm 1.0.2

Trang [Vietflexmap](https://xulytiengviet.github.io/VN/) cung cấp hai lựa chọn:
- **Mapbasic2 · PMTiles / R2** (mặc định). Dữ liệu `basemap.pmtiles` được khai báo tại `https://pub-c4fd9d1f887041be97a2542a7664ff95.r2.dev/basemap.pmtiles`. Adapter `integration/mapbasic2-adapter.js` đọc trực tiếp gói PMTiles raster bằng thư viện pmtiles 4.5.0 rồi render trên Leaflet GridLayer.
- **OpenStreetMap** (tùy chọn). Chỉ tạo `L.tileLayer` đến `tile.openstreetmap.org` khi người dùng chủ động chọn OSM; vẫn phải tuân thủ chính sách tile.

## Kiến trúc

Giữ nguyên bản phát hành npm `vietflexmap@1.0.2` cùng lõi Leaflet, `VNGIS`, `VNMap`. Adapter dùng riêng API Leaflet, không gọi `VNMap.create()` cho nền Mapbasic2 vì API cũ sẽ tự yêu cầu OSM ngay từ đầu. Chuyển chế độ sẽ tạo lại đối tượng bản đồ Leaflet trên cùng container.

## Hạn chế / điều kiện

1. Đây là **nền Mapbasic2 raster PMTiles**, không phải nhúng cả giao diện MapLibre và tất cả lớp Mapbasic3/4/5 vào Vietflexmap.
2. Yêu cầu PMTiles v3 raster (PNG, JPEG hoặc WebP) và R2 hỗ trợ **HTTP Range**, **CORS** phù hợp cho nguồn trang `https://xulytiengviet.github.io`. Nếu bản lưu trên R2 là vector, cần adapter vector khác.
3. Tải trực tiếp HTML qua `file://` có thể bị R2 từ chối vì origin `null`; hãy thử HTTP localhost hoặc GitHub Pages.
4. Nếu Mapbasic2 không tải được, ứng dụng báo lỗi và cho chọn OSM; **không âm thầm tải OSM** khi đã chọn Mapbasic2, để không lặp lại HTTP 403.
5. Vì adapter chỉ ở repo GitHub Pages, muốn dùng ngoài trang demo cần nạp riêng file `integration/mapbasic2-adapter.js` và thư viện `pmtiles` khi chọn Mapbasic2.
6. Chức năng `VNMap.create` của npm 1.0.2 không bị chỉnh sửa. `window.vnMapApp` trong demo dùng đối tượng điều khiển adapter (gồm `map`, `mode`) thay vì bộ API nhập/xuất GeoJSON từ VNMap. Nếu tích hợp nghiệp vụ GeoJSON vào chế độ Mapbasic2 cần nối thêm feature layer riêng.

Mapbasic2: https://xulytiengviet.github.io/mapbasic2/

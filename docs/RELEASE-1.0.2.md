# Vietflexmap 1.0.2 — bản độc lập có Leaflet 1.9.4

**Trạng thái:** chuẩn bị mã nguồn; chỉ dùng CDN `1.0.2` sau khi `npm publish` thành công và cả JS/CSS/SVG đều truy cập được. GitHub Pages hiện tiếp tục dùng bản npm đang chạy cho đến khi phát hành.

## Xây dựng và kiểm thử tại Windows PowerShell

**Quan trọng:** chạy tại thư mục gốc `C:\\Users\\Admin\\Desktop\\VN`, **không dùng** thư mục `npm-release` của phiên bản 1.0.1.

```powershell
Set-Location "C:\\Users\\Admin\\Desktop\\VN"
git pull origin main
npm install
npm run build
npm run check
node --check .\\dist\\vietflexmap.js
npm pack --dry-run
```

Kiểm tra bản đồ thực tế trên trình duyệt trước khi publish. Nếu mọi thứ hoạt động:

```powershell
npm whoami
npm publish --access public
npm view vietflexmap@1.0.2 version
```

Sau khi xác minh UNPKG, chuyển trang GitHub Pages sang:

```html
<link rel="stylesheet" href="https://unpkg.com/vietflexmap@1.0.2/dist/vietflexmap.css">
<script src="https://unpkg.com/vietflexmap@1.0.2/dist/vietflexmap.js"></script>
<script>const app = VNMap.create("map");</script>
```

Không cần tải Leaflet riêng: `leaflet.js` và `leaflet.css` đã được ghép vào hai file trên. Các ảnh icon Leaflet được đóng gói tại `dist/images`; bản quyền Leaflet theo BSD-2-Clause được đính kèm. Giữ credit © OpenStreetMap contributors và mọi yêu cầu ghi công dữ liệu bản đồ. Các file nguồn `vn-gis.*` và `vn-map.*` vẫn tồn tại để bảo trì. Tránh dùng hai phiên bản Leaflet cùng lúc.

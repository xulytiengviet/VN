# Tích hợp Vietflexmap 1.0.2 qua UNPKG

Mẫu HTML đầy đủ bên dưới có thể lưu thành `index.html` và mở trong trình duyệt. **Vietflexmap 1.0.2 đã đóng gói Leaflet 1.9.4**, không nạp lại Leaflet độc lập.

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Vietflexmap · Ví dụ HTML</title>
  <link rel="stylesheet" href="https://unpkg.com/vietflexmap@1.0.2/dist/vietflexmap.css">
  <style>
    html,body{margin:0;width:100%;min-height:100%;font-family:system-ui,sans-serif}
    .vnmap-shell{height:600px;min-height:360px;position:relative}
    #map{height:100%;width:100%}
    #error{display:none;padding:12px;color:#9b1c1c;background:#fff1f1}
    @media(max-width:600px){.vnmap-shell{height:70vh;min-height:380px}}
  </style>
</head>
<body>
  <div class="vnmap-shell"><div id="map" aria-label="Bản đồ Việt Nam"></div></div>
  <p id="error" role="alert"></p>
  <script src="https://unpkg.com/vietflexmap@1.0.2/dist/vietflexmap.js"></script>
  <script>
    (function () {
      var message=document.getElementById("error");
      function fail(text) {message.textContent=text;message.style.display="block";}
      if (!window.L || !window.VNMap || typeof window.VNMap.create!=="function") {
        fail("Không tải được Vietflexmap 1.0.2. Vui lòng kiểm tra kết nối hoặc CDN.");
        return;
      }
      try {
        var app=window.VNMap.create("map");
        window.vnMapApp=app;
        // Ví dụ: app.addGeoJSON(yourFeatureCollection);
      } catch (err) {
        fail("Không thể khởi tạo bản đồ: "+err.message);
        console.error(err);
      }
    })();
  </script>
</body>
</html>
```

## Ghi chú sử dụng

- Chỉ tải một bản `vietflexmap.js` và `vietflexmap.css`, theo phiên bản cố định 1.0.2.
- Bảo đảm vùng `#map` có chiều cao thực tế; nếu thiếu, bản đồ có thể trắng dù JavaScript đã chạy.
- `VNMap.create("map")` chỉ gọi sau khi script được tải, và chỉ một lần trên mỗi container.
- Thư viện xuất `window.L`, `window.VNMap`, `window.VNGIS`. Không có biến toàn cục `VietflexMap` trong phiên bản này.
- Nếu chưa tải được CDN, mẫu sẽ hiển thị thông báo rõ ràng. Mẫu không thể thay thế việc kiểm tra mạng hoặc nguồn tile OpenStreetMap.
- SVG quốc kỳ: https://unpkg.com/vietflexmap@1.0.2/assets/vietnam-flag.svg.
- Giữ ghi công dữ liệu © OpenStreetMap contributors và các nguồn bổ sung; nhãn Biển Đông, Qđ.Hoàng Sa (Việt Nam) và Qđ.Trường Sa (Việt Nam) là lớp phủ của thư viện.
- API GIS vẫn có `addGeoJSON`, `loadFile`, `exportGeoJSON`, `clearData`, `addBaseLayer`, `setView`.

[Trang demo Vietflexmap](https://xulytiengviet.github.io/VN/) · [npm](https://www.npmjs.com/package/vietflexmap)

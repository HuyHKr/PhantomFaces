# Giới thiệu
  Phần mềm này là một ứng dụng được thiết kế để tải ảnh từ trang web https://this-person-does-not-exist.com/vi thông qua sử dụng Node.js.

# Hướng dẫn sử dụng
1. Đầu tiên, bạn cần [tải và cài đặt Node.js](https://nodejs.org/en/download) nếu chưa có.
2. Sau đó, tại mã nguồn, hãy mở cửa sổ cmd và chạy lệnh `npm i` để cài đặt các gói phụ thuộc.
3. Tiếp theo, vẫn tại cửa sổ cmd đó, chạy lệnh `node index.js` để khởi chạy ứng dụng.

# Giải thích
  1. Phần mềm này sử dụng thư viện `puppeteer`, một công cụ mạnh mẽ giúp kiểm soát trình duyệt Chromium thông qua Node.js. Puppeteer cho phép tự động hóa các tác vụ trình duyệt, từ việc điều khiển các sự kiện như nhấp chuột và nhập liệu đến việc chụp ảnh màn hình. Điều này tạo ra khả năng linh hoạt và tự động hóa mạnh mẽ.
  2. Sau khi sử dụng `puppeteer` để tương tác với trang web và lấy link của ảnh đã tạo, ứng dụng tiếp tục sử dụng thư viện `axios` để gửi yêu cầu đến đường dẫn nhận được.
  3. Cuối cùng, để lưu trữ ảnh thu được, phần mềm sử dụng thư viện `fs` để ghi ảnh vào thư mục `/destination/`. Điều này giúp tổ chức và quản lý ảnh một cách hiệu quả, tạo ra một bộ sưu tập tự động và liên tục.

> # Tham khảo
> Tham khảo từ cách làm của bạn  [Nông Đức Huy](https://github.com/DBCB11/Crawl_picture_project_1)
> 
> Tham khảo về thư viện `puppeteer` trên [Viblo_1](https://viblo.asia/p/nghich-ngom-voi-puppeteer-Qbq5Q3j4ZD8), [Viblo_2](https://viblo.asia/p/crawl-website-su-dung-nodejs-va-puppeteer-phan-1-L4x5xv2wZBM)

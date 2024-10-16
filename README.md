# Hướng dẫn

## Cài đặt

Tạo file `.env` và thay đổi các giá trị cho phù hợp giống file mẫu `.env.example`

Chỉnh sửa một số trường `.env` cho phù hợp với môi trường máy cá nhân

```bash
MONGODB_URI= Đường dẫn của MongoDB
PORT= Cổng của host
```

## Chạy dự án

```bash
npm i
npm start
```

Khi thành công sẽ thấy terminal/console hiển thị

```bash
Database connected 🚀
running on http://localhost:8000
```

## Kiểm tra lỗi

```bash
npm run lint:check
```

## Sửa lỗi

```bash
npm run lint:fix
```

### Quy ước viết code

-   Không dùng `var`
-   Không dùng `==`
-   Xóa `console.log` không cần thiết trước khi commit
-   Xóa `debugger` trước khi commit

### Quy ước đặt commit message

-   Commit message có dạng: `type(module/entity): message` hoặc `type: message`

---

-   `feat`: thêm một feature
-   `fix`: fix bug cho hệ thống, vá lỗi trong codebase
-   `refactor`: sửa code nhưng không fix bug cũng không thêm feature hoặc đôi khi bug cũng được fix từ việc refactor.
-   `docs`: thêm/thay đổi document
-   `chore`: những sửa đổi nhỏ nhặt không liên quan tới code
-   `style`: những thay đổi không làm thay đổi ý nghĩa của code như thay đổi css/ui chẳng hạn.
-   `perf`: code cải tiến về mặt hiệu năng xử lý
-   `vendor`: cập nhật version cho các dependencies, packages.

---

-   Ví dụ
    -   Chỉnh sửa: `refactor(auth): add hash password`
    -   Tính năng: `feat(auth): add google authentication`
    -   Fix bug: `fix: fix wrong otp`

## Quy trình làm việc

1. Tách nhánh từ `develop`

```bash
git checkout -b branchName
```

2. Sau khi code, thêm file muốn đẩy lên git vào staged

```bash
git add fileName
```

hoặc thêm tất cả file

```bash
git add .
```

3. Đặt commit message

```bash
git commit -m "feat(user): add user feature"
```

4. Đẩy code lên git

```bash
git push
```

Nếu push lần đầu thì sẽ có một command xuất hiện, sau đó copy command đó và chạy

```bash
git push --set-upstream origin <branch>
```

Khi tiếp tục code trên branch đã tách thì tiếp tục commit, push thì sẽ tự đồng bộ trên branch trên github và pull request

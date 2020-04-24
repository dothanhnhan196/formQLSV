function DanhSachNhanVien() {
    this.mangNhanVien = [];

    this.themNhanVien = function (nhanVien) {
        this.mangNhanVien.push(nhanVien)
    }

    this.timViTri = function (maNV) {
        var viTri = -1;
        this.mangNhanVien.map(function (item, index) {
            if (maNV === item.maNV) {
                viTri = index;
            }
        })
        return viTri;
    }

    this.xoaNhanVien = function (maNV) {
        /*
            1: tạo 1 biến viTri = -1;
            2: duyệt mảng
            3: nếu MaNV === item.index
            4: thì  viTri = index
            5: array.splice(vitri, 1)
         */

        var viTri = this.timViTri(maNV);
        if (viTri !== -1) {
            this.mangNhanVien.splice(viTri, 1);
        }
    }
}

DanhSachNhanVien.prototype.layThongTinNguoiDung = function (maNV) {
    var viTri = this.timViTri(maNV);
    return this.mangNhanVien[viTri];
}

DanhSachNhanVien.prototype.capNhatNhanVien = function (nhanVien) {
    var viTri = this.timViTri(nhanVien.maNV);
    if (viTri !== -1) {
        this.mangNhanVien[viTri] = nhanVien;
    }
}

DanhSachNhanVien.prototype.timNhanVien = function (chuoiTimKiem) {
    /*
        1: tạo mangTimKiem = [];
        2: duyệt mangNhanVien
        3: nếu tham số chuoiTimKiem tồn tại trong mảng
        4: mangTimKiem.push nhân viên được tìm thấy
        5: return mangTimKiem
    */

    var mangTimKiem = [];
    this.mangNhanVien.map(function (item) {
        // thay 3 dấu === bằng hàm indexOf của javascript
        if (item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1) {
            mangTimKiem.push(item);
        }
    })
    return mangTimKiem;
}
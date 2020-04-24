var danhSachNhanVien = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

// Ẩn nút cập nhật trong modal khi người dùng chưa nhập gì
getEle("btnThem").addEventListener("click", function () {
    getEle("btnCapNhat").style.display = 'none';
    getEle("btnThemNV").style.display = "block";

    getEle("msnv").removeAttribute("disabled")
})

getEle("btnThemNV").addEventListener("click", function () {
    var maNV = getEle("msnv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;


    var isValid = true;

    /* maNV */
    isValid &=
        validation.kiemTraRong(
            maNV,
            'tbMaNV',
            '(*) Mã nhân viên không được bỏ trống'
        )
        &&
        validation.kiemTranTrungMaNV(
            maNV,
            "tbMaNV",
            "(*) Mã nhân viên không được trùng",
            danhSachNhanVien.mangNhanVien
        );

    /* hoTen */
    isValid &=
        validation.kiemTraRong(
            hoTen,
            'tbTen',
            '(*) Họ tên hông được để trống'
        )
        &&
        validation.kiemTraChuoi(
            hoTen,
            'tbTen',
            '(*) Họ tên không hợp lệ'
        );

    /* email */
    isValid &=
        validation.kiemTraRong(
            email,
            'tbEmail',
            '(*) Email không được bỏ trống'
        )
        &&
        validation.checkMail(
            email,
            'tbEmail',
            '(*) email không hợp lệ'
        );

    /*password*/
    isValid &=
        validation.kiemTraRong(
            password,
            "tbMatKhau",
            "(*) Password không được để rỗng"
        )
        &&
        validation.kiemTraDoDaiKiTu(
            password,
            "tbMatKhau",
            "(*) Password phải từ 6-12 kí tự",
            6,
            12
        );
    /*chucVu*/
    isValid &=
        validation.kiemTraChucVu(
            "chucvu",
            "tbChucVu",
            "(*) Vui lòng chọn chức vụ"
        );

    if (isValid) {
        var nhanVien = new NhanVien(maNV, hoTen, email, password, date, chucVu);
        danhSachNhanVien.themNhanVien(nhanVien)
        taoBang();
        setLocalStorage();
    }
})

// tìm kiếm nhân viên
getEle("searchName").addEventListener("keyup", function () {
    var chuoiTimKiem = getEle("searchName").value;
    var mangTimKiem = danhSachNhanVien.timNhanVien(chuoiTimKiem);
    taoBang(mangTimKiem);
})

// xóa nhân viên
function xoaNhanVien(maNV) {
    danhSachNhanVien.xoaNhanVien(maNV);
    taoBang();
    setLocalStorage();
}

// sửa nhân viên
function suaNhanVien(maNV) {
    getEle("btnThemNV").style.display = 'none';
    getEle("btnCapNhat").style.display = 'block';

    var nhanVien = danhSachNhanVien.layThongTinNguoiDung(maNV);

    getEle("msnv").value = nhanVien.maNV;
    getEle("msnv").setAttribute("disabled", true);
    getEle("name").value = nhanVien.hoTen;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.password;
    getEle("datepicker").value = nhanVien.date;
    getEle("chucvu").value = nhanVien.chucVu;
}

// cập nhật nhân viên
getEle("btnCapNhat").addEventListener("click", function () {
    var maNV = getEle("msnv").value;
    var hoTen = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;

    var nhanVien = new NhanVien(maNV, hoTen, email, password, date, chucVu);
    danhSachNhanVien.capNhatNhanVien(nhanVien);
    taoBang();
    setLocalStorage();
})

function taoBang(mang = danhSachNhanVien.mangNhanVien) {
    var tbody = getEle("tableDanhSach");
    var content = '';
    mang.map(function (item, index) {
        content += `
            <tr>
                <td>${item.maNV}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.date}</td>
                <td>${item.chucVu}</td>
                <td>
                <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${item.maNV}')">Sửa</button>
                <button class="btn btn-danger" onclick="xoaNhanVien('${item.maNV}')">Xóa</button>
                </td>
            <tr>
        `;
    })
    tbody.innerHTML = content;
}

// lưu mảng xuống localStorage
function setLocalStorage() {
    // khi lưu xuống locostorage chuyển data thàng string
    localStorage.setItem(
        "DanhSachNhanVien",
        JSON.stringify(danhSachNhanVien.mangNhanVien)
    );
}

// lấy mảng từ localStorage
function getLocalStorage() {
    // khi lấy localStorage lên để sử dụng chuyển thành JSON
    if (localStorage.getItem("DanhSachNhanVien")) {
        danhSachNhanVien.mangNhanVien = JSON.parse(localStorage.getItem("DanhSachNhanVien"))
    };
    taoBang();
}

function getEle(id) {
    return document.getElementById(id);
}
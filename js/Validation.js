function Validation() {

    this.kiemTraRong = function (input, spanID, message) {
        if (input === '') {
            getEle(spanID).style.display = 'block';
            getEle(spanID).innerHTML = message;
            return false;
        }
        getEle(spanID).style.display = 'none';
        getEle(spanID).innerHTML = '';
        return true;
    };

    this.kiemTranTrungMaNV = function (input, spanID, message, mangNhanVien) {
        /*
            1: duyệt mảng
            2: so sánh input có trùng MaNV trong mảng không
            3: nếu như input trùng MaNV trong mảng => return false
            4: ngược lại => return true
        */

        var check = mangNhanVien.some(function (item) {
            return input === item.maNV;
        })

        if (check) {
            getEle(spanID).style.display = 'block';
            getEle(spanID).innerHTML = message;
            return false;
        }

        getEle(spanID).style.display = 'none';
        getEle(spanID).innerHTML = "";
        return true;
    }

    this.kiemTraChuoi = function (input, spanID, message) {
        var patter = new RegExp(
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        )
        if (patter.test(input)) {
            // hợp lệ
            getEle(spanID).style = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        } else {
            // không hợp lệ
            getEle(spanID).style.display = 'block';
            getEle(spanID).innerHTML = message
            return false;
        }
    }

    this.checkMail = function (input, spanID, message) {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (input.match(mailFormat)) {
            // hợp lệ
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }
        // không hợp lệ
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = message;
        return false;
    }

    this.kiemTraDoDaiKiTu = function (input, spanID, message, min, max) {
        if (input.length >= min && input.length <= max) {
            // hơp lệ
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }
        // không hợp lệ
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = message;
    }

    this.kiemTraChucVu = function (id, spanID, message) {
        if (getEle(id).selectedIndex !== 0) {
            // hợp lệ
            getEle(spanID).style.display = 'none';
            getEle(spanID).innerHTML = '';
            return true;
        }
        // không hợp lệ
        getEle(spanID).style.display = 'block';
        getEle(spanID).innerHTML = message;
        return false;
    }
}

function getEle(id) {
    return document.getElementById(id)
}
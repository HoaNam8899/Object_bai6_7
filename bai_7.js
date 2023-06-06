class Book{
    constructor(id, name, price, author, status){
        this.id = id;
        this.name = name;
        this.price = price;
        this.author = author;
        this.status = status;
    }
}

//tạo mảng lưu sách
let books = [];

function ShowBook(data) {
    // tạo chuổi rỗng để inner html => dùng for...of để duyệt mảng, gán vào html các giá trị trong mảng => lấy id nơi cần inner, innerHTML
    let row = '';
    for(let item of data){
        row +=`
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.author}</td>
                    <td>${item.status ? '<span class="product"> còn hàng </span>' : '<span class="re-product"> hết hàng </span>'}</td>
                    <td>
                        <button type="button" class="btn btn-warning" onclick="bookUpdate('${item.id}')">Sửa</button>
                        <button type="button" class="btn btn-danger" onclick="bookDelete('${item.id}')">Xóa</button>
                    </td>
                </tr>
        `;  
    }
    document.getElementById('list').innerHTML = row;
}

function createBook() {
    // tạo ra book mới => kiểm tra xem có tồn tại id hay chưa => lưu vào mảng => gọi hàm hiển thị
    let newBook = getInfo();
    if(books.find( x => x.id === newBook.id)){
        alert('mã này đã tồn tại');
        return;
    }
    books.push(newBook);
    ShowBook(books);
    
}

function getInfo() {
    // lấy value của id => tạo book và return 
    let bookId = document.getElementById('bookId').value;
    let bookName = document.getElementById('bookName').value;
    let bookPrice = document.getElementById('bookPrice').value;
    let bookAuthor = document.getElementById('bookAuthor').value;
    let bookStatus = document.getElementById('bookStatus').checked;

    let book = new Book(bookId, bookName, bookPrice, bookAuthor, bookStatus)
    return book;
}

// nút sửa, 
// thêm onclick vào nút sửa, truyền vào luôn cả id

function bookUpdate(bookId) {

    // có đối số là id của sách được bấm nút
    // tìm trong books id đó sau đó trả về sách có id đó
    // lấy các giá trị gán lại cho form
    let b = books.find(x => x.id === bookId);

    document.getElementById('bookId').value = b.id;
    document.getElementById('bookId').disabled = true;
    document.getElementById('bookName').value = b.name;
    document.getElementById('bookPrice').value = b.price;
    document.getElementById('bookAuthor').value = b.author;
    document.getElementById('bookStatus').checked = b.status;
}

function bookSave() {
    // lấy thông tin băng hàm getInfo()
    // kiểm tra id trong books
    // gán lại cho books thông tin vừa lấy
    // in lại ra table
    let newBook = getInfo();

    let b = books.find( x => x.id == newBook.id)

    b.id = newBook.id;
    b.name = newBook.name;
    b.price = newBook.price;
    b.author = newBook.author;
    b.status = newBook.status;

    ShowBook(books);
    document.getElementById('bookId').disabled = false;
}

// xoa
function bookDelete(bookId) {
    if(confirm('bạn có muốn xóa')){
        let a = books.findIndex( x => x.id == bookId);
        books.splice(a, 1);
    }
    ShowBook(books);
}

function sortedBook(event) {
    // select onchange="change(event)"
    //lay gia tri của select: let a = event.target.value;
    // lấy giá trị của select
    // tạo mảng result để lưu kết quả và in ra table
    // result = [...books] copy books qua result roi sort
    // b1 - b2 tang dan
    // b2 - b1 giam dan

    let sort = event.target.value;
    let result = [];
    if (sort == 'asc'){
        result = [...books].sort((b1, b2) => b1.price - b2.price);
    } else if (sort == 'desc') {
        result = [...books].sort((b1, b2) => b2.price - b1.price);
    } else {
        result = [...books]
    }

    ShowBook(result);


}



function searchBook(event) {
    // onkeyup nhap vao thi lay luôn gia tri
    let key = event.target.value.toLocaleLowerCase();
    let result = [];
    //dùng filter
    result = [...books].filter( x => x.name.toLocaleLowerCase().indexOf(key) >= 0);
    ShowBook(result);


}
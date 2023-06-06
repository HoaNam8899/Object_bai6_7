class Book{
    constructor(id, name, price, author, status){
        this.id = id;
        this.name = name;
        this.price = price;
        this.author = author;
        this.status = status;
    }
    inputData() {
        this.id = prompt('nhap id');
        this.name = prompt('nhap ten');
        this.price = prompt('nhap gia');
        this.author = prompt('nhap tac gia');
        this.status = prompt('trang thai true/false');
    }
    displayData() {
        console.log('id: '+ this.id);
        console.log('name: '+ this.name);
        console.log('price: '+ this.price);
        console.log('author: '+ this.author);
        console.log('status: '+ this.status);
    }


}
let newBook = new Book();
newBook.inputData();
newBook.displayData();
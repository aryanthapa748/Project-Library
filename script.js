const body = document.querySelector("body");
const addBookBtn = document.querySelector(".addBookBtn");
const cards = document.querySelector(".cards");
const dialogBox = document.querySelector(".dialogBox");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const checkBox = document.querySelector("#checkbox");
const submitBtn = document.querySelector("#submit");

let myLibrary = [];

// Book Object 

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//Toggle button for Read/Unread

Book.prototype.status = function(){
    this.read = !this.read;
}

//function to add new books

function addBookToLibrary(){
    let bookTitle = title.value;
    let bookAuthor = author.value;
    let bookPages = pages.value;
    let bookRead = checkBox.checked;

    myLibrary.push(new Book(bookTitle, bookAuthor, bookPages, bookRead));
    displayLibrary();
}

// function to display books on page

function displayLibrary(){
    cards.innerHTML = "";
    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        cards.appendChild(card);
        card.innerHTML = `
        <p>Title - ${book.title}</p>
        <p>Author - ${book.author}</p>
        <p>Number of Pages - ${book.pages}</p>
        <div class="card-buttons">
        <button class=${book.read ? 'card-green' : 'card-red'} onclick="changeStatus(${index})">${book.read ? 'Unread' : 'Read'}</button>
        <button class="remove-btn" onclick="removeBook(${index})">Remove</button>
        </div>`;
    });
}

// Function to remove book

function removeBook(index){
    myLibrary.splice(index, 1);
    displayLibrary();
}

function changeStatus(index){
    myLibrary[index].status();
    displayLibrary();
}

//dialog pop up for adding new books

addBookBtn.addEventListener("click", ()=>{
    dialogBox.showModal();
});

//submit button events

submitBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    addBookToLibrary();
    dialogBox.close();
    title.value = "";
    author.value = "";
    pages.value = "";
    checkBox.checked = false;
});

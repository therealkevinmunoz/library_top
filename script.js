'use strict';

let addBookButton = document.getElementById("cta-button");
let addBookFormButton = document.getElementById("form-submit-button");
let bookModal = document.getElementsByClassName("form-modal-outer")[0];
let newBookForm = document.forms['new-book-form'];

newBookForm.addEventListener('submit', function(e)
{
    e.preventDefault();
    hideModal();
})

addBookButton.addEventListener('click', function()
{
    showModal();
});

function showModal()
{
    bookModal.style.display = "block";
}

function hideModal() 
{
    bookModal.style.display = "none";
}


function Book(title, author, pages, isRead)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

}

let mainHTML = document.getElementsByTagName("main")[0];

Book.prototype.addBook = function()
{
    let newCard = document.createElement('div');
    newCard.classList.add('card-container');
    
    newCard.innerHTML = 
        `<p class="book-name">${this.title}</p>
        <p class="book-author">${this.author}</p>
        <p class="book-pages-container"><span class="book-pages">${this.pages}</span> pages</p>
        <label for="read-status">Read</label>
        <label class="toggle">
                <input type="checkbox" id="read-status">
                <span class="toggle-control"></span>
        </label>
        <button class="cta-secondary">Remove</button>`;

    mainHTML.appendChild(newCard);

    return true;
}

newBookForm.addEventListener('submit', function()
{
    let newTitle = document.getElementById('book-title').value;
    let newAuthor = document.getElementById('book-author').value;
    let newPages = document.getElementById('book-pages').value;
    let newReadStatus = document.getElementById('book-read').checked;

    let newBook = new Book(newTitle, newAuthor, newPages, newReadStatus);

    console.log(newBook);

    newBook.addBook();
})
'use strict';

let BOOKS = new Array(); 

window.addEventListener('load', function()
{
    removeBookFunctionality();
    changeToggleFunctionality()
})

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
    newCard.setAttribute('data-index-number', `${BOOKS.length}`);

    if(this.isRead === true)
    {
        newCard.innerHTML = 
        `<p class="book-name">${this.title}</p>
        <p class="book-author">${this.author}</p>
        <p class="book-pages-container"><span class="book-pages">${this.pages}</span> pages</p>
        <label for="read-status">Read</label>
        <label class="toggle">
                <input type="checkbox" id="read-status">
                <span class="toggle-control read-true"></span>
        </label>
        <button class="cta-secondary">Remove</button>`;
    }
    else if(this.isRead === false)
    {
        newCard.innerHTML = 
        `<p class="book-name">${this.title}</p>
        <p class="book-author">${this.author}</p>
        <p class="book-pages-container"><span class="book-pages">${this.pages}</span> pages</p>
        <label for="read-status">Read</label>
        <label class="toggle">
                <input type="checkbox" id="read-status">
                <span class="toggle-control read-false"></span>
        </label>
        <button class="cta-secondary">Remove</button>`;

    }

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
    BOOKS.push(newBook);
    console.log(BOOKS);
    removeBookFunctionality();
    changeToggleFunctionality();
})



function removeBookFunctionality()
{
    let removeBookHTML = document.querySelectorAll(".cta-secondary");

    for(let i = 0; i < removeBookHTML.length; i ++)
    {
        removeBookHTML[i].addEventListener('click', function(e)
        {
            let cardContainerHMTL = e.target.parentElement;

            let indexNumber = cardContainerHMTL.getAttribute('data-index-number');

            BOOKS[indexNumber] = undefined;

            console.log(BOOKS);

            cardContainerHMTL.remove();
        })
    }
    
}



function changeToggleFunctionality()
{
    let toggleHTML = document.querySelectorAll(".toggle-control");

    for(let i = 0; i < toggleHTML.length; i ++)
    {
        toggleHTML[i].addEventListener('click', function(e)
        {
            if(e.target.classList.contains('read-true'))
            {
                e.target.classList.remove('read-true');
                e.target.classList.add('read-false');

                BOOKS[e.target.closest('.card-container').getAttribute('data-index-number')].isRead = false;

                console.log(BOOKS[e.target.closest('.card-container').getAttribute('data-index-number')]);
            }
            else if(e.target.classList.contains('read-false'))
            {
                e.target.classList.remove('read-false');
                e.target.classList.add('read-true');

                BOOKS[e.target.closest('.card-container').getAttribute('data-index-number')].isRead = true;

                console.log(BOOKS[e.target.closest('.card-container').getAttribute('data-index-number')]);
            }
        })
    }

    
}

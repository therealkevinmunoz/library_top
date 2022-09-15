'use strict';

let mainHTML = document.getElementsByTagName("main")[0];
let BOOKS = new Array(); 

const BookForm = function()
{
    
    let addBookButton = document.getElementById("cta-button");
    let bookModal = document.getElementsByClassName("form-modal-outer")[0];
    let newBookForm = document.forms['new-book-form'];

    const bindEvents = function()
    {
        newBookForm.addEventListener('submit', function(e)
        {
            e.preventDefault();
           

            let newTitle = document.getElementById('book-title').value;
            let newAuthor = document.getElementById('book-author').value;
            let newPages = document.getElementById('book-pages').value;
            let newReadStatus = document.getElementById('book-read').checked;

            const newBook = new Book(newTitle, newAuthor, newPages, newReadStatus);
            console.log(newBook);

            newBook.addBook();
            BOOKS.push(newBook);
            console.log(BOOKS);
            newBook.removeBookFunctionality();
            newBook.changeToggleFunctionality();

            /* Hide the current form screen*/
            hideModal();
        });
    
        addBookButton.addEventListener('click', function()
        {
            showModal();
        });
    }

    const showModal = function()
    {
        bookModal.style.display = "block";
    }

    const hideModal = function() 
    {
        bookModal.style.display = "none";
    }

    bindEvents();

}();

/* Book class to store book object properties and methods */
class Book 
{
    constructor(title, author, pages, isRead)
    {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;

    }

    get bookArray()
    {
        return this.BOOKS;
    }
    
    /* Creates book tab on the UI */
    addBook()
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

    removeBookFunctionality()
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

    changeToggleFunctionality()
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
                }
                else if(e.target.classList.contains('read-false'))
                {
                    e.target.classList.remove('read-false');
                    e.target.classList.add('read-true');
    
                    BOOKS[e.target.closest('.card-container').getAttribute('data-index-number')].isRead = true;
                }
    
                console.log(BOOKS[e.target.closest('.card-container').getAttribute('data-index-number')]);
            })
        } 
    }
    
}
















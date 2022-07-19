'use strict';

let addBookButton = document.getElementById("cta-button");
let addBookFormButton = document.getElementById("form-submit-button");
let bookModal = document.getElementsByClassName("form-modal-outer")[0];

addBookButton.addEventListener('click', function()
{
    showModal();
});

addBookFormButton.addEventListener('click', function()
{
    hideModal();
})

function showModal()
{
    bookModal.style.display = "block";
}

function hideModal() 
{
    bookModal.style.display = "hidden";
}
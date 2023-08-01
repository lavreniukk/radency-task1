import createElement from "../../helpers/domOperations.js";
import categories from "../../../constants/noteCategories.js";
import showModal from "./modal.js";
import { submitNewNote, updateNote } from "../noteService.js";

export function createNewNoteButton() {
    const newNoteBtn = createElement({htmlTag: 'button', className: 'notes__button'});
    newNoteBtn.innerText = 'Create Note';
    newNoteBtn.addEventListener('click', showNewNoteModal);

    return newNoteBtn;
}

export function showUpdateNoteModal(note) {
    const formElement = createElement({ htmlTag: 'form', className: 'modal__form'});
    let innerForm = `<label for="name"> Name: </label>
                        <input id="name" name="name" type="text" value="${note.name}">
                        <label for="category"> Category: </label>
                        <select id="category" name="category">`;

    Object.values(categories).map((category) => {
        if (note.category === category) {
            innerForm += `<option value='${category}' selected="selected">${category}</option>`;
        } else {
            innerForm += `<option value='${category}'>${category}</option>`;
        }
    });        
    innerForm += `</select>
                    <label for="content">Content</label>
                    <textarea id="content" name="content" rows="5" cols="33">${note.content}</textarea>`;

    const updateBtn = createElement({ htmlTag: 'button'});
    updateBtn.type = 'button';
    updateBtn.innerText = 'Update note'
    updateBtn.addEventListener('click', () => updateNote(note._id));

    formElement.id = 'update-note';
    formElement.insertAdjacentHTML('beforeend', innerForm);
    formElement.appendChild(updateBtn);

    showModal({ title: 'New note', bodyElement: formElement});
}

export function showNewNoteModal() {
    const formElement = createElement({ htmlTag: 'form', className: 'modal__form'});
    let innerForm = `<label for="name"> Name: </label>
                        <input id="name" name="name" type="text">
                        <label for="category"> Category: </label>
                        <select id="category" name="category">`;

    Object.values(categories).map((category) => {
        innerForm += `<option value='${category}'>${category}</option>`;
    });         

    innerForm += `</select>
                    <label for="content">Content</label>
                    <textarea id="content" name="content" rows="5" cols="33"></textarea>
                <button type="submit" form="add-note">Add new note</button>`;
    formElement.id = "add-note";
    formElement.insertAdjacentHTML('beforeend', innerForm);
    formElement.addEventListener('submit', submitNewNote);

    showModal({ title: 'New note', bodyElement: formElement });
}
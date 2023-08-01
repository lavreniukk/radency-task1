import createElement from "../../helpers/domOperations.js";
import categories from "../../../constants/noteCategories.js";
import showModal from "./modal.js";
import { addNote, updateNote, notesLocal } from "../noteService.js";
import { updateMainTable } from "../mainTable.js";
import { updateSummaryTable } from "../summaryTable.js";
import extractDateFromContent from '../../helpers/extractDate.js';

export function createNewNoteButton() {
    const newNoteBtn = createElement({htmlTag: 'button', className: 'notes__button'});
    newNoteBtn.innerText = 'Create Note';
    newNoteBtn.addEventListener('click', showNewNoteModal);

    return newNoteBtn;
}

export function showUpdateNoteModal(note) {
    const formElement = createElement({ htmlTag: 'form', className: 'modal__form'});
    let innerForm = `<label class="modal__form_label" for="name"> Name: </label>
                        <input class="modal__form_input" id="name" name="name" type="text" value="${note.name}">
                        <label class="modal__form_label" for="category"> Category: </label>
                        <select class="modal__form_input" id="category" name="category">`;

    Object.values(categories).map((category) => {
        if (note.category === category) {
            innerForm += `<option value='${category}' selected="selected">${category}</option>`;
        } else {
            innerForm += `<option value='${category}'>${category}</option>`;
        }
    });        
    innerForm += `</select>
                    <label class="modal__form_label" for="content">Content</label>
                    <textarea class="modal__form_input" id="content" name="content" rows="5" cols="33">${note.content}</textarea>`;

    const updateBtn = createElement({ htmlTag: 'button'});
    updateBtn.type = 'button';
    updateBtn.innerText = 'Update note'
    updateBtn.addEventListener('click', () => { 
        updateNote(note._id)
        updateMainTable();
        updateSummaryTable();
    });

    formElement.id = 'update-note';
    formElement.insertAdjacentHTML('beforeend', innerForm);
    formElement.appendChild(updateBtn);

    showModal({ title: 'Update note', bodyElement: formElement});
}

function submitNewNote(e) {
    e.preventDefault();

    const form = document.querySelector('form#add-note');
    const newNote = {
        _id: notesLocal.length !== 0 ? notesLocal[notesLocal.length - 1]._id + 1 : 1,
        name: form.name.value,
        created: new Date().toISOString(),
        category: form.category.value,
        content: form.content.value,
        dates: extractDateFromContent(form.content.value),
        isArchived: false
    }

    addNote(newNote);
    updateMainTable();
    updateSummaryTable();
}

export function showNewNoteModal() {
    const formElement = createElement({ htmlTag: 'form', className: 'modal__form'});
    let innerForm = `<label class="modal__form_label" for="name"> Name: </label>
                        <input class="modal__form_input" id="name" name="name" type="text">
                        <label class="modal__form_label" for="category"> Category: </label>
                        <select class="modal__form_input" id="category" name="category">`;

    Object.values(categories).map((category) => {
        innerForm += `<option value='${category}'>${category}</option>`;
    });         

    innerForm += `</select>
                    <label class="modal__form_label" for="content">Content</label>
                    <textarea class="modal__form_input" id="content" name="content" rows="5" cols="33"></textarea>
                <button class="modal__form_btn" type="submit" form="add-note">Add new note</button>`;
    formElement.id = "add-note";
    formElement.insertAdjacentHTML('beforeend', innerForm);
    formElement.addEventListener('submit', submitNewNote);

    showModal({ title: 'New note', bodyElement: formElement });
}

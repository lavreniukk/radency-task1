import createElement from "../../helpers/domOperations.js";
import categories from "../../../constants/noteCategories.js";
import showModal from "./modal.js";
import { submitNewNote } from "../noteOperations.js";

export function createNewNoteButton() {
    const newNoteBtn = createElement({htmlTag: 'button', className: 'notes__button'});
    newNoteBtn.innerText = 'Create Note';
    newNoteBtn.addEventListener('click', showNewNoteModal);

    return newNoteBtn;
}

export function showNewNoteModal(onClose) {
    const formElement = createElement({ htmlTag: 'form', className: 'modal__form'});
    const innerForm = `<label for="name"> Name: </label>
                        <input id="name" name="name" type="text">
                        <label for="category"> Category: </label>
                        <select id="category" name="category">
                            <option value="${categories.IdeaCategory}">${categories.IdeaCategory}</option>
                            <option value="${categories.TaskCategory}">${categories.TaskCategory}</option>
                            <option value="${categories.ThoughtCategory}">${categories.ThoughtCategory}</option>
                        </select>
                        <label for="content">Content</label>
                        <textarea id="content" name="content" rows="5" cols="33">
                        </textarea>
                        <button type="submit" form="add-note">Add new note</button>`;

    formElement.id = "add-note";
    formElement.insertAdjacentHTML('beforeend', innerForm);
    formElement.addEventListener('submit', submitNewNote);

    showModal({ title: 'New note', bodyElement: formElement, onClsoe: onClose});
}
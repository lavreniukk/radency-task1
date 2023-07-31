//import { notes } from '../helpers/mockData.js';
import createElement from '../helpers/domOperations.js';
import showNewNoteModal from './modal/newNoteModal.js';

// let notesLocal = notes;

// function createNote() {
//     notesLocal.push();
// }

export default function createNewNoteButton() {
    const newNoteBtn = createElement({htmlTag: 'button', className: 'notes__button'});
    newNoteBtn.innerText = 'Create Note';
    newNoteBtn.addEventListener('click', showNewNoteModal);

    return newNoteBtn;
}
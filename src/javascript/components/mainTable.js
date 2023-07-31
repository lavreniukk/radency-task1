import createElement from '../helpers/domOperations.js';
import convertISOtoDate from '../helpers/convertISOtoDate.js';
import note from '../../constants/noteFields.js';
import { showUpdateNoteModal } from './modals/noteModal.js';
import { getNote } from './noteService.js';

function createHeader() {
    let headerRow = '<tr>';

    Object.keys(note).map((key) => {
        if (key === 'isArchived' || key === '_id') {
            return;
        }
        const th = `<th>${key}</th>`;
        headerRow += th;
    });

    headerRow += `<th>
        <i class="fa-solid fa-box-archive"></i>
        <i class="fa-solid fa-trash"></i>
    </th>
    </tr>`;
    return headerRow;
}

function createBody(notes) {
    let bodyString = '';

    notes.map((note) => {
        if (note.isArchived) {
            return;
        }
        bodyString += createNote(note);
    });

    return bodyString;
}

function createNote(note) {
    let noteElement = `<tr data-id='${note._id}'>`;

    Object.keys(note).map((key) => {
        if (key === 'isArchived' || key === '_id') {
            return;
        }

        if (key === 'created') {
            noteElement += `<td >${convertISOtoDate(note[key])}</td>`;
        } else {
            noteElement += `<td >${note[key]}</td>`;
        }
    });

    noteElement += `<td>
        <i class="fa-solid fa-pencil update-btn"></i>
        <i class="fa-solid fa-box-archive archive-btn"></i>
        <i class="fa-solid fa-trash delete-btn"></i></td>
    </tr>`;
    return noteElement;
}

function handleButtonsClick(e) {
    const targetButton = e.target;

    if (targetButton.classList.contains('update-btn')) {
        const targetRow = targetButton.parentNode.parentNode;
        const targetNote = getNote(targetRow.dataset.id);
        console.log(targetNote);
        showUpdateNoteModal(targetNote);
    } else if (targetButton.classList.contains('archive-btn')) {
        const targetRow = targetButton.parentNode.parentNode;
        console.log(targetRow);
    } else if (targetButton.classList.contains('delete-btn')) {
        const targetRow = targetButton.parentNode.parentNode;
        console.log(targetRow);
    }
}

export default function createMainTable(notes) {
    const container = createElement({ htmlTag: 'div', className: 'notes__root'});
    const table = createElement({ htmlTag: 'table', className: 'notes__table'});
    const tableHead = createElement({ htmlTag: 'thead', className: 'notes__table_header'});
    const tableBody = createElement({ htmlTag: 'tbody', className: 'notes__table_body'});

    tableHead.insertAdjacentHTML('beforeend', createHeader(notes[0]));
    tableBody.insertAdjacentHTML('beforeend', createBody(notes));
    tableBody.addEventListener('click', handleButtonsClick);
    table.append(tableHead, tableBody);
    container.append(table);

    return container;
}
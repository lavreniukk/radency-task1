import createElement from '../helpers/domOperations.js';
import convertISOtoDate from '../helpers/convertISOtoDate.js';
import note from '../../constants/noteFields.js';
import { showUpdateNoteModal } from './modals/noteModal.js';
import { archiveNote, deleteNote, getNote, notesLocal } from './noteService.js';
import { archiveAll, deleteAll } from './noteService.js';
import { updateSummaryTable } from './summaryTable.js';
import { showArchived } from './archive.js';
import categories from '../../constants/noteCategories.js';

function createHeader() {
    let headerRow = '<tr class="table_row"><th class="table_header_cell"></th>';

    Object.keys(note).map((key) => {
        if (key === 'isArchived' || key === '_id') {
            return;
        }
        headerRow += `<th class="table_header_cell">${key}</th>`;
    });

    headerRow += `</tr>`;

    return headerRow;
}

function createBody(notes, showArchived) {
    let bodyString = '';

    let filteredNotes;
    if (showArchived) {
        filteredNotes = notes.filter((note) => note.isArchived);
    } else {
        filteredNotes = notes.filter((note) => !note.isArchived);
    }

    filteredNotes.map((note) => {
        bodyString += createNote(note);
    });

    return bodyString;
}

function createNote(note) {
    let noteElement = `<tr class="table_row" data-id='${note._id}'>`;

    switch (note.category) {
        case categories.TaskCategory:
            noteElement += '<td class="table_body_cell"><div class="table_body_icon"><i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></div></td>';
            break;
        case categories.IdeaCategory:
            noteElement += '<td class="table_body_cell"><div class="table_body_icon"><i class="fa-solid fa-lightbulb" style="color: #ffffff;"></i></div></td>';
            break;
        case categories.ThoughtCategory:
            noteElement += '<td class="table_body_cell"><div class="table_body_icon"><i class="fa-solid fa-head-side-virus" style="color: #ffffff;"></i></div></td>';
            break;
    }

    Object.keys(note).map((key) => {
        if (key === 'isArchived' || key === '_id') {
            return;
        }

        if (key === 'created') {
            noteElement += `<td class="table_body_cell">${convertISOtoDate(note[key])}</td>`;
        } else {
            noteElement += `<td class="table_body_cell">${note[key]}</td>`;
        }
    });

    noteElement += `<td class="table_body_btn-wrap">
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
        showUpdateNoteModal(targetNote);
    } else if (targetButton.classList.contains('archive-btn')) {
        const targetRow = targetButton.parentNode.parentNode;
        archiveNote(targetRow.dataset.id);
        updateMainTable(showArchived);
        updateSummaryTable();
    } else if (targetButton.classList.contains('delete-btn')) {
        const targetRow = targetButton.parentNode.parentNode;
        deleteNote(targetRow.dataset.id);
        updateMainTable(showArchived);
        updateSummaryTable();
    }
}

export default function createMainTable(notes, showArchived) {
    const container = createElement({ htmlTag: 'div', className: 'notes__container'});
    const table = createElement({ htmlTag: 'table', className: 'notes__table'});
    const tableHead = createElement({ htmlTag: 'thead', className: 'notes__table_header'});
    const tableBody = createElement({ htmlTag: 'tbody', className: 'notes__table_body'});
    const thElem = createElement({ htmlTag: 'th', className: 'table_header_cell table_header_btn-wrap'});
    const deleteAllBtn = createElement({ htmlTag: 'i', className: 'fa-solid fa-trash'});
    const archiveAllBtn = createElement({ htmlTag: 'i', className: 'fa-solid fa-box-archive'});

    deleteAllBtn.addEventListener('click', () => {
        deleteAll();
        updateMainTable(showArchived);
        updateSummaryTable();
    });
    archiveAllBtn.addEventListener('click', () => {
        archiveAll();
        updateMainTable(showArchived);
        updateSummaryTable();
    });

    tableHead.insertAdjacentHTML('beforeend', createHeader());
    thElem.append(archiveAllBtn, deleteAllBtn);
    tableHead.firstChild.appendChild(thElem);
    tableBody.insertAdjacentHTML('beforeend', createBody(notes, showArchived));

    tableBody.addEventListener('click', handleButtonsClick);
    table.append(tableHead, tableBody);
    container.append(table);

    return container;
}

export function updateMainTable(showArchived) {
    const table = document.querySelector('div.notes__container');
    table.remove();

    const newTable = createMainTable(notesLocal, showArchived);
    const root = document.getElementById('root');

    root.insertBefore(newTable, root.firstChild);
}
import { notes } from '../helpers/mockData.js';
import createMainTable from './mainTable.js';
import extractDateFromContent from '../helpers/extractDate.js';

let notesLocal = notes;

function updateMainTable() {
    const table = document.querySelector('table.notes__table');
    table.remove();

    const newTable = createMainTable(notesLocal);
    const root = document.getElementById('root');

    root.insertBefore(newTable, root.firstChild);
}

export function submitNewNote(e) {
    e.preventDefault();

    const form = document.querySelector('form#add-note');
    const newNote = {
        _id: notesLocal[notesLocal.length - 1]._id + 1,
        name: form.name.value,
        created: new Date().toISOString(),
        category: form.category.value,
        content: form.content.value,
        dates: extractDateFromContent(form.content.value),
        isArchived: false
    }

    notesLocal.push(newNote);
    updateMainTable();
}
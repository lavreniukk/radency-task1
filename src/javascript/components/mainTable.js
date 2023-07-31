import createElement from '../helpers/domOperations.js';

function createHeader(note) {
    let headerRow = '<tr>';
    Object.keys(note).map((key) => {
        if (key === 'isArchived' || key === '_id') {
            return;
        }
        const th = `<th>${key}</th>`;
        headerRow += th;
    });
    headerRow += '</tr>';
    return headerRow;
}

function createBody(notes) {
    let bodyString = '';
    notes.map((note) => {
        bodyString += createNote(note);
    });
    return bodyString;
}

function createNote(note) {
    let noteElement = '<tr>';
    Object.keys(note).map((key) => {
        if (key === 'isArchived' || key === '_id') {
            return;
        }
        const td = `<td>${note[key]}</td>`;
        noteElement += td;
    });
    noteElement += '</tr>';
    return noteElement;
}

export default function createMainTable(notes) {
    const container = createElement({ htmlTag: 'div', className: 'notes__root'});
    const table = createElement({ htmlTag: 'table', className: 'notes__table'});
    const tableHead = createElement({ htmlTag: 'thead', className: 'notes__table_header'});
    const tableBody = createElement({ htmlTag: 'tbody', className: 'notes__table_body'});

    tableHead.insertAdjacentHTML('beforeend', createHeader(notes[0]));
    tableBody.insertAdjacentHTML('beforeend', createBody(notes));
    table.append(tableHead, tableBody);
    container.append(table);

    return container;
}
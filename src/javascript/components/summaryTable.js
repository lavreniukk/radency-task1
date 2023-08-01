//functionality for summary table, which counts notes by category
import createElement from "../helpers/domOperations.js";
import summary from '../../constants/summaryColumns.js';
import { notesLocal, countByCategories } from '../components/noteService.js';
import categories from "../../constants/noteCategories.js";

function createSummHeader() {
    let headerRow = '<tr class="table_row"><th class="table_header_cell"></th>';

    Object.values(summary).map((value) => {
        headerRow += `<th class="table_header_cell">${value}</th>`;
    });

    headerRow += '</tr>';
    return headerRow;
}

function createSummBody(data) {
    let bodyString = '';

    data.forEach((value, category) => {
        const activeCount = value.active;
        const archivedCount = value.archived;
        bodyString += createRow({ category, activeCount, archivedCount });
    });

    return bodyString;
}

function createRow(cell) {
    let row = '<tr class="table_row">';

    switch (cell.category) {
        case categories.TaskCategory:
            row += '<td class="table_body_cell"><div class="table_body_icon"><i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i></div></td>';
            break;
        case categories.IdeaCategory:
            row += '<td class="table_body_cell"><div class="table_body_icon"><i class="fa-solid fa-lightbulb" style="color: #ffffff;"></i></div></td>';
            break;
        case categories.ThoughtCategory:
            row += '<td class="table_body_cell"><div class="table_body_icon"><i class="fa-solid fa-head-side-virus" style="color: #ffffff;"></i></div></td>';
            break;
    }

    Object.values(cell).map((value) => {
        row += `<td class="table_body_cell">${value}</td>`
    });

    return row;
}

export function updateSummaryTable() {
    const table = document.querySelector('div.summary__container');
    table.remove();

    const newTable = createSummaryTable(countByCategories(notesLocal));
    const root = document.getElementById('root');

    root.appendChild(newTable);
}

export function createSummaryTable(data) {
    const container = createElement({ htmlTag: 'div', className: 'summary__container'});
    const table = createElement({ htmlTag: 'table', className: 'summary__table'});
    const tableHead = createElement({ htmlTag: 'thead', className: 'summary__table_header'});
    const tableBody = createElement({ htmlTag: 'tbody', className: 'summary__table_body'});

    tableHead.insertAdjacentHTML('beforeend', createSummHeader());
    tableBody.insertAdjacentHTML('beforeend', createSummBody(data));
    table.append(tableHead, tableBody);

    container.append(table);
    return container;
}

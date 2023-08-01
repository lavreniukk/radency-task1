import createMainTable from "./components/mainTable.js";
import { notes } from "./helpers/mockData.js";
import { createNewNoteButton } from "./components/modals/noteModal.js";
import { countByCategories } from "./components/noteService.js";
import { createSummaryTable } from "./components/summaryTable.js";
import { createChangeShowStatusBtn } from "./components/archive.js";
import createElement from "./helpers/domOperations.js";

class App {
    static root = document.getElementById('root');

    static startApp() {
        const notesElement = createMainTable(notes, false);
        const btnContainer = createElement({htmlTag: 'div', className: 'notes__btn-container'});
        const createNoteBtn = createNewNoteButton();
        const changeShowStatusBtn = createChangeShowStatusBtn();
        const summaryTable = createSummaryTable(countByCategories(notes));
        
        btnContainer.append(createNoteBtn, changeShowStatusBtn);
        App.root.append(notesElement, btnContainer, summaryTable);
    }
}

export default App;
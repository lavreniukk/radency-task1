import createMainTable from "./components/mainTable.js";
import { notes } from "./helpers/mockData.js";
import { createNewNoteButton } from "./components/modals/noteModal.js";
import { countByCategories } from "./components/noteService.js";
import { createSummaryTable } from "./components/summaryTable.js";
import { createChangeShowStatusBtn } from "./components/archive.js";

class App {
    static root = document.getElementById('root');

    static startApp() {
        try {
            const notesElement = createMainTable(notes, false);
            const createNoteBtn = createNewNoteButton();
            const changeShowStatusBtn = createChangeShowStatusBtn();
            const summaryTable = createSummaryTable(countByCategories(notes));
            
            App.root.append(notesElement, createNoteBtn, changeShowStatusBtn, summaryTable);
        } catch (error) {
            //
        }
    }
}

export default App;
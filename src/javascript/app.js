import createMainTable from "./components/mainTable.js";
import { notes } from "./helpers/mockData.js";
import { createNewNoteButton } from "./components/modals/noteModal.js";
import { countByCategories } from "./components/noteService.js";
import { createSummaryTable } from "./components/summaryTable.js";

class App {
    static root = document.getElementById('root');

    static startApp() {
        try {
            const notesElement = createMainTable(notes);
            const createNoteBtn = createNewNoteButton();
            const summaryTable = createSummaryTable(countByCategories(notes));
            
            App.root.append(notesElement, createNoteBtn, summaryTable);
        } catch (error) {
            //
        }
    }
}

export default App;
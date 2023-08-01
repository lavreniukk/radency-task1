import createMainTable from "./components/mainTable.js";
import { notes } from "./helpers/mockData.js";
import { createNewNoteButton } from "./components/modals/noteModal.js";

class App {
    static root = document.getElementById('root');

    static startApp() {
        try {
            const notesElement = createMainTable(notes);
            const createNoteBtn = createNewNoteButton();
            
            App.root.append(notesElement, createNoteBtn);
        } catch (error) {
            //
        }
    }
}

export default App;
import createMainTable from "./components/mainTable.js";
import { notes } from "./helpers/mockData.js";
import { createNewNoteButton } from "./components/modals/newNoteModal.js";

class App {
    static root = document.getElementById('root');

    static startApp() {
        try {
            const notesElement = createMainTable(notes);
            const createNoteBtn = createNewNoteButton();
            
            notesElement.append(createNoteBtn);
            App.root.append(notesElement);
        } catch (error) {
            //
        }
    }
}

export default App;
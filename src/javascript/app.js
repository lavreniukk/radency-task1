import createMainTable from "./components/mainTable.js";
import { notes } from "./helpers/mockData.js";

class App {
    static root = document.getElementById('root');

    static startApp() {
        try {
            const notesElement = createMainTable(notes);
            App.root.appendChild(notesElement);
        } catch (error) {
            //
        }
    }
}

export default App;
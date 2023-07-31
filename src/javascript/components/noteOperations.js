import { notes } from '../helpers/mockData.js';
import createElement from '../helpers/domOperations.js';

let notesLocal = notes;
function createNote() {
    notesLocal.push();
}

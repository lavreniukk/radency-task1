import { notes } from '../helpers/mockData.js';
import extractDateFromContent from '../helpers/extractDate.js';

export let notesLocal = notes;

export function getNote(noteId) {
    const index = notesLocal.findIndex((note) => note._id === parseInt(noteId));

    return notesLocal[index];
}

export function updateNote(noteId) {
    const index = notesLocal.findIndex((note) => note._id === parseInt(noteId));

    const form = document.querySelector('form#update-note');
    const updatedNote = {
        name: form.name.value,
        category: form.category.value,
        content: form.content.value,
        dates: extractDateFromContent(form.content.value),
    }

    Object.keys(updatedNote).map((key) => {
        notesLocal[index][key] = updatedNote[key];
    });
}

export function archiveNote(noteId) {
    const index = notesLocal.findIndex((note) => note._id === parseInt(noteId));
    notesLocal[index].isArchived = !notesLocal[index].isArchived;
}

export function archiveAll() {
    notesLocal.map((note) => {
        note.isArchived = true;
    });
}

export function deleteNote(noteId) {
    const index = notesLocal.findIndex((note) => note._id === parseInt(noteId));
    notesLocal.splice(index, 1);

}

export function deleteAll() {
    notesLocal = [];
}

export function countByCategories() {
    const categoriesMap = new Map();

    notesLocal.map((note) => {
        if (!categoriesMap.has(note.category)) {
            categoriesMap.set(note.category, {active: 0, archived: 0});
        }

        const count = categoriesMap.get(note.category);
        note.isArchived ? count.archived++ : count.active++;
        categoriesMap.set(note.category, count);
    });

    return categoriesMap;
} 

export function addNote(newNote) {
    notesLocal.push(newNote);
}

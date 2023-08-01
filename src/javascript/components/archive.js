import createElement from "../helpers/domOperations.js";
import { updateMainTable } from "./mainTable.js";

export let showArchived = false;
export function createChangeShowStatusBtn() {
    const changeShowingBtn = createElement({htmlTag: 'button', className: 'notes__button'});
    changeShowingBtn.innerText = 'Show archived';
    changeShowingBtn.addEventListener('click', () => {
        if (!showArchived) {
            changeShowingBtn.innerText = 'Show active';
        } else {
            changeShowingBtn.innerText = 'Show archived';
        }
        showArchived = !showArchived;
        updateMainTable(showArchived);
    });

    return changeShowingBtn;
}

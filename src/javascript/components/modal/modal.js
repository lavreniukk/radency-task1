import createElement from "../../helpers/domOperations.js";

function hideModal() {
    const modal = document.getElementById('modal');
    modal?.remove();
}

function createModalHeader(title, onClose) {
    const headerElement = createElement({ htmlTag: 'div', className: 'modal__header'});
    const titleElement = createElement({ htmlTag: 'span' });
    const closeButton = createElement({ htmlTag: 'div', className: 'modal__close'});
    titleElement.innerText = title;
    closeButton.innerText = 'x';

    const close = () => {
        hideModal();
        onClose();
    };

    closeButton.addEventListener('click', close);
    headerElement.append(titleElement, closeButton);
    
    return headerElement;
}

function createModal({ title, bodyElement, onClose }) {
    const modal = createElement({ htmlTag: 'div', className: 'modal'});
    const modalContainer = createElement({ htmlTag: 'div', className: 'modal__container'});
    const header = createModalHeader(title, onClose);
    
    modalContainer.append(header, bodyElement);
    modal.append(modalContainer);
    modal.id = 'modal';

    return modal;
}

export default function showModal({ title, bodyElement, onClose = () => {} }) {
    const root = document.getElementById('root');
    const modal = createModal({ title, bodyElement, onClose});

    root.append(modal);
}

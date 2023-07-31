export function createElement({ htmlTag, className, attributes = {} }) {
    const element = document.createElement(htmlTag);

    if (className) {
        const classes = className.split(' ');
        element.classList.add(...classes);
    }

    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));

    return element;
}
export function createButton(onClick) {
    const createNoteButton = createElement({ htmlTag: 'button' });
    createNoteButton.addEventListener('click', onClick);
    return createNoteButton;
}
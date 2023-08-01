export default function convertISOtoDate(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleString(undefined, options);
}
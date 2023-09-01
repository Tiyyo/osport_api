// Exclude field(s) way
function exclude(entity, keys) {
    return Object.fromEntries(Object.entries(entity).filter(([key]) => !keys.includes(key)));
}
export default exclude;

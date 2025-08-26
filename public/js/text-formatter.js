/**
 * Converts all string values in a 2D array to lowercase.
 * @param {string[][]} data The 2D array of string data.
 * @returns {string[][]} A new 2D array with all string values converted to lowercase.
 */
export function toLowerCase(data) {
    if (!data || data.length === 0) {
        return [];
    }
    return data.map(row => row.map(cell => typeof cell === 'string' ? cell.toLowerCase() : cell));
}

/**
 * Converts all string values in a 2D array to uppercase.
 * @param {string[][]} data The 2D array of string data.
 * @returns {string[][]} A new 2D array with all string values converted to uppercase.
 */
export function toUpperCase(data) {
    if (!data || data.length === 0) {
        return [];
    }
    return data.map(row => row.map(cell => typeof cell === 'string' ? cell.toUpperCase() : cell));
}

/**
 * Converts all string values in a 2D array to Title Case (first letter of each word capitalized).
 * @param {string[][]} data The 2D array of string data.
 * @returns {string[][]} A new 2D array with all string values converted to Title Case.
 */
export function toTitleCase(data) {
    if (!data || data.length === 0) {
        return [];
    }
    return data.map(row => row.map(cell => {
        if (typeof cell !== 'string') {
            return cell;
        }
        return cell.toLowerCase().split(' ').map(word => {
            if (word.length === 0) {
                return '';
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }));
}
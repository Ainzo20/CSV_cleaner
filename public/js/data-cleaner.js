/**
 * Cleans the data by removing duplicate rows based on selected headers.
 * @param {string[][]} sourceData The array of CSV data.
 * @param {string[]} selectedHeaders The array of headers to check for uniqueness.
 * @returns {{cleanData: string[][], removedRows: string[][]}} An object with the cleaned data and removed rows.
 */
export function cleanData(sourceData, selectedHeaders) {
    const headers = sourceData[0];
    const uniqueColumnIndices = selectedHeaders.map(header => headers.indexOf(header));
    const uniqueRows = new Set();
    const cleanData = [headers];
    const removedRows = [];

    for (let i = 1; i < sourceData.length; i++) {
        const row = sourceData[i];
        if (row.length === 1 && row[0] === "") continue;
        const key = uniqueColumnIndices.map(index => row[index]).join('-');

        if (!uniqueRows.has(key)) {
            uniqueRows.add(key);
            cleanData.push(row);
        } else {
            removedRows.push(row);
        }
    }

    return { cleanData, removedRows };
}
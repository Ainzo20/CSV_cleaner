import { setParsedCsvData } from './data-storage.js';

/**
 * Reads and parses an uploaded file.
 * @param {File} file The file object from the input.
 * @returns {Promise<string[][]>} A promise that resolves with the parsed CSV data.
 */
export function processFile(file) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject("No file selected.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const csvData = event.target.result;
            const parsedData = csvData.split('\n').map(row => row.split(','));
            setParsedCsvData(parsedData);
            resolve(parsedData);
        };
        reader.readAsText(file);
    });
}
/**
 * This script fetches and displays example CSV data for the preview section.
 */
document.addEventListener('DOMContentLoaded', () => {

    const dirtyPreviewElement = document.getElementById('dirty-preview');
    const cleanPreviewElement = document.getElementById('clean-preview');

    // Define the paths to the example CSV files
    const dirtyFile = 'examples/dirty_data.csv';
    const cleanFile = 'examples/clean_data.csv';

    /**
     * Fetches a CSV file and returns its content as a string.
     * @param {string} url - The URL of the CSV file.
     * @returns {Promise<string>} A promise that resolves with the CSV content.
     */
    async function fetchCsv(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            }
            return await response.text();
        } catch (error) {
            console.error(error);
            return 'Failed to load example data.';
        }
    }

    /**
     * Loads and displays both example CSV files in their respective preview elements.
     */
    async function loadExampleData() {
        const [dirtyData, cleanData] = await Promise.all([
            fetchCsv(dirtyFile),
            fetchCsv(cleanFile)
        ]);

        dirtyPreviewElement.textContent = dirtyData;
        cleanPreviewElement.textContent = cleanData;
    }

    // Load the example data when the page finishes loading
    loadExampleData();
});
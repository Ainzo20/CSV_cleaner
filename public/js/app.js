import { parsedCsvData, currentCleanData, setCurrentCleanData, resetData, hasCleanData, addCorrections } from './data-storage.js';
import { processFile } from './file-processor.js';
import { displayHeadersAsCheckBoxes, updateResultsUI, resetUI } from './dom-manager.js';
import { cleanData } from './data-cleaner.js';
import { downloadCleanedFile } from './download-manager.js';

// Selects the HTML input element with the ID 'csvFile'.
const fileInput = document.getElementById('csvFile');
// Selects the HTML button element with the ID 'cleanBtn'.
const cleanBtn = document.getElementById('cleanBtn');

// Adds an event listener to the file input to detect when a file is selected.
fileInput.addEventListener('change', (e) => {
    if (hasCleanData()){
        const confirmReload = confirm("You have unsaved cleaned data. Are you sure you want to load a new file and lose all previous changes?");
        if (!confirmReload) {
            // Clear the file input to prevent it from showing the newly selected file name.
            e.target.value = '';
            return;
        }
        resetData();
        resetUI();
    }
    processFile(e.target.files[0])
        .then(parsedData => {
            const headers = parsedData[0];
            displayHeadersAsCheckBoxes(headers);
        })
        .catch(error => {
            alert(error);
        });
});

// Adds an event listener to the "Clean My Data" button.
cleanBtn.addEventListener('click', () => {
    const sourceData = currentCleanData || parsedCsvData;

    if (sourceData.length === 0) {
        alert("Please upload a CSV file first.");
        return;
    }

    const checkboxes = document.querySelectorAll('#result input[type="checkbox"]');
    const selectedHeaders = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    if (selectedHeaders.length === 0) {
        alert("Please select at least one column to identify duplicates.");
        return;
    }

    const { cleanData: resultData, removedRows } = cleanData(sourceData, selectedHeaders);
    setCurrentCleanData(resultData);

    // Add the number of removed rows to the total corrections count
    addCorrections(removedRows.length);
    
    // Pass both the clean and removed data to update the UI
    updateResultsUI(resultData, removedRows);
    
    // Add event listener for the download button.
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            downloadCleanedFile(currentCleanData);
            resetData();
            resetUI();
        };
    }
});

// Adds an event listener to the Call-to-Action button to smoothly scroll to the tool section.
document.getElementById('ctaButton').addEventListener('click', () => {
    document.getElementById('tool-section').scrollIntoView({ behavior: 'smooth' });
});

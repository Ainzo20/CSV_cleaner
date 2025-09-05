import { parsedCsvData, currentCleanData, setCurrentCleanData, resetData, hasCleanData, addCorrections, setParsedCsvData } from './data-storage.js';
import { processFile } from './file-processor.js';
import { updateResultsUI, resetUI, renderTextFormattingStep, renderDuplicateRemovalStep, renderResultsStep,showMessageBox } from './dom-manager.js';
import { cleanData } from './data-cleaner.js';
import { downloadCleanedFile } from './download-manager.js';
import { toLowerCase, toUpperCase, toTitleCase } from './text-formatter.js';

// Selects the HTML input element with the ID 'csvFile'.
const fileInput = document.getElementById('csvFile');
// Selects the HTML button element with the ID 'ctaButton'.
const ctaButton = document.getElementById('ctaButton');

/**
 * Handles the file selection event, processes the file, and renders the first UI step.
 * @param {Event} e The change event from the file input.
 */
fileInput.addEventListener('change', (e) => {
    const file =e.target.files[0];
    const validFileTypes = ['text/csv', 'application/vnd.ms-excel', 'text/comma-separated-values'];
    if (file && !validFileTypes.includes(file.type)) {
        showMessageBox("Invalid File Type", "Please upload a valid CSV file.");
        e.target.value = ''; // Clear the file input
        return; // Stop the process
    }
    
    if (hasCleanData()) {
        const confirmReload = confirm("You have unsaved cleaned data. Are you sure you want to load a new file and lose all previous changes?");
        if (!confirmReload) {
            e.target.value = '';
            return;
        }
        resetData();
        resetUI();
    }
    processFile(e.target.files[0])
        .then(parsedData => {
            setParsedCsvData(parsedData);
            
            renderTextFormattingStep();
            
            document.getElementById('nextStepBtn').addEventListener('click', handleNextStep);
        })
        .catch(error => {
            alert(error);
        });
});

/**
 * Manages the transition from the Text Formatting step to the Duplicate Removal step.
 */
function handleNextStep() {
    const textFormatSelect = document.getElementById('textFormatSelect');
    const selectedFormat = textFormatSelect ? textFormatSelect.value : 'none';
    
    // We will apply the formatting to the entire dataset, including headers.
    let sourceData = parsedCsvData;

    switch (selectedFormat) {
        case 'lower':
            sourceData = toLowerCase(sourceData);
            break;
        case 'upper':
            sourceData = toUpperCase(sourceData);
            break;
        case 'title':
            sourceData = toTitleCase(sourceData);
            break;
        case 'none':
        default:
            // No formatting applied.
            break;
    }

    // This formatted data (with formatted headers) is what is passed to the next step.
    setCurrentCleanData(sourceData);

    // Render the next step: Duplicate Removal. No headers are passed here.
    renderDuplicateRemovalStep(handleCleanData);
}

/**
 * Manages the data cleaning process when the "Clean My Data" button is clicked.
 */
function handleCleanData() {
    // The sourceData now contains the formatted headers.
    const sourceData = currentCleanData || parsedCsvData;

    const checkboxes = document.querySelectorAll('#result input[type="checkbox"]');
    const selectedHeaders = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    if (selectedHeaders.length === 0) {
        alert("Please select at least one column to identify duplicates.");
        return;
    }

    const { cleanData: resultData, removedRows } = cleanData(sourceData, selectedHeaders);
    setCurrentCleanData(resultData);

    addCorrections(removedRows.length);

    renderResultsStep();
    updateResultsUI(resultData, removedRows);
    
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.onclick = () => {
            downloadCleanedFile(currentCleanData);
            resetData();
            resetUI();
        };
    }
}

ctaButton.addEventListener('click', () => {
    document.getElementById('tool-section').scrollIntoView({ behavior: 'smooth' });
});
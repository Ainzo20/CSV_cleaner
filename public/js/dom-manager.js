import { totalCorrectionsCount, currentCleanData } from './data-storage.js';

/**
 * Creates or updates the UI to show the cleaning results.
 * @param {string[][]} cleanData The cleaned data array.
 * @param {string[][]} removedRows The array of removed rows.
 */
export function updateResultsUI(cleanData, removedRows) {
    const cleanPreviewElement = document.getElementById('clean-user-preview');
    const removedPreviewElement = document.getElementById('removed-user-preview');
    const summaryMessage = document.getElementById('summary-message');
    
    // Convert data to a readable string format
    const cleanedCsvString = cleanData.map(row => row.join(', ')).join('\n');
    const removedCsvString = removedRows.map(row => row.join(', ')).join('\n');

    // Update the clean data preview
    if (cleanedCsvString.length > 0) {
        cleanPreviewElement.textContent = cleanedCsvString;
    } else {
        cleanPreviewElement.textContent = "No data to display after cleaning.";
    }

    // Update the removed rows preview
    if (removedRows.length > 0) {
        removedPreviewElement.textContent = removedCsvString;
    } else {
        removedPreviewElement.textContent = "No duplicates were found with the selected column(s).";
    }

    // Update the summary message
    summaryMessage.textContent = `Total rows removed in this operation: ${removedRows.length}. Total rows removed for the process: ${totalCorrectionsCount}`;
}

/**
 * Resets the UI to its initial state.
 */
export function resetUI() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}

/**
 * Renders the UI for the Text Formatting step.
 */
export function renderTextFormattingStep() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const heading = document.createElement('h2'); // Use h2 for section headings
    heading.textContent = 'Step 1: Apply Text Formatting';
    
    const formatSelect = document.createElement('select');
    formatSelect.id = 'textFormatSelect';
    formatSelect.innerHTML = `
        <option value="none">No Formatting</option>
        <option value="lower">Lowercase</option>
        <option value="upper">Uppercase</option>
        <option value="title">Title Case</option>
    `;

    const nextBtn = document.createElement('button');
    nextBtn.id = 'nextStepBtn';
    nextBtn.textContent = 'Next Step';

    resultDiv.appendChild(heading);
    resultDiv.appendChild(formatSelect);
    resultDiv.appendChild(nextBtn);
}

/**
 * Renders the UI for the Duplicate Removal step.
 * @param {Function} eventHandler The function to execute when the clean button is clicked.
 */
export function renderDuplicateRemovalStep(eventHandler) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const heading = document.createElement('h2'); // Use h2 for section headings
    heading.textContent = 'Step 2: Select Columns to Find Duplicates';
    
    const checkboxContainer = document.createElement('div');
    checkboxContainer.id = 'column-selection';
    // No specific class here, as its direct children will be styled

    // Get the headers from the current data to ensure they are synchronized.
    const headers = currentCleanData[0];

    headers.forEach(header => {
        const checkboxWrapper = document.createElement('div');
        checkboxWrapper.className = 'checkbox-wrapper'; // Custom class for styling
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `column-${header}`;
        checkbox.value = header;

        const label = document.createElement('label');
        label.htmlFor = `column-${header}`;
        label.textContent = header;

        checkboxWrapper.appendChild(checkbox);
        checkboxWrapper.appendChild(label);
        checkboxContainer.appendChild(checkboxWrapper);
    });

    const cleanBtn = document.createElement('button');
    cleanBtn.id = 'cleanBtn';
    cleanBtn.textContent = 'Clean My Data';

    cleanBtn.addEventListener('click', eventHandler);

    resultDiv.appendChild(heading);
    resultDiv.appendChild(checkboxContainer);
    resultDiv.appendChild(cleanBtn);
}

/**
 * Renders the final UI for displaying the results and download button.
 */
export function renderResultsStep() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const heading = document.createElement('h2'); // Use h2 for section headings
    heading.textContent = 'Results';

    const previewContainer = document.createElement('div');
    previewContainer.className = 'preview-container'; // Class from your CSS

    const cleanPreview = document.createElement('div');
    cleanPreview.className = 'data-preview clean'; // Classes from your CSS
    const cleanHeading = document.createElement('h3');
    cleanHeading.textContent = 'Clean Data Preview';
    const cleanPre = document.createElement('pre');
    cleanPre.id = 'clean-user-preview';
    cleanPreview.appendChild(cleanHeading);
    cleanPreview.appendChild(cleanPre);

    const removedPreview = document.createElement('div');
    removedPreview.className = 'data-preview dirty'; // Using 'dirty' for removed rows to show difference
    const removedHeading = document.createElement('h3');
    removedHeading.textContent = 'Removed Rows Preview';
    const removedPre = document.createElement('pre');
    removedPre.id = 'removed-user-preview';
    removedPreview.appendChild(removedHeading);
    removedPreview.appendChild(removedPre);

    previewContainer.appendChild(cleanPreview);
    previewContainer.appendChild(removedPreview);
    
    const summaryMessage = document.createElement('p');
    summaryMessage.id = 'summary-message';
    summaryMessage.className = 'instructions-text'; // Reusing existing text style

    const downloadBtn = document.createElement('button');
    downloadBtn.id = 'downloadBtn';
    downloadBtn.textContent = 'Download Cleaned Data';

    resultDiv.appendChild(heading);
    resultDiv.appendChild(previewContainer);
    resultDiv.appendChild(summaryMessage);
    resultDiv.appendChild(downloadBtn);
}
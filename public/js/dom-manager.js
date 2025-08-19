import { currentCleanData } from './data-storage.js'; // Corrected import

/**
 * Creates and displays checkboxes for each header in the CSV.
 * @param {string[]} headers The array of header names.
 */
export function displayHeadersAsCheckBoxes(headers) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const heading = document.createElement('h3');
    heading.textContent = 'Select the unique identifier columns';
    resultDiv.appendChild(heading);

    headers.forEach(header => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `column-${header}`;
        checkbox.value = header;

        const label = document.createElement('label');
        label.htmlFor = `column-${header}`;
        label.textContent = header;

        resultDiv.appendChild(checkbox);
        resultDiv.appendChild(label);
        resultDiv.appendChild(document.createElement('br'));
    });
}

/**
 * Creates or updates the UI to show the cleaning results.
 * @param {string[][]} cleanData The cleaned data array.
 * @param {string[][]} removedRows The array of removed rows.
 */
export function updateResultsUI(cleanData, removedRows) {
    const resultDiv = document.getElementById('result');

    let previewContainer = document.getElementById('previewContainer');
    if (!previewContainer) {
        previewContainer = document.createElement('div');
        previewContainer.id = 'previewContainer';
        previewContainer.className = 'preview-container';

        const cleanPreview = document.createElement('div');
        cleanPreview.className = 'data-preview clean';
        const cleanHeading = document.createElement('h3');
        cleanHeading.textContent = 'Clean Data Preview';
        const cleanPre = document.createElement('pre');
        cleanPre.id = 'clean-user-preview';
        cleanPreview.appendChild(cleanHeading);
        cleanPreview.appendChild(cleanPre);

        const removedPreview = document.createElement('div');
        removedPreview.className = 'data-preview removed';
        const removedHeading = document.createElement('h3');
        removedHeading.textContent = 'Removed Rows Preview';
        const removedPre = document.createElement('pre');
        removedPre.id = 'removed-user-preview';
        removedPreview.appendChild(removedHeading);
        removedPreview.appendChild(removedPre);

        previewContainer.appendChild(cleanPreview);
        previewContainer.appendChild(removedPreview);
        resultDiv.appendChild(previewContainer);
    }
    
    const cleanPreviewElement = document.getElementById('clean-user-preview');
    const removedPreviewElement = document.getElementById('removed-user-preview');
    
    const cleanedCsvString = cleanData.map(row => row.join(',')).join('\n');
    const removedCsvString = removedRows.map(row => row.join(',')).join('\n');

    if (cleanedCsvString.length > 0) {
        cleanPreviewElement.textContent = cleanedCsvString;
    } else {
        cleanPreviewElement.textContent = "No data to display after cleaning.";
    }

    if (removedRows.length > 0) {
        removedPreviewElement.textContent = removedCsvString;
    } else {
        removedPreviewElement.textContent = "No duplicates were found with the selected column(s).";
    }

    let summaryMessage = document.getElementById('summary-message');
    if (!summaryMessage) {
        summaryMessage = document.createElement('p');
        summaryMessage.id = 'summary-message';
        resultDiv.appendChild(summaryMessage);
    }
    summaryMessage.textContent = `Total rows removed: ${removedRows.length}`;

    let downloadBtn = document.getElementById('downloadBtn');
    if (!downloadBtn) {
        downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Download Data';
        downloadBtn.id = 'downloadBtn';
        resultDiv.appendChild(downloadBtn);
    }
}

/**
 * Resets the UI to its initial state.
 */
export function resetUI() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
}
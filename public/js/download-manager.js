/**
 * Triggers a file download with the given content.
 * @param {string[][]} data The data to be downloaded.
 */
export function downloadCleanedFile(data) {
    const cleanedCsvString = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([cleanedCsvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'cleaned_data.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
// A global variable to hold the parsed data from the uploaded CSV file.
export let parsedCsvData = [];

// A global variable to store the result of the latest cleaning operation.
export let currentCleanData = null;

// Sets the initial parsed CSV data.
export function setParsedCsvData(data) {
    parsedCsvData = data;
}

// Sets the currently cleaned data.
export function setCurrentCleanData(data) {
    currentCleanData = data;
}

// Resets all data to their initial states.
export function resetData() {
    parsedCsvData = [];
    currentCleanData = null;
}

//check if there is already cleaned data in the memory
export function hasCleanData(){
    return currentCleanData !==null;
}
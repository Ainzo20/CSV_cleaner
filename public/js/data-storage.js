// A global variable to hold the parsed data from the uploaded CSV file.
export let parsedCsvData = [];

// A global variable to store the result of the latest cleaning operation.
export let currentCleanData = null;

//A global variable to store total rows removed
export let totalCorrectionsCount =0;

// A global array to store the history of cleaning operations.
export let correctionJournal = [];

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
    totalCorrectionsCount = 0;
}

//check if there is already cleaned data in the memory
export function hasCleanData(){
    return currentCleanData !==null;
}

//add the removed rows through a count 
export function addCorrections(count){
    return totalCorrectionsCount+=count;
}
//global variable for the parsed data
let parsedCsvData=[];
// 1. Select the file input and button
const fileInput=document.getElementById('csvFile');
const cleanBtn = document.getElementById('cleanBtn');
// 2. Add an event listener to the button
fileInput.addEventListener('change',(e)=>{
     // 3. Get the uploaded file
     const file=e.target.files[0];

     if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target.result;
        // Parse the data
        parsedCsvData = csvData.split('\n').map(row => row.split(','));
         //get header row
         const headers= parsedCsvData[0];
        //display headers
        displayHeadersAsCheckBoxes(headers);
        console.log('headers: ',headers)
      };
  
      reader.readAsText(file);
    } else {
      console.log('No file selected.');
    }
});

//function to dynamically create checkboxes
function displayHeadersAsCheckBoxes(headers){
   const resultDiv= document.getElementById('result');

   //clearing div before adding new content
   result.innerHTML='';
   //creating a section with heading to help the user choose the headers with checkboxes 
   const heading = document.createElement('h3');
   heading.textContent='Select the unique identifier columns';
   result.appendChild(heading);

    // Create and append the checkboxes for each header
    headers.forEach(header => {
      const checkbox=document.createElement('input');
      checkbox.type='checkbox';
      checkbox.id=header;
      checkbox.value=header;

      const label= document.createElement('label');
      label.htmlFor=header;
      label.textContent=header;

      resultDiv.appendChild(checkbox);
      resultDiv.appendChild(label);
      resultDiv.appendChild(document.createElement('br'));
    });
}

//cleaning duplicates
cleanBtn.addEventListener('click',()=>{
//Get all the created checkboxes
const checkboxes =document.querySelectorAll('#result input[type="checkbox"]');

//find the selected checkboxes(headers) and get their values
const selectedHeaders= Array.from(checkboxes).filter(checkbox =>checkbox.checked).map(checkbox=>checkbox.value);
console.log('Selected unique identifiers:', selectedHeaders);
});

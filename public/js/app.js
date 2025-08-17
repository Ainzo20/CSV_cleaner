// 1. Select the file input and button
const fileInput=document.getElementById('csvFile');
const cleanBtn = document.getElementById('cleanBtn');
// 2. Add an event listener to the button
cleanBtn.addEventListener('click',()=>{
     // 3. Get the uploaded file
     const file=fileInput.files[0];

     if (file){
        console.log("Selected file",file.name);
     }else{
        console.log("No file selected");
     }
});
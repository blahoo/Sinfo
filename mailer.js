const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const submitButton = document.getElementById('submitButton')


function checkChar(string){
    for (const char of string) {
        if(char == ' '){
            return true;
        }
    }
    return false;
}

nameInput.addEventListener('input', () => {
    value1 = nameInput.value;
    if (checkChar(value1) && nameInput.value == ' '){
        nameInput.value = '';
    }
    console.log(value1)

});
emailInput.addEventListener('input', () => {
    value2 = emailInput.value;
    if (checkChar(value2)){
        emailInput.value = '';
    } 
});


submitButton.addEventListener('submit', function(event) {
    event.preventDefault();
    email = emailInput.value;
    console.log(email)
});
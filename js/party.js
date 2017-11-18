var called = false;

function party() {
    localStorage.setItem('party', document.getElementById('party').value);
    var hasOrigin = localStorage.getItem('origin') != null &&
        localStorage.getItem('origin') != "";
    var hasDest = localStorage.getItem('destination') != null &&
        localStorage.getItem('destination') != "";;
    var hasParty = localStorage.getItem('party') != null &&
        !(isNaN(localStorage.getItem('party'))) &&
        localStorage.getItem('party') != "" &&
        localStorage.getItem('party') >= 0;
    var hasDates = localStorage.getItem('dates') != null &&
        localStorage.getItem('dates') > 0;

    if (!hasOrigin || !hasDest || !hasParty || !hasDates) {
        if (!called) {
            showSnackbar(hasOrigin, hasDest, hasParty, hasDates);
        }
        called = true;
    }
    else {
        /*
        console.log(localStorage.getItem('origin'));
        console.log(localStorage.getItem('destination'));
        console.log(localStorage.getItem('dates'));
        console.log(localStorage.getItem('party'));
        */
        window.location.href = "packages.html";
    }
}

/* Snackbar from https://www.w3schools.com/howto/howto_js_snackbar.asp */
function showSnackbar(hasOrigin, hasDest, hasParty, hasDates) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")

    // Determine relevant validation text
    if (!hasOrigin){
        x.innerHTML += "Departing city</br>";
    }
    if (!hasDest) {
        x.innerHTML += "Destination city</br>";
    }
    if (!hasParty) {
        x.innerHTML += "Number of people</br>";
    }
    if (!hasDates) {
        x.innerHTML += "Travel dates</br>";
    }

    // Add the "show" class to DIV
    x.className = "show";
}

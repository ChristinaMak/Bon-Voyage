$(document).ready(function() {
    console.log(document.getElementById("destinationCity"));
    if (document.getElementById("destinationCity") != null &&
        localStorage.getItem('destination') != null) {
        document.getElementById("destinationCity").value = localStorage.getItem('destination');
    }
});

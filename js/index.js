$(document).ready(function() {
    console.log(document.getElementById("originCity"));
    if (document.getElementById("originCity") != null &&
        localStorage.getItem('origin') != null) {
        document.getElementById("originCity").value = localStorage.getItem('origin');
    }
});

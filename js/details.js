// Set up purchase page
function setupPrice() {
    // Get chosen package information
    var depFlight = JSON.parse(localStorage.getItem('departure'));
    var hotel = JSON.parse(localStorage.getItem('hotel'));
    var retFlight = JSON.parse(localStorage.getItem('return'));
    var price = JSON.parse(localStorage.getItem('price'));

    console.log(hotel);
    console.log(hotel.price);

    // Display correct package price numbers
    //document.getElementById('hotel').innerHTML = 'Hotel: $' + numberWithCommas(parseInt(hotel.price));
    //document.getElementById('flight').innerHTML = 'Flight: $' + numberWithCommas(parseInt(depFlight.price) + parseInt(retFlight.price));
    //document.getElementById('total').innerHTML = localStorage.getItem('total');
}

$(document).ready(function() {
    //setupPrice();
    var depFlight = JSON.parse(localStorage.getItem('departure'));
    var hotel = JSON.parse(localStorage.getItem('hotel'));
    var retFlight = JSON.parse(localStorage.getItem('return'));
    test = document.getElementById('departurePrice');//.innerHTML =  "rfgjh"//numberWithCommas(parseInt(hotel.price));
    console.log(test);
});

var departures = [
    {'time': '11:10 A.M. - 7:45 A.M.', 'duration': '12h 35m SAN-CDG', 'airline': 'Ryanair', 'price': '500', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '11:10 A.M. - 7:45 A.M.', 'duration': '12h 35m SAN-CDG', 'airline': 'American Airlines', 'price': '650', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '11:10 A.M. - 7:45 A.M.', 'duration': '12h 35m SAN-CDG', 'airline': 'Air France', 'price': '700', 'plane': 'Boeing 787', 'misc': 'One free carry-on'}
]

var hotels = [
    {'hotel': 'Le Motel', 'stars': '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>', 'rating': '78% Recommended on TripAdvisor', 'price': '1000', 'starsString': '3', 'misc': 'Close to CDG Airport'},
    {'hotel': 'Le Hotel', 'stars': '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>', 'rating': '87% Recommended on TripAdvisor', 'price': '1400', 'starsString': '4', 'misc': 'Near great authentic French restaurants'},
    {'hotel': 'Le Beau Hotel', 'stars': '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>', 'rating': '95% Recommended on TripAdvisor', 'price': '1800', 'starsString': '5', 'misc': 'Views of the Eiffel Tower'}
]
var returns = [
    {'time': '10:40 A.M. - 5:46 A.M.', 'duration': '15h 6m CDG-SAN', 'airline': 'Ryanair', 'price': '500'},
    {'time': '10:40 A.M. - 5:46 A.M.', 'duration': '15h 6m CDG-SAN', 'airline': 'American Airlines', 'price': '650'},
    {'time': '10:40 A.M. - 5:46 A.M.', 'duration': '15h 6m CDG-SAN', 'airline': 'Air France', 'price': '700'}
]

// Taken from StackOverflow
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setupPackages() {
    document.getElementById('basic').onclick = function() {
        choosePackage('basic');
    };
    document.getElementById('premium').onclick = function() {
        choosePackage('premium');
    };
    document.getElementById('luxury').onclick = function() {
        choosePackage('luxury');
    };
}

function moveNumbers(num) {
    var txt= num;
    document.getElementById("stuff").value=txt;
}

function choosePackage(package) {
    if (package == 'basic') {
        localStorage.setItem('departure', '0');
        localStorage.setItem('hotel', '0');
        localStorage.setItem('return', '0');
    }

    else if (package == 'premium') {
        localStorage.setItem('departure', '1');
        localStorage.setItem('hotel', '1');
        localStorage.setItem('return', '1');
    }

    else if (package == 'luxury') {
        localStorage.setItem('departure', '2');
        localStorage.setItem('hotel', '2');
        localStorage.setItem('return', '2');
    }
}

function setupDetails() {
    var parentDiv = $('#departureCard');
    var template = Handlebars.compile(document.getElementById('departureTemplate').innerHTML);
    var html = template(departures[parseInt(localStorage.getItem('departure'))]);
    parentDiv.append(html);

    parentDiv = $('#hotelCard');
    template = Handlebars.compile(document.getElementById('hotelTemplate').innerHTML);
    html = template(hotels[parseInt(localStorage.getItem('hotel'))]);
    parentDiv.append(html);

    parentDiv = $('#returnCard');
    template = Handlebars.compile(document.getElementById('returnTemplate').innerHTML);
    html = template(returns[parseInt(localStorage.getItem('return'))]);
    parentDiv.append(html);

    document.getElementById('total').innerHTML = 'Total: $' + numberWithCommas(calcTotal());
    localStorage.setItem('total', document.getElementById('total').innerHTML);

    document.getElementById('departure').onclick = function() {
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenDeparture', localStorage.getItem('departure'));
    };
    document.getElementById('hotel').onclick = function() {
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenHotel', localStorage.getItem('hotel'));
    };
    document.getElementById('return').onclick = function() {
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenReturn', localStorage.getItem('return'));
    };
}

function setupDepartures() {
    var current = localStorage.getItem('departure');

    var parentDiv = $('#currentCard');
    var template = Handlebars.compile(document.getElementById('currentTemplate').innerHTML);
    var html = template(departures[parseInt(current)]);
    parentDiv.append(html);

    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('link', 'departureflights.html');
        localStorage.setItem('chosenDeparture', current);
    };

    if (current == '0') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(departures[1]);
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(departures[2]);
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('departure', '1');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('departure', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', '1');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', '2');
        };
    }

    else if (current == '1') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(departures[0]);
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(departures[2]);
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('departure', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('departure', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', '0');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', '2');
        };
    }

    else if (current == '0') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(departures[0]);
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(departures[1]);
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('departure', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('departure', '1');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', '0');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', '1');
        };
    }
}

function setupReturns() {
    var current = localStorage.getItem('return');

    var parentDiv = $('#currentCard');
    var template = Handlebars.compile(document.getElementById('currentTemplate').innerHTML);
    var html = template(returns[parseInt(current)]);
    parentDiv.append(html);

    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('link', 'returnflights.html');
        localStorage.setItem('chosenReturn', current);
    };

    if (current == '0') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(returns[1]);
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(returns[2]);
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('return', '1');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('return', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', '1');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', '2');
        };
    }

    else if (current == '1') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(returns[0]);
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(returns[2]);
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('return', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('return', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', '0');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', '2');
        };
    }

    else if (current == '2') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(returns[0]);
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(returns[1]);
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('return', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('return', '1');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', '0');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', '1');
        };
    }
}

function setupHotels() {
    var current = localStorage.getItem('hotel');

    var parentDiv = $('#currentCard');
    var template = Handlebars.compile(document.getElementById('currentTemplate').innerHTML);
    var html = template(hotels[parseInt(current)]);
    parentDiv.append(html);

    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('link', 'hotels.html');
        localStorage.setItem('chosenHotel', current);
    };

    if (current == '0') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(hotels[1]);
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(hotels[2]);
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('hotel', '1');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('hotel', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', '1');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', '2');
        };
    }

    else if (current == '1') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(hotels[0]);
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(hotels[2]);
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('hotel', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('hotel', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', '0');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', '2');
        };
    }

    else if (current == '2') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(hotels[0]);
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(hotels[1]);
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('hotel', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('hotel', '1');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', '0');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', '1');
        };
    }
}

function setupPurchase() {
    var depFlight = localStorage.getItem('departure');
    var hotel = localStorage.getItem('hotel');
    var retFlight = localStorage.getItem('return');
    var flighttotal = 0;

    document.getElementById('hotel').innerHTML = 'Hotel: $' + numberWithCommas(parseInt(hotels[hotel].price));
    document.getElementById('flight').innerHTML = 'Flight: $' + numberWithCommas(parseInt(departures[depFlight].price) + parseInt(returns[retFlight].price));
    document.getElementById('total').innerHTML = localStorage.getItem('total');
}

function setupDeparture() {
    document.getElementById('link').setAttribute('href', localStorage.getItem('link'));
    setupView(0);
}

function setupReturn() {
    document.getElementById('link').setAttribute('href', localStorage.getItem('link'));
    setupView(1);
}

function setupView(type) {
    var index = -1;
    var data = {};

    if (type == 0) {
        index = localStorage.getItem('chosenDeparture');
        data = departures[index];
    }

    else {
        index = localStorage.getItem('chosenReturn');
        data = returns[index];
    }

    var parentDiv = $('#info');
    var template = Handlebars.compile(document.getElementById('infoTemplate').innerHTML);
    var html = template(data);
    parentDiv.append(html);
}

function setupHotel() {
    var index = localStorage.getItem('chosenHotel');
    var parentDiv = $('#info');
    var template = Handlebars.compile(document.getElementById('infoTemplate').innerHTML);
    var html = template(hotels[index]);
    parentDiv.append(html);

    document.getElementById('link').setAttribute('href', localStorage.getItem('link'));
    document.getElementById('name').innerHTML = hotels[index].hotel;

    if (index == '0') {
        document.getElementById('img1').setAttribute('src', 'pics/motel1.jpg');
        document.getElementById('img2').setAttribute('src', 'pics/motel2.jpg');
        document.getElementById('img3').setAttribute('src', 'pics/motel3.jpg');
    }

    else if (index == 'Le Hotel') {
        document.getElementById('img1').setAttribute('src', 'pics/hotel1.jpg');
        document.getElementById('img2').setAttribute('src', 'pics/hotel2.jpg');
        document.getElementById('img3').setAttribute('src', 'pics/hotel3.jpg');
    }

    else if (index == 'Le Beau Hotel') {
        document.getElementById('img1').setAttribute('src', 'pics/bhotel1.jpg');
        document.getElementById('img2').setAttribute('src', 'pics/bhotel2.jpg');
        document.getElementById('img3').setAttribute('src', 'pics/bhotel3.jpg');
    }
}

function calcTotal() {
    var depFlight = localStorage.getItem('departure');
    var hotel = localStorage.getItem('hotel');
    var retFlight = localStorage.getItem('return');

    return parseInt(departures[depFlight].price) + parseInt(hotels[hotel].price) + parseInt(returns[retFlight].price);
}

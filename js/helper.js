var baseDepartures = [
    {'time': '11:10 A.M. - 7:45 A.M.', 'duration': '12h 35m', 'airline': 'Ryanair', 'price': '500', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '11:10 A.M. - 7:45 A.M.', 'duration': '12h 35m', 'airline': 'American Airlines', 'price': '650', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '11:10 A.M. - 7:45 A.M.', 'duration': '12h 35m', 'airline': 'Air France', 'price': '700', 'plane': 'Boeing 787', 'misc': 'One free carry-on'}
];

var baseHotels = [
    {'hotel': 'Le Motel', 'stars': '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>', 'rating': '78% Recommended on TripAdvisor', 'price': '70', 'starsString': '3', 'misc': 'Close to CDG Airport'},
    {'hotel': 'Le Hotel', 'stars': '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>', 'rating': '87% Recommended on TripAdvisor', 'price': '300', 'starsString': '4', 'misc': 'Near great authentic French restaurants'},
    {'hotel': 'Le Beau Hotel', 'stars': '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>', 'rating': '95% Recommended on TripAdvisor', 'price': '700', 'starsString': '5', 'misc': 'Beautiful Views'}
];

var baseReturns = [
    {'time': '10:40 A.M. - 5:46 A.M.', 'duration': '15h 6m', 'airline': 'Ryanair', 'price': '500', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '10:40 A.M. - 5:46 A.M.', 'duration': '15h 6m', 'airline': 'American Airlines', 'price': '650', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '10:40 A.M. - 5:46 A.M.', 'duration': '15h 6m', 'airline': 'Air France', 'price': '700', 'plane': 'Boeing 787', 'misc': 'One free carry-on'}
];

// Taken from StackOverflow
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function originCity() {
    localStorage.setItem('origin', document.getElementById("originCity").value);
}

function destinationCity() {
    localStorage.setItem('destination', document.getElementById("destinationCity").value);
}

function dates() {
    var start = $('#datespicker').data('daterangepicker').startDate;
    var end = $('#datespicker').data('daterangepicker').endDate;
    var difference = end.diff(start, 'days');
    console.log(difference);
    localStorage.setItem('dates', difference);
    localStorage.setItem('datesValues', document.getElementById("datespicker").value);
    localStorage.setItem('datesStart', document.getElementById("datespicker").data('daterangepicker').startDate);
    localStorage.setItem('datesEnd', document.getElementById("datespicker").data('daterangepicker').endDate);
}

/*
function party() {
    localStorage.setItem('party', document.getElementById('party').value);
}
*/

function confirmation() {
    localStorage.clear();
}

function setupPackages() {
    var departures = baseDepartures;
    var hotels = baseHotels;
    var returns = baseReturns;

    for (i = 0; i < 3; i++) {
        departures[i].duration += ' ' + localStorage.getItem('origin') + ' - ' + localStorage.getItem('destination');
        departures[i].price = parseInt(departures[i].price) * parseInt(localStorage.getItem('party'));
        returns[i].duration += ' ' + localStorage.getItem('destination') + ' - ' + localStorage.getItem('origin');
        returns[i].price = parseInt(returns[i].price) * parseInt(localStorage.getItem('party'));
        hotels[i].hotel += ' ' + localStorage.getItem('destination');
        hotels[i].price = parseInt(hotels[i].price) * parseInt(localStorage.getItem('party')) * parseInt(localStorage.getItem('dates'));
    }

    localStorage.setItem('basicDep', JSON.stringify(departures[0]));
    localStorage.setItem('premDep', JSON.stringify(departures[1]));
    localStorage.setItem('luxDep', JSON.stringify(departures[2]));
    localStorage.setItem('basicHot', JSON.stringify(hotels[0]));
    localStorage.setItem('premHot', JSON.stringify(hotels[1]));
    localStorage.setItem('luxHot', JSON.stringify(hotels[2]));
    localStorage.setItem('basicRet', JSON.stringify(returns[0]));
    localStorage.setItem('premRet', JSON.stringify(returns[1]));
    localStorage.setItem('luxRet', JSON.stringify(returns[2]));


    var parentDiv = $('#basicCard');
    var template = Handlebars.compile(document.getElementById('basicTemplate').innerHTML);
    var data = {
        'airline': departures[0].airline,
        'stars': hotels[0].stars,
        'price': numberWithCommas(parseInt(departures[0].price) + parseInt(hotels[0].price) + parseInt(returns[0].price))
    }
    var html = template(data);
    parentDiv.append(html);

    parentDiv = $('#premiumCard');
    template = Handlebars.compile(document.getElementById('premiumTemplate').innerHTML);
    data = {
        'airline': departures[1].airline,
        'stars': hotels[1].stars,
        'price': numberWithCommas(parseInt(departures[1].price) + parseInt(hotels[1].price) + parseInt(returns[1].price))
    }
    html = template(data);
    parentDiv.append(html);

    parentDiv = $('#luxuryCard');
    template = Handlebars.compile(document.getElementById('luxuryTemplate').innerHTML);
    data = {
        'airline': departures[2].airline,
        'stars': hotels[2].stars,
        'price': numberWithCommas(parseInt(departures[2].price) + parseInt(hotels[2].price) + parseInt(returns[2].price))
    }
    html = template(data);
    parentDiv.append(html);

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

function findLocation(location) {
    document.getElementById("originCity").value = location;
}

function choosePackage(package) {
    if (package == 'basic') {
        localStorage.setItem('departure', localStorage.getItem('basicDep'));
        localStorage.setItem('depNum', '0');
        localStorage.setItem('hotel', localStorage.getItem('basicHot'));
        localStorage.setItem('hotNum', '0');
        localStorage.setItem('return', localStorage.getItem('basicRet'));
        localStorage.setItem('retNum', '0');
    }

    else if (package == 'premium') {
        localStorage.setItem('departure', localStorage.getItem('premDep'));
        localStorage.setItem('depNum', '1');
        localStorage.setItem('hotel', localStorage.getItem('premHot'));
        localStorage.setItem('hotNum', '1');
        localStorage.setItem('return', localStorage.getItem('premRet'));
        localStorage.setItem('retNum', '1');
    }

    else if (package == 'luxury') {
        localStorage.setItem('departure', localStorage.getItem('luxDep'));
        localStorage.setItem('depNum', '2');
        localStorage.setItem('hotel', localStorage.getItem('luxHot'));
        localStorage.setItem('hotNum', '2');
        localStorage.setItem('return', localStorage.getItem('luxRet'));
        localStorage.setItem('retNum', '2');
    }
}

function setupDetails() {
    var parentDiv = $('#departureCard');
    var template = Handlebars.compile(document.getElementById('departureTemplate').innerHTML);
    var html = template(JSON.parse(localStorage.getItem('departure')));
    parentDiv.append(html);

    parentDiv = $('#hotelCard');
    template = Handlebars.compile(document.getElementById('hotelTemplate').innerHTML);
    html = template(JSON.parse(localStorage.getItem('hotel')));
    parentDiv.append(html);

    parentDiv = $('#returnCard');
    template = Handlebars.compile(document.getElementById('returnTemplate').innerHTML);
    html = template(JSON.parse(localStorage.getItem('return')));
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
        localStorage.setItem('chosenHotNum', localStorage.getItem('hotNum'));
    };
    document.getElementById('return').onclick = function() {
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenReturn', localStorage.getItem('return'));
    };
}

function setupDepartures() {
    var current = JSON.parse(localStorage.getItem('departure'));
    var current_num = localStorage.getItem('depNum');

    var parentDiv = $('#currentCard');
    var template = Handlebars.compile(document.getElementById('currentTemplate').innerHTML);
    var html = template(current);
    parentDiv.append(html);

    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('link', 'departureflights.html');
        localStorage.setItem('chosenDeparture', localStorage.getItem('departure'));
    };

    if (current_num == '0') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(JSON.parse(localStorage.getItem('premDep')));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(JSON.parse(localStorage.getItem('luxDep')));
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('premDep'));
            localStorage.setItem('depNum', '1');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('luxDep'));
            localStorage.setItem('depNum', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('premDep'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('luxDep'));
        };
    }

    else if (current_num == '1') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(JSON.parse(localStorage.getItem('basicDep')));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(JSON.parse(localStorage.getItem('luxDep')));
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('basicDep'));
            localStorage.setItem('depNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('luxDep'));
            localStorage.setItem('depNum', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('basicDep'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('luxDep'));
        };
    }

    else if (current_num == '2') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(JSON.parse(localStorage.getItem('basicDep')));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(JSON.parse(localStorage.getItem('premDep')));
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('basicDep'));
            localStorage.setItem('depNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('premDep'));
            localStorage.setItem('depNum', '1');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('basicDep'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('premDep'));
        };
    }
}

function setupReturns() {
    var current = JSON.parse(localStorage.getItem('return'));
    var current_num = localStorage.getItem('retNum');

    var parentDiv = $('#currentCard');
    var template = Handlebars.compile(document.getElementById('currentTemplate').innerHTML);
    var html = template(current);
    parentDiv.append(html);

    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('link', 'returnflights.html');
        localStorage.setItem('chosenReturn', localStorage.getItem('return'));
    };

    if (current_num == '0') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(JSON.parse(localStorage.getItem('premRet')));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(JSON.parse(localStorage.getItem('luxRet')));
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('premRet'));
            localStorage.setItem('retNum', '1');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('luxRet'));
            localStorage.setItem('retNum', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('premRet'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('luxRet'));
        };
    }

    else if (current_num == '1') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(JSON.parse(localStorage.getItem('basicRet')));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(JSON.parse(localStorage.getItem('luxRet')));
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('basicRet'));
            localStorage.setItem('retNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('luxRet'));
            localStorage.setItem('retNum', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('basicRet'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('luxRet'));
        };
    }

    else if (current_num == '2') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(JSON.parse(localStorage.getItem('basicRet')));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(JSON.parse(localStorage.getItem('premRet')));
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('basicRet'));
            localStorage.setItem('retNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('premRet'));
            localStorage.setItem('retNum', '1');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('basicRet'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('premRet'));
        };
    }
}

function setupHotels() {
    var current = JSON.parse(localStorage.getItem('hotel'));
    var current_num = localStorage.getItem('hotNum');

    var parentDiv = $('#currentCard');
    var template = Handlebars.compile(document.getElementById('currentTemplate').innerHTML);
    var html = template(current);
    parentDiv.append(html);

    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('link', 'hotels.html');
        localStorage.setItem('chosenHotel', localStorage.getItem('hotel'));
        localStorage.setItem('chosenHotNum', localStorage.getItem('hotNum'));
    };

    if (current_num == '0') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(JSON.parse(localStorage.getItem('premHot')));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(JSON.parse(localStorage.getItem('luxHot')));
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('premHot'));
            localStorage.setItem('hotNum', '1');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('luxHot'));
            localStorage.setItem('hotNum', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', localStorage.getItem('premHot'));
            localStorage.setItem('chosenHotNum', '1');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', localStorage.getItem('luxHot'));
            localStorage.setItem('chosenHotNum', '2');
        };
    }

    else if (current_num == '1') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(JSON.parse(localStorage.getItem('basicHot')));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(JSON.parse(localStorage.getItem('luxHot')));
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('basicHot'));
            localStorage.setItem('hotNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('luxHot'));
            localStorage.setItem('hotNum', '2');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', localStorage.getItem('basicHot'));
            localStorage.setItem('chosenHotNum', '0');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', localStorage.getItem('luxHot'));
            localStorage.setItem('chosenHotNum', '2');
        };
    }

    else if (current_num == '2') {
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(JSON.parse(localStorage.getItem('basicHot')));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(JSON.parse(localStorage.getItem('premHot')));
        parentDiv.append(html);

        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('basicHot'));
            localStorage.setItem('hotNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('premHot'));
            localStorage.setItem('hotNum', '1');
        };

        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', localStorage.getItem('basicHot'));
            localStorage.setItem('chosenHotNum', '0');
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'hotels.html');
            localStorage.setItem('chosenHotel', localStorage.getItem('premHot'));
            localStorage.setItem('chosenHotNum', '1');
        };
    }
}

function setupPurchase() {
    var depFlight = JSON.parse(localStorage.getItem('departure'));
    var hotel = JSON.parse(localStorage.getItem('hotel'));
    var retFlight = JSON.parse(localStorage.getItem('return'));

    document.getElementById('hotel').innerHTML = 'Hotel: $' + numberWithCommas(parseInt(hotel.price));
    document.getElementById('flight').innerHTML = 'Flight: $' + numberWithCommas(parseInt(depFlight.price) + parseInt(retFlight.price));
    document.getElementById('total').innerHTML = localStorage.getItem('total');
}

function setupView(type) {
    document.getElementById('link').setAttribute('href', localStorage.getItem('link'));

    var index = -1;
    var data = {};

    if (type == 0) {
        data = JSON.parse(localStorage.getItem('chosenDeparture'));
    }

    else {
        data = JSON.parse(localStorage.getItem('chosenReturn'));
    }

    var parentDiv = $('#info');
    var template = Handlebars.compile(document.getElementById('infoTemplate').innerHTML);
    var html = template(data);
    parentDiv.append(html);
}

function setupHotel() {
    var data = JSON.parse(localStorage.getItem('chosenHotel'));
    var index = localStorage.getItem('chosenHotNum')
    var parentDiv = $('#info');
    var template = Handlebars.compile(document.getElementById('infoTemplate').innerHTML);
    var html = template(data);
    parentDiv.append(html);

    document.getElementById('link').setAttribute('href', localStorage.getItem('link'));
    document.getElementById('name').innerHTML = data.hotel;

    if (index == '0') {
        document.getElementById('img1').setAttribute('src', 'pics/motel1.jpg');
        document.getElementById('img2').setAttribute('src', 'pics/motel2.jpg');
        document.getElementById('img3').setAttribute('src', 'pics/motel3.jpg');
    }

    else if (index == '1') {
        document.getElementById('img1').setAttribute('src', 'pics/hotel1.jpg');
        document.getElementById('img2').setAttribute('src', 'pics/hotel2.jpg');
        document.getElementById('img3').setAttribute('src', 'pics/hotel3.jpg');
    }

    else if (index == '2') {
        document.getElementById('img1').setAttribute('src', 'pics/bhotel1.jpg');
        document.getElementById('img2').setAttribute('src', 'pics/bhotel2.jpg');
        document.getElementById('img3').setAttribute('src', 'pics/bhotel3.jpg');
    }
}

function calcTotal() {
    var depFlight = JSON.parse(localStorage.getItem('departure'));
    var hotel = JSON.parse(localStorage.getItem('hotel'));
    var retFlight = JSON.parse(localStorage.getItem('return'));

    return parseInt(depFlight.price) + parseInt(hotel.price) + parseInt(retFlight.price);
}

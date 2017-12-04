// Fake data
var baseDepartures = [
    {'time': '11:10 A.M. - 7:45 A.M.', 'duration': '12h 35m', 'airline': 'Ryanair', 'price': '500', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '11:10 A.M. - 7:45 A.M.', 'duration': '12h 35m', 'airline': 'American Airlines', 'price': '650', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '11:10 A.M. - 7:45 A.M.', 'duration': '12h 35m', 'airline': 'Air France', 'price': '700', 'plane': 'Boeing 787', 'misc': 'One free carry-on'}
];

var baseHotels = [
    {'hotel': 'Le Motel', 'stars': '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>', 'rating': '78% Recommended on TripAdvisor', 'price': '70', 'starsString': '3', 'misc': 'Close to the airport'},
    {'hotel': 'Le Hotel', 'stars': '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>', 'rating': '87% Recommended on TripAdvisor', 'price': '300', 'starsString': '4', 'misc': 'Near great restaurants'},
    {'hotel': 'Le Beau Hotel', 'stars': '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>', 'rating': '95% Recommended on TripAdvisor', 'price': '700', 'starsString': '5', 'misc': 'Beautiful Views'}
];

var baseReturns = [
    {'time': '10:40 A.M. - 5:46 A.M.', 'duration': '15h 6m', 'airline': 'Ryanair', 'price': '500', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '10:40 A.M. - 5:46 A.M.', 'duration': '15h 6m', 'airline': 'American Airlines', 'price': '650', 'plane': 'Boeing 787', 'misc': 'One free carry-on'},
    {'time': '10:40 A.M. - 5:46 A.M.', 'duration': '15h 6m', 'airline': 'Air France', 'price': '700', 'plane': 'Boeing 787', 'misc': 'One free carry-on'}
];

// Allows the user to press 'enter' button to continue on form pages
// Adapted from https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
function enterSubmit(textID) {
    document.getElementById(textID)
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementsByClassName("t-continue")[0].click()
    }
});
}

// Taken from StackOverflow
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Store origin city input from user
function originCity() {
    localStorage.setItem('origin', document.getElementById("originCity").value);
}

// Store destination city input from user
function destinationCity() {
    localStorage.setItem('destination', document.getElementById("destinationCity").value);
}

// Store dates input from user
function dates() {
    //var start = $('#datespicker').data('daterangepicker').startDate;
    //var end = $('#datespicker').data('daterangepicker').endDate;
    //var difference = end.diff(start, 'days');
    var start = moment($('#start-date').data('mk-datepicker').date);
    var end = moment($('#end-date').data('mk-datepicker').date);
    var difference = end.diff(start, 'days');
    console.log("difference");
    console.log(difference);
    localStorage.setItem('dates', difference);
    localStorage.setItem('datesValues', document.getElementById("datespicker").value);
    localStorage.setItem('datesStart', start);//document.getElementById("datespicker").data('daterangepicker').startDate);
    localStorage.setItem('datesEnd', end);//document.getElementById("datespicker").data('daterangepicker').endDate);
}

// Clear localStorage after confirming purchase
function confirmation() {
    localStorage.clear();
}

// Set up packages page
function setupPackages() {
    var departures = baseDepartures;
    var hotels = baseHotels;
    var returns = baseReturns;

    // Add to fake data using user input
    for (i = 0; i < 3; i++) {
        departures[i].duration += ' ' + localStorage.getItem('origin') + ' - ' + localStorage.getItem('destination');
        departures[i].price = parseInt(departures[i].price) * parseInt(localStorage.getItem('party'));
        returns[i].duration += ' ' + localStorage.getItem('destination') + ' - ' + localStorage.getItem('origin');
        returns[i].price = parseInt(returns[i].price) * parseInt(localStorage.getItem('party'));
        hotels[i].hotel += ' ' + localStorage.getItem('destination');
        hotels[i].price = parseInt(hotels[i].price) * parseInt(localStorage.getItem('party')) * parseInt(localStorage.getItem('dates'));
    }

    // Store new fake data adjusted with user input in localStorage
    localStorage.setItem('basicDep', JSON.stringify(departures[0]));
    localStorage.setItem('premDep', JSON.stringify(departures[1]));
    localStorage.setItem('luxDep', JSON.stringify(departures[2]));
    localStorage.setItem('basicHot', JSON.stringify(hotels[0]));
    localStorage.setItem('premHot', JSON.stringify(hotels[1]));
    localStorage.setItem('luxHot', JSON.stringify(hotels[2]));
    localStorage.setItem('basicRet', JSON.stringify(returns[0]));
    localStorage.setItem('premRet', JSON.stringify(returns[1]));
    localStorage.setItem('luxRet', JSON.stringify(returns[2]));

    // Populate package card templates with given fake data
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

    // Onclick functions for choosing a package buttons
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

// Populates origin city text box with given location (always called with San Diego)
function findLocation(location) {
    document.getElementById("originCity").value = location;
    document.getElementById("originCity").focus();
}

// Sets up localStorage based on package chosen
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

// Set up the data of each flight card
function setFlightData(allData) {
    var returnData =  {
        'time': allData.time,
        'duration': allData.duration,
        'airline': allData.airline,
        'price': numberWithCommas(allData.price)
    };
    return returnData;
}

function setHotelData(allData) {
    returnData = {
        'hotel': allData.hotel,
        'stars': allData.stars,
        'rating': allData.rating,
        'price': numberWithCommas(allData.price)
    };
    return returnData;
}

// Set up details page
function setupDetails() {
    // Populate package item card templates with fake data
    var parentDiv = $('#departureCard');
    var template = Handlebars.compile(document.getElementById('departureTemplate').innerHTML);
    var data = JSON.parse(localStorage.getItem('departure'));
    var html = template(setFlightData(data));
    parentDiv.append(html);

    parentDiv = $('#hotelCard');
    template = Handlebars.compile(document.getElementById('hotelTemplate').innerHTML);
    data = JSON.parse(localStorage.getItem('hotel'));
    html = template(setHotelData(data));
    parentDiv.append(html);

    parentDiv = $('#returnCard');
    template = Handlebars.compile(document.getElementById('returnTemplate').innerHTML);
    data = JSON.parse(localStorage.getItem('return'));
    html = template(setFlightData(data));
    parentDiv.append(html);

    // Calculate and display correct total, store it in localStorage
    document.getElementById('total').innerHTML = 'Total: $' + numberWithCommas(calcTotal());
    localStorage.setItem('total', document.getElementById('total').innerHTML);

    // Onclicks for viewing each package item
    document.getElementById('departure').onclick = function() {
        // Send click event to Google Analytics
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenDeparture', localStorage.getItem('departure'));
    };
    document.getElementById('hotel').onclick = function() {
        // Send click event to Google Analytics
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenHotel', localStorage.getItem('hotel'));
        localStorage.setItem('chosenHotNum', localStorage.getItem('hotNum'));
    };
    document.getElementById('return').onclick = function() {
        // Send click event to Google Analytics
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenReturn', localStorage.getItem('return'));
    };
}

// Set up oldDetails page
function setupOldDetails() {
    // Populate package item card templates with fake data
    var parentDiv = $('#departureCard');
    var template = Handlebars.compile(document.getElementById('departureTemplate').innerHTML);
    allData = JSON.parse(localStorage.getItem('departure'));
    var html = template(setFlightData(allData));
    parentDiv.append(html);

    parentDiv = $('#hotelCard');
    template = Handlebars.compile(document.getElementById('hotelTemplate').innerHTML);
    allData = JSON.parse(localStorage.getItem('hotel'));
    html = template(setHotelData(allData));
    parentDiv.append(html);

    parentDiv = $('#returnCard');
    template = Handlebars.compile(document.getElementById('returnTemplate').innerHTML);
    allData = JSON.parse(localStorage.getItem('return'));
    html = template(setFlightData(allData));
    parentDiv.append(html);

    // Calculate and display correct total, store it in localStorage
    document.getElementById('total').innerHTML = 'Total: $' + numberWithCommas(calcTotal());
    localStorage.setItem('total', document.getElementById('total').innerHTML);

    // Onclicks for viewing each package item
    document.getElementById('departure').onclick = function() {
        // Send click event to Google Analytics
        tracker = ga.getAll()[0];
        tracker.send('event', 'view', 'click');
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenDeparture', localStorage.getItem('departure'));
    };
    document.getElementById('hotel').onclick = function() {
        // Send click event to Google Analytics
        tracker = ga.getAll()[0];
        tracker.send('event', 'view', 'click');
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenHotel', localStorage.getItem('hotel'));
        localStorage.setItem('chosenHotNum', localStorage.getItem('hotNum'));
    };
    document.getElementById('return').onclick = function() {
        // Send click event to Google Analytics
        tracker = ga.getAll()[0];
        tracker.send('event', 'view', 'click');
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenReturn', localStorage.getItem('return'));
    };
}

// Set up newDetails page
function setupRedesign() {
    // Populate package item card templates with fake data
    var parentDiv = $('#departureCard');
    var template = Handlebars.compile(document.getElementById('departureTemplate').innerHTML);
    var data = JSON.parse(localStorage.getItem('departure'));
    var html = template(setFlightData(data));
    parentDiv.append(html);

    parentDiv = $('#hotelCard');
    template = Handlebars.compile(document.getElementById('hotelTemplate').innerHTML);
    data = JSON.parse(localStorage.getItem('hotel'));
    html = template(setHotelData(data));
    parentDiv.append(html);

    parentDiv = $('#returnCard');
    template = Handlebars.compile(document.getElementById('returnTemplate').innerHTML);
    data = JSON.parse(localStorage.getItem('return'));
    html = template(setFlightData(data));
    parentDiv.append(html);

    // Calculate and display correct total, store it in localStorage
    document.getElementById('total').innerHTML = 'Total: $' + numberWithCommas(calcTotal());
    localStorage.setItem('total', document.getElementById('total').innerHTML);

    // Onclicks for viewing each package item
    document.getElementById('departure').onclick = function() {
        // Send click event to Google Analytics
        tracker = ga.getAll()[0];
        tracker.send('event', 'view', 'click');
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenDeparture', localStorage.getItem('departure'));
    };
    document.getElementById('hotel').onclick = function() {
        // Send click event to Google Analytics
        tracker = ga.getAll()[0];
        tracker.send('event', 'view', 'click');
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenHotel', localStorage.getItem('hotel'));
        localStorage.setItem('chosenHotNum', localStorage.getItem('hotNum'));
    };
    document.getElementById('return').onclick = function() {
        // Send click event to Google Analytics
        tracker = ga.getAll()[0];
        tracker.send('event', 'view', 'click');
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('chosenReturn', localStorage.getItem('return'));
    };
}

// Set up edit departures page
function setupDepartures() {
    // Get current departure choice information from localStorage
    var current = JSON.parse(localStorage.getItem('departure'));
    var current_num = localStorage.getItem('depNum');

    // Populate current departure card template
    var parentDiv = $('#currentCard');
    var template = Handlebars.compile(document.getElementById('currentTemplate').innerHTML);
    var html = template(setFlightData(current));
    parentDiv.append(html);

    // Onclick to set link and chosen departure to view
    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('link', 'departureflights.html');
        localStorage.setItem('chosenDeparture', localStorage.getItem('departure'));
    };

    // Current departure is the basic departure
    if (current_num == '0') {
        // Populate alternative card templates
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        allData = JSON.parse(localStorage.getItem('premDep'));
        html = template(setFlightData(allData));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        allData = JSON.parse(localStorage.getItem('luxDep'));
        html = template(setFlightData(allData));
        parentDiv.append(html);

        // Onclick to change departure when choose is clicked
        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('premDep'));
            localStorage.setItem('depNum', '1');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('luxDep'));
            localStorage.setItem('depNum', '2');
        };

        // Onclick to set link and chosen departure to view
        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('premDep'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('luxDep'));
        };
    }

    // Current departure is the premium departure
    else if (current_num == '1') {
        // Populate alternative card templates
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(setFlightData(JSON.parse(localStorage.getItem('basicDep'))));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(setFlightData(JSON.parse(localStorage.getItem('luxDep'))));
        parentDiv.append(html);

        // Onclick to change departure when choose is clicked
        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('basicDep'));
            localStorage.setItem('depNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('luxDep'));
            localStorage.setItem('depNum', '2');
        };

        // Onclick to set link and chosen departure to view
        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('basicDep'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'departureflights.html');
            localStorage.setItem('chosenDeparture', localStorage.getItem('luxDep'));
        };
    }

    // Current departure is the luxury departure
    else if (current_num == '2') {
        // Populate alternative card templates
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        html = template(setFlightData(JSON.parse(localStorage.getItem('basicDep'))));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        html = template(setFlightData(JSON.parse(localStorage.getItem('premDep'))));
        parentDiv.append(html);

        // Onclick to change departure when choose is clicked
        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('basicDep'));
            localStorage.setItem('depNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('departure', localStorage.getItem('premDep'));
            localStorage.setItem('depNum', '1');
        };

        // Onclick to set link and chosen departure to view
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

// Set up edit returns page
function setupReturns() {
    // Get current return choice information from localStorage
    var current = JSON.parse(localStorage.getItem('return'));
    var current_num = localStorage.getItem('retNum');

    // Populate current return card template
    var parentDiv = $('#currentCard');
    var template = Handlebars.compile(document.getElementById('currentTemplate').innerHTML);
    var html = template(setFlightData(current));
    parentDiv.append(html);

    // Onclick to set link and chosen return to view
    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('link', 'returnflights.html');
        localStorage.setItem('chosenReturn', localStorage.getItem('return'));
    };

    // Current return is the basic return
    if (current_num == '0') {
        // Populate alternative card templates
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        allData = JSON.parse(localStorage.getItem('premRet'));
        html = template(setFlightData(allData));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        allData = JSON.parse(localStorage.getItem('luxRet'));
        html = template(setFlightData(allData));
        parentDiv.append(html);

        // Onclick to change return when choose is clicked
        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('premRet'));
            localStorage.setItem('retNum', '1');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('luxRet'));
            localStorage.setItem('retNum', '2');
        };

        // Onclick to set link and chosen return to view
        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('premRet'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('luxRet'));
        };
    }

    // Current return is the premium return
    else if (current_num == '1') {
        // Populate alternative card templates
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        allData = JSON.parse(localStorage.getItem('basicRet'))
        html = template(setFlightData(allData));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        allData = JSON.parse(localStorage.getItem('luxRet'));
        html = template(setFlightData(allData));
        parentDiv.append(html);

        // Onclick to change return when choose is clicked
        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('basicRet'));
            localStorage.setItem('retNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('luxRet'));
            localStorage.setItem('retNum', '2');
        };

        // Onclick to set link and chosen return to view
        document.getElementById('alternativeView1').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('basicRet'));
        };
        document.getElementById('alternativeView2').onclick = function() {
            localStorage.setItem('link', 'returnflights.html');
            localStorage.setItem('chosenReturn', localStorage.getItem('luxRet'));
        };
    }

    // Current return is the luxury return
    else if (current_num == '2') {
        // Populate alternative card templates
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        allData = JSON.parse(localStorage.getItem('basicRet'));
        html = template(setFlightData(allData));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        allData = JSON.parse(localStorage.getItem('premRet'));
        html = template(setFlightData(allData));
        parentDiv.append(html);

        // Onclick to change return when choose is clicked
        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('basicRet'));
            localStorage.setItem('retNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('return', localStorage.getItem('premRet'));
            localStorage.setItem('retNum', '1');
        };

        // Onclick to set link and chosen return to view
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

// Set up edit hotels page
function setupHotels() {
    // Get current hotel choice information from localStorage
    var current = JSON.parse(localStorage.getItem('hotel'));
    var current_num = localStorage.getItem('hotNum');

    // Populate current hotel card template
    var parentDiv = $('#currentCard');
    var template = Handlebars.compile(document.getElementById('currentTemplate').innerHTML);
    var html = template(setHotelData(current));
    parentDiv.append(html);

    // Onclick to set link and chosen hotel to view
    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('link', 'hotels.html');
        localStorage.setItem('chosenHotel', localStorage.getItem('hotel'));
        localStorage.setItem('chosenHotNum', localStorage.getItem('hotNum'));
    };

    // Current hotel is the basic hotel
    if (current_num == '0') {
        // Populate alternative card templates
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        data = JSON.parse(localStorage.getItem('premHot'));
        html = template(setHotelData(data));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        data = JSON.parse(localStorage.getItem('luxHot'));
        html = template(setHotelData(data));
        parentDiv.append(html);

        // Onclicks to change hotel when choose is clicked
        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('premHot'));
            localStorage.setItem('hotNum', '1');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('luxHot'));
            localStorage.setItem('hotNum', '2');
        };

        // Onclicks to set link and chosen hotel to view
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

    // Current hotel is the premium hotel
    else if (current_num == '1') {
        // Populate alternative card templates
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        data = JSON.parse(localStorage.getItem('basicHot'));
        html = template(setHotelData(data));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        data = JSON.parse(localStorage.getItem('luxHot'));
        html = template(setHotelData(data));
        parentDiv.append(html);

        // Onclicks to change hotel when choose is clicked
        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('basicHot'));
            localStorage.setItem('hotNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('luxHot'));
            localStorage.setItem('hotNum', '2');
        };

        // Onclicks to set link and chosen hotel to view
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

    // Current hotel is the luxury hotel
    else if (current_num == '2') {
        // Populate alternative card templates
        parentDiv = $('#alternativeCard1');
        template = Handlebars.compile(document.getElementById('alternativeTemplate1').innerHTML);
        data = JSON.parse(localStorage.getItem('basicHot'));
        html = template(setHotelData(data));
        parentDiv.append(html);

        parentDiv = $('#alternativeCard2');
        template = Handlebars.compile(document.getElementById('alternativeTemplate2').innerHTML);
        data = JSON.parse(localStorage.getItem('premHot'));
        html = template(setHotelData(data));
        parentDiv.append(html);

        // Onclicks to change hotel when choose is clicked
        document.getElementById('alternativeBtn1').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('basicHot'));
            localStorage.setItem('hotNum', '0');
        };
        document.getElementById('alternativeBtn2').onclick = function() {
            localStorage.setItem('hotel', localStorage.getItem('premHot'));
            localStorage.setItem('hotNum', '1');
        };

        // Onclicks to set link and chosen hotel to view
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

// Set up purchase page
function setupPurchase() {
    // Get chosen package information
    var depFlight = JSON.parse(localStorage.getItem('departure'));
    var hotel = JSON.parse(localStorage.getItem('hotel'));
    var retFlight = JSON.parse(localStorage.getItem('return'));

    // Display correct package price numbers
    document.getElementById('hotel').innerHTML = 'Hotel: $' + numberWithCommas(parseInt(hotel.price));
    document.getElementById('flight').innerHTML = 'Flight: $' + numberWithCommas(parseInt(depFlight.price) + parseInt(retFlight.price));
    document.getElementById('total').innerHTML = localStorage.getItem('total');
}

// Set up view flight page
function setupView(type) {
    // Set link to return to when back button is pressed
    document.getElementById('link').setAttribute('href', localStorage.getItem('link'));

    // Get data from localStorage based on type of flight
    var index = -1;
    var data = {};

    if (type == 0) {
        data = JSON.parse(localStorage.getItem('chosenDeparture'));
    }

    else {
        data = JSON.parse(localStorage.getItem('chosenReturn'));
    }

    // Populate info template
    var parentDiv = $('#info');
    var template = Handlebars.compile(document.getElementById('infoTemplate').innerHTML);
    var html = template(data);
    parentDiv.append(html);
}

// Set up view hotel page
function setupHotel() {
    // Get hotel info from localStorage
    var data = JSON.parse(localStorage.getItem('chosenHotel'));
    var index = localStorage.getItem('chosenHotNum');

    // Populate info template with chosen data
    var parentDiv = $('#info');
    var template = Handlebars.compile(document.getElementById('infoTemplate').innerHTML);
    var html = template(data);
    parentDiv.append(html);

    // Set up back button link and hotel name
    document.getElementById('link').setAttribute('href', localStorage.getItem('link'));
    document.getElementById('name').innerHTML = data.hotel;

    // Choose correct pictures to display based on hotel choice
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

// Calculate total cost of chosen package items
function calcTotal() {
    // Get chosen package items
    var depFlight = JSON.parse(localStorage.getItem('departure'));
    var hotel = JSON.parse(localStorage.getItem('hotel'));
    var retFlight = JSON.parse(localStorage.getItem('return'));

    return parseInt(depFlight.price) + parseInt(hotel.price) + parseInt(retFlight.price);
}

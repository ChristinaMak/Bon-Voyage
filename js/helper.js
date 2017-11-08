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

function choosePackage(package) {
    if (package == 'basic') {
        localStorage.setItem('departureAirline', "Ryanair");
        localStorage.setItem('hotelName', 'Le Motel');
        localStorage.setItem('hotelStars', '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>');
        localStorage.setItem('hotelRating', "78% Recommended on TripAdvisor");
        localStorage.setItem('returnAirline', "Ryanair");
        localStorage.setItem('total', "Total = $2,000");
    }

    else if (package == 'premium') {
        localStorage.setItem('departureAirline', "American Airlines");
        localStorage.setItem('hotelName', 'Le Hotel');
        localStorage.setItem('hotelStars', '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true">');
        localStorage.setItem('hotelRating', "87% Recommended on TripAdvisor");
        localStorage.setItem('returnAirline', "American Airlines");
        localStorage.setItem('total', "Total = $2,700");
    }

    else if (package == 'luxury') {
        localStorage.setItem('departureAirline', "Air France");
        localStorage.setItem('hotelName', 'Le Beau Hotel');
        localStorage.setItem('hotelStars', '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>');
        localStorage.setItem('hotelRating', "95% Recommended on TripAdvisor");
        localStorage.setItem('returnAirline', "Air France");
        localStorage.setItem('total', 'Total = $3,200');
    }
}

function setupDetails() {
    document.getElementById('departureAirline').innerHTML = localStorage.getItem('departureAirline');
    document.getElementById('hotelName').innerHTML = localStorage.getItem('hotelName');
    document.getElementById('hotelStars').innerHTML = localStorage.getItem('hotelStars');
    document.getElementById('hotelRating').innerHTML = localStorage.getItem('hotelRating');
    document.getElementById('returnAirline').innerHTML = localStorage.getItem('returnAirline');
    document.getElementById('total').innerHTML = localStorage.getItem('total');
}

function setupDepartures() {
    var current = localStorage.getItem('departureAirline');
    if (current == 'Ryanair') {
        document.getElementById('alternative1').innerHTML = 'American Airlines';
        document.getElementById('alternative2').innerHTML = 'Air France';
        document.getElementById('alternative1btn').onclick = function() {
            localStorage.setItem('departureAirline', 'American Airlines');
        };
        document.getElementById('alternative2btn').onclick = function() {
            localStorage.setItem('departureAirline', 'Air France');
        };
    }

    else if (current == 'American Airlines') {
        document.getElementById('alternative1').innerHTML = 'Ryanair';
        document.getElementById('alternative2').innerHTML = 'Air France';
        document.getElementById('alternative1btn').onclick = function() {
            localStorage.setItem('departureAirline', 'Ryanair');
        };
        document.getElementById('alternative2btn').onclick = function() {
            localStorage.setItem('departureAirline', 'Air France');
        };
    }

    else if (current == 'Air France') {
        document.getElementById('alternative1').innerHTML = 'Ryanair';
        document.getElementById('alternative2').innerHTML = 'American Airlines';
        document.getElementById('alternative1btn').onclick = function() {
            localStorage.setItem('departureAirline', 'Ryanair');
        };
        document.getElementById('alternative2btn').onclick = function() {
            localStorage.setItem('departureAirline', 'American Airlines');
        };
    }

    document.getElementById('current').innerHTML = current;
}

function setupReturns() {
    var current = localStorage.getItem('returnAirline');
    if (current == 'Ryanair') {
        document.getElementById('alternative1').innerHTML = 'American Airlines';
        document.getElementById('alternative2').innerHTML = 'Air France';
        document.getElementById('alternative1btn').onclick = function() {
            localStorage.setItem('returnAirline', 'American Airlines');
        };
        document.getElementById('alternative2btn').onclick = function() {
            localStorage.setItem('returnAirline', 'Air France');
        };
    }

    else if (current == 'American Airlines') {
        document.getElementById('alternative1').innerHTML = 'Ryanair';
        document.getElementById('alternative2').innerHTML = 'Air France';
        document.getElementById('alternative1btn').onclick = function() {
            localStorage.setItem('returnAirline', 'Ryanair');
        };
        document.getElementById('alternative2btn').onclick = function() {
            localStorage.setItem('returnAirline', 'Air France');
        };
    }

    else if (current == 'Air France') {
        document.getElementById('alternative1').innerHTML = 'Ryanair';
        document.getElementById('alternative2').innerHTML = 'American Airlines';
        document.getElementById('alternative1btn').onclick = function() {
            localStorage.setItem('returnAirline', 'Ryanair');
        };
        document.getElementById('alternative2btn').onclick = function() {
            localStorage.setItem('returnAirline', 'American Airlines');
        };
    }

    document.getElementById('current').innerHTML = current;
}

function setupHotels() {
    var current = localStorage.getItem('hotelName');
    if (current == 'Le Motel') {
        document.getElementById('alt1Name').innerHTML = 'Le Hotel';
        document.getElementById('alt1Stars').innerHTML = '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>';
        document.getElementById('alt1Rating').innerHTML = '87% Recommended on TripAdvisor';

        document.getElementById('alt2Name').innerHTML = 'Le Beau Hotel';
        document.getElementById('alt2Stars').innerHTML = '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>';
        document.getElementById('alt2Rating').innerHTML = '95% Recommended on TripAdvisor';
        document.getElementById('alt1Btn').onclick = function() {
            localStorage.setItem('hotelName', 'Le Hotel');
            localStorage.setItem('hotelStars', '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>');
            localStorage.setItem('hotelRating', '87% Recommended on TripAdvisor');
        };
        document.getElementById('alt2Btn').onclick = function() {
            localStorage.setItem('hotelName', 'Le Beau Hotel');
            localStorage.setItem('hotelStars', '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>');
            localStorage.setItem('hotelRating', '95% Recommended on TripAdvisor');
        };
    }

    else if (current == 'Le Hotel') {
        document.getElementById('alt1Name').innerHTML = 'Le Motel';
        document.getElementById('alt1Stars').innerHTML = '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>';
        document.getElementById('alt1Rating').innerHTML = '78% Recommended on TripAdvisor';

        document.getElementById('alt2Name').innerHTML = 'Le Beau Hotel';
        document.getElementById('alt2Stars').innerHTML = '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>';
        document.getElementById('alt2Rating').innerHTML = '95% Recommended on TripAdvisor';
        document.getElementById('alt1Btn').onclick = function() {
            localStorage.setItem('hotelName', 'Le Motel');
            localStorage.setItem('hotelStars', '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>');
            localStorage.setItem('hotelRating', '78% Recommended on TripAdvisor');
        };
        document.getElementById('alt2Btn').onclick = function() {
            localStorage.setItem('hotelName', 'Le Beau Hotel');
            localStorage.setItem('hotelStars', '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>');
            localStorage.setItem('hotelRating', '95% Recommended on TripAdvisor');
        };
    }

    else if (current == 'Le Beau Hotel') {
        document.getElementById('alt1Name').innerHTML = 'Le Motel';
        document.getElementById('alt1Stars').innerHTML = '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>';
        document.getElementById('alt1Rating').innerHTML = '78% Recommended on TripAdvisor';

        document.getElementById('alt2Name').innerHTML = 'Le Hotel';
        document.getElementById('alt2Stars').innerHTML = '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>';
        document.getElementById('alt2Rating').innerHTML = '87% Recommended on TripAdvisor';
        document.getElementById('alt1Btn').onclick = function() {
            localStorage.setItem('hotelName', 'Le Motel');
            localStorage.setItem('hotelStars', '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>');
            localStorage.setItem('hotelRating', '78% Recommended on TripAdvisor');
        };
        document.getElementById('alt2Btn').onclick = function() {
            localStorage.setItem('hotelName', 'Le Hotel');
            localStorage.setItem('hotelStars', '<i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i><i class="fa fa-star fa-2x" aria-hidden="true"></i>');
            localStorage.setItem('hotelRating', '87% Recommended on TripAdvisor');
        };
    }

    document.getElementById('currentName').innerHTML = current;
    document.getElementById('currentStars').innerHTML = localStorage.getItem('hotelStars');
    document.getElementById('currentRating').innerHTML = localStorage.getItem('hotelRating');
}

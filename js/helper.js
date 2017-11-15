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
    document.getElementById('total').innerHTML = 'Total: $' + numberWithCommas(calcTotal());

    localStorage.setItem('total', document.getElementById('total').innerHTML);

    document.getElementById('departure').onclick = function() {
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('airline', localStorage.getItem('departureAirline'));
    };
    document.getElementById('hotel').onclick = function() {
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('hotel', localStorage.getItem('hotelName'));
    };
    document.getElementById('return').onclick = function() {
        localStorage.setItem('link', 'details.html');
        localStorage.setItem('airline', localStorage.getItem('returnAirline'));
    };
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

        document.getElementById('alternative1view').onclick = function() {
            localStorage.setItem('airline', 'American Airlines');
            localStorage.setItem('link', 'departureflights.html');
        }
        document.getElementById('alternative2view').onclick = function() {
            localStorage.setItem('airline', 'Air France');
            localStorage.setItem('link', 'departureflights.html');
        }
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

        document.getElementById('alternative1view').onclick = function() {
            localStorage.setItem('airline', 'Ryanair');
            localStorage.setItem('link', 'departureflights.html');
        }
        document.getElementById('alternative2view').onclick = function() {
            localStorage.setItem('airline', 'Air France');
            localStorage.setItem('link', 'departureflights.html');
        }
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

        document.getElementById('alternative1view').onclick = function() {
            localStorage.setItem('airline', 'Ryanair');
            localStorage.setItem('link', 'departureflights.html');
        }
        document.getElementById('alternative2view').onclick = function() {
            localStorage.setItem('airline', 'American Airlines');
            localStorage.setItem('link', 'departureflights.html');
        }
    }

    document.getElementById('current').innerHTML = current;
    document.getElementById('currentview').onclick = function() {
        localStorage.setItem('airline', current);
        localStorage.setItem('link', 'departureflights.html');
    }
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

        document.getElementById('alternative1view').onclick = function() {
            localStorage.setItem('airline', 'American Airlines');
            localStorage.setItem('link', 'returnflights.html');
        }
        document.getElementById('alternative2view').onclick = function() {
            localStorage.setItem('airline', 'Air France');
            localStorage.setItem('link', 'returnflights.html');
        }
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

        document.getElementById('alternative1view').onclick = function() {
            localStorage.setItem('airline', 'Ryanair');
            localStorage.setItem('link', 'returnflights.html');
        }
        document.getElementById('alternative2view').onclick = function() {
            localStorage.setItem('airline', 'Air France');
            localStorage.setItem('link', 'returnflights.html');
        }
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

        document.getElementById('alternative1view').onclick = function() {
            localStorage.setItem('airline', 'Ryanair');
            localStorage.setItem('link', 'returnflights.html');
        }
        document.getElementById('alternative2view').onclick = function() {
            localStorage.setItem('airline', 'American Airlines');
            localStorage.setItem('link', 'returnflights.html');
        }
    }

    document.getElementById('current').innerHTML = current;
    document.getElementById('currentview').onclick = function() {
        localStorage.setItem('airline', current);
        localStorage.setItem('link', 'returnflights.html');
    }
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

        document.getElementById('alt1View').onclick = function() {
            localStorage.setItem('hotel', 'Le Hotel');
            localStorage.setItem('link', 'hotels.html');
        };
        document.getElementById('alt2View').onclick = function() {
            localStorage.setItem('hotel', 'Le Beau Hotel');
            localStorage.setItem('link', 'hotels.html');
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

        document.getElementById('alt1View').onclick = function() {
            localStorage.setItem('hotel', 'Le Motel');
            localStorage.setItem('link', 'hotels.html');
        };
        document.getElementById('alt2View').onclick = function() {
            localStorage.setItem('hotel', 'Le Beau Hotel');
            localStorage.setItem('link', 'hotels.html');
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

        document.getElementById('alt1View').onclick = function() {
            localStorage.setItem('hotel', 'Le Motel');
            localStorage.setItem('link', 'hotels.html');
        };
        document.getElementById('alt2View').onclick = function() {
            localStorage.setItem('hotel', 'Le Hotel');
            localStorage.setItem('link', 'hotels.html');
        };
    }

    document.getElementById('currentName').innerHTML = current;
    document.getElementById('currentStars').innerHTML = localStorage.getItem('hotelStars');
    document.getElementById('currentRating').innerHTML = localStorage.getItem('hotelRating');

    document.getElementById('currentView').onclick = function() {
        localStorage.setItem('hotel', current);
        localStorage.setItem('link', 'hotels.html');
    };
}

function setupPurchase() {
    var hotel = localStorage.getItem('hotelName');
    var depflight = localStorage.getItem('departureAirline');
    var retflight = localStorage.getItem('returnAirline');
    var flighttotal = 0;

    if (hotel == 'Le Motel') {
        document.getElementById('hotel').innerHTML = 'Hotel: $1,000';
    }

    else if (hotel == 'Le Hotel') {
        document.getElementById('hotel').innerHTML = 'Hotel: $1,400';
    }

    else if (hotel == 'Le Beau Hotel') {
        document.getElementById('hotel').innerHTML = 'Hotel: $1,800';
    }

    if (depflight == 'Ryanair') {
        flighttotal += 500;
    }

    else if (depflight == 'American Airlines') {
        flighttotal += 650;
    }

    else if (depflight == 'Air France') {
        flighttotal += 700;
    }

    if (retflight == 'Ryanair') {
        flighttotal += 500;
    }

    else if (retflight == 'American Airlines') {
        flighttotal += 650;
    }

    else if (retflight == 'Air France') {
        flighttotal += 700;
    }

    document.getElementById('flight').innerHTML = 'Flight: $' + numberWithCommas(flighttotal);
    document.getElementById('total').innerHTML = localStorage.getItem('total');
}

function setupView() {
    document.getElementById('airline').innerHTML = localStorage.getItem('airline');
    document.getElementById('link').setAttribute('href', localStorage.getItem('link'));
}

function setupHotel() {
    var name = localStorage.getItem('hotel');
    document.getElementById('link').setAttribute('href', localStorage.getItem('link'));
    document.getElementById('name').innerHTML = name;

    if (name == 'Le Motel') {
        document.getElementById('stars').innerHTML = '3 Star Hotel';
        document.getElementById('rating').innerHTML = '78% Recommended on TripAdvisor';
        document.getElementById('misc').innerHTML = 'Close to CDG Airport';

        document.getElementById('img1').setAttribute('src', 'pics/motel1.jpg');
        document.getElementById('img2').setAttribute('src', 'pics/motel2.jpg');
        document.getElementById('img3').setAttribute('src', 'pics/motel3.jpg');
    }

    else if (name == 'Le Hotel') {
        document.getElementById('stars').innerHTML = '4 Star Hotel';
        document.getElementById('rating').innerHTML = '87% Recommended on TripAdvisor';
        document.getElementById('misc').innerHTML = 'Near great authentic French restaurants';

        document.getElementById('img1').setAttribute('src', 'pics/hotel1.jpg');
        document.getElementById('img2').setAttribute('src', 'pics/hotel2.jpg');
        document.getElementById('img3').setAttribute('src', 'pics/hotel3.jpg');
    }

    else if (name == 'Le Beau Hotel') {
        document.getElementById('stars').innerHTML = '5 Star Hotel';
        document.getElementById('rating').innerHTML = '95% Recommended on TripAdvisor';
        document.getElementById('misc').innerHTML = 'Views of the Eiffel Tower';

        document.getElementById('img1').setAttribute('src', 'pics/bhotel1.jpg');
        document.getElementById('img2').setAttribute('src', 'pics/bhotel2.jpg');
        document.getElementById('img3').setAttribute('src', 'pics/bhotel3.jpg');
    }
}

function calcTotal() {
    var hotel = localStorage.getItem('hotelName');
    var depflight = localStorage.getItem('departureAirline');
    var retflight = localStorage.getItem('returnAirline');
    var total = 0;

    if (hotel == 'Le Motel') {
        total += 1000;
    }

    else if (hotel == 'Le Hotel') {
        total += 1400;
    }

    else if (hotel == 'Le Beau Hotel') {
        total += 1800;
    }

    if (depflight == 'Ryanair') {
        total += 500;
    }

    else if (depflight == 'American Airlines') {
        total += 650;
    }

    else if (depflight == 'Air France') {
        total += 700;
    }

    if (retflight == 'Ryanair') {
        total += 500;
    }

    else if (retflight == 'American Airlines') {
        total += 650;
    }

    else if (retflight == 'Air France') {
        total += 700;
    }

    return total;
}

const container = document.querySelector('.container');

// select all seats not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

// get count and total by id
const count = document.getElementById('count');
const total = document.getElementById('total');

// get movie selector by id
const movieSelect = document.getElementById('movie');

populateUi();

// get the movie select value
let ticketPrice = parseInt(movieSelect.value);

const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    localStorage.setItem('selectSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUi() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.includes(index)) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// add event listener for movie selection
movieSelect.addEventListener('change', e => {
    ticketPrice = parseInt(e.target.value);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// add event listener to container.. for a click.
container.addEventListener('click', e => {
    const theClassList = e.target.classList;
    if (theClassList.contains('seat') && !theClassList.contains('occupied')) {
        theClassList.toggle('selected');
        updateSelectedCount();
    }
})

// initial count
updateSelectedCount();
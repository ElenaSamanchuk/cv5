const API_KEY = '8c8e1a50-6322-4135-8875-5d40a5420d86';
const API_URL = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';

async function getMovies(URL) {
    const response = await fetch(URL, {
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log(data);
    showMovies(data);
}

getMovies(API_URL);

function showMovies(data) {
    const movies = document.querySelector('.movies');
    movies.innerHTML = '';
    data.films.forEach((movie) => {
        const element = document.createElement('div');
        element.classList.add('movie');
        element.innerHTML = `
            <img src="${movie.posterUrlPreview}" alt="poster" class="movie_poster">
            <div class="movie_name">Наименование: ${movie.nameRu}</div>
            <div class="movie_year">Год: ${movie.year}</div>
            <div class="movie_countries">Страна: ${movie.countries[0]['country']} ${movie.countries[1] ? movie.countries[1]['country'] : ''} ${movie.countries[2] ? movie.countries[2]['country'] : ''}</div> 
            <div class="movie_genres">Жанр: ${movie.genres[0]['genre']} ${movie.genres[1] ? movie.genres[1]['genre'] : ''} ${movie.genres[2] ? movie.genres[2]['genre'] : ''}</div> 
            <div class="movie_rating">${movie.rating && movie.rating>=0 && movie.rating<=10 ? `<span class="${getClassByRate(movie.rating)}">${movie.rating}</span>` : ''}</div>
            <div class="movie_length">${movie.filmLength ? `Время: ${movie.filmLength}` : ''}</div>
        `;
        movies.appendChild(element);
        element.addEventListener('click', () => {openModal(movie.filmId)});
    });   
};

function getClassByRate(rating) {
    if (rating > 7) {
        return 'green'
    } else if (rating > 4) {
        return 'orange'
    } else {
        return 'red'
    }
}

const API_SEARCH = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

const form = document.querySelector('form');
const input = document.querySelector('.header_search');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const apiSearch = `${API_SEARCH}${input.value}`;
    if (input.value) {
        getMovies(apiSearch);
        input.value = '';
    }
});

const API_DETAILS = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/';
const modal = document.querySelector('.modal');

async function openModal(id) {
    const response = await fetch(API_DETAILS + id, {
        headers: {
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log(data);    

    modal.classList.add('show');
    document.body.classList.add('stop-scrolling');
    modal.innerHTML = `
        <div class="modal_card">
            <img src="${data.posterUrl}" alt="poster" class="modal_movie_poster">
            <div class="modal_movie_overwrite">${data.description}</div>
            <div class="modal_movie_site">Подробности: <a href="${data.webUrl}" target="_blank">${data.webUrl}</a></div>
            <button class="modal_button_close">Закрыть</button>
        </div>
    `;
    const btnClose = document.querySelector('.modal_button_close');
    btnClose.addEventListener('click', () => {closeModal()});
}

function closeModal() {
    modal.classList.remove('show');
    document.body.classList.remove('stop-scrolling');
}

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        closeModal();
    }
})

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 27) {
        closeModal();
    }
});

// Routing the pages
const global = {
  currentPage: window.location.pathname,
  // The global,default state
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: '068f8219a4b8cc950124cd0ff57fab2f',
    apiURL: 'https://api.themoviedb.org/3/',
  },
};
// Function to display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    // The image part checks to see whether there's an image for the movie in order to provide a path to it, otherwise, show default
    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
            
            ${
              movie.poster_path
                ? `<img
                  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
    `;
    document.querySelector('#popular-movies').appendChild(div);
  });
}

// Function to display popular TV shows
async function displayPopularTVShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
            
            ${
              show.poster_path
                ? `<img
                  src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                  class="card-img-top"
                  alt="${show.name}"
                />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.name}"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
    `;
    document.querySelector('#popular-shows').appendChild(div);
  });
}

// Display movie details
async function displayMovieDetails() {
  // Getting the ID of the movie;
  // Using a Search property on the Window Object;
  // Takes the query string, everything after the <?>
  const movieID = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieID}`);

  // Overlay background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
            <div class="details-top">
          <div>
             ${
               movie.poster_path
                 ? `<img
                  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
                 : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.title}"
                />`
             }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">       ${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join('')}</div>
        </div>
  `;

  document.querySelector('#movie-details').appendChild(div);
}
// Display movie details
async function displayTVShowDetails() {
  const showID = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${showID}`);
  // Overlay background image
  displayBackgroundImage('tv', show.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = `
          <div class="details-top">
          <div>
             ${
               show.poster_path
                 ? `<img
                  src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                  class="card-img-top"
                  alt="${show.name}"
                />`
                 : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${show.name}"
                />`
             }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">       ${show.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join('')}</div>
        </div>
  `;

  document.querySelector('#show-details').appendChild(div);
}

// Display blackdrop on details image
function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeate = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '.3';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Search movies
async function search() {
  // Get data from URL
  const queryString = window.location.search;
  // The the params only
  const urlParams = new URLSearchParams(queryString);
  // .get("---") is from the radio buttons <name> attribute
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');
  // First make sure there's something there
  if (global.search.term !== '' && global.search.term !== null) {
    // Take what one needs from results
    // Useful to not repeat the same request from the API, deconstruct
    const { results, total_pages, page, total_results } = await searchAPIData();

    // Reset global based on result
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;
    // Check to see if there are results
    if (results.length === 0) {
      // Show alert
      showAlert('There are no results to display');
      return;
    }
    // Display results
    displaySearchResults(results);
    // Clear input after search
    document.querySelector('#search-term').value = '';
  } else {
    // show alert success/fail
    showAlert('Please enter a search term');
  }
}

// Display search results
function displaySearchResults(results) {
  // Clear previous results
  // Otherwise, when we click next, it'll add new results but it'll keep the old ones as well.
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#search-results-heading').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';

  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <a href="${global.search.type}-details.html?id=${result.id}">
            
            ${
              result.poster_path
                ? `<img
                  src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                  class="card-img-top"
                  alt="${
                    global.search.type === 'movie' ? result.title : result.name
                  }"
                />`
                : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${
                    global.search.type === 'movie' ? result.title : result.name
                  }"
                />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              global.search.type === 'movie' ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                global.search.type === 'movie'
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
    `;
    document.querySelector('#search-results-heading').innerHTML = `
              <h2>${results.length} of ${global.search.totalResults} results for ${global.search.term}</h2>
    `;
    document.querySelector('#search-results').appendChild(div);
  });

  // Display pagination
  displayPagination();
}

// Pagination
function displayPagination() {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
    <button class="btn btn-primary" id="prev">Prev</button>
    <button class="btn btn-primary" id="next">Next</button>
    <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;
  document.querySelector('#pagination').appendChild(div);

  // Disable <prev> if on first page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }

  // Disable <next> if on last
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }

  // Next page
  document.querySelector('#next').addEventListener('click', async () => {
    global.search.page++;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
  // Previous Page
  document.querySelector('#prev').addEventListener('click', async () => {
    global.search.page--;
    const { results, total_pages } = await searchAPIData();
    displaySearchResults(results);
  });
}

// Display Slider
async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
                  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                  class="card-img-top"
                  alt="${movie.name}"
                />`
          : `<img
                  src="images/no-image.jpg"
                  class="card-img-top"
                  alt="${movie.name}"
                />`
      }
       </a>
       <h4 class="swiper-rating">
         <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

// Initialize swiper
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  //   Show spinner before making the request
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  // Hide spinner
  hideSpinner();
  return data;
}
// Make Request to Search
async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiURL;

  //   Show spinner before making the request
  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
  );
  const data = await response.json();
  // Hide spinner
  hideSpinner();
  return data;
}

// Show Spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
// Hide Spinner
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}
// Highlight Active Link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

// Show Alert
// the default className is set to error; for success, pass <success> class in execute code;
function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  // Add the <alert> class which is common
  // And the one which shows it either as success/failt
  alertEl.classList.add('alert', className);
  // Add text to div
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  // To remove the alert message after a period of time
  removeAlert(alertEl);
}

// Remove alert
function removeAlert(element) {
  setTimeout(() => element.remove(), 3000);
}

// Add commas to numbers
function addCommasToNumber(number) {
  // After 3 <0> add a comma <,>
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Initialize App
function init() {
  // Check which page is "current"
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      // Display slider only on index.html
      displaySlider();
      // Execute display popular movies
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTVShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayTVShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  //   Execute highlightActiveLink
  highlightActiveLink();
}

// Initialize App on DOM loading;
document.addEventListener('DOMContentLoaded', init);

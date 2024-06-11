// Routing the pages
const global = {
  currentPage: window.location.pathname,
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

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '068f8219a4b8cc950124cd0ff57fab2f';
  const API_URL = 'https://api.themoviedb.org/3/';

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

// Initialize App
function init() {
  // Check which page is "current"
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      // Execute display popular movies
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularTVShows();
      break;
    case '/movie-details.html':
      console.log('Movie details');
      break;
    case '/tv-details.html':
      console.log('TV details');
      break;
    case '/search.html':
      console.log('Search');
      break;
  }

  //   Execute highlightActiveLink
  highlightActiveLink();
}

// Initialize App on DOM loading;
document.addEventListener('DOMContentLoaded', init);

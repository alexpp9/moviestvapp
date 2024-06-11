// Routing the pages
const global = {
  currentPage: window.location.pathname,
};
// Function to display popular movies
async function displayPopularMovies() {
  const results = await fetchAPIData('movie/popular');

  console.log(results);
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '068f8219a4b8cc950124cd0ff57fab2f';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
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
      console.log('Shows');
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

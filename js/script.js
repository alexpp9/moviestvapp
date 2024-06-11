// Routing the pages
const global = {
  currentPage: window.location.pathname,
};

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
      console.log('Home');
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

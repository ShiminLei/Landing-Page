/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sections = document.getElementsByTagName("section");
const nav = document.querySelector("nav");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function nearTopViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 
    &&
    rect.top <= 0.4 * (window.innerHeight || document.documentElement.clientHeight)
  );
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav(sections) {
  for (const section of sections) {
    let sectionName = section.getAttribute("data-nav");
    let sectionId = section.getAttribute("id");
    const liToAdd = `<li><a href="#${sectionId}" class="menu__link">${sectionName}</a></li>`;
    nav.insertAdjacentHTML("beforeend", liToAdd);
  }
}

// Add class 'active' to section when near top of viewport
function setActiveToSection(sections) {
  for (const section of sections) {
    if (nearTopViewport(section)) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  }
}

// Scroll to anchor ID using scrollTO event
function smoothScroll(el) {
  const rect = el.getBoundingClientRect();
  window.scrollTo({
    top: rect.top + window.pageYOffset - nav.offsetHeight,
    behavior: "smooth"
  });
}


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu 
buildNav(sections);

// Scroll to section on link click
nav.addEventListener("click", function(e) {
  e.preventDefault();
  const activeSection = document.querySelector(e.target.hash)
  smoothScroll(activeSection);
});

// Set sections as active
window.addEventListener("scroll", function() {
  setActiveToSection(sections);
})
function navigation_respond() {
    const ham = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
    const titles = document.getElementById("titles");

    ham.classList.toggle("active");
    if (navLinks.style.display === "none" || navLinks.style.display === "") {
        navLinks.style.display = "grid"
        titles.style.display = "none";
    } else {
        navLinks.style.display = "none";
        titles.style.display = "flex";
    }
}
const year_container = document.getElementById('currentYear');
const modified_container = document.getElementById('lastModified');
const today = new Date();
const modified_date = document.lastModified;

year_container.innerHTML = today.getFullYear();
modified_container.innerHTML = `Last Modified: ${modified_date}`;
function navigation_respond() {
    console.log('Yes, we made it into the function.');
    const close_nav = document.getElementById("close-nav");
    const lines = document.getElementById("lines");
    const navLinks = document.getElementById("nav-links");
    const titles = document.getElementById("titles");

    if (navLinks.style.display === "none" || navLinks.style.display === "") {
        console.log('Clicked On');
        navLinks.style.display = "grid"; 
        close_nav.style.display = "block";
        lines.style.display = "none";
        titles.style.display = "none";
    } else {
        navLinks.style.display = "none";
        close_nav.style.display = "none";
        lines.style.display = "flex";
        titles.style.display = "grid";  
    }
}
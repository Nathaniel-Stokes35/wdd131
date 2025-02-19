const images = {
    "classic": ["classic/all-around-win.webp", "classic/blockbuster.webp", "classic/candy.webp", "classic/classic.webp", "classic/distracted_boyfriend_format.webp", "classic/divorced.webp", "classic/sawdust.webp", "classic/submarine_pikachu.webp", "classic/tell_me_now.webp"],
    "office": ["office/bulletpoint.webp", "office/classic-michael.webp", "office/dwight-logic.webp", "office/truth.webp", "office/excited-problems.webp", "office/im-the-lion.webp", "office/love-is-all-you-need.webp", "office/parenting101.webp", "office/password-strength.webp"],
    "politics": ["politics/brace_yourselves_politics.webp", "politics/comment_section.webp", "politics/fixing_america.webp", "politics/political_student_apathy.webp", "politics/revaluation.webp", "politics/true_support.webp", "politics/voter_good_guy_greg.webp", "politics/whats_going_on.webp", "politics/whoose_line_politics.webp"],
    "trending": ["trending/beaver-problems.webp", "trending/boss_music.webp", "trending/christmas-problems.webp", "trending/ender.webp", "trending/financial-freedom.webp", "trending/mario_consipiracy.webp", "trending/marvel-anakin.webp", "trending/out-of-tp.webp", "trending/four_hours_sleep.webp"],
    "video-games": ["video-games/beautiful.webp", "video-games/checkpoint.webp", "video-games/everytime.webp", "video-games/FPS-logic.webp", "video-games/git-gud-son.webp", "video-games/what-did-it-cost.webp", "video-games/RE4-plot.webp", "video-games/so-polite.webp", "video-games/Zelda-logic.webp"]
};

document.addEventListener("DOMContentLoaded", function () {
    const path = window.location.pathname;

    if (path.endsWith("random.html")) {
        const allImages = Object.entries(images).flatMap(([category, files]) =>
            files.map(file => ({ src: file, category }))
        );

        const selectedImages = allImages.sort(() => 0.5 - Math.random()).slice(0, 9);
        const figures = document.querySelectorAll(".album-box figure");

        selectedImages.forEach((image, index) => {
            const figure = figures[index];
            if (figure) {
                const img = figure.querySelector("img") || document.createElement("img");
                const caption = figure.querySelector("figcaption") || document.createElement("figcaption");

                img.src = `./images/${image.src}`;
                img.alt = image.category;
                caption.textContent = `Category: ${image.category}`;

                if (!figure.contains(img)) figure.appendChild(img);
                if (!figure.contains(caption)) figure.appendChild(caption);
            }
        });
    }

    else if (path.endsWith("niche.html")) {
        const validCategories = ["office", "video-games", "politics"];
        const filteredImages = Object.fromEntries(
            Object.entries(images).filter(([category]) => validCategories.includes(category))
        );

        const dropdown = document.getElementById("category-select");
        const albumBox = document.querySelector(".album-box");

        function loadCategory(category) {
            if (!category || !filteredImages[category]) return;
        
            const selectedImages = filteredImages[category].slice(0, 9);

            const firstColumn = document.getElementById("first");
            const secondColumn = document.getElementById("second");
            const thirdColumn = document.getElementById("third");

            firstColumn.innerHTML = "";
            secondColumn.innerHTML = "";
            thirdColumn.innerHTML = "";

            selectedImages.forEach((file, index) => {
                const figure = document.createElement("figure");
                const img = document.createElement("img");
                const caption = document.createElement("figcaption");
        
                img.src = `./images/${file}`;
                img.alt = category;
                caption.textContent = `Category: ${category}`;
        
                figure.appendChild(img);
                figure.appendChild(caption);

                if (index % 3 === 0) {
                    firstColumn.appendChild(figure);
                } else if (index % 3 === 1) {
                    secondColumn.appendChild(figure);
                } else {
                    thirdColumn.appendChild(figure);
                }
            });
        }

        dropdown.value = "office"; 
        loadCategory("office");

        dropdown.addEventListener("change", function () {
            loadCategory(dropdown.value);
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const checkboxes = document.querySelectorAll('input[name="features"]');
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

        if (!isChecked) {
            alert("Please select at least one feature before submitting.");
        } else {
            let reviewCount = localStorage.getItem("reviewCount") || 0;
            reviewCount++;
            localStorage.setItem("reviewCount", reviewCount);
            window.location.href = "signed.html";
        }
    });
});

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

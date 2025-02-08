const year_container = document.getElementById('currentYear');
const modified_container = document.getElementById('lastModified');
const today = new Date();
const modified_date = document.lastModified;
const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];
const selectBox = document.getElementById("products");

products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name} (avg * ${product.averagerating})`;
    selectBox.appendChild(option);
});

window.addEventListener("load", () => {
    let reviewCount = localStorage.getItem("reviewCount") || 0;
    reviewCount++;
    localStorage.setItem("reviewCount", reviewCount);
    console.log(`Reviews completed: ${reviewCount}`);
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
            window.location.href = "review.html";
        }
    });
});

year_container.innerHTML = today.getFullYear();
modified_container.innerHTML = `Last Modified: ${modified_date}`;
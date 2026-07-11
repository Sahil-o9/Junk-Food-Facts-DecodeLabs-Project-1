// ============================================
// 1. LIVE TEXT SEARCH FILTER
// ============================================
const searchInput = document.getElementById("search-input");
const foodCards = document.querySelectorAll(".food-card");

searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();

  foodCards.forEach(function (card) {
    const name = card.querySelector(".food-name").textContent.toLowerCase();
    const matches = name.includes(query);
    card.style.display = matches ? "" : "none";
  });
});

// ============================================
// 2. MOBILE HAMBURGER MENU ACTIONS
// ============================================
const menuToggle = document.getElementById("menu-toggle");
const sectionLinks = document.getElementById("section-links");

menuToggle.addEventListener("click", function () {
  sectionLinks.classList.toggle("open");
  const isOpen = sectionLinks.classList.contains("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// ============================================
// 3. CATEGORY COMPONENT FILTERS
// ============================================
const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    button.classList.add("active");

    const selectedCategory = button.getAttribute("data-category");

    foodCards.forEach(function (card) {
      const cardCategory = card.getAttribute("data-category");
      if (selectedCategory === "all" || selectedCategory === cardCategory) {
        card.style.display = ""; 
      } else {
        card.style.display = "none"; 
      }
    });
  });
});

// ============================================
// 4. BMI CONTROLLER LOGIC
// ============================================
const bmiForm = document.getElementById("bmi-form");
const weightInput = document.getElementById("weight-input");
const heightInput = document.getElementById("height-input");
const bmiResult = document.getElementById("bmi-result");

function calculateBMI(weight, height) {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(1);
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

bmiForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);

  if (isNaN(weight) || isNaN(height)) {
    bmiResult.textContent = "Please enter valid weight and height.";
    return; 
  }

  const bmi = calculateBMI(weight, height);
  const category = getBMICategory(bmi);

  bmiResult.textContent = `Your BMI is ${bmi} (${category})`;
});

// ============================================
// 5. FOOD TRACKER TOTALS LOGIC (DECIMAL COMPATIBLE)
// ============================================
const trackerSummary = document.getElementById("tracker-summary");
const totalCaloriesEl = document.getElementById("total-calories");
const totalFatEl = document.getElementById("total-fat");
const totalSugarEl = document.getElementById("total-sugar");
const totalSodiumEl = document.getElementById("total-sodium");
const clearTrackerBtn = document.getElementById("clear-tracker");

// Attach interactive listeners once per card item
foodCards.forEach(function (card) {
  card.style.cursor = "pointer";
  card.addEventListener("click", function () {
    card.classList.toggle("active-selection");
    calculateTotals();
  });
});

function calculateTotals() {
  let totalCalories = 0;
  let totalFat = 0;
  let totalSugar = 0;
  let totalSodium = 0;

  const selectedCards = document.querySelectorAll(".food-card.active-selection");

  selectedCards.forEach(function (card) {
    const statValues = card.querySelectorAll(".stat-value");
    
    // Extract numerical values cleanly from text nodes
    const calories = parseFloat(statValues[0].textContent) || 0;
    const fat = parseFloat(statValues[1].textContent) || 0;
    const sugar = parseFloat(statValues[2].textContent) || 0;
    const sodium = parseFloat(statValues[3].textContent) || 0;

    totalCalories += calories;
    totalFat += fat;
    totalSugar += sugar;
    totalSodium += sodium;
  });

  // Display floating decimal points cleanly without .0 trailing nodes
  totalCaloriesEl.textContent = totalCalories.toFixed(1).replace(/\.0$/, '');
  totalFatEl.textContent = totalFat.toFixed(1).replace(/\.0$/, '');
  totalSugarEl.textContent = totalSugar.toFixed(1).replace(/\.0$/, '');
  totalSodiumEl.textContent = totalSodium.toFixed(1).replace(/\.0$/, '');

  // Toggle tracking block visibility
  if (selectedCards.length > 0) {
    trackerSummary.classList.add("visible");
  } else {
    trackerSummary.classList.remove("visible");
  }
}

// ============================================
// 6. DYNAMIC RE-QUERY RESET BUTTON FIX
// ============================================
clearTrackerBtn.addEventListener("click", function () {
  const activeCards = document.querySelectorAll(".food-card.active-selection");
  activeCards.forEach(function (card) {
    card.classList.remove("active-selection");
  });
  calculateTotals();
});

// ============================================
// 7. SCROLL TO TOP ARROW FUNCTIONALITY
// ============================================
const scrollTopBtn = document.getElementById("scroll-to-top");

if (scrollTopBtn) {
  window.addEventListener("scroll", function () {
    // Show arrow if scrolled past 300px down the window viewport
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // Smooth scroll back up execution layout
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
// ================================
// MOBILE MENU
// ================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  if (navMenu.classList.contains("active")) {
    menuBtn.textContent = "✕";
  } else {
    menuBtn.textContent = "☰";
  }
});


// ================================
// CART
// ================================

let cartCount = 0;

function addToCart(productName) {

  cartCount++;

  document.getElementById("cartCount").textContent = cartCount;

  const popup = document.getElementById("cartPopup");
  const message = document.getElementById("cartMessage");

  message.textContent = productName + " added to cart!";

  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2500);
}


// ================================
// DEAL COUNTDOWN
// ================================

const countdownDate =
  new Date().getTime() + (3 * 24 * 60 * 60 * 1000);


function updateCountdown() {

  const now = new Date().getTime();

  const distance = countdownDate - now;

  const days = Math.floor(
    distance / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) /
    (1000 * 60)
  );

  const seconds = Math.floor(
    (distance % (1000 * 60)) /
    1000
  );


  document.getElementById("days").textContent =
    String(days).padStart(2, "0");

  document.getElementById("hours").textContent =
    String(hours).padStart(2, "0");

  document.getElementById("minutes").textContent =
    String(minutes).padStart(2, "0");

  document.getElementById("seconds").textContent =
    String(seconds).padStart(2, "0");


  if (distance < 0) {

    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

  }
}

setInterval(updateCountdown, 1000);

updateCountdown();


// ================================
// SCROLL TO PRODUCTS
// ================================

function scrollToProducts() {

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });

}


// ================================
// NEWSLETTER
// ================================

function subscribe(event) {

  event.preventDefault();

  const email =
    document.getElementById("email").value;

  if (email) {

    alert(
      "Thank you! " +
      email +
      " has been subscribed."
    );

    document.getElementById("email").value = "";

  }

}


// ================================
// WISHLIST
// ================================

document.querySelectorAll(".wishlist").forEach(button => {

  button.addEventListener("click", () => {

    if (button.textContent === "♡") {

      button.textContent = "♥️";
      button.style.color = "#ed3158";

    } else {

      button.textContent = "♡";
      button.style.color = "#171717";

    }

  });

});


// ================================
// SCROLL REVEAL ANIMATION
// ================================

const animatedElements =
  document.querySelectorAll(
    ".category-card, .product-card, .promo, .service"
  );


animatedElements.forEach(element => {
  element.classList.add("reveal");
});


function revealOnScroll() {

  const windowHeight = window.innerHeight;

  animatedElements.forEach(element => {

    const elementTop =
      element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 80) {
      element.classList.add("active");
    }

  });

}

window.addEventListener(
  "scroll",
  revealOnScroll
);

revealOnScroll();
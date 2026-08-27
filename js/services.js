// =====================================================
// MOBILE MENU
// =====================================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }

    });

}


// =====================================================
// CART
// =====================================================

let cartCount = 0;

function addToCart(productName) {

    cartCount++;

    const cartCountElement =
        document.getElementById("cartCount");

    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }

    const popup =
        document.getElementById("cartPopup");

    const message =
        document.getElementById("cartMessage");

    if (popup && message) {

        message.textContent =
            productName + " added to cart!";

        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, 2500);

    }

}


// =====================================================
// DEAL COUNTDOWN
// =====================================================

const countdownDate =
    new Date().getTime() +
    (3 * 24 * 60 * 60 * 1000);


function updateCountdown() {

    const now = new Date().getTime();

    const distance =
        countdownDate - now;


    const daysElement =
        document.getElementById("days");

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    if (distance < 0) {

        if (daysElement) daysElement.textContent = "00";
        if (hoursElement) hoursElement.textContent = "00";
        if (minutesElement) minutesElement.textContent = "00";
        if (secondsElement) secondsElement.textContent = "00";

        return;
    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (distance %
                (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (distance %
                (1000 * 60 * 60)) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (distance %
                (1000 * 60)) /
            1000
        );


    if (daysElement) {

        daysElement.textContent =
            String(days).padStart(2, "0");

    }


    if (hoursElement) {

        hoursElement.textContent =
            String(hours).padStart(2, "0");

    }


    if (minutesElement) {

        minutesElement.textContent =
            String(minutes).padStart(2, "0");

    }


    if (secondsElement) {

        secondsElement.textContent =
            String(seconds).padStart(2, "0");

    }

}


setInterval(updateCountdown, 1000);

updateCountdown();


// =====================================================
// SCROLL TO PRODUCTS
// =====================================================

function scrollToProducts() {

    const products =
        document.getElementById("products");

    if (products) {

        products.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// =====================================================
// SUBSCRIBE FORM
// VALID GMAIL → 404.HTML
// INVALID / EMPTY → ERROR
// =====================================================

const subscribeForm =
    document.getElementById("subscribeForm");


if (subscribeForm) {

    subscribeForm.addEventListener(
        "submit",
        function (e) {

            e.preventDefault();


            const emailInput =
                document.getElementById("subscribeEmail");


            if (!emailInput) {
                return;
            }


            const email =
                emailInput.value.trim();


            // Gmail validation
            const gmailPattern =
                /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


            // EMPTY
            if (email === "") {

                alert(
                    "Please enter your Gmail address."
                );

                emailInput.focus();

                return;
            }


            // INVALID GMAIL
            if (!gmailPattern.test(email)) {

                alert(
                    "Please enter a valid Gmail address."
                );

                emailInput.focus();

                return;
            }


            // VALID GMAIL
            window.location.href = "404.html";

        }
    );

}


// =====================================================
// WISHLIST
// =====================================================

document
    .querySelectorAll(".wishlist")
    .forEach(button => {

        button.addEventListener("click", () => {

            if (
                button.textContent.trim() === "♡"
            ) {

                button.textContent = "♥️";

                button.style.color = "#ed3158";

            } else {

                button.textContent = "♡";

                button.style.color = "#171717";

            }

        });

    });


// =====================================================
// SCROLL REVEAL ANIMATION
// =====================================================

const animatedElements =
    document.querySelectorAll(
        ".category-card, .product-card, .promo, .service"
    );


animatedElements.forEach(element => {

    element.classList.add("reveal");

});


function revealOnScroll() {

    const windowHeight =
        window.innerHeight;


    animatedElements.forEach(element => {

        const elementTop =
            element.getBoundingClientRect().top;


        if (
            elementTop <
            windowHeight - 80
        ) {

            element.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


revealOnScroll();


// =====================================================
// NEWSLETTER EMAIL VALIDATION
// VALID GMAIL → 404.HTML
// INVALID / EMPTY → ERROR
// =====================================================

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");

const newsletterError =
    document.getElementById("newsletterError");

const sendBtn =
    document.getElementById("sendBtn");


if (
    newsletterForm &&
    newsletterEmail &&
    sendBtn
) {


    // =================================================
    // VALIDATE GMAIL
    // =================================================

    function validateNewsletterEmail() {

        const email =
            newsletterEmail.value.trim();


        // Only Gmail allowed
        const gmailPattern =
            /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


        // EMPTY EMAIL
        if (email === "") {

            newsletterEmail.classList.add(
                "input-error"
            );

            newsletterEmail.classList.remove(
                "input-success"
            );


            if (newsletterError) {

                newsletterError.textContent =
                    "Please enter your Gmail address.";

            }

            return false;
        }


        // INVALID GMAIL
        if (!gmailPattern.test(email)) {

            newsletterEmail.classList.add(
                "input-error"
            );

            newsletterEmail.classList.remove(
                "input-success"
            );


            if (newsletterError) {

                newsletterError.textContent =
                    "Please enter a valid Gmail address.";

            }

            return false;
        }


        // VALID GMAIL
        newsletterEmail.classList.remove(
            "input-error"
        );

        newsletterEmail.classList.add(
            "input-success"
        );


        if (newsletterError) {

            newsletterError.textContent = "";

        }


        return true;

    }


    // =================================================
    // LIVE VALIDATION
    // =================================================

    newsletterEmail.addEventListener(
        "input",
        function () {

            validateNewsletterEmail();

        }
    );


    // =================================================
    // SEND BUTTON
    // =================================================

    sendBtn.addEventListener(
        "click",
        function () {

            const isValid =
                validateNewsletterEmail();


            // INVALID → STOP
            if (!isValid) {

                newsletterEmail.focus();

                return;
            }


            // VALID → REDIRECT
            sendBtn.disabled = true;


            const buttonText =
                sendBtn.querySelector("span");


            if (buttonText) {

                buttonText.textContent =
                    "Sending...";

            }


            setTimeout(() => {

                window.location.href =
                    "404.html";

            }, 500);

        }
    );

}
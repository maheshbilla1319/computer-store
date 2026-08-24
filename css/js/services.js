// ================================
// MOBILE MENU
// ================================

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


// ================================
// CART
// ================================

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


// ================================
// DEAL COUNTDOWN
// ================================

const countdownDate =
    new Date().getTime() +
    (3 * 24 * 60 * 60 * 1000);


function updateCountdown() {

    const now = new Date().getTime();

    const distance =
        countdownDate - now;


    if (distance < 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

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


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}


setInterval(updateCountdown, 1000);

updateCountdown();


// ================================
// SCROLL TO PRODUCTS
// ================================

function scrollToProducts() {

    const products =
        document.getElementById("products");

    if (products) {

        products.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// ================================
// NEWSLETTER / GMAIL VALIDATION
// ================================

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


            // Empty validation
            if (email === "") {

                alert(
                    "Please enter your Gmail address."
                );

                emailInput.focus();

                return;
            }


            // Invalid Gmail validation
            if (!gmailPattern.test(email)) {

                alert(
                    "Please enter a valid Gmail address."
                );

                emailInput.focus();

                return;
            }


            // ============================
            // VALID GMAIL
            // → REDIRECT TO 404.HTML
            // ============================

            window.location.href = "404.html";

        }
    );

}


// ================================
// WISHLIST
// ================================

document
    .querySelectorAll(".wishlist")
    .forEach(button => {

        button.addEventListener("click", () => {

            if (button.textContent.trim() === "♡") {

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
/* =====================================================
   NEWSLETTER EMAIL VALIDATION
   VALID EMAIL → 404.html
   INVALID EMAIL → ERROR
===================================================== */

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

    /* =================================================
       EMAIL VALIDATION
    ================================================= */

    function validateNewsletterEmail() {

        const email =
            newsletterEmail.value.trim();

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


        /* EMPTY */
        if (email === "") {

            newsletterEmail.classList.add(
                "input-error"
            );

            newsletterEmail.classList.remove(
                "input-success"
            );

            newsletterError.textContent =
                "Please enter your email address.";

            return false;
        }


        /* INVALID EMAIL */
        if (!emailPattern.test(email)) {

            newsletterEmail.classList.add(
                "input-error"
            );

            newsletterEmail.classList.remove(
                "input-success"
            );

            newsletterError.textContent =
                "Please enter a valid email address.";

            return false;
        }


        /* VALID EMAIL */
        newsletterEmail.classList.remove(
            "input-error"
        );

        newsletterEmail.classList.add(
            "input-success"
        );

        newsletterError.textContent = "";

        return true;
    }


    /* =================================================
       LIVE VALIDATION
    ================================================= */

    newsletterEmail.addEventListener(
        "input",
        () => {

            validateNewsletterEmail();

        }
    );


    /* =================================================
       SEND BUTTON
    ================================================= */

    sendBtn.addEventListener(
        "click",
        () => {

            const isValid =
                validateNewsletterEmail();


            /* =========================================
               INVALID → DON'T REDIRECT
            ========================================= */

            if (!isValid) {

                newsletterEmail.focus();

                return;

            }


            /* =========================================
               VALID → REDIRECT
            ========================================= */

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

            }, 700);

        }
    );

}
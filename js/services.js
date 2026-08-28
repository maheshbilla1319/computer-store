
/* =========================================================
   TECHNOVA COMPUTER STORE
   SERVICES.JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       SELECT ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    const searchBtn = document.getElementById("searchBtn");
    const cartBtn = document.getElementById("cartBtn");

    const newsletterForm =
        document.getElementById("newsletterForm");

    const newsletterEmail =
        document.getElementById("newsletterEmail");

    const newsletterError =
        document.getElementById("newsletterError");

    const sendBtn =
        document.getElementById("sendBtn");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", function () {

            const isOpen =
                navbar.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* CLOSE MENU WHEN LINK IS CLICKED */

        const menuLinks =
            navbar.querySelectorAll("a");

        menuLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navbar.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        /* CLOSE MENU OUTSIDE */

        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navbar.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle
            ) {

                navbar.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });

    }


/* =====================================================
   SCROLL ACTIVE NAVIGATION
===================================================== */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href")?.replace("#", "");

        if (linkTarget === currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNav);

updateActiveNav();


    /* =====================================================
       SEARCH BUTTON
    ===================================================== */

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            function () {

                window.location.href = "404.html";

            }
        );

    }


    /* =====================================================
       CART BUTTON
    ===================================================== */

    if (cartBtn) {

        cartBtn.addEventListener(
            "click",
            function () {

                window.location.href = "404.html";

            }
        );

    }

/* =====================================================
   NEWSLETTER VALIDATION
===================================================== */

function validateEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


function showNewsletterError(message) {

    if (newsletterError) {
        newsletterError.textContent = message;
    }

}


function clearNewsletterError() {

    if (newsletterError) {
        newsletterError.textContent = "";
    }

}


function subscribeNewsletter() {

    if (!newsletterEmail) return;

    const email =
        newsletterEmail.value.trim();

    clearNewsletterError();


    /* EMPTY EMAIL */

    if (email === "") {

        showNewsletterError(
            "Please enter your email address."
        );

        newsletterEmail.focus();

        return;

    }


    /* INVALID EMAIL */

    if (!validateEmail(email)) {

        showNewsletterError(
            "Please enter a valid email address."
        );

        newsletterEmail.focus();

        return;

    }


    /* SUCCESS */

    showNewsletterError(
        "Successfully subscribed!"
    );

    if (newsletterError) {
        newsletterError.style.color =
            "#00d4ff";
    }


    newsletterEmail.value = "";


    /* REDIRECT TO 404 PAGE */

    setTimeout(function () {

        window.location.href = "404.html";

    }, 1000);

}


/* =====================================================
   NEWSLETTER BUTTON
===================================================== */

if (sendBtn) {

    sendBtn.addEventListener(
        "click",
        subscribeNewsletter
    );

}


/* =====================================================
   NEWSLETTER ENTER KEY
===================================================== */

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            subscribeNewsletter();

        }
    );

}


/* =====================================================
   NEWSLETTER INPUT
===================================================== */

if (newsletterEmail) {

    newsletterEmail.addEventListener(
        "input",
        function () {

            clearNewsletterError();

            if (newsletterError) {

                newsletterError.style.color =
                    "";

            }

        }
    );

}


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".category-card, .product-card, .why-card, .why-stat, .promo-content, .promo-product, .promo-offer"
    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });


    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       PRODUCT TRACK PAUSE ON TOUCH
    ===================================================== */

    const productRows =
        document.querySelectorAll(
            ".product-row"
        );

    productRows.forEach(function (row) {

        row.addEventListener(
            "touchstart",
            function () {

                const track =
                    row.querySelector(
                        ".product-track"
                    );

                if (track) {
                    track.style.animationPlayState =
                        "paused";
                }

            },
            {
                passive: true
            }
        );


        row.addEventListener(
            "touchend",
            function () {

                const track =
                    row.querySelector(
                        ".product-track"
                    );

                if (track) {
                    track.style.animationPlayState =
                        "running";
                }

            },
            {
                passive: true
            }
        );

    });


    /* =====================================================
       IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll("img");

    images.forEach(function (image) {

        image.addEventListener(
            "error",
            function () {

                console.warn(
                    "Image could not be loaded:",
                    image.src
                );

            }
        );

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navbar &&
                menuToggle
            ) {

                navbar.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }
    );


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    document.body.classList.add("page-loaded");

});


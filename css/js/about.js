/* =========================================================
   GADGETZONE
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            preloader.classList.add("hide");
        }, 700);

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function headerScroll() {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", headerScroll);

    headerScroll();


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    menuToggle.addEventListener("click", () => {

        const isOpen =
            menuToggle.classList.toggle("active");

        navbar.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

        document.body.classList.toggle(
            "no-scroll",
            isOpen
        );

    });


    const navLinks =
        document.querySelectorAll(".navbar a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navbar.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "no-scroll"
            );

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${current}`
            ) {
                link.classList.add("active");
            }

        });

    });


    /* =====================================================
       SEARCH OVERLAY
    ===================================================== */

    const searchBtn =
        document.getElementById("searchBtn");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const closeSearch =
        document.getElementById("closeSearch");

    const productSearch =
        document.getElementById("productSearch");


    searchBtn.addEventListener("click", () => {

        searchOverlay.classList.add("active");

        document.body.classList.add("no-scroll");

        setTimeout(() => {
            productSearch.focus();
        }, 300);

    });


    closeSearch.addEventListener("click", closeSearchBox);


    searchOverlay.addEventListener("click", event => {

        if (event.target === searchOverlay) {
            closeSearchBox();
        }

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSearchBox();
        }

    });


    function closeSearchBox() {

        searchOverlay.classList.remove("active");

        document.body.classList.remove("no-scroll");

    }


    /* =====================================================
       PRODUCT SEARCH
    ===================================================== */

    const productCards =
        document.querySelectorAll(".product-card");


    productSearch.addEventListener("input", () => {

        const searchValue =
            productSearch.value
                .toLowerCase()
                .trim();


        productCards.forEach(card => {

            const productName =
                card.querySelector("h3")
                    .textContent
                    .toLowerCase();

            const category =
                card.querySelector(".product-category")
                    .textContent
                    .toLowerCase();


            if (
                productName.includes(searchValue) ||
                category.includes(searchValue)
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll("[data-counter]");


    function animateCounter(element) {

        const target =
            Number(
                element.getAttribute("data-counter")
            );

        let current = 0;

        const duration = 1600;

        const increment =
            target / (duration / 16);


        function update() {

            current += increment;

            if (current < target) {

                element.textContent =
                    Math.floor(current) + "+";

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    target + "+";

            }

        }

        update();

    }


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        counterObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.8
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });


    /* =====================================================
       COUNTDOWN
    ===================================================== */

    let totalSeconds =
        (12 * 60 * 60) +
        (45 * 60) +
        30;


    function updateCountdown() {

        if (totalSeconds <= 0) {

            totalSeconds =
                (12 * 60 * 60) +
                (45 * 60) +
                30;

        }


        const hours =
            Math.floor(totalSeconds / 3600);

        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );

        const seconds =
            totalSeconds % 60;


        document.getElementById("hours")
            .textContent =
            String(hours).padStart(2, "0");


        document.getElementById("minutes")
            .textContent =
            String(minutes).padStart(2, "0");


        document.getElementById("seconds")
            .textContent =
            String(seconds).padStart(2, "0");


        totalSeconds--;

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* =====================================================
       ADD TO CART
    ===================================================== */

    const cartCount =
        document.querySelector(".cart-count");

    const addCartButtons =
        document.querySelectorAll(".add-cart");

    const toast =
        document.getElementById("toast");


    let cart = 0;


    addCartButtons.forEach(button => {

        button.addEventListener("click", () => {

            cart++;

            cartCount.textContent = cart;

            showToast();

            button.innerHTML =
                `<i class="fa-solid fa-check"></i> Added`;

            button.style.background =
                "#151515";

            button.style.color =
                "#ffffff";


            setTimeout(() => {

                button.innerHTML =
                    `Add To Cart
                     <i class="fa-solid fa-cart-shopping"></i>`;

                button.style.background =
                    "";

                button.style.color =
                    "";

            }, 1500);

        });

    });


    function showToast() {

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    /* =====================================================
       WISHLIST
    ===================================================== */

    const wishlistButtons =
        document.querySelectorAll(".wishlist");


    wishlistButtons.forEach(button => {

        button.addEventListener("click", () => {

            const icon =
                button.querySelector("i");


            icon.classList.toggle(
                "fa-regular"
            );

            icon.classList.toggle(
                "fa-solid"
            );


            if (
                icon.classList.contains("fa-solid")
            ) {

                button.style.color =
                    "#ef4444";

                button.style.transform =
                    "scale(1.15)";

            } else {

                button.style.color = "";

                button.style.transform = "";

            }

        });

    });


    /* =====================================================
       TESTIMONIAL SLIDER
    ===================================================== */

    const testimonials =
        document.querySelectorAll(".testimonial");

    const dots =
        document.querySelectorAll(".dot");

    const nextReview =
        document.getElementById("nextReview");

    const prevReview =
        document.getElementById("prevReview");


    let currentReview = 0;


    function showReview(index) {

        testimonials.forEach(item => {

            item.classList.remove("active");

        });


        dots.forEach(dot => {

            dot.classList.remove("active");

        });


        testimonials[index]
            .classList.add("active");

        dots[index]
            .classList.add("active");

    }


    nextReview.addEventListener("click", () => {

        currentReview++;

        if (
            currentReview >= testimonials.length
        ) {
            currentReview = 0;
        }

        showReview(currentReview);

    });


    prevReview.addEventListener("click", () => {

        currentReview--;

        if (currentReview < 0) {
            currentReview =
                testimonials.length - 1;
        }

        showReview(currentReview);

    });


    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            currentReview = index;

            showReview(currentReview);

        });

    });


    /* AUTO TESTIMONIAL */

    setInterval(() => {

        currentReview++;

        if (
            currentReview >= testimonials.length
        ) {
            currentReview = 0;
        }

        showReview(currentReview);

    }, 5000);


    /* =====================================================
       NEWSLETTER
    ===================================================== */

    const newsletterForm =
        document.getElementById("newsletterForm");


    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                document.getElementById("email");


            if (email.value.trim() === "") {
                return;
            }


            const button =
                newsletterForm.querySelector("button");


            button.innerHTML =
                `<i class="fa-solid fa-check"></i>
                 Subscribed`;


            email.value = "";


            setTimeout(() => {

                button.innerHTML =
                    `Subscribe
                     <i class="fa-solid fa-paper-plane"></i>`;

            }, 2500);

        }
    );


    /* =====================================================
       PARALLAX HERO
    ===================================================== */

    const heroImage =
        document.querySelector(".hero-image");


    window.addEventListener("mousemove", event => {

        if (window.innerWidth <= 796) {
            return;
        }


        const x =
            (window.innerWidth / 2 - event.clientX)
            / 70;


        const y =
            (window.innerHeight / 2 - event.clientY)
            / 70;


        heroImage.style.transform =
            `translate(${x}px, ${y}px)`;

    });


    /* =====================================================
       RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(button => {

        button.addEventListener("click", function(event) {

            const ripple =
                document.createElement("span");


            const rect =
                button.getBoundingClientRect();


            const size =
                Math.max(
                    rect.width,
                    rect.height
                );


            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.position =
                "absolute";

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,0.35)";

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            ripple.style.pointerEvents =
                "none";

            ripple.style.transform =
                "scale(0)";

            ripple.style.animation =
                "rippleEffect 0.6s linear";


            button.style.position =
                "relative";

            button.style.overflow =
                "hidden";


            button.appendChild(ripple);


            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /* =====================================================
       KEYBOARD SHORTCUT
       "/" = SEARCH
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "/" &&
            document.activeElement.tagName !== "INPUT"
        ) {

            event.preventDefault();

            searchOverlay.classList.add("active");

            setTimeout(() => {
                productSearch.focus();
            }, 200);

        }

    });

});
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
/* =========================================================
   GADGETZONE / TECHNOVA
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    if (preloader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                preloader.classList.add("hide");
            }, 700);
        });
    }


    /* =====================================================
       2. HEADER SCROLL
    ===================================================== */

    const header = document.getElementById("header");

    function headerScroll() {
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", headerScroll);
    headerScroll();


    /* =====================================================
       3. MOBILE MENU
       ☰ -> X -> ☰
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");

    function openMobileMenu() {

        if (!menuToggle || !navbar) return;

        navbar.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        // If button contains text
        if (!menuToggle.querySelector("i")) {
            menuToggle.textContent = "✕";
        }

        document.body.classList.add("no-scroll");
    }


    function closeMobileMenu() {

        if (!menuToggle || !navbar) return;

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

        // If button contains text
        if (!menuToggle.querySelector("i")) {
            menuToggle.textContent = "☰";
        }

        document.body.classList.remove("no-scroll");
    }


    function toggleMobileMenu() {

        if (!menuToggle || !navbar) return;

        const isOpen =
            navbar.classList.contains("active");

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    if (menuToggle && navbar) {

        menuToggle.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* =====================================================
       4. CLOSE MOBILE MENU AFTER NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".navbar a, #navbar a"
        );

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMobileMenu();
        });

    });


    /* =====================================================
       5. ESCAPE CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    /* =====================================================
       6. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    function updateActiveNavigation() {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                current =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (href === `#${current}`) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       7. SEARCH OVERLAY
    ===================================================== */

    const searchBtn =
        document.getElementById("searchBtn");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const closeSearch =
        document.getElementById("closeSearch");

    const productSearch =
        document.getElementById("productSearch");


    function closeSearchBox() {

        if (!searchOverlay) return;

        searchOverlay.classList.remove("active");

        document.body.classList.remove(
            "no-scroll"
        );
    }


    if (
        searchBtn &&
        searchOverlay &&
        productSearch
    ) {

        searchBtn.addEventListener(
            "click",
            () => {

                searchOverlay.classList.add(
                    "active"
                );

                document.body.classList.add(
                    "no-scroll"
                );

                setTimeout(() => {
                    productSearch.focus();
                }, 300);

            }
        );

    }


    if (closeSearch) {

        closeSearch.addEventListener(
            "click",
            closeSearchBox
        );

    }


    if (searchOverlay) {

        searchOverlay.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    searchOverlay
                ) {
                    closeSearchBox();
                }

            }
        );

    }


    /* =====================================================
       8. ESCAPE CLOSE SEARCH
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeSearchBox();
            }

        }
    );


    /* =====================================================
       9. PRODUCT SEARCH
    ===================================================== */

    const productCards =
        document.querySelectorAll(
            ".product-card"
        );


    if (productSearch) {

        productSearch.addEventListener(
            "input",
            () => {

                const searchValue =
                    productSearch.value
                        .toLowerCase()
                        .trim();


                productCards.forEach(card => {

                    const nameElement =
                        card.querySelector("h3");

                    const categoryElement =
                        card.querySelector(
                            ".product-category"
                        );


                    const productName =
                        nameElement
                            ? nameElement.textContent
                                .toLowerCase()
                            : "";


                    const category =
                        categoryElement
                            ? categoryElement.textContent
                                .toLowerCase()
                            : "";


                    if (
                        productName.includes(
                            searchValue
                        ) ||
                        category.includes(
                            searchValue
                        )
                    ) {

                        card.style.display = "";

                    } else {

                        card.style.display =
                            "none";

                    }

                });

            }
        );

    }


    /* =====================================================
       10. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
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

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }


    /* =====================================================
       11. COUNTER ANIMATION
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    function animateCounter(element) {

        const target =
            Number(
                element.getAttribute(
                    "data-counter"
                )
            );


        if (isNaN(target)) return;


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


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {
            counterObserver.observe(counter);
        });

    }


    /* =====================================================
       12. COUNTDOWN
    ===================================================== */

    const hoursElement =
        document.getElementById("hours");

    const minutesElement =
        document.getElementById("minutes");

    const secondsElement =
        document.getElementById("seconds");


    let totalSeconds =
        (12 * 60 * 60) +
        (45 * 60) +
        30;


    function updateCountdown() {

        if (
            !hoursElement &&
            !minutesElement &&
            !secondsElement
        ) {
            return;
        }


        if (totalSeconds <= 0) {

            totalSeconds =
                (12 * 60 * 60) +
                (45 * 60) +
                30;

        }


        const hours =
            Math.floor(
                totalSeconds / 3600
            );


        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const seconds =
            totalSeconds % 60;


        if (hoursElement) {

            hoursElement.textContent =
                String(hours).padStart(
                    2,
                    "0"
                );

        }


        if (minutesElement) {

            minutesElement.textContent =
                String(minutes).padStart(
                    2,
                    "0"
                );

        }


        if (secondsElement) {

            secondsElement.textContent =
                String(seconds).padStart(
                    2,
                    "0"
                );

        }


        totalSeconds--;

    }


    if (
        hoursElement ||
        minutesElement ||
        secondsElement
    ) {

        updateCountdown();

        setInterval(
            updateCountdown,
            1000
        );

    }


    /* =====================================================
       13. ADD TO CART
    ===================================================== */

    const cartCount =
        document.querySelector(
            ".cart-count"
        );

    const addCartButtons =
        document.querySelectorAll(
            ".add-cart"
        );

    const toast =
        document.getElementById("toast");


    let cart = 0;


    addCartButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                cart++;


                if (cartCount) {

                    cartCount.textContent =
                        cart;

                }


                if (toast) {
                    showToast();
                }


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

            }
        );

    });


    function showToast() {

        if (!toast) return;

        toast.classList.add("show");


        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }


    /* =====================================================
       14. WISHLIST
    ===================================================== */

    const wishlistButtons =
        document.querySelectorAll(
            ".wishlist"
        );


    wishlistButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const icon =
                    button.querySelector("i");


                if (!icon) return;


                icon.classList.toggle(
                    "fa-regular"
                );

                icon.classList.toggle(
                    "fa-solid"
                );


                if (
                    icon.classList.contains(
                        "fa-solid"
                    )
                ) {

                    button.style.color =
                        "#ef4444";

                    button.style.transform =
                        "scale(1.15)";

                } else {

                    button.style.color = "";

                    button.style.transform = "";

                }

            }
        );

    });


    /* =====================================================
       15. TESTIMONIAL SLIDER
    ===================================================== */

    const testimonials =
        document.querySelectorAll(
            ".testimonial"
        );

    const dots =
        document.querySelectorAll(
            ".dot"
        );

    const nextReview =
        document.getElementById(
            "nextReview"
        );

    const prevReview =
        document.getElementById(
            "prevReview"
        );


    let currentReview = 0;


    function showReview(index) {

        if (!testimonials.length) return;


        testimonials.forEach(item => {

            item.classList.remove(
                "active"
            );

        });


        dots.forEach(dot => {

            dot.classList.remove(
                "active"
            );

        });


        if (testimonials[index]) {

            testimonials[index].classList.add(
                "active"
            );

        }


        if (dots[index]) {

            dots[index].classList.add(
                "active"
            );

        }

    }


    if (testimonials.length) {

        showReview(0);


        if (nextReview) {

            nextReview.addEventListener(
                "click",
                () => {

                    currentReview++;


                    if (
                        currentReview >=
                        testimonials.length
                    ) {

                        currentReview = 0;

                    }


                    showReview(
                        currentReview
                    );

                }
            );

        }


        if (prevReview) {

            prevReview.addEventListener(
                "click",
                () => {

                    currentReview--;


                    if (
                        currentReview < 0
                    ) {

                        currentReview =
                            testimonials.length - 1;

                    }


                    showReview(
                        currentReview
                    );

                }
            );

        }


        dots.forEach(
            (dot, index) => {

                dot.addEventListener(
                    "click",
                    () => {

                        currentReview =
                            index;

                        showReview(
                            currentReview
                        );

                    }
                );

            }
        );


        setInterval(() => {

            currentReview++;


            if (
                currentReview >=
                testimonials.length
            ) {

                currentReview = 0;

            }


            showReview(
                currentReview
            );

        }, 5000);

    }


    /* =====================================================
       16. NEWSLETTER
       VALID EMAIL -> 404.HTML
    ===================================================== */

    const newsletterForm =
        document.getElementById(
            "newsletterForm"
        );


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    document.getElementById(
                        "email"
                    );


                if (!email) return;


                const emailValue =
                    email.value.trim();


                /* EMPTY */

                if (emailValue === "") {

                    alert(
                        "Please enter your email address."
                    );

                    email.focus();

                    return;

                }


                /* VALID EMAIL REGEX */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


                /* INVALID */

                if (
                    !emailPattern.test(
                        emailValue
                    )
                ) {

                    alert(
                        "Please enter a valid email address."
                    );

                    email.focus();

                    return;

                }


                /* VALID */

                const button =
                    newsletterForm.querySelector(
                        "button"
                    );


                if (button) {

                    button.innerHTML =
                        `<i class="fa-solid fa-check"></i>
                         Subscribed`;

                    button.disabled = true;

                }


                email.value = "";


                /* REDIRECT TO 404 */

                setTimeout(() => {

                    window.location.href =
                        "404.html";

                }, 700);

            }
        );

    }


    /* =====================================================
       17. FOOTER NEWSLETTER
       VALID EMAIL -> 404.HTML
    ===================================================== */

    const footerNewsletterForm =
        document.getElementById(
            "footerNewsletterForm"
        );

    const newsletterEmail =
        document.getElementById(
            "newsletterEmail"
        );

    const newsletterError =
        document.getElementById(
            "newsletterError"
        );

    const sendBtn =
        document.getElementById(
            "sendBtn"
        );


    if (
        footerNewsletterForm &&
        newsletterEmail &&
        sendBtn
    ) {


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


                if (newsletterError) {

                    newsletterError.textContent =
                        "Please enter your email address.";

                }


                return false;

            }


            /* INVALID */

            if (
                !emailPattern.test(email)
            ) {

                newsletterEmail.classList.add(
                    "input-error"
                );

                newsletterEmail.classList.remove(
                    "input-success"
                );


                if (newsletterError) {

                    newsletterError.textContent =
                        "Please enter a valid email address.";

                }


                return false;

            }


            /* VALID */

            newsletterEmail.classList.remove(
                "input-error"
            );

            newsletterEmail.classList.add(
                "input-success"
            );


            if (newsletterError) {

                newsletterError.textContent =
                    "";

            }


            return true;

        }


        /* LIVE VALIDATION */

        newsletterEmail.addEventListener(
            "input",
            () => {

                validateNewsletterEmail();

            }
        );


        /* SEND */

        sendBtn.addEventListener(
            "click",
            () => {

                const isValid =
                    validateNewsletterEmail();


                if (!isValid) {

                    newsletterEmail.focus();

                    return;

                }


                sendBtn.disabled = true;


                const buttonText =
                    sendBtn.querySelector(
                        "span"
                    );


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


    /* =====================================================
       18. PARALLAX HERO
       DESKTOP ONLY
       MOBILE <= 796 DISABLED
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image"
        );


    if (heroImage) {

        window.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth <= 796
                ) {
                    heroImage.style.transform =
                        "";
                    return;
                }


                const x =
                    (
                        window.innerWidth / 2 -
                        event.clientX
                    ) / 70;


                const y =
                    (
                        window.innerHeight / 2 -
                        event.clientY
                    ) / 70;


                heroImage.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }


    /* =====================================================
       19. RIPPLE EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement(
                        "span"
                    );


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


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


    /* =====================================================
       20. KEYBOARD SEARCH
       "/" -> SEARCH
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const activeElement =
                document.activeElement;


            const isTyping =
                activeElement &&
                (
                    activeElement.tagName ===
                        "INPUT" ||
                    activeElement.tagName ===
                        "TEXTAREA" ||
                    activeElement.tagName ===
                        "SELECT"
                );


            if (
                event.key === "/" &&
                !isTyping &&
                searchOverlay &&
                productSearch
            ) {

                event.preventDefault();


                searchOverlay.classList.add(
                    "active"
                );


                document.body.classList.add(
                    "no-scroll"
                );


                setTimeout(() => {

                    productSearch.focus();

                }, 200);

            }

        }
    );


    /* =====================================================
       21. FAQ
       OPEN / CLOSE
    ===================================================== */

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) return;


        question.addEventListener(
            "click",
            () => {

                const isActive =
                    item.classList.contains(
                        "active"
                    );


                /* CLOSE ALL */

                faqItems.forEach(
                    faq => {

                        faq.classList.remove(
                            "active"
                        );

                    }
                );


                /* OPEN SELECTED */

                if (!isActive) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    });


});
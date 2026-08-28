/* =========================================================
   TECHNOVA COMPUTER STORE
   SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. SELECT ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");

    const searchBtn = document.getElementById("searchBtn");
    const cartBtn = document.getElementById("cartBtn");

    const navLinks = document.querySelectorAll(".nav-link");
    const mobileLogin = document.querySelector(".mobile-login-btn");

    const addCartButtons = document.querySelectorAll(".add-cart");
    const wishlistButtons = document.querySelectorAll(".wishlist-btn");

    const contactForm = document.getElementById("contactForm");
    const newsletterForm = document.getElementById("newsletterForm");

    const cartCountElement =
        document.querySelector(".cart-count");


    /* =====================================================
       2. MOBILE MENU
       HAMBURGER -> X
    ===================================================== */

    function openMobileMenu() {

        if (!navbar || !menuToggle) return;

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
    }


    function closeMobileMenu() {

        if (!navbar || !menuToggle) return;

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


    function toggleMobileMenu() {

        if (!navbar || !menuToggle) return;

        const isOpen =
            navbar.classList.contains("active");

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* =====================================================
       3. CLOSE MOBILE MENU AFTER NAVIGATION
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMobileMenu();

        });

    });


    /* MOBILE LOGIN ALSO CLOSES MENU */

    if (mobileLogin) {

        mobileLogin.addEventListener(
            "click",
            closeMobileMenu
        );

    }


    /* =====================================================
       4. HEADER SCROLL EFFECT
    ===================================================== */

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }
    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll
    );

    handleHeaderScroll();


    /* =====================================================
       5. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll("section[id]");


    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav
    );

    updateActiveNav();


    /* =====================================================
       6. CART SYSTEM
    ===================================================== */

    let cartCount = 0;

    if (cartCountElement) {

        cartCountElement.textContent =
            cartCount;

    }


    addCartButtons.forEach(button => {

        button.addEventListener("click", () => {

            cartCount++;

            if (cartCountElement) {

                cartCountElement.textContent =
                    cartCount;

            }


            const originalHTML =
                button.innerHTML;


            button.innerHTML = `
                <i class="fa-solid fa-check"></i>
            `;


            button.style.background =
                "#06b6d4";


            showNotification(
                "Product added to cart!",
                "success"
            );


            setTimeout(() => {

                button.innerHTML =
                    originalHTML;

                button.style.background =
                    "";

            }, 1200);

        });

    });


    /* =====================================================
       7. CART BUTTON
    ===================================================== */

    if (cartBtn) {

        cartBtn.addEventListener("click", () => {

            if (cartCount === 0) {

                showNotification(
                    "Your cart is empty.",
                    "info"
                );

            } else {

                showNotification(
                    `${cartCount} item${
                        cartCount > 1 ? "s" : ""
                    } in your cart.`,
                    "success"
                );

            }

        });

    }


    /* =====================================================
       8. WISHLIST
    ===================================================== */

    wishlistButtons.forEach(button => {

        button.addEventListener("click", () => {

            const icon =
                button.querySelector("i");

            if (!icon) return;


            const isActive =
                icon.classList.contains(
                    "fa-solid"
                );


            if (isActive) {

                icon.classList.remove(
                    "fa-solid"
                );

                icon.classList.add(
                    "fa-regular"
                );

                button.style.color = "";


                showNotification(
                    "Removed from wishlist.",
                    "info"
                );

            } else {

                icon.classList.remove(
                    "fa-regular"
                );

                icon.classList.add(
                    "fa-solid"
                );

                button.style.color =
                    "#2563eb";


                showNotification(
                    "Added to wishlist!",
                    "success"
                );

            }

        });

    });


    /* =====================================================
       9. SEARCH
    ===================================================== */

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            openSearchBox
        );

    }


    function openSearchBox() {

        const existingSearch =
            document.querySelector(
                ".search-overlay"
            );

        if (existingSearch) return;


        const overlay =
            document.createElement("div");

        overlay.className =
            "search-overlay";


        overlay.innerHTML = `

            <div class="search-box">

                <button
                    class="close-search"
                    type="button"
                    aria-label="Close search"
                >
                    <i class="fa-solid fa-xmark"></i>
                </button>


                <div class="search-content">

                    <span>
                        SEARCH PRODUCTS
                    </span>

                    <h2>
                        What are you looking for?
                    </h2>


                    <div class="search-input-wrapper">

                        <i class="fa-solid fa-magnifying-glass"></i>

                        <input
                            type="text"
                            id="productSearch"
                            placeholder="Search laptops, desktops, accessories..."
                            autocomplete="off"
                        >

                    </div>


                    <div
                        class="search-result"
                        id="searchResult"
                    ></div>

                </div>

            </div>

        `;


        document.body.appendChild(overlay);


        const input =
            document.getElementById(
                "productSearch"
            );

        const closeButton =
            overlay.querySelector(
                ".close-search"
            );

        const result =
            document.getElementById(
                "searchResult"
            );


        setTimeout(() => {

            if (input) input.focus();

        }, 100);


        closeButton.addEventListener(
            "click",
            () => overlay.remove()
        );


        overlay.addEventListener(
            "click",
            event => {

                if (event.target === overlay) {

                    overlay.remove();

                }

            }
        );


        input.addEventListener(
            "input",
            () => {

                const searchValue =
                    input.value
                        .trim()
                        .toLowerCase();


                if (!searchValue) {

                    result.innerHTML = "";

                    return;

                }


                const products =
                    document.querySelectorAll(
                        ".product-card"
                    );


                let matches = [];


                products.forEach(product => {

                    const title =
                        product
                            .querySelector("h3")
                            ?.textContent
                            .toLowerCase() || "";


                    const category =
                        product
                            .querySelector(
                                ".product-category"
                            )
                            ?.textContent
                            .toLowerCase() || "";


                    if (
                        title.includes(
                            searchValue
                        ) ||
                        category.includes(
                            searchValue
                        )
                    ) {

                        matches.push(title);

                    }

                });


                if (matches.length > 0) {

                    result.innerHTML = `

                        <p>
                            ${matches.length}
                            product${
                                matches.length > 1
                                    ? "s"
                                    : ""
                            }
                            found:
                        </p>

                        <strong>
                            ${matches.join(", ")}
                        </strong>

                    `;

                } else {

                    result.innerHTML = `

                        <p>
                            No products found for
                            "<strong>
                                ${searchValue}
                            </strong>"
                        </p>

                    `;

                }

            }
        );

    }


    /* =====================================================
       10. CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    )?.value.trim();


                const email =
                    document.getElementById(
                        "email"
                    )?.value.trim();


                const subject =
                    document.getElementById(
                        "subject"
                    )?.value.trim();


                const message =
                    document.getElementById(
                        "message"
                    )?.value.trim();


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    showNotification(
                        "Please fill in all fields.",
                        "error"
                    );

                    return;

                }


                if (!validateEmail(email)) {

                    showNotification(
                        "Please enter a valid email address.",
                        "error"
                    );

                    return;

                }


                showNotification(
                    "Message sent successfully!",
                    "success"
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       11. EMAIL VALIDATION
    ===================================================== */

    function validateEmail(email) {

        const pattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return pattern.test(email);

    }


    /* =====================================================
       12. NEWSLETTER
    ===================================================== */

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const emailInput =
                    newsletterForm.querySelector(
                        "input"
                    );


                const email =
                    emailInput?.value.trim();


                if (!email) {

                    showNotification(
                        "Please enter your email.",
                        "error"
                    );

                    return;

                }


                if (!validateEmail(email)) {

                    showNotification(
                        "Please enter a valid email.",
                        "error"
                    );

                    return;

                }


                showNotification(
                    "Successfully subscribed!",
                    "success"
                );


                newsletterForm.reset();

            }
        );

    }


    /* =====================================================
       13. NOTIFICATION SYSTEM
    ===================================================== */

    function showNotification(
        message,
        type = "info"
    ) {

        const oldNotification =
            document.querySelector(
                ".site-notification"
            );


        if (oldNotification) {

            oldNotification.remove();

        }


        const notification =
            document.createElement("div");


        notification.className =
            `site-notification ${type}`;


        let icon =
            "fa-circle-info";


        if (type === "success") {

            icon =
                "fa-circle-check";

        }


        if (type === "error") {

            icon =
                "fa-circle-exclamation";

        }


        notification.innerHTML = `

            <i class="fa-solid ${icon}"></i>

            <span>
                ${message}
            </span>

            <button
                type="button"
                class="notification-close"
                aria-label="Close notification"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>

        `;


        document.body.appendChild(
            notification
        );


        requestAnimationFrame(() => {

            notification.classList.add(
                "show"
            );

        });


        const close =
            notification.querySelector(
                ".notification-close"
            );


        close.addEventListener(
            "click",
            () => {
                removeNotification(
                    notification
                );
            }
        );


        setTimeout(() => {

            removeNotification(
                notification
            );

        }, 3000);

    }


    function removeNotification(
        notification
    ) {

        if (!notification) return;


        notification.classList.remove(
            "show"
        );


        setTimeout(() => {

            if (notification) {

                notification.remove();

            }

        }, 300);

    }


    /* =====================================================
       14. SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            `
            .category-card,
            .product-card,
            .service-card,
            .review-card,
            .about-image,
            .about-content,
            .contact-content,
            .contact-form
            `
        );


    revealElements.forEach(element => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity .7s ease, transform .7s ease";

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .15
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       15. CARD STAGGER
    ===================================================== */

    const cards =
        document.querySelectorAll(
            `
            .category-card,
            .product-card,
            .service-card,
            .review-card
            `
        );


    cards.forEach((card, index) => {

        card.style.transitionDelay =
            `${(index % 4) * .08}s`;

    });


    /* =====================================================
       16. SMOOTH SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                closeMobileMenu();


                const headerHeight =
                    header?.offsetHeight || 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
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
       17. ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                closeMobileMenu();


                const searchOverlay =
                    document.querySelector(
                        ".search-overlay"
                    );


                if (searchOverlay) {

                    searchOverlay.remove();

                }

            }

        }
    );


    /* =====================================================
       18. WINDOW RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 796) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       19. RIPPLE EFFECT
    ===================================================== */

    document.querySelectorAll(
        ".btn, .add-cart"
    ).forEach(button => {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement(
                        "span"
                    );


                ripple.className =
                    "ripple";


                const rect =
                    this.getBoundingClientRect();


                const size =
                    Math.max(
                        rect.width,
                        rect.height
                    );


                ripple.style.width =
                    `${size}px`;

                ripple.style.height =
                    `${size}px`;


                ripple.style.left =
                    `${
                        event.clientX -
                        rect.left -
                        size / 2
                    }px`;


                ripple.style.top =
                    `${
                        event.clientY -
                        rect.top -
                        size / 2
                    }px`;


                this.appendChild(ripple);


                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });


    /* =====================================================
       20. IMAGE ERROR
    ===================================================== */

    document.querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.opacity =
                        ".4";

                    image.alt =
                        "Image unavailable";

                }
            );

        });


    /* =====================================================
       21. CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom p"
        );


    if (footerYear) {

        footerYear.innerHTML =
            `© ${new Date().getFullYear()} TechNova. All Rights Reserved.`;

    }


    /* =====================================================
       22. PAGE LOADED
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});



/* =========================================================
   TECHNOVA — REVIEWS SLIDER
   LEFT + RIGHT BUTTONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       REVIEW DATA
    ===================================================== */

    const reviews = [

        {
            name: "Rahul Kumar",
            role: "Verified Customer",
            image: "css/assets/k_11zon.webp",
            rating: "★★★★★",
            text: "Amazing shopping experience. The laptop quality is excellent and delivery was very fast."
        },

        {
            name: "Arjun Reddy",
            role: "Business Customer",
            image: "css/assets/m_11zon.webp",
            rating: "★★★★★",
            text: "TechNova helped me choose the perfect laptop for my work. Great support and excellent service."
        },

        {
            name: "Priya Sharma",
            role: "Gaming Customer",
            image: "css/assets/asian_11zon.webp",
            rating: "★★★★★",
            text: "I bought a custom gaming PC from TechNova and the performance is outstanding. Highly recommended!"
        }

    ];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const reviewCard =
        document.querySelector(".review-card");

    const reviewImage =
        document.getElementById("reviewImage");

    const reviewName =
        document.getElementById("reviewName");

    const reviewRole =
        document.getElementById("reviewRole");

    const reviewStars =
        document.getElementById("reviewStars");

    const reviewText =
        document.getElementById("reviewText");

    const reviewCurrent =
        document.getElementById("reviewCurrent");

    const reviewPrev =
        document.querySelector(".review-prev");

    const reviewNext =
        document.querySelector(".review-next");

    const reviewDots =
        document.querySelectorAll(".review-dot");


    /* =====================================================
       CURRENT REVIEW
    ===================================================== */

    let currentReview = 0;


    /* =====================================================
       SHOW REVIEW
    ===================================================== */

    function showReview(index, direction = "next") {

        const review = reviews[index];

        if (!review) return;


        /* Exit animation */

        reviewCard.classList.remove(
            "review-slide-next",
            "review-slide-prev"
        );

        void reviewCard.offsetWidth;


        if (direction === "next") {

            reviewCard.classList.add(
                "review-slide-next"
            );

        } else {

            reviewCard.classList.add(
                "review-slide-prev"
            );

        }


        /* Update content */

        reviewImage.src =
            review.image;

        reviewImage.alt =
            review.name;

        reviewName.textContent =
            review.name;

        reviewRole.textContent =
            review.role;

        reviewStars.textContent =
            review.rating;

        reviewText.textContent =
            `"${review.text}"`;

        reviewCurrent.textContent =
            String(index + 1).padStart(2, "0");


        /* Update dots */

        reviewDots.forEach((dot, dotIndex) => {

            dot.classList.toggle(
                "active",
                dotIndex === index
            );

        });

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    reviewNext.addEventListener("click", () => {

        currentReview++;

        if (
            currentReview >=
            reviews.length
        ) {

            currentReview = 0;

        }

        showReview(
            currentReview,
            "next"
        );

    });


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    reviewPrev.addEventListener("click", () => {

        currentReview--;

        if (currentReview < 0) {

            currentReview =
                reviews.length - 1;

        }

        showReview(
            currentReview,
            "prev"
        );

    });


    /* =====================================================
       DOT BUTTONS
    ===================================================== */

    reviewDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            if (
                index ===
                currentReview
            ) {

                return;

            }


            const direction =
                index > currentReview
                    ? "next"
                    : "prev";


            currentReview = index;

            showReview(
                currentReview,
                direction
            );

        });

    });


    /* =====================================================
       AUTO SLIDER
    ===================================================== */

    let autoSlide =
        setInterval(() => {

            currentReview++;

            if (
                currentReview >=
                reviews.length
            ) {

                currentReview = 0;

            }

            showReview(
                currentReview,
                "next"
            );

        }, 5000);


    /* =====================================================
       STOP AUTO SLIDE ON HOVER
    ===================================================== */

    const slider =
        document.querySelector(".review-slider");


    slider.addEventListener(
        "mouseenter",
        () => {

            clearInterval(autoSlide);

        }
    );


    /* =====================================================
       RESTART AUTO SLIDE
    ===================================================== */

    slider.addEventListener(
        "mouseleave",
        () => {

            clearInterval(autoSlide);

            autoSlide =
                setInterval(() => {

                    currentReview++;

                    if (
                        currentReview >=
                        reviews.length
                    ) {

                        currentReview = 0;

                    }

                    showReview(
                        currentReview,
                        "next"
                    );

                }, 5000);

        }
    );


    /* =====================================================
       INITIAL REVIEW
    ===================================================== */

    showReview(
        0,
        "next"
    );

});

/* =========================================================
   TECHNOVA PRODUCT SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("productTrack");
    const prevBtn = document.getElementById("productPrev");
    const nextBtn = document.getElementById("productNext");
    const dots = document.querySelectorAll("#productDots .dot");

    const cards = document.querySelectorAll(".product-card");

    if (!track || !prevBtn || !nextBtn || !cards.length) {
        return;
    }


    let currentIndex = 0;


    /* =====================================================
       GET VISIBLE CARDS
    ===================================================== */

    function getVisibleCards() {

        if (window.innerWidth <= 796) {
            return 1;
        }

        if (window.innerWidth <= 1050) {
            return 2;
        }

        return 3;
    }


    /* =====================================================
       GET MAX INDEX
    ===================================================== */

    function getMaxIndex() {

        const visibleCards = getVisibleCards();

        return Math.max(
            0,
            cards.length - visibleCards
        );
    }


    /* =====================================================
       UPDATE SLIDER
    ===================================================== */

    function updateSlider() {

        const visibleCards = getVisibleCards();

        const gap = parseFloat(
            getComputedStyle(track).gap
        ) || 0;

        const cardWidth = cards[0].getBoundingClientRect().width;

        const moveAmount =
            currentIndex *
            (cardWidth + gap);

        track.style.transform =
            `translateX(-${moveAmount}px)`;


        /* =================================================
           DOT UPDATE
        ================================================= */

        let dotIndex = currentIndex;

        if (visibleCards === 3) {
            dotIndex = Math.min(
                currentIndex,
                3
            );
        }

        if (visibleCards === 2) {
            dotIndex = Math.min(
                currentIndex,
                4
            );
        }

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === dotIndex
            );

        });

    }


    /* =====================================================
       NEXT BUTTON
    ===================================================== */

    nextBtn.addEventListener("click", () => {

        const maxIndex = getMaxIndex();

        if (currentIndex < maxIndex) {

            currentIndex++;

        } else {

            /* Go back to first */
            currentIndex = 0;

        }

        updateSlider();

    });


    /* =====================================================
       PREVIOUS BUTTON
    ===================================================== */

    prevBtn.addEventListener("click", () => {

        const maxIndex = getMaxIndex();

        if (currentIndex > 0) {

            currentIndex--;

        } else {

            /* Go to last */
            currentIndex = maxIndex;

        }

        updateSlider();

    });


    /* =====================================================
       DOT BUTTONS
    ===================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            const maxIndex = getMaxIndex();

            currentIndex =
                Math.min(
                    index,
                    maxIndex
                );

            updateSlider();

        });

    });


    /* =====================================================
       WISHLIST
    ===================================================== */

    const wishlistButtons =
        document.querySelectorAll(
            ".wishlist-btn"
        );

    wishlistButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");

            const icon =
                button.querySelector("i");

            if (
                button.classList.contains("active")
            ) {

                icon.classList.remove(
                    "fa-regular"
                );

                icon.classList.add(
                    "fa-solid"
                );

            } else {

                icon.classList.remove(
                    "fa-solid"
                );

                icon.classList.add(
                    "fa-regular"
                );

            }

        });

    });


    /* =====================================================
       ADD TO CART
    ===================================================== */

    const cartButtons =
        document.querySelectorAll(
            ".add-cart"
        );

    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const icon =
                button.querySelector("i");

            button.classList.add("added");

            icon.classList.remove(
                "fa-cart-plus"
            );

            icon.classList.add(
                "fa-check"
            );


            setTimeout(() => {

                button.classList.remove(
                    "added"
                );

                icon.classList.remove(
                    "fa-check"
                );

                icon.classList.add(
                    "fa-cart-plus"
                );

            }, 1200);

        });

    });


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            const maxIndex = getMaxIndex();

            if (currentIndex > maxIndex) {
                currentIndex = maxIndex;
            }

            updateSlider();

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateSlider();

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
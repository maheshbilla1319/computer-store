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
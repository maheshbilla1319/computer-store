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

    const mobileLogin =
        document.querySelector(".mobile-login-btn");

    const addCartButtons =
        document.querySelectorAll(".add-cart");

    const wishlistButtons =
        document.querySelectorAll(".wishlist-btn");

    const contactForm =
        document.getElementById("contactForm");

    const newsletterForm =
        document.getElementById("newsletterForm");

    const cartCountElement =
        document.querySelector(".cart-count");


    /* =====================================================
       2. MOBILE MENU
       HAMBURGER ☰  <->  X
    ===================================================== */

    function openMobileMenu() {

        if (!navbar || !menuToggle) return;

        navbar.classList.add("active");
        menuToggle.classList.add("active");

        menuToggle.innerHTML = "✕";

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");
    }


    function closeMobileMenu() {

        if (!navbar || !menuToggle) return;

        navbar.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.innerHTML = "☰";

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");
    }


    function toggleMobileMenu() {

        if (!navbar || !menuToggle) return;

        if (navbar.classList.contains("active")) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }
    }


    /* =====================================================
       MENU BUTTON CLICK
    ===================================================== */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* =====================================================
       CLOSE MENU AFTER NAV LINK CLICK
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });


    /* =====================================================
       MOBILE LOGIN
    ===================================================== */

    if (mobileLogin) {

        mobileLogin.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    }


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (!navbar || !menuToggle) return;

            const clickedInsideMenu =
                navbar.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);


            if (
                navbar.classList.contains("active") &&
                !clickedInsideMenu &&
                !clickedMenuButton
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       ESC KEY CLOSE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       CLOSE MENU WHEN SCREEN BECOMES DESKTOP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 768) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       3. CART
    ===================================================== */

    let cartCount = 0;


    function addToCart(productName) {

        cartCount++;


        if (cartCountElement) {

            cartCountElement.textContent =
                cartCount;

        }


        const popup =
            document.getElementById("cartPopup");

        const message =
            document.getElementById("cartMessage");


        if (popup && message) {

            message.textContent =
                productName +
                " added to cart!";

            popup.classList.add("show");


            setTimeout(() => {

                popup.classList.remove("show");

            }, 2500);

        }

    }


    /* =====================================================
       ADD CART BUTTONS
    ===================================================== */

    addCartButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productName =
                    button.dataset.product ||
                    "Product";

                addToCart(productName);

            }
        );

    });


    /* =====================================================
       4. WISHLIST
    ===================================================== */

    wishlistButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.classList.toggle("active");

            }
        );

    });


    /* =====================================================
       5. SEARCH BUTTON
    ===================================================== */

    if (searchBtn) {

        searchBtn.addEventListener(
            "click",
            () => {

                const searchBox =
                    document.getElementById("searchBox");

                if (searchBox) {

                    searchBox.classList.toggle("active");

                    if (
                        searchBox.classList.contains(
                            "active"
                        )
                    ) {

                        searchBox.focus();

                    }

                }

            }
        );

    }


    /* =====================================================
       6. HEADER SCROLL
    ===================================================== */

    if (header) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 50) {

                    header.classList.add("scrolled");

                } else {

                    header.classList.remove("scrolled");

                }

            }
        );

    }


    /* =====================================================
       7. CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                window.location.href =
                    "404.html";

            }
        );

    }


    /* =====================================================
       8. NEWSLETTER
    ===================================================== */

    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const emailInput =
                    document.getElementById(
                        "newsletterEmail"
                    );

                if (!emailInput) return;


                const email =
                    emailInput.value.trim();


                const gmailPattern =
                    /^[a-zA-Z0-9._%+-]+@gmail\.com$/;


                if (email === "") {

                    alert(
                        "Please enter your Gmail address."
                    );

                    emailInput.focus();

                    return;

                }


                if (
                    !gmailPattern.test(email)
                ) {

                    alert(
                        "Please enter a valid Gmail address."
                    );

                    emailInput.focus();

                    return;

                }


                window.location.href =
                    "404.html";

            }
        );

    }

});
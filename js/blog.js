/* =========================================================
   MOBILE MENU TOGGLE
   HAMBURGER ☰ <-> X
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navbar =
        document.querySelector(".navbar");


    if (menuToggle && navbar) {

        /* OPEN / CLOSE MENU */

        menuToggle.addEventListener("click", () => {

            const isOpen =
                menuToggle.classList.toggle("active");

            navbar.classList.toggle(
                "active",
                isOpen
            );


            /* Accessibility */

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );


            /* Prevent body scrolling */

            document.body.style.overflow =
                isOpen ? "hidden" : "";

        });


        /* CLOSE MENU WHEN NAV LINK IS CLICKED */

        const navLinks =
            navbar.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                navbar.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.style.overflow = "";

            });

        });


        /* CLOSE MENU WHEN MOBILE LOGIN IS CLICKED */

        const mobileLogin =
            navbar.querySelector(".mobile-login-btn");

        if (mobileLogin) {

            mobileLogin.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                navbar.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.style.overflow = "";

            });

        }


        /* CLOSE MENU WHEN SCREEN BECOMES DESKTOP */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 796) {

                menuToggle.classList.remove("active");

                navbar.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.style.overflow = "";

            }

        });

    }



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


                if (newsletterError) {

                    newsletterError.textContent =
                        "Please enter your email address.";

                }

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


                if (newsletterError) {

                    newsletterError.textContent =
                        "Please enter a valid email address.";

                }

                return false;

            }


            /* VALID EMAIL */

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
           FORM SUBMIT
        ================================================= */

        newsletterForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const isValid =
                    validateNewsletterEmail();


                /* INVALID → DON'T REDIRECT */

                if (!isValid) {

                    newsletterEmail.focus();

                    return;

                }


                /* VALID → REDIRECT */

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



    /* =====================================================
       FAQ ACCORDION
       AUTOMATIC OPEN / CLOSE
       ONE FAQ AT A TIME

       OPEN   → −
       CLOSED → +
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(function (faqItem) {

        const icon =
            faqItem.querySelector("summary b");


        /* =================================================
           INITIAL ICON
        ================================================= */

        if (icon) {

            icon.textContent =
                faqItem.open ? "−" : "+";

        }


        /* =================================================
           AUTOMATIC TOGGLE
        ================================================= */

        faqItem.addEventListener(
            "toggle",
            function () {


                /* =========================================
                   FAQ OPEN
                ========================================= */

                if (faqItem.open) {


                    /* CLOSE OTHER FAQS */

                    faqItems.forEach(
                        function (otherItem) {

                            if (
                                otherItem !== faqItem &&
                                otherItem.open
                            ) {

                                otherItem.open = false;

                            }

                        }
                    );


                    /* CURRENT → − */

                    if (icon) {

                        icon.textContent = "−";

                    }

                }


                /* =========================================
                   FAQ CLOSED
                ========================================= */

                else {

                    /* CURRENT → + */

                    if (icon) {

                        icon.textContent = "+";

                    }

                }

            }
        );

    });

});
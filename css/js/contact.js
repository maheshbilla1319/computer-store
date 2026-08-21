/* =========================================================
   TECHNOVA ABOUT + CONTACT JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.getElementById("header");

    const navbar =
        document.getElementById("navbar");

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.querySelectorAll(".navbar a");

    const revealElements =
        document.querySelectorAll(".reveal");

    const counters =
        document.querySelectorAll(".counter");

    const faqItems =
        document.querySelectorAll(".faq-item");

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    menuToggle.addEventListener("click", () => {

        const open =
            navbar.classList.toggle("active");

        menuToggle.classList.toggle(
            "active",
            open
        );

        menuToggle.setAttribute(
            "aria-expanded",
            open
        );

    });


    /* =====================================================
       CLOSE MENU
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            link.classList.add("active");

            navbar.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    window.addEventListener("scroll", () => {

        if (window.scrollY > 40) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    });


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
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

    let counterStarted = false;


    function startCounters() {

        if (counterStarted) {
            return;
        }

        counterStarted = true;


        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );


            let current = 0;

            const increment =
                target / 100;


            const updateCounter = () => {

                current += increment;


                if (current < target) {

                    counter.textContent =
                        Math.ceil(current);

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target.toLocaleString();

                }

            };


            updateCounter();

        });

    }


    const statsSection =
        document.querySelector(
            ".stats-section"
        );


    const statsObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        startCounters();

                        statsObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.3
            }
        );


    if (statsSection) {

        statsObserver.observe(
            statsSection
        );

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        question.addEventListener(
            "click",
            () => {

                faqItems.forEach(other => {

                    if (
                        other !== item
                    ) {

                        other.classList.remove(
                            "active"
                        );

                    }

                });


                item.classList.toggle(
                    "active"
                );

            }
        );

    });


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const name =
                    document.getElementById(
                        "name"
                    ).value.trim();


                const email =
                    document.getElementById(
                        "email"
                    ).value.trim();


                const message =
                    document.getElementById(
                        "message"
                    ).value.trim();


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    formMessage.textContent =
                        "Please fill in all required fields.";

                    formMessage.style.color =
                        "#ed3158";

                    return;

                }


                localStorage.setItem(
                    "techNovaContactName",
                    name
                );


                localStorage.setItem(
                    "techNovaContactEmail",
                    email
                );


                formMessage.textContent =
                    "Thank you! Your message has been received.";

                formMessage.style.color =
                    "#19a974";


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                navbar.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

            }

        }
    );

});
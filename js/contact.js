/* =========================================================
   TECHNOVA ABOUT + CONTACT JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SELECT ELEMENTS
    ===================================================== */

    const header = document.getElementById("header");
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");

    const navLinks = document.querySelectorAll(".navbar a");
    const revealElements = document.querySelectorAll(".reveal");
    const counters = document.querySelectorAll(".counter");
    const faqItems = document.querySelectorAll(".faq-item");

    /* CONTACT FORM */
    const contactForm = document.getElementById("contactForm");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");

    const formMessage = document.getElementById("formMessage");
    const submitBtn = document.getElementById("submitBtn");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const open = navbar.classList.toggle("active");

            menuToggle.classList.toggle("active", open);

            menuToggle.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            if (navbar) {
                navbar.classList.remove("active");
            }

            if (menuToggle) {

                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 40) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    if (revealElements.length > 0) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

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

    }


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
                Number(counter.dataset.target);

            let current = 0;

            const increment = target / 100;

            function updateCounter() {

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

            }

            updateCounter();

        });

    }


    const statsSection =
        document.querySelector(".stats-section");

    if (statsSection) {

        const statsObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

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

        statsObserver.observe(statsSection);

    }


/* =====================================================
   FAQ ACCORDION - AUTOMATIC OPEN / CLOSE
===================================================== */

let currentFaq = 0;

function autoOpenFAQ() {

    if (!faqItems || faqItems.length === 0) {
        return;
    }

    // Remove active class from all FAQ items
    faqItems.forEach(item => {
        item.classList.remove("active");
    });

    // Open current FAQ
    faqItems[currentFaq].classList.add("active");

    // Move to next FAQ
    currentFaq++;

    if (currentFaq >= faqItems.length) {
        currentFaq = 0;
    }
}

/* First FAQ open */
autoOpenFAQ();

/* Automatically change FAQ every 3 seconds */
setInterval(() => {
    autoOpenFAQ();
}, 3000);


/* =====================================================
   FAQ CLICK SUPPORT
===================================================== */

faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    if (!question) {
        return;
    }

    question.addEventListener("click", () => {

        faqItems.forEach(other => {

            if (other !== item) {
                other.classList.remove("active");
            }

        });

        item.classList.toggle("active");

        // Continue automatic sequence from clicked item
        currentFaq = faqItems.indexOf(item) + 1;

        if (currentFaq >= faqItems.length) {
            currentFaq = 0;
        }

    });

});

    /* =====================================================
       CONTACT FORM VALIDATION
    ===================================================== */

    if (contactForm) {


        /* =================================================
           ERROR FUNCTION
        ================================================= */

        function showError(input, errorId, message) {

            const group =
                input.closest(".input-group");

            const errorElement =
                document.getElementById(errorId);

            if (group) {
                group.classList.add("has-error");
            }

            if (errorElement) {
                errorElement.textContent = message;
            }

        }


        /* =================================================
           CLEAR ERROR
        ================================================= */

        function clearError(input, errorId) {

            const group =
                input.closest(".input-group");

            const errorElement =
                document.getElementById(errorId);

            if (group) {
                group.classList.remove("has-error");
            }

            if (errorElement) {
                errorElement.textContent = "";
            }

        }


        /* =================================================
           CLEAR FORM MESSAGE
        ================================================= */

        function clearFormMessage() {

            if (formMessage) {

                formMessage.textContent = "";

                formMessage.className =
                    "form-message";

            }

        }


        /* =================================================
           NAME VALIDATION
        ================================================= */

        function validateName() {

            const name =
                nameInput.value.trim();

            if (name === "") {

                showError(
                    nameInput,
                    "nameError",
                    "Please enter your name."
                );

                return false;
            }

            if (name.length < 3) {

                showError(
                    nameInput,
                    "nameError",
                    "Name must contain at least 3 characters."
                );

                return false;
            }

            /*
             * Allows letters and spaces
             */
            if (!/^[A-Za-z\s]+$/.test(name)) {

                showError(
                    nameInput,
                    "nameError",
                    "Please enter a valid name."
                );

                return false;
            }

            clearError(
                nameInput,
                "nameError"
            );

            return true;

        }


        /* =================================================
           EMAIL VALIDATION
        ================================================= */

        function validateEmail() {

            const email =
                emailInput.value.trim();

            /*
             * Correct email regex
             */
            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

            if (email === "") {

                showError(
                    emailInput,
                    "emailError",
                    "Please enter your email address."
                );

                return false;
            }

            if (!emailPattern.test(email)) {

                showError(
                    emailInput,
                    "emailError",
                    "Please enter a valid email address."
                );

                return false;
            }

            clearError(
                emailInput,
                "emailError"
            );

            return true;

        }


        /* =================================================
           PHONE VALIDATION
           PHONE IS OPTIONAL
        ================================================= */

        function validatePhone() {

            const phone =
                phoneInput.value.trim();

            /*
             * Phone is optional
             */
            if (phone === "") {

                clearError(
                    phoneInput,
                    "phoneError"
                );

                return true;
            }

            /*
             * Remove spaces and hyphens
             */
            const cleanPhone =
                phone.replace(/[\s-]/g, "");

            /*
             * Valid Indian phone:
             *
             * 9876543210
             * 919876543210
             * +919876543210
             */
            const phonePattern =
                /^(\+91|91)?[6-9]\d{9}$/;

            if (!phonePattern.test(cleanPhone)) {

                showError(
                    phoneInput,
                    "phoneError",
                    "Please enter a valid Indian phone number."
                );

                return false;
            }

            clearError(
                phoneInput,
                "phoneError"
            );

            return true;

        }


        /* =================================================
           SUBJECT VALIDATION
        ================================================= */

        function validateSubject() {

            if (subjectInput.value === "") {

                showError(
                    subjectInput,
                    "subjectError",
                    "Please select a subject."
                );

                return false;
            }

            clearError(
                subjectInput,
                "subjectError"
            );

            return true;

        }


        /* =================================================
           MESSAGE VALIDATION
        ================================================= */

        function validateMessage() {

            const message =
                messageInput.value.trim();

            if (message === "") {

                showError(
                    messageInput,
                    "messageError",
                    "Please enter your message."
                );

                return false;
            }

            if (message.length < 10) {

                showError(
                    messageInput,
                    "messageError",
                    "Message must contain at least 10 characters."
                );

                return false;
            }

            clearError(
                messageInput,
                "messageError"
            );

            return true;

        }


        /* =================================================
           LIVE VALIDATION
        ================================================= */

        nameInput.addEventListener(
            "input",
            validateName
        );

        emailInput.addEventListener(
            "input",
            validateEmail
        );

        phoneInput.addEventListener(
            "input",
            validatePhone
        );

        subjectInput.addEventListener(
            "change",
            validateSubject
        );

        messageInput.addEventListener(
            "input",
            validateMessage
        );


        /* =================================================
           FORM SUBMIT
        ================================================= */

        contactForm.addEventListener(
            "submit",
            event => {

                /*
                 * Stop normal form submit
                 */
                event.preventDefault();

                clearFormMessage();


                /* =========================================
                   VALIDATE EVERY FIELD
                ========================================= */

                const nameValid =
                    validateName();

                const emailValid =
                    validateEmail();

                const phoneValid =
                    validatePhone();

                const subjectValid =
                    validateSubject();

                const messageValid =
                    validateMessage();


                /* =========================================
                   IF ANY FIELD IS INVALID
                ========================================= */

                if (
                    !nameValid ||
                    !emailValid ||
                    !phoneValid ||
                    !subjectValid ||
                    !messageValid
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please fill all required fields correctly.";

                        formMessage.className =
                            "form-message error";

                    }

                    /*
                     * Stay on same page
                     */
                    return;

                }


                /* =========================================
                   ALL VALID
                ========================================= */

                if (formMessage) {

                    formMessage.textContent =
                        "Message submitted successfully! Redirecting...";

                    formMessage.className =
                        "form-message success";

                }


                if (submitBtn) {

                    submitBtn.disabled = true;

                }


                /* =========================================
                   REDIRECT ONLY AFTER VALIDATION
                ========================================= */

                setTimeout(() => {

                    window.location.href =
                        "404.html";

                }, 1000);

            }
        );

    }


    /* =====================================================
       ESCAPE KEY - CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                if (navbar) {

                    navbar.classList.remove(
                        "active"
                    );

                }

                if (menuToggle) {

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

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
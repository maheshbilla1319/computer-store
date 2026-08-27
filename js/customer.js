/* =====================================================
   TECHNOVA CUSTOMER DASHBOARD JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.getElementById("sidebar");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuItems = document.querySelectorAll(".menu-item");
    const logoutBtn = document.getElementById("logoutBtn");


    /* =================================================
       MOBILE SIDEBAR
    ================================================= */

    mobileMenu.addEventListener("click", () => {

        sidebar.classList.toggle("active");

        const icon = mobileMenu.querySelector("i");

        if (sidebar.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* =================================================
       SIDEBAR NAVIGATION
    ================================================= */

    menuItems.forEach(item => {

        item.addEventListener("click", () => {

            menuItems.forEach(link => {
                link.classList.remove("active");
            });

            item.classList.add("active");

            if (window.innerWidth <= 796) {

                sidebar.classList.remove("active");

                const icon = mobileMenu.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });


    /* =================================================
       ACTIVE SECTION ON SCROLL
    ================================================= */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 130;

            if (
                window.scrollY >= sectionTop
            ) {
                current = section.getAttribute("id");
            }

        });

        menuItems.forEach(item => {

            item.classList.remove("active");

            const href = item.getAttribute("href");

            if (href === `#${current}`) {
                item.classList.add("active");
            }

        });

    });


    /* =================================================
       COUNTER ANIMATION
    ================================================= */

    const counters =
        document.querySelectorAll("[data-count]");

    counters.forEach(counter => {

        const target =
            Number(counter.dataset.count);

        let current = 0;

        const increment =
            Math.max(1, Math.ceil(target / 60));

        const updateCounter = () => {

            current += increment;

            if (current >= target) {
                current = target;
            }

            counter.textContent =
                current.toLocaleString();

            if (current < target) {
                requestAnimationFrame(updateCounter);
            }

        };

        updateCounter();

    });


    /* =================================================
       WISHLIST HEART
    ================================================= */

    const hearts =
        document.querySelectorAll(".heart-btn");

    hearts.forEach(button => {

        button.addEventListener("click", () => {

            const icon =
                button.querySelector("i");

            icon.classList.toggle("fa-regular");
            icon.classList.toggle("fa-solid");

            if (icon.classList.contains("fa-solid")) {

                icon.style.color = "#ff4d72";

            } else {

                icon.style.color = "";

            }

        });

    });


    /* =================================================
       CART BUTTON
    ================================================= */

    const cartButtons =
        document.querySelectorAll(".cart-btn");

    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.innerHTML =
                '<i class="fa-solid fa-check"></i>';

            button.style.background = "#20b873";
            button.style.color = "white";

            setTimeout(() => {

                button.innerHTML =
                    '<i class="fa-solid fa-cart-plus"></i>';

                button.style.background = "";
                button.style.color = "";

            }, 1500);

        });

    });


    /* =================================================
       LOGOUT
    ================================================= */

    logoutBtn.addEventListener("click", () => {

        const confirmLogout =
            confirm(
                "Are you sure you want to logout?"
            );

        if (confirmLogout) {

            localStorage.removeItem("customerName");
            localStorage.removeItem("customerEmail");
            localStorage.removeItem("customerRole");

            window.location.href = "login.html";

        }

    });


    /* =================================================
       LOAD CUSTOMER NAME
    ================================================= */

    const savedName =
        localStorage.getItem("customerName");

    if (savedName) {

        const customerName =
            document.getElementById("customerName");

        const welcomeName =
            document.getElementById("welcomeName");

        customerName.textContent =
            savedName;

        welcomeName.textContent =
            savedName + "!";

    }


    /* =================================================
       NOTIFICATION
    ================================================= */

    const notification =
        document.querySelector(".notification");

    notification.addEventListener("click", () => {

        alert(
            "You have 3 new notifications."
        );

    });


    /* =================================================
       SEARCH
    ================================================= */

    const searchButton =
        document.querySelector(".top-icon");

    searchButton.addEventListener("click", () => {

        const search =
            prompt(
                "What product are you looking for?"
            );

        if (search) {

            alert(
                `Searching for: ${search}`
            );

        }

    });


    /* =================================================
       ESCAPE SIDEBAR
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            sidebar.classList.remove("active");

            const icon =
                mobileMenu.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* =================================================
       REVEAL ANIMATION
    ================================================= */

    const revealItems =
        document.querySelectorAll(
            ".stat-card, .quick-card, .product-card, .offer-card, .setting-item"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealItems.forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(25px)";
        item.style.transition = "opacity .6s ease, transform .6s ease";

        observer.observe(item);

    });


});
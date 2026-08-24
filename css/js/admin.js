/* =====================================================
   TECHNOVA ADMIN DASHBOARD JS
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* ==========================================
           ELEMENTS
        =========================================== */

        const sidebar =
            document.getElementById(
                "sidebar"
            );

        const menuToggle =
            document.getElementById(
                "menuToggle"
            );

        const sidebarClose =
            document.getElementById(
                "sidebarClose"
            );

        const sidebarOverlay =
            document.getElementById(
                "sidebarOverlay"
            );

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );

        const notificationBtn =
            document.getElementById(
                "notificationBtn"
            );


        /* ==========================================
           SIDEBAR OPEN
        =========================================== */

        menuToggle.addEventListener(
            "click",
            () => {

                sidebar.classList.add(
                    "open"
                );

                sidebarOverlay.classList.add(
                    "show"
                );

            }
        );


        /* ==========================================
           SIDEBAR CLOSE
        =========================================== */

        function closeSidebar() {

            sidebar.classList.remove(
                "open"
            );

            sidebarOverlay.classList.remove(
                "show"
            );

        }


        sidebarClose.addEventListener(
            "click",
            closeSidebar
        );


        sidebarOverlay.addEventListener(
            "click",
            closeSidebar
        );


        /* ==========================================
           NAVIGATION
        =========================================== */

        const sidebarLinks =
            document.querySelectorAll(
                ".sidebar-link"
            );


        sidebarLinks.forEach(
            link => {

                link.addEventListener(
                    "click",
                    () => {

                        sidebarLinks.forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                        link.classList.add(
                            "active"
                        );


                        closeSidebar();

                    }
                );

            }
        );


        /* ==========================================
           COUNTERS
        =========================================== */

        const counters =
            document.querySelectorAll(
                ".counter"
            );


        counters.forEach(
            counter => {

                const target =
                    Number(
                        counter.dataset.target
                    );


                let current = 0;

                const increment =
                    target / 80;


                function updateCounter() {

                    current += increment;


                    if (
                        current >= target
                    ) {

                        counter.textContent =
                            target.toLocaleString();

                        return;

                    }


                    counter.textContent =
                        Math.floor(
                            current
                        ).toLocaleString();


                    requestAnimationFrame(
                        updateCounter
                    );

                }


                updateCounter();

            }
        );


        /* ==========================================
           CLOCK
        =========================================== */

        function updateClock() {

            const now =
                new Date();


            const time =
                now.toLocaleTimeString(
                    "en-IN",
                    {
                        hour:
                            "2-digit",

                        minute:
                            "2-digit",

                        second:
                            "2-digit"
                    }
                );


            const date =
                now.toLocaleDateString(
                    "en-IN",
                    {
                        day:
                            "2-digit",

                        month:
                            "short",

                        year:
                            "numeric"
                    }
                );


            document.getElementById(
                "clock"
            ).textContent = time;


            document.getElementById(
                "date"
            ).textContent = date;

        }


        updateClock();

        setInterval(
            updateClock,
            1000
        );


        /* ==========================================
           PRODUCT HEART
        =========================================== */

        document
            .querySelectorAll(
                ".product-heart"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const icon =
                                button.querySelector(
                                    "i"
                                );


                            icon.classList.toggle(
                                "fa-regular"
                            );

                            icon.classList.toggle(
                                "fa-solid"
                            );


                            icon.style.color =
                                "#ed3158";

                        }
                    );

                }
            );


        /* ==========================================
           SEARCH
        =========================================== */

        const searchInput =
            document.getElementById(
                "searchInput"
            );


        searchInput.addEventListener(
            "input",
            event => {

                const value =
                    event.target.value
                        .toLowerCase();


                document
                    .querySelectorAll(
                        ".product-card"
                    )
                    .forEach(
                        card => {

                            const text =
                                card.textContent
                                    .toLowerCase();


                            card.style.display =
                                text.includes(value)
                                    ? ""
                                    : "none";

                        }
                    );

            }
        );


        /* ==========================================
           NOTIFICATION
        =========================================== */

        notificationBtn.addEventListener(
            "click",
            () => {

                showToast(
                    "You have 3 new notifications"
                );

            }
        );


        /* ==========================================
           PROFILE
        =========================================== */

        document
            .getElementById(
                "profileBtn"
            )
            .addEventListener(
                "click",
                () => {

                    showToast(
                        "Admin profile opened"
                    );

                }
            );


        /* ==========================================
           LOGOUT
        =========================================== */

        logoutBtn.addEventListener(
            "click",
            () => {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {
                    return;
                }


                localStorage.removeItem(
                    "stacklyLoggedIn"
                );

                localStorage.removeItem(
                    "stacklyUser"
                );


                showToast(
                    "Logging out..."
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "auth.html";

                    },
                    1000
                );

            }
        );


        /* ==========================================
           CHART FILTER
        =========================================== */

        const chartFilter =
            document.getElementById(
                "chartFilter"
            );


        chartFilter.addEventListener(
            "change",
            () => {

                const bars =
                    document.querySelectorAll(
                        ".bar"
                    );


                bars.forEach(
                    bar => {

                        const height =
                            Math.floor(
                                Math.random() * 55
                            ) + 40;


                        bar.style.height =
                            height + "%";

                    }
                );


                showToast(
                    chartFilter.value +
                    " analytics loaded"
                );

            }
        );


        /* ==========================================
           SCROLL ANIMATION
        =========================================== */

        const panels =
            document.querySelectorAll(
                ".panel, .stat-card"
            );


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.style.opacity =
                                    "1";

                                entry.target.style.transform =
                                    "translateY(0)";

                            }

                        }
                    );

                },
                {
                    threshold: .1
                }
            );


        panels.forEach(
            panel => {

                panel.style.opacity =
                    "0";

                panel.style.transform =
                    "translateY(15px)";

                panel.style.transition =
                    "opacity .6s ease, transform .6s ease";

                observer.observe(
                    panel
                );

            }
        );


    }
);


/* =====================================================
   SCROLL TO SECTION
===================================================== */

function scrollToSection(
    id
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {
        return;
    }


    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =====================================================
   TOAST
===================================================== */

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.querySelector(
        "span"
    ).textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.toastTimer
    );


    window.toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}
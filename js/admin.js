document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       ELEMENTS
    ========================================= */

    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const menuLinks = document.querySelectorAll(".menu-link");


    /* =========================================
       OPEN SIDEBAR
    ========================================= */

    function openSidebar() {

        if (!sidebar) return;

        sidebar.classList.add("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.add("active");
        }

        document.body.classList.add("sidebar-open");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Close menu"
            );

            /* Change hamburger to X */
            menuToggle.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';
        }

    }


    /* =========================================
       CLOSE SIDEBAR
    ========================================= */

    function closeSidebar() {

        if (!sidebar) return;

        sidebar.classList.remove("open");

        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }

        document.body.classList.remove("sidebar-open");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

            /* Change X back to hamburger */
            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

    }


    /* =========================================
       TOGGLE MENU
    ========================================= */

    if (menuToggle && sidebar) {

        menuToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                if (
                    sidebar.classList.contains("open")
                ) {

                    closeSidebar();

                } else {

                    openSidebar();

                }

            }
        );

    }


    /* =========================================
       OVERLAY CLOSE
    ========================================= */

    if (sidebarOverlay) {

        sidebarOverlay.addEventListener(
            "click",
            function () {

                closeSidebar();

            }
        );

    }


    /* =========================================
       MENU LINKS
    ========================================= */

    menuLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                menuLinks.forEach(function (item) {

                    item.classList.remove("active");

                });

                this.classList.add("active");

                /* Close menu on mobile */
                if (window.innerWidth <= 768) {

                    closeSidebar();

                }

            }
        );

    });


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    /* =========================================
       RESIZE
    ========================================= */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 768) {

                closeSidebar();

            }

        }
    );

});
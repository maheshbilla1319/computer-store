// =====================================
// SIDEBAR
// =====================================

const sidebar =
    document.getElementById("sidebar");

const menuToggle =
    document.getElementById("menuToggle");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


// =====================================
// OPEN SIDEBAR
// =====================================

menuToggle.addEventListener(
    "click",
    function () {

        sidebar.classList.toggle("open");

        sidebarOverlay.classList.toggle("show");

    }
);


// =====================================
// CLOSE SIDEBAR
// =====================================

sidebarOverlay.addEventListener(
    "click",
    function () {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("show");

    }
);


// =====================================
// MENU LINKS
// =====================================

const menuLinks =
    document.querySelectorAll(".menu-link");


menuLinks.forEach(link => {

    link.addEventListener(
        "click",
        function () {

            // Remove active
            menuLinks.forEach(item => {

                item.classList.remove("active");

            });


            // Add active
            this.classList.add("active");


            // Mobile close
            sidebar.classList.remove("open");

            sidebarOverlay.classList.remove("show");

        }
    );

});


// =====================================
// ACTIVE SECTION WHILE SCROLLING
// =====================================

const sections =
    document.querySelectorAll(
        ".dashboard-section"
    );


window.addEventListener(
    "scroll",
    function () {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

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


        menuLinks.forEach(link => {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }
);


// =====================================
// GET ADMIN EMAIL
// FROM URL
// NO LOCAL STORAGE
// =====================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const adminEmail =
    urlParams.get("email");


const adminEmailElement =
    document.getElementById("adminEmail");


if (
    adminEmail &&
    adminEmailElement
) {

    adminEmailElement.textContent =
        adminEmail;

}


// =====================================
// QUICK ACTION BUTTONS
// =====================================

const quickButtons =
    document.querySelectorAll(
        ".quick-actions button"
    );


quickButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const buttonText =
                this.textContent.trim();

            console.log(
                "Clicked:",
                buttonText
            );

        }
    );

});


// =====================================
// PRODUCT BUTTONS
// =====================================

const productButtons =
    document.querySelectorAll(
        ".product-info button"
    );


productButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            alert(
                "Product management opened."
            );

        }
    );

});


// =====================================
// ADD PRODUCT BUTTON
// =====================================

const primaryButton =
    document.querySelector(
        ".primary-btn"
    );


if (primaryButton) {

    primaryButton.addEventListener(
        "click",
        function () {

            alert(
                "Add Product feature is ready."
            );

        }
    );

}


// =====================================
// NOTIFICATION
// =====================================

const notification =
    document.querySelector(
        ".notification"
    );


notification.addEventListener(
    "click",
    function () {

        alert(
            "You have 3 new notifications."
        );

    }
);
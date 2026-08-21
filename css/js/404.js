/* =====================================================
   TECHNOVA 404 PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       BACK BUTTON
    ================================================= */

    const backBtn = document.getElementById("backBtn");

    if (backBtn) {

        backBtn.addEventListener("click", () => {

            if (window.history.length > 1) {

                window.history.back();

            } else {

                window.location.href = "index.html";

            }

        });

    }


    /* =================================================
       KEYBOARD ANIMATION
    ================================================= */

    const keys =
        document.querySelectorAll(".keyboard span");

    keys.forEach((key, index) => {

        setInterval(() => {

            key.style.transform = "translateY(3px)";

            setTimeout(() => {

                key.style.transform = "translateY(0)";

            }, 150);

        }, 1500 + index * 120);

    });


    /* =================================================
       TERMINAL TYPING EFFECT
    ================================================= */

    const terminalText = [
        "searching_page...",
        "checking_server...",
        "scanning_routes...",
        "ERROR 404",
        "page_not_found.exe"
    ];

    const terminal =
        document.querySelector(".terminal-content");

    if (terminal) {

        let current = 0;

        setInterval(() => {

            current++;

            if (current >= terminalText.length) {
                current = 0;
            }

        }, 2000);

    }


    /* =================================================
       MOUSE PARALLAX
    ================================================= */

    const computer =
        document.querySelector(".computer-wrapper");

    document.addEventListener("mousemove", (event) => {

        if (!computer || window.innerWidth < 796) {
            return;
        }

        const x =
            (window.innerWidth / 2 - event.clientX) / 50;

        const y =
            (window.innerHeight / 2 - event.clientY) / 50;

        computer.style.transform =
            `translate(${x}px, ${y}px)`;

    });


    /* =================================================
       BUTTON RIPPLE
    ================================================= */

    const buttons =
        document.querySelectorAll(
            ".primary-btn, .secondary-btn"
        );

    buttons.forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple =
                document.createElement("span");

            ripple.style.position = "absolute";
            ripple.style.width = "10px";
            ripple.style.height = "10px";
            ripple.style.borderRadius = "50%";
            ripple.style.background = "rgba(255,255,255,.5)";
            ripple.style.transform = "scale(0)";
            ripple.style.pointerEvents = "none";

            const rect =
                this.getBoundingClientRect();

            ripple.style.left =
                `${event.clientX - rect.left}px`;

            ripple.style.top =
                `${event.clientY - rect.top}px`;

            this.style.position = "relative";
            this.style.overflow = "hidden";

            this.appendChild(ripple);

            ripple.animate(
                [
                    {
                        transform: "scale(0)",
                        opacity: 1
                    },
                    {
                        transform: "scale(25)",
                        opacity: 0
                    }
                ],
                {
                    duration: 600,
                    easing: "ease-out"
                }
            );

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });

});
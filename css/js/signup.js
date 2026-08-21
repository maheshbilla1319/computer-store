/* =====================================================
   STACKLY AUTH SYSTEM
   SIGNUP + LOGIN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =========================================
       ELEMENTS
    ========================================== */

    const signupTab =
        document.getElementById("signupTab");

    const loginTab =
        document.getElementById("loginTab");

    const signupForm =
        document.getElementById("signupForm");

    const loginForm =
        document.getElementById("loginForm");

    const authTabs =
        document.querySelector(".auth-tabs");

    const authTitle =
        document.getElementById("authTitle");

    const authSubtitle =
        document.getElementById("authSubtitle");

    const footerText =
        document.getElementById("footerText");

    const footerSwitch =
        document.getElementById("footerSwitch");

    const formMessage =
        document.getElementById("formMessage");

    const successPopup =
        document.getElementById("successPopup");


    /* =========================================
       SWITCH TO SIGNUP
    ========================================== */

    function showSignup() {

        signupForm.classList.add(
            "active-form"
        );

        loginForm.classList.remove(
            "active-form"
        );

        signupTab.classList.add("active");

        loginTab.classList.remove("active");

        authTabs.classList.remove(
            "login-active"
        );

        authTitle.textContent =
            "Create Account";

        authSubtitle.textContent =
            "Join Stackly and get started today";

        footerText.textContent =
            "Already have an account?";

        footerSwitch.textContent =
            "Login";

        clearMessage();
    }


    /* =========================================
       SWITCH TO LOGIN
    ========================================== */

    function showLogin() {

        loginForm.classList.add(
            "active-form"
        );

        signupForm.classList.remove(
            "active-form"
        );

        loginTab.classList.add("active");

        signupTab.classList.remove("active");

        authTabs.classList.add(
            "login-active"
        );

        authTitle.textContent =
            "Welcome Back";

        authSubtitle.textContent =
            "Login to continue to your Stackly account";

        footerText.textContent =
            "Don't have an account?";

        footerSwitch.textContent =
            "Sign Up";

        clearMessage();
    }


    signupTab.addEventListener(
        "click",
        showSignup
    );


    loginTab.addEventListener(
        "click",
        showLogin
    );


    footerSwitch.addEventListener(
        "click",
        () => {

            if (
                loginForm.classList.contains(
                    "active-form"
                )
            ) {
                showSignup();
            } else {
                showLogin();
            }

        }
    );


    /* =========================================
       PASSWORD SHOW / HIDE
    ========================================== */

    document
        .querySelectorAll(".password-toggle")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const targetId =
                        button.dataset.target;

                    const input =
                        document.getElementById(
                            targetId
                        );

                    const icon =
                        button.querySelector("i");


                    if (
                        input.type === "password"
                    ) {

                        input.type =
                            "text";

                        icon.classList.remove(
                            "fa-eye"
                        );

                        icon.classList.add(
                            "fa-eye-slash"
                        );

                    } else {

                        input.type =
                            "password";

                        icon.classList.remove(
                            "fa-eye-slash"
                        );

                        icon.classList.add(
                            "fa-eye"
                        );

                    }

                }
            );

        });


    /* =========================================
       MESSAGE
    ========================================== */

    function showMessage(
        message,
        type = "error"
    ) {

        formMessage.textContent =
            message;

        formMessage.className =
            "form-message " + type;

    }


    function clearMessage() {

        formMessage.textContent = "";

        formMessage.className =
            "form-message";

    }


    /* =========================================
       GET ACCOUNTS
    ========================================== */

    function getAccounts() {

        return JSON.parse(
            localStorage.getItem(
                "stacklyAccounts"
            )
        ) || [];

    }


    /* =========================================
       SAVE ACCOUNTS
    ========================================== */

    function saveAccounts(accounts) {

        localStorage.setItem(
            "stacklyAccounts",
            JSON.stringify(accounts)
        );

    }


    /* =========================================
       SIGNUP
    ========================================== */

    signupForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document
                    .getElementById("signupName")
                    .value
                    .trim();

            const email =
                document
                    .getElementById("signupEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("signupPassword")
                    .value;

            const confirmPassword =
                document
                    .getElementById("signupConfirm")
                    .value;

            const terms =
                document
                    .getElementById("terms")
                    .checked;


            const role =
                document.querySelector(
                    'input[name="signupRole"]:checked'
                ).value;


            /* VALIDATION */

            if (name.length < 3) {

                showMessage(
                    "Please enter your full name."
                );

                return;
            }


            if (!email.includes("@")) {

                showMessage(
                    "Please enter a valid email."
                );

                return;
            }


            if (password.length < 6) {

                showMessage(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            if (password !== confirmPassword) {

                showMessage(
                    "Passwords do not match."
                );

                return;
            }


            if (!terms) {

                showMessage(
                    "Please accept the Terms & Conditions."
                );

                return;
            }


            /* CHECK EXISTING ACCOUNT */

            const accounts =
                getAccounts();


            const existing =
                accounts.find(
                    account =>
                        account.email === email
                );


            if (existing) {

                showMessage(
                    "An account with this email already exists."
                );

                return;
            }


            /* CREATE ACCOUNT */

            const newAccount = {

                id:
                    "STK-" +
                    Date.now(),

                name,

                email,

                password,

                role,

                createdAt:
                    new Date().toISOString()

            };


            accounts.push(
                newAccount
            );


            saveAccounts(
                accounts
            );


            /* SAVE TEMP LOGIN */

            localStorage.setItem(
                "stacklyLastSignup",
                email
            );


            /* RESET FORM */

            signupForm.reset();


            /* SHOW SUCCESS */

            successPopup.classList.add(
                "show"
            );


            /*
                After account creation,
                automatically go to login.
            */

            setTimeout(() => {

                successPopup.classList.remove(
                    "show"
                );

                showLogin();

                document
                    .getElementById(
                        "loginEmail"
                    )
                    .value = email;

                showMessage(
                    "Account created successfully. Please login.",
                    "success"
                );

            }, 2200);

        }
    );


    /* =========================================
       LOGIN
    ========================================== */

    loginForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();

            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            if (!email || !password) {

                showMessage(
                    "Please enter email and password."
                );

                return;
            }


            const accounts =
                getAccounts();


            const account =
                accounts.find(
                    user =>
                        user.email === email &&
                        user.password === password
                );


            if (!account) {

                showMessage(
                    "Invalid email or password."
                );

                return;
            }


            /* SAVE SESSION */

            localStorage.setItem(
                "stacklyLoggedIn",
                "true"
            );


            localStorage.setItem(
                "stacklyUser",
                JSON.stringify({
                    id: account.id,
                    name: account.name,
                    email: account.email,
                    role: account.role
                })
            );


            showMessage(
                "Login successful! Redirecting...",
                "success"
            );


            /* ROLE BASED REDIRECT */

            setTimeout(() => {

                if (
                    account.role === "admin"
                ) {

                    window.location.href =
                        "admin-dashboard.html";

                } else {

                    window.location.href =
                        "customer-dashboard.html";

                }

            }, 1000);

        }
    );


    /* =========================================
       CUSTOMER DEMO
    ========================================== */

    document
        .getElementById("customerDemo")
        .addEventListener(
            "click",
            () => {

                createDemoAccount(
                    "customer"
                );

            }
        );


    /* =========================================
       ADMIN DEMO
    ========================================== */

    document
        .getElementById("adminDemo")
        .addEventListener(
            "click",
            () => {

                createDemoAccount(
                    "admin"
                );

            }
        );


    /* =========================================
       DEMO ACCOUNT
    ========================================== */

    function createDemoAccount(
        role
    ) {

        const accounts =
            getAccounts();


        const email =
            role === "admin"
                ? "admin@stackly.com"
                : "customer@stackly.com";


        const name =
            role === "admin"
                ? "Stackly Admin"
                : "Stackly Customer";


        const password =
            "123456";


        const exists =
            accounts.some(
                account =>
                    account.email === email
            );


        if (!exists) {

            accounts.push({

                id:
                    "DEMO-" +
                    Date.now(),

                name,

                email,

                password,

                role,

                createdAt:
                    new Date().toISOString()

            });


            saveAccounts(
                accounts
            );

        }


        document
            .getElementById(
                "loginEmail"
            )
            .value = email;


        document
            .getElementById(
                "loginPassword"
            )
            .value = password;


        showMessage(
            `${role === "admin" ? "Admin" : "Customer"} demo account loaded.`,
            "success"
        );

    }


    /* =========================================
       AUTO LOAD LAST SIGNUP
    ========================================== */

    const lastSignup =
        localStorage.getItem(
            "stacklyLastSignup"
        );


    if (lastSignup) {

        document
            .getElementById(
                "loginEmail"
            )
            .value =
                lastSignup;

    }

});
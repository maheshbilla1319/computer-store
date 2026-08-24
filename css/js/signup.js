/* =========================================================
   STACKLY AUTH SYSTEM
   SIGNUP + LOGIN
   HASHED PASSWORD
   ADMIN + CUSTOMER DASHBOARD
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const signupTab = document.getElementById("signupTab");
    const loginTab = document.getElementById("loginTab");

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    const authTabs = document.querySelector(".auth-tabs");

    const authTitle = document.getElementById("authTitle");
    const authSubtitle = document.getElementById("authSubtitle");

    const footerText = document.getElementById("footerText");
    const footerSwitch = document.getElementById("footerSwitch");

    const formMessage = document.getElementById("formMessage");
    const successPopup = document.getElementById("successPopup");


    /* =====================================================
       MESSAGE
    ===================================================== */

    function showMessage(message, type = "error") {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.className =
            "form-message " + type;
    }


    function clearMessage() {

        if (!formMessage) return;

        formMessage.textContent = "";

        formMessage.className =
            "form-message";
    }


    /* =====================================================
       SWITCH TO SIGNUP
    ===================================================== */

    function showSignup() {

        if (!signupForm || !loginForm) return;

        signupForm.classList.add("active-form");
        loginForm.classList.remove("active-form");

        signupTab?.classList.add("active");
        loginTab?.classList.remove("active");

        authTabs?.classList.remove("login-active");

        if (authTitle) {
            authTitle.textContent =
                "Create Account";
        }

        if (authSubtitle) {
            authSubtitle.textContent =
                "Join Stackly and get started today";
        }

        if (footerText) {
            footerText.textContent =
                "Already have an account?";
        }

        if (footerSwitch) {
            footerSwitch.textContent =
                "Login";
        }

        clearMessage();
    }


    /* =====================================================
       SWITCH TO LOGIN
    ===================================================== */

    function showLogin() {

        if (!signupForm || !loginForm) return;

        loginForm.classList.add("active-form");
        signupForm.classList.remove("active-form");

        loginTab?.classList.add("active");
        signupTab?.classList.remove("active");

        authTabs?.classList.add("login-active");

        if (authTitle) {
            authTitle.textContent =
                "Welcome Back";
        }

        if (authSubtitle) {
            authSubtitle.textContent =
                "Login to continue to your Stackly account";
        }

        if (footerText) {
            footerText.textContent =
                "Don't have an account?";
        }

        if (footerSwitch) {
            footerSwitch.textContent =
                "Sign Up";
        }

        clearMessage();
    }


    /* =====================================================
       TAB EVENTS
    ===================================================== */

    signupTab?.addEventListener(
        "click",
        showSignup
    );

    loginTab?.addEventListener(
        "click",
        showLogin
    );


    footerSwitch?.addEventListener(
        "click",
        () => {

            if (
                loginForm?.classList.contains(
                    "active-form"
                )
            ) {
                showSignup();
            } else {
                showLogin();
            }

        }
    );


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

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

                    if (!input) return;

                    if (
                        input.type === "password"
                    ) {

                        input.type = "text";

                        icon?.classList.remove(
                            "fa-eye"
                        );

                        icon?.classList.add(
                            "fa-eye-slash"
                        );

                    } else {

                        input.type = "password";

                        icon?.classList.remove(
                            "fa-eye-slash"
                        );

                        icon?.classList.add(
                            "fa-eye"
                        );
                    }
                }
            );
        });


    /* =====================================================
       PASSWORD HASH
    ===================================================== */

    async function hashPassword(password) {

        const encoder =
            new TextEncoder();

        const data =
            encoder.encode(password);

        const hashBuffer =
            await crypto.subtle.digest(
                "SHA-256",
                data
            );

        const hashArray =
            Array.from(
                new Uint8Array(hashBuffer)
            );

        return hashArray
            .map(
                byte =>
                    byte
                        .toString(16)
                        .padStart(2, "0")
            )
            .join("");
    }


    /* =====================================================
       GET ACCOUNTS
    ===================================================== */

    function getAccounts() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "stacklyAccounts"
                )
            ) || [];

        } catch {

            return [];
        }
    }


    /* =====================================================
       SAVE ACCOUNTS
    ===================================================== */

    function saveAccounts(accounts) {

        localStorage.setItem(
            "stacklyAccounts",
            JSON.stringify(accounts)
        );
    }


    /* =====================================================
       SIGNUP
    ===================================================== */

    signupForm?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            clearMessage();


            /* =============================================
               GET VALUES
            ============================================= */

            const nameInput =
                document.getElementById(
                    "signupName"
                );

            const emailInput =
                document.getElementById(
                    "signupEmail"
                );

            const passwordInput =
                document.getElementById(
                    "signupPassword"
                );

            const confirmInput =
                document.getElementById(
                    "signupConfirm"
                );

            const termsInput =
                document.getElementById(
                    "terms"
                );


            const name =
                nameInput?.value
                    .trim() || "";

            const email =
                emailInput?.value
                    .trim()
                    .toLowerCase() || "";

            const password =
                passwordInput?.value || "";

            const confirmPassword =
                confirmInput?.value || "";

            const terms =
                termsInput?.checked || false;


            /* =============================================
               ROLE
            ============================================= */

            const roleElement =
                document.querySelector(
                    'input[name="signupRole"]:checked'
                );

            const role =
                roleElement
                    ? roleElement.value.toLowerCase()
                    : "customer";


            /* =============================================
               NAME VALIDATION
            ============================================= */

            if (name.length < 3) {

                showMessage(
                    "Please enter your full name.",
                    "error"
                );

                nameInput?.focus();

                return;
            }


            /* =============================================
               EMAIL VALIDATION
            ============================================= */

            if (
                !email ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    email
                )
            ) {

                showMessage(
                    "Please enter a valid Gmail address.",
                    "error"
                );

                emailInput?.focus();

                return;
            }


            /* =============================================
               PASSWORD VALIDATION
            ============================================= */

            if (password.length < 6) {

                showMessage(
                    "Password must contain at least 6 characters.",
                    "error"
                );

                passwordInput?.focus();

                return;
            }


            /* =============================================
               CONFIRM PASSWORD
            ============================================= */

            if (
                password !== confirmPassword
            ) {

                showMessage(
                    "Passwords do not match.",
                    "error"
                );

                confirmInput?.focus();

                return;
            }


            /* =============================================
               TERMS
            ============================================= */

            if (!terms) {

                showMessage(
                    "Please accept the Terms & Conditions.",
                    "error"
                );

                return;
            }


            /* =============================================
               GET EXISTING ACCOUNTS
            ============================================= */

            const accounts =
                getAccounts();


            /* =============================================
               CHECK EXISTING EMAIL
            ============================================= */

            const existing =
                accounts.find(
                    account =>
                        account.email === email
                );


            if (existing) {

                showMessage(
                    "An account with this email already exists.",
                    "error"
                );

                return;
            }


            /* =============================================
               HASH PASSWORD
            ============================================= */

            const passwordHash =
                await hashPassword(
                    password
                );


            /* =============================================
               CREATE ACCOUNT
            ============================================= */

            const newAccount = {

                id:
                    "STK-" +
                    Date.now(),

                name:
                    name,

                email:
                    email,

                passwordHash:
                    passwordHash,

                role:
                    role === "admin"
                        ? "admin"
                        : "customer",

                createdAt:
                    new Date().toISOString()
            };


            /* =============================================
               SAVE ACCOUNT
            ============================================= */

            accounts.push(
                newAccount
            );

            saveAccounts(
                accounts
            );


            /* =============================================
               SAVE LAST SIGNUP
            ============================================= */

            sessionStorage.setItem(
                "stacklyLastSignup",
                email
            );

            sessionStorage.setItem(
                "stacklySignupRole",
                newAccount.role
            );


            /* =============================================
               RESET SIGNUP FORM
            ============================================= */

            signupForm.reset();


            /* =============================================
               SUCCESS POPUP
            ============================================= */

            successPopup?.classList.add(
                "show"
            );


            /* =============================================
               GO TO LOGIN
            ============================================= */

            setTimeout(
                () => {

                    successPopup?.classList.remove(
                        "show"
                    );

                    showLogin();


                    /* =================================
                       AUTO FILL EMAIL
                    ================================= */

                    const loginEmail =
                        document.getElementById(
                            "loginEmail"
                        );

                    if (loginEmail) {

                        loginEmail.value =
                            email;
                    }


                    /* =================================
                       AUTO SELECT ROLE
                    ================================= */

                    const loginRole =
                        document.querySelector(
                            `input[name="loginRole"][value="${newAccount.role}"]`
                        );

                    if (loginRole) {

                        loginRole.checked =
                            true;
                    }


                    showMessage(
                        "Account created successfully. Please login.",
                        "success"
                    );

                },
                1500
            );

        }
    );


    /* =====================================================
       LOGIN
    ===================================================== */

    loginForm?.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            clearMessage();


            /* =============================================
               GET VALUES
            ============================================= */

            const emailInput =
                document.getElementById(
                    "loginEmail"
                );

            const passwordInput =
                document.getElementById(
                    "loginPassword"
                );


            const email =
                emailInput?.value
                    .trim()
                    .toLowerCase() || "";

            const password =
                passwordInput?.value || "";


            /* =============================================
               EMAIL REQUIRED
            ============================================= */

            if (!email) {

                showMessage(
                    "Please enter your Gmail.",
                    "error"
                );

                emailInput?.focus();

                return;
            }


            /* =============================================
               EMAIL VALIDATION
            ============================================= */

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    email
                )
            ) {

                showMessage(
                    "Please enter a valid Gmail address.",
                    "error"
                );

                emailInput?.focus();

                return;
            }


            /* =============================================
               PASSWORD REQUIRED
            ============================================= */

            if (!password) {

                showMessage(
                    "Please enter your password.",
                    "error"
                );

                passwordInput?.focus();

                return;
            }


            /* =============================================
               SELECTED ROLE
            ============================================= */

            const selectedRole =
                document.querySelector(
                    'input[name="loginRole"]:checked'
                );


            const role =
                selectedRole
                    ? selectedRole.value.toLowerCase()
                    : "customer";


            /* =============================================
               GET ACCOUNTS
            ============================================= */

            const accounts =
                getAccounts();


            /* =============================================
               FIND ACCOUNT
            ============================================= */

            const account =
                accounts.find(
                    user =>
                        user.email === email
                );


            if (!account) {

                showMessage(
                    "Account not found. Please create an account first.",
                    "error"
                );

                return;
            }


            /* =============================================
               CHECK ROLE
            ============================================= */

            if (
                account.role !== role
            ) {

                showMessage(
                    `This account is registered as ${account.role}. Please select the correct role.`,
                    "error"
                );

                return;
            }


            /* =============================================
               HASH PASSWORD
            ============================================= */

            const enteredPasswordHash =
                await hashPassword(
                    password
                );


            /* =============================================
               VERIFY PASSWORD
            ============================================= */

            if (
                account.passwordHash !==
                enteredPasswordHash
            ) {

                showMessage(
                    "Invalid email or password.",
                    "error"
                );

                return;
            }


            /* =============================================
               LOGIN SESSION
            ============================================= */

            sessionStorage.setItem(
                "stacklyLoggedIn",
                "true"
            );


            sessionStorage.setItem(
                "stacklyUser",
                JSON.stringify({

                    id:
                        account.id,

                    name:
                        account.name,

                    email:
                        account.email,

                    role:
                        account.role
                })
            );


            /* =============================================
               SUCCESS
            ============================================= */

            showMessage(
                "Login successful! Opening dashboard...",
                "success"
            );


            /* =============================================
               REDIRECT
            ============================================= */

            setTimeout(
                () => {

                    if (
                        account.role ===
                        "admin"
                    ) {

                        window.location.href =
                            "admin.html";

                    } else {

                        window.location.href =
                            "customer.html";
                    }

                },
                700
            );

        }
    );


    /* =====================================================
       CUSTOMER DEMO
    ===================================================== */

    document
        .getElementById("customerDemo")
        ?.addEventListener(
            "click",
            () => {

                createDemoAccount(
                    "customer"
                );
            }
        );


    /* =====================================================
       ADMIN DEMO
    ===================================================== */

    document
        .getElementById("adminDemo")
        ?.addEventListener(
            "click",
            () => {

                createDemoAccount(
                    "admin"
                );
            }
        );


    /* =====================================================
       DEMO ACCOUNT
    ===================================================== */

    async function createDemoAccount(role) {

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


        // const password =
        //     role === "admin"
        //         ? "Admin@123"
        //         : "Customer@123";


        const exists =
            accounts.find(
                account =>
                    account.email === email
            );


        if (!exists) {

            const passwordHash =
                await hashPassword(
                    password
                );


            accounts.push({

                id:
                    "DEMO-" +
                    Date.now(),

                name:
                    name,

                email:
                    email,

                passwordHash:
                    passwordHash,

                role:
                    role,

                createdAt:
                    new Date().toISOString()
            });


            saveAccounts(
                accounts
            );
        }


        /* =============================================
           OPEN LOGIN
        ============================================= */

        showLogin();


        const loginEmail =
            document.getElementById(
                "loginEmail"
            );

        const loginPassword =
            document.getElementById(
                "loginPassword"
            );


        if (loginEmail) {

            loginEmail.value =
                email;
        }


        // if (loginPassword) {

        //     loginPassword.value =
        //         password;
        // }


        /* =============================================
           SELECT ROLE
        ============================================= */

        const loginRole =
            document.querySelector(
                `input[name="loginRole"][value="${role}"]`
            );


        if (loginRole) {

            loginRole.checked =
                true;
        }


        showMessage(
            `${role === "admin" ? "Admin" : "Customer"} demo account loaded.`,
            "success"
        );
    }


    /* =====================================================
       AUTO LOAD LAST SIGNUP EMAIL + ROLE
    ===================================================== */

    const lastSignup =
        sessionStorage.getItem(
            "stacklyLastSignup"
        );


    const lastSignupRole =
        sessionStorage.getItem(
            "stacklySignupRole"
        );


    if (lastSignup) {

        const loginEmail =
            document.getElementById(
                "loginEmail"
            );


        if (loginEmail) {

            loginEmail.value =
                lastSignup;
        }
    }


    if (lastSignupRole) {

        const loginRole =
            document.querySelector(
                `input[name="loginRole"][value="${lastSignupRole}"]`
            );


        if (loginRole) {

            loginRole.checked =
                true;
        }
    }

});
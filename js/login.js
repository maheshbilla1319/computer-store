// =====================================
// GET ELEMENTS
// =====================================

const loginForm = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const togglePassword =
    document.getElementById("togglePassword");


// =====================================
// ERROR ELEMENTS
// =====================================

const emailError =
    document.getElementById("emailError");

const passwordError =
    document.getElementById("passwordError");

const roleError =
    document.getElementById("roleError");


// =====================================
// CLEAR ERRORS
// =====================================

function clearErrors() {

    emailError.textContent = "";

    passwordError.textContent = "";

    roleError.textContent = "";

}


// =====================================
// EMAIL VALIDATION
// =====================================

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);

}


// =====================================
// SHOW / HIDE PASSWORD
// =====================================

if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        function () {

            const icon =
                this.querySelector("i");


            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                icon.classList.remove("fa-eye");

                icon.classList.add("fa-eye-slash");

            }

            else {

                passwordInput.type = "password";

                icon.classList.remove("fa-eye-slash");

                icon.classList.add("fa-eye");

            }

        }
    );

}


// =====================================
// LOGIN FORM
// =====================================

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        clearErrors();

        let isValid = true;


        // =================================
        // GET VALUES
        // =================================

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        const selectedRole =
            document.querySelector(
                'input[name="role"]:checked'
            );


        // =================================
        // EMAIL VALIDATION
        // =================================

        if (email === "") {

            emailError.textContent =
                "Please enter your Gmail.";

            isValid = false;

        }

        else if (!isValidEmail(email)) {

            emailError.textContent =
                "Please enter a valid Gmail.";

            isValid = false;

        }


        // =================================
        // PASSWORD VALIDATION
        // ANY PASSWORD ACCEPTED
        // =================================

        if (password === "") {

            passwordError.textContent =
                "Please enter your password.";

            isValid = false;

        }


        // =================================
        // ROLE VALIDATION
        // =================================

        if (!selectedRole) {

            roleError.textContent =
                "Please select Admin or Customer.";

            isValid = false;

        }


        // =================================
        // STOP IF INVALID
        // =================================

        if (!isValid) {

            return;

        }


        // =================================
        // GET ROLE
        // =================================

        const role =
            selectedRole.value;


        console.log("Selected Role:", role);

        console.log("Email:", email);


        // =================================
        // ADMIN DASHBOARD
        // =================================

        if (role === "Admin") {

            window.location.href =
                "admin.html?email=" +
                encodeURIComponent(email);

            return;

        }


        // =================================
        // CUSTOMER DASHBOARD
        // =================================

        if (role === "Customer") {

            window.location.href =
                "customer.html?email=" +
                encodeURIComponent(email);

            return;

        }

    }
);
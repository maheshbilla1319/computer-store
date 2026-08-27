// =====================================
// TEMPORARY ACCOUNT DATA
// NO LOCAL STORAGE
// =====================================

let createdAccount = null;


// =====================================
// GET ELEMENTS
// =====================================

const signupForm = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");

const successPopup =
    document.getElementById("successPopup");


// =====================================
// ERROR ELEMENTS
// =====================================

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const roleError =
    document.getElementById("roleError");

const passwordError =
    document.getElementById("passwordError");

const confirmPasswordError =
    document.getElementById("confirmPasswordError");

const termsError =
    document.getElementById("termsError");


// =====================================
// CLEAR ERRORS
// =====================================

function clearErrors() {

    nameError.textContent = "";
    emailError.textContent = "";
    roleError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    termsError.textContent = "";

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
// PASSWORD VALIDATION
// EXACTLY 6 NUMBERS
// =====================================

function isValidPassword(password) {

    return /^\d{6}$/.test(password);

}


// =====================================
// PASSWORD SHOW / HIDE
// =====================================

const toggleButtons =
    document.querySelectorAll(".toggle-password");

toggleButtons.forEach(button => {

    button.addEventListener("click", function () {

        const targetId =
            this.getAttribute("data-target");

        const passwordField =
            document.getElementById(targetId);

        const icon =
            this.querySelector("i");


        if (passwordField.type === "password") {

            passwordField.type = "text";

            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");

        } else {

            passwordField.type = "password";

            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");

        }

    });

});


// =====================================
// PASSWORD INPUT
// ONLY NUMBERS + MAX 6 DIGITS
// =====================================

passwordInput.addEventListener("input", function () {

    // Remove letters and special characters
    this.value = this.value.replace(/\D/g, "");

    // Maximum 6 digits
    this.value = this.value.slice(0, 6);


    if (this.value === "") {

        passwordError.textContent =
            "Please enter a 6-digit password.";

    }

    else if (this.value.length < 6) {

        passwordError.textContent =
            "Password must contain 6 numbers.";

    }

    else {

        passwordError.textContent = "";

    }

});


// =====================================
// CONFIRM PASSWORD INPUT
// ONLY NUMBERS + MAX 6 DIGITS
// =====================================

confirmPasswordInput.addEventListener(
    "input",
    function () {

        // Remove letters and special characters
        this.value =
            this.value.replace(/\D/g, "");

        // Maximum 6 digits
        this.value =
            this.value.slice(0, 6);


        if (this.value === "") {

            confirmPasswordError.textContent =
                "Please confirm your password.";

        }

        else if (
            this.value !== passwordInput.value
        ) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

        }

        else {

            confirmPasswordError.textContent = "";

        }

    }
);


// =====================================
// FORM SUBMIT
// =====================================

signupForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        clearErrors();

        let isValid = true;


        // =================================
        // GET VALUES
        // =================================

        const name =
            nameInput.value.trim();

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;

        const confirmPassword =
            confirmPasswordInput.value;


        const selectedRole =
            document.querySelector(
                'input[name="role"]:checked'
            );


        const terms =
            document.getElementById("terms").checked;


        // =================================
        // NAME VALIDATION
        // =================================

        if (name === "") {

            nameError.textContent =
                "Please enter your full name.";

            isValid = false;

        }

        else if (name.length < 3) {

            nameError.textContent =
                "Name must contain at least 3 characters.";

            isValid = false;

        }


        // =================================
        // EMAIL VALIDATION
        // =================================

        if (email === "") {

            emailError.textContent =
                "Please enter your email.";

            isValid = false;

        }

        else if (!isValidEmail(email)) {

            emailError.textContent =
                "Please enter a valid email address.";

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
        // PASSWORD VALIDATION
        // EXACTLY 6 NUMBERS
        // =================================

        if (password === "") {

            passwordError.textContent =
                "Please enter a 6-digit password.";

            isValid = false;

        }

        else if (!isValidPassword(password)) {

            passwordError.textContent =
                "Password must be exactly 6 numbers.";

            isValid = false;

        }


        // =================================
        // CONFIRM PASSWORD
        // =================================

        if (confirmPassword === "") {

            confirmPasswordError.textContent =
                "Please confirm your password.";

            isValid = false;

        }

        else if (
            password !== confirmPassword
        ) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            isValid = false;

        }


        // =================================
        // TERMS
        // =================================

        if (!terms) {

            termsError.textContent =
                "Please accept the Terms & Conditions.";

            isValid = false;

        }


        // =================================
        // STOP IF INVALID
        // =================================

        if (!isValid) {

            return;

        }


        // =================================
        // CREATE ACCOUNT
        // NO LOCAL STORAGE
        // =================================

        createdAccount = {

            name: name,

            email: email,

            role: selectedRole.value,

            password: password

        };


        console.log(
            "Account Created:",
            createdAccount
        );


        // =================================
        // SUCCESS POPUP
        // =================================

        successPopup.classList.add("show");


        // =================================
        // GO TO LOGIN PAGE
        // =================================

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 2500);

    }
);
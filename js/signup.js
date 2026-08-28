// =====================================
// TEMPORARY ACCOUNT DATA
// NO LOCAL STORAGE
// =====================================

let createdAccount = null;


// =====================================
// GET ELEMENTS
// =====================================

const signupForm =
    document.getElementById("signupForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

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
// 8 TO 10 CHARACTERS
// ALPHABETS + NUMBERS ONLY
// =====================================

function isValidPassword(password) {

    return /^[A-Za-z0-9]{8,10}$/.test(password);

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

        if (!passwordField || !icon) {
            return;
        }

        if (passwordField.type === "password") {

            passwordField.type = "text";

            icon.classList.remove("fa-eye");

            icon.classList.add(
                "fa-eye-slash"
            );

            this.setAttribute(
                "aria-label",
                "Hide password"
            );

        }

        else {

            passwordField.type = "password";

            icon.classList.remove(
                "fa-eye-slash"
            );

            icon.classList.add("fa-eye");

            this.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    });

});


// =====================================
// PASSWORD INPUT
// ALPHABETS + NUMBERS ONLY
// MAXIMUM 10 CHARACTERS
// =====================================

passwordInput.addEventListener(
    "input",
    function () {

        // Remove special characters and spaces
        this.value =
            this.value.replace(
                /[^A-Za-z0-9]/g,
                ""
            );

        // Maximum 10 characters
        this.value =
            this.value.slice(0, 10);


        // Live validation

        if (this.value === "") {

            passwordError.textContent =
                "Please enter your password.";

        }

        else if (this.value.length < 8) {

            passwordError.textContent =
                "Password must be 8 to 10 characters.";

        }

        else {

            passwordError.textContent = "";

        }


        // Check confirm password again
        if (
            confirmPasswordInput.value !== ""
        ) {

            if (
                confirmPasswordInput.value !==
                this.value
            ) {

                confirmPasswordError.textContent =
                    "Passwords do not match.";

            }

            else {

                confirmPasswordError.textContent =
                    "";

            }

        }

    }
);


// =====================================
// CONFIRM PASSWORD INPUT
// ALPHABETS + NUMBERS ONLY
// MAXIMUM 10 CHARACTERS
// =====================================

confirmPasswordInput.addEventListener(
    "input",
    function () {

        // Remove special characters and spaces
        this.value =
            this.value.replace(
                /[^A-Za-z0-9]/g,
                ""
            );

        // Maximum 10 characters
        this.value =
            this.value.slice(0, 10);


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

            confirmPasswordError.textContent =
                "";

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


        // =================================
        // SELECT ROLE
        // =================================

        const selectedRole =
            document.querySelector(
                'input[name="role"]:checked'
            );


        // =================================
        // TERMS
        // =================================

        const terms =
            document.getElementById(
                "terms"
            ).checked;


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
        // 8 TO 10 CHARACTERS
        // ALPHABETS + NUMBERS
        // =================================

        if (password === "") {

            passwordError.textContent =
                "Please enter your password.";

            isValid = false;

        }

        else if (!isValidPassword(password)) {

            passwordError.textContent =
                "Password must be 8 to 10 characters using letters and numbers.";

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

        if (successPopup) {

            successPopup.classList.add(
                "show"
            );

        }


        // =================================
        // GO TO LOGIN PAGE
        // =================================

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 2500);

    }
);
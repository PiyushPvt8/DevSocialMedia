const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password, age, gender, photoURL, about, skills } = req.body;

    // Validate firstName
    if (!firstName || firstName.length < 2 || firstName.length > 50) {
        throw new Error("First name is not valid.");
    }

    // Validate lastName
    if  (!lastName || lastName.length < 2 || lastName.length > 50) {
        throw new Error("Last name is not valid.");
    }

    // Validate email
    if (!email || !validator.isEmail(email)) {
        throw new Error("Email is not valid.");
    }

    // Validate password
    if (!password || !validator.isStrongPassword(password)) {
        throw new Error("Password is not strong enough.");
    }

    // Validate age
    if (age && (age < 18 || age > 65)) {
        throw new Error("Age is not valid.");
    }

    // Validate gender
    if (gender && !["Male", "Female", "Other"].includes(gender)) {
        throw new Error("Gender is not valid.");
    }

    // Validate photoURL
    if (photoURL && !validator.isURL(photoURL)) {
        throw new Error("Photo URL is not valid.");
    }

    // Validate about
    if (about && about.length > 500) {
        throw new Error("About section is too long.");
    }

    // Validate skills
    if (skills && skills.length > 10) {
        throw new Error("You can only specify up to 10 skills.");
    }
}

const validateEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "age", "gender", "photoURL", "about", "skills"];

    const isEditAllowed = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isEditAllowed;

}

module.exports = { 
    validateSignUpData,
    validateEditData
}; 
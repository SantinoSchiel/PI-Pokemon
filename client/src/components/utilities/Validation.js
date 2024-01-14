export default function Validation(input) {
    const error = {};

    function isValidImageUrl(url) {
        const urlRegex = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(:[0-9]+)?(\/.*)?$/i;

        return urlRegex.test(url) && /\.(jpg|jpeg|svg|png|gif)$/i.test(url);
    }

    // console.log(input.name)
    if (input.name.length === 0) {
        error.name = "You must enter a name";
    }
    if (input.name.length < 5 && input.name.length > 0) {
        error.name = "The name must be more than 5 characters";
    }
    if (input.name.length > 15) {
        error.name = "The name must be less than 15 characters";
    }


    if (!input.randomImage && !input.image.trim()) {
        error.image = "Image URL is required";
    } else if (!isValidImageUrl(input.image)) {
        error.image = "Invalid image URL";
    }


    const numericFields = ['hp', 'attack', 'defense', 'speed', 'height', 'weight'];

    numericFields.forEach((field) => {
        const numericValue = parseInt(input[field], 10);
        const isFieldEmpty = !input[field] || (typeof input[field] === 'string' && input[field].trim().length === 0);

        if (isFieldEmpty) {
            error[field] = `you must enter a value for ${field.charAt(0).toUpperCase() + field.slice(1)}`;
        } else if (isNaN(numericValue) || numericValue <= 0) {
            error[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be greater than 0`;
        } else if (isNaN(numericValue) || numericValue > 255) {
            error[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} cannot be greater than 255`;
        }
    });


    if (!input.types.length) {
        error.types = "At least one type is required";
    }
    if (input.types.length > 3) {
        error.types = "You can only enter three types";
    }

    return error;
}

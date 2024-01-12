export default function Validation(input) {
    const regexNum = /\d+/;
    const error = {};

    // console.log(input.name)
    //! NAME
    if (input.name.length === 0) error.name = "You must enter a name";
    if (input.name.length > 15) error.name = "The name must be less than 15 characters";
    if (input.name.length < 5 && input.name.length > 0) error.name = "The name must be more than 5 characters";
    // //! IMAGE
    // if (!input.image.length) error.image = "Debe ingresar una contraseña";
    // else if (input.image.length < 6 || input.image.length > 10) error.image = "La contraseña debe tener entre 6 y 10 caracteres";
    // else if (!regexNum.test(input.image)) error.image = "La contraseña debe tener al menos un número";

    // //! STATS (Puedes extender este bloque según tus necesidades)
    // const statsFields = ['hp', 'attack', 'defense', 'speed', 'height', 'weight'];
    // statsFields.forEach((field) => {
    //     if (!input[field].toString().length) error[field] = `Debe ingresar un valor para ${field}`;
    // });

    // //! TYPES
    // const types = ['hp', 'attack', 'defense', 'speed', 'height', 'weight'];
    // statsFields.forEach((field) => {
    //     if (!input[field].toString().length) error[field] = `Debe ingresar un valor para ${field}`;
    // });

    return error;
}

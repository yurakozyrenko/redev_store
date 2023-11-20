registerSchema = {
    email: {
        isEmail: true,
        errorMessage: 'Укажите корректный email (example@example.com)',
    },
    password: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'Password должен быть минимум 6 cимволов',
        },
    },
};

userProfileSchema = {
    adress: {
        notEmpty: true,
        errorMessage: 'adress должно быть строкой',
    },
    phone: {
        notEmpty: true,
        errorMessage: 'phone должно быть строкой',
    },
};

nameSchema = {
    name: {
        notEmpty: true,
        errorMessage: 'name должно быть строкой',
    },
};

module.exports = {
    registerSchema,
    userProfileSchema,
    nameSchema,
};

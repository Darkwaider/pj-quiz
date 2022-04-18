export function createControl(config, validation) {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: ''
    }
}

export function validationHandler(value, validation = null) {
    if (!validation) {
        return true;
    }

    let isValid = true;

    if (validation.required) {
        isValid = value.trim() !== '' && isValid;
        return isValid;
    }

    return isValid;

}


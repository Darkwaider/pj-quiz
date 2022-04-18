import React from 'react';
import './Input.css';

const Input = props => {

    function isInvalid({valid, touched, shouldValidate}) {
        return !valid && shouldValidate && touched;
    }

    const inputType = props.type || "text";
    const htmlFor = `${props.inputType}-${Math.random()}`;
    const cls = ['Input'];
    if (isInvalid(props)) {
        cls.push('Invalid');
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input type={inputType}
                   value={props.value}
                   id={htmlFor}
                   onChange={props.onChange}
            />

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'Please, input your form'}</span>
                    : null
            }
        </div>
    );
};

export default Input;
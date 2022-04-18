import React, {useState} from 'react';
import Input from "../../components/UI/Input/Input";
import './Auth.css';
import MyBtn from "../../components/UI/MyBtn/MyBtn";
import {auth} from "../../firebase";
import {connect} from "react-redux";
import {authAction} from "../../store/actions/auth";


const Auth = props => {

    const initialState = {
        isFormValid: false,
        formsControl: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                ref: 'emailRef',
                errorMessage: 'Write your email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                ref: 'passwordRef',
                errorMessage: 'Write correct your password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            },
        }
    }

    const [state, setState] = useState(initialState);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const validationHandler = (value, validation) => {
        if (!validation) {
            return true;
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength;
        }

        return isValid;
    }

    const onChangeHandler = (event, controlName) => {
        const updateState = {
            value: event.target.value,
            touched: true,
        }


        setState(prevState => {
            return {
                ...prevState,
                formsControl: {
                    ...prevState.formsControl,
                    [controlName]: {...prevState.formsControl[controlName], ...updateState}
                }
            };
        });
        setState(prevState => {
            return {
                ...prevState,
                formsControl: {
                    ...prevState.formsControl,
                    [controlName]: {
                        ...prevState.formsControl[controlName],
                        valid: validationHandler(prevState.formsControl[controlName].value, prevState.formsControl[controlName].validation)
                    }
                }
            }
        });

        let isFormValid = true;


        setState(prevState => {
            Object.keys(prevState.formsControl).forEach(name => {
                isFormValid = prevState.formsControl[name].valid && isFormValid;
            })
            return {
                ...prevState,
                isFormValid: isFormValid
            }
        })
    }

    function renderInput() {
        return Object.keys(state.formsControl).map((controlName, index) => {
            const control = state.formsControl[controlName];

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={state.formsControl[controlName].value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={event => onChangeHandler(event, controlName)}
                />
            )
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }


    const loginHandler = () => {
        auth.signInWithEmailAndPassword(
            state.formsControl.email.value,
            state.formsControl.password.value
        ).then(user => {
            props.authAction(user);
        }).catch(err => {
            console.log(err)
        })
    }
    const registerHandler = () => {
        auth.createUserWithEmailAndPassword(
            state.formsControl.email.value,
            state.formsControl.password.value
        ).then(user => {
            console.log(user);
        }).catch(error => {
            console.log(error)
        });
    }


    const cls = ["Auth"];


    return (
        <div className={cls.join(' ')}>
            <h1>Auth</h1>
            <form onSubmit={submitHandler}>
                {
                    renderInput()
                }
                <MyBtn
                    onClick={loginHandler}
                    type="success"
                    disabled={!state.isFormValid}
                >
                    Login
                </MyBtn>
                <MyBtn
                    onClick={registerHandler}
                    type="primary"
                    disabled={!state.isFormValid}
                >
                    Register
                </MyBtn>
            </form>
        </div>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        authAction: (user) => dispatch(authAction(user))
    }
}


export default connect(null, mapDispatchToProps)(Auth)
import React, {useRef} from 'react';
import {auth} from "../../firebase";

const TestAuth = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const signUp = e => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(user => {
            console.log(user);
        }).catch(error => {
            console.log(error)
        });
    }

    const signIn = e => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then(user => {
            console.log(user)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h1>Auth</h1>
            <input ref={emailRef} type="email"/>
            <input ref={passwordRef} type="password"/>
            <button onClick={signIn}>login</button>
            <button onClick={signUp}>signUp</button>
        </div>
    );
};

export default TestAuth;
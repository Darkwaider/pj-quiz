import React from "react";
import './FinishedQuiz.css';
import MyBtn from "../UI/MyBtn/MyBtn";
import {Link} from "react-router-dom";

const FinishedQuiz = props => {
    let counter = Object.keys(props.result).reduce((total, key) => {
        if (props.result[key] === 'true') {
            total++;
        }

        return total;
    }, 0);

    return (
        <div className="FinishedQuiz">
            <div className="FinishedQuizContainer">
                <h3>Results</h3>
                <div className="FinishedQuizItem">
                    {
                        props.quiz.map((question, index) => {
                            const cls = [
                                'fa',
                                props.result[question.id] === 'false' ? 'fa-times' : 'fa-check',
                                [props.result[question.id]]
                            ]
                            return (
                                <div key={index}>
                                    {index + 1}).{question.question} <i className={cls.join(' ')}></i>
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <big>{counter}</big> out of <big>{props.quiz.length}</big>
                </div>
                <MyBtn className="btn" onClick={props.onRetry} type="primary">Try again</MyBtn>
                <Link to="/">
                    <MyBtn className="btn" type="success">Go to list of tests</MyBtn>
                </Link>
                <div/>
            </div>
        </div>
    )
}

export default FinishedQuiz;
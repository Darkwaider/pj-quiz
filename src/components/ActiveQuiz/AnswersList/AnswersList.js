import React from "react";
import './AnswersList.css';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswersList = props => {
    return (
        <div>
            {
                props.answers.map((answer, i) => {
                    return (
                        <AnswerItem
                            quizAnswerClick={props.quizAnswerClick}
                            key={i}
                            answer={answer}
                            ansState={props.ansState ? props.ansState[answer.id] : null}
                        />
                    )
                })
            }
        </div>
    )
}

export default AnswersList;
import React from "react";
import './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => {
    return (
        <div className="ActiveQuiz">
            <div className="ContainerActiveQuiz">
                <div className="HeaderActiveQuiz">
                  <span>
                  <strong>{props.id}). </strong>
                      {props.question}
                      </span>
                    <small>
                        {props.activeQuiz} out of {props.quizLength}
                    </small>

                </div>
                <AnswersList
                    answers={props.answers}
                    quizAnswerClick={props.quizAnswerClick}
                    ansState={props.ansState}
                />
            </div>
        </div>
    )
}

export default ActiveQuiz;
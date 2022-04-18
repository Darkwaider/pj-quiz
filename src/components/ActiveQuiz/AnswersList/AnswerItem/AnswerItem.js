import React from "react";
import './AnswerItem.css';

const AnswerItem = props => {
    const arrStyles = ['AnswerItem'];
    arrStyles.push(props.ansState);

    return (
        <li className={arrStyles.join(' ')}
            onClick={() => props.quizAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem;
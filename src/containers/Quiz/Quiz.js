import React, {useEffect} from "react";
import './Quiz.css';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {fetchQuizId, quizAnswerClick, retryQuiz} from "../../store/actions/quiz";


const Quiz = props => {

    const {id} = useParams();
    useEffect(() => {
        props.fetchQuizId(id);
    }, []);

    return (
        <div className="Quiz">
            <h1>Quiz</h1>
            {
                props.isLoading || !props.quiz
                    ? <Loader/>
                    : props.quizFinished
                        ?
                        <FinishedQuiz
                            quiz={props.quiz}
                            result={props.result}
                            onRetry={props.retryQuiz}
                        />
                        :
                        <ActiveQuiz
                            activeQuiz={props.activeQuiz + 1}
                            quizLength={props.quiz.length}
                            answers={props.quiz[props.activeQuiz].answers}
                            question={props.quiz[props.activeQuiz].question}
                            quizAnswerClick={props.quizAnswerClick}
                            id={props.quiz[props.activeQuiz].id}
                            ansState={props.ansState}
                        />
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        activeQuiz: state.quiz.activeQuiz,
        quizFinished: state.quiz.quizFinished,
        result: state.quiz.result,
        quiz: state.quiz.quiz,
        isLoading: state.quiz.isLoading,
        ansState: state.quiz.ansState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizId: id => dispatch(fetchQuizId(id)),
        quizAnswerClick: answerID=> dispatch(quizAnswerClick(answerID)),
        retryQuiz: ()=> dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
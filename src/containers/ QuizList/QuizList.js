import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import './QuizList.css';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizList} from "../../store/actions/quiz";


const QuizList = (props) => {

    useEffect(() => {
        props.fetchQuizList();
    }, []);

    const quizRender = () => {
        return props.quizList.map((q) => {
            return (
                <li key={q.id}>
                    <NavLink to={"/quiz/" + q.id}>
                        Quiz {q.name}
                    </NavLink>
                </li>
            )
        })
    }

    return (
        <div className="QuizList">
            <h1>QuizList</h1>

            {
                !props.isLoading
                    ? <ul>
                        {quizRender()}
                    </ul>
                    : <Loader/>
            }

        </div>
    );
}

function mapStateToProps(state) {
    return {
        quizList: state.quiz.quizList,
        isLoading: state.quiz.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizList: () => dispatch(fetchQuizList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
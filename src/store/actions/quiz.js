import axios from "../../axios/axios";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE,
} from "./actionsType";

export function fetchQuizList() {
    return async dispatch => {
        dispatch(fetchQuizListStart());
        try {
            const response = await axios.get('/quizes.json');
            const quizList = [];

            Object.keys(response.data).forEach((key, index) => {
                quizList.push({
                    id: key,
                    name: `List №${index + 1}`
                })
            });

            dispatch(fetchQuizListSuccess(quizList));
        } catch (e) {
            dispatch(fetchQuizListError(e));
        }
    }
}

export function fetchQuizId(id) {
    return async dispatch => {
        dispatch(fetchQuizListStart());
        try {
            const response = await axios.get(`/quizes/${id}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));

        } catch (e) {
            dispatch(fetchQuizListError(e));
            console.log(e);
        }
    }
}

export function fetchQuizListStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function fetchQuizListSuccess(quizList) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizList
    }
}

export function fetchQuizListError() {
    return {
        type: FETCH_QUIZES_ERROR
    }
}

export function quizSetState(ansState, result) {
    return {
        type: QUIZ_SET_STATE,
        ansState, result
    }
}

export function isFinished() {
    return {
        type: FINISH_QUIZ
    }
}

export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

export function quizAnswerClick(answerID) {
    return (dispatch, getState) => {
        const state = getState().quiz;

        if (state.ansState) {
            const keys = Object.keys(state.ansState)[0];
            if (state.ansState[keys] === 'true') {
                return;
            }
        }

        const question = state.quiz[state.activeQuiz];
        const result = state.result;
        console.log('result',result);
        console.log('result[question.id',result[question.id])
        if (answerID === question.correctAnswerId) {
            if (!result[question.id]) {
                result[question.id] = 'true';
            }

            dispatch(quizSetState({[answerID]: 'true'}, result))

            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(isFinished())
                } else {
                    dispatch(quizNextQuestion(state.activeQuiz + 1));
                }
                window.clearTimeout(timeout);
            }, 1000);

        } else {
            const result = state.result;
            result[question.id] = 'false';
            dispatch(quizSetState({[answerID]: 'false'}, result))
        }
    }
}

function isQuizFinished(state) {
    return  state.activeQuiz + 1  === state.quiz.length;
}

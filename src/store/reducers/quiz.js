import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "../actions/actionsType";

const initialState = {
    quizList: [],
    isLoading: false,
    activeQuiz: 0,
    ansState: null,
    quizFinished: false,
    result: {},// {[ansID]: true/false]}
    quiz: null,
}

export default function quizReducer(state = initialState, action) {

    switch (action.type) {

        case FETCH_QUIZES_START:
            return {
                ...state,
                isLoading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quizList: action.quizList
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                isLoading: false,
                quiz: action.quiz
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        case QUIZ_SET_STATE:
            return {
                ...state,
                ansState: action.ansState,
                result: action.result
            }
        case FINISH_QUIZ:
            return {
                ...state,
                quizFinished: true
            }

        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                ansState: null,
                activeQuiz: action.number
            }

        case QUIZ_RETRY:
            return {
                ...state,
                activeQuiz: 0,
                ansState: null,
                quizFinished: false,
                result: {}
            }
        default:
            return state;
    }
}


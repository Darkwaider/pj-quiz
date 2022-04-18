import React, {useState} from 'react';
import './QuizCreator.css';
import Input from "../../components/UI/Input/Input";
import MyBtn from "../../components/UI/MyBtn/MyBtn";
import {createControl, validationHandler} from "../../form/formFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

const createOptionControl = (number) => {
    return createControl({
        label: `Question ${number}`,
        errorMessage: "Question is empty",
        id: number,
    }, {required: true});
}


function createFormControls() {
    return {
        question: createControl({
            label: 'Write your q',
            errorMessage: 'Question is empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

const QuizCreator = props => {

    const initialState = {
        quiz: [],
        correctAnswerId: 1,
        isFormValid: false,
        formsControl: createFormControls()
    }

    const [state, setState] = useState(initialState);

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

    const onChangeHandler = (value, controlName) => {
        const updateState = {
            value: value,
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
    const renderInputs = () => {
        return Object.keys(state.formsControl).map((controlName, index) => {
            const control = state.formsControl[controlName];

            return (
                <Auxiliary key={controlName + index}
                >
                    <Input
                        value={state.formsControl[controlName].value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={event => onChangeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    }
    const selectOnChangeHandler = (event) => {
        setState(prevState => {
            return {
                ...prevState,
                correctAnswerId: +event.target.value
            }
        })
    }
    const addQuestion = () => {

        const {question, option1, option2, option3, option4} = state.formsControl;

        const questionItem = {
            question: question.value,
            id: props.quiz.length + 1,
            correctAnswerId: state.correctAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        props.createQuizQuestion(questionItem);

        setState(prevState => {
            return {
                ...prevState,
                isFormValid: false,
                correctAnswerId: 1,
                formsControl: createFormControls()
            }
        })
    }

    const addQuiz = () => {
        setState(prevState => {
            return {
                ...prevState,
                isFormValid: false,
                correctAnswerId: 1,
                formsControl: createFormControls()
            }
        })
        props.finishCreateQuiz();
    }

    const select = <Select
        label="Select right option"
        value={state.correctAnswerId}
        onChange={selectOnChangeHandler}
        options={
            [
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]
        }
    />

    return (
        <div className='QuizCreator'>
            <h1>QuizCreator</h1>
            <div>
                <form onSubmit={onSubmitHandler} className="QuizCreatorContainer">
                    {renderInputs()}
                    {select}
                    <div className="QuizCreatorContainerBtn">
                        <MyBtn
                            onClick={addQuestion}
                            type="primary"
                            disabled={!state.isFormValid}
                        >
                            Add question
                        </MyBtn>
                        <MyBtn
                            onClick={addQuiz}
                            type="success"
                            disabled={props.quiz.length === 0}
                        >
                            Add Quiz
                        </MyBtn>
                    </div>
                </form>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
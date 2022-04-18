import React, {useEffect} from "react";
import './App.css';
import Layout from "./hoc/Layout/Layout";
import Quiz from "../src/containers/Quiz/Quiz";
import {Routes, Route, Navigate,} from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/ QuizCreator/QuizCreator";
import QuizList from "./containers/ QuizList/QuizList";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

const App = props => {

    useEffect(()=>{
        props.autoLogin();
    },[])
    let routes = (
        <Routes>
            <Route path="/" element={<QuizList/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/quiz/:id" element={<Quiz/>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );

    if (props.isAuthenticated) {
        routes = (
            <Routes>
                <Route path="/" element={<QuizList/>}/>
                <Route path="/quiz-creator" element={<QuizCreator/>}/>
                <Route path="/quiz/:id" element={<Quiz/>}/>
                <Route path="/logout" element={<Logout/>}/>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        )
    }

    return (
        <div className="App">
            <Layout>
                {routes}
            </Layout>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

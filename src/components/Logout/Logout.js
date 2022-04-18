import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {logout} from "../../store/actions/auth";
import {Navigate, Route, Routes} from "react-router-dom";

const Logout = props => {
    useEffect(() => {
        props.logout();
    }, [])


    return (
        <Routes>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    );
};

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
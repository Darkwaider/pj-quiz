import React from "react";
import './Drawer.css';
import Backdrop from "../../../../components/UI/Backdrop/Backdrop";
import {NavLink} from "react-router-dom";

const Drawer = props => {
    const arrDrawer = [
        {to: '/', label: 'List', exact: 'true'}
    ];

    const arrStyles = ["DrawerContainer"];
    if (props.isOpen) {
        arrStyles.push('active');
    } else {
        arrStyles.push('close');
    }

    if (props.isAuthenticated) {
        arrDrawer.push({to: 'quiz-creator', label: 'Create quiz', exact: 'false'});
        arrDrawer.push({to: 'logout', label: 'Logout', exact: 'false'});
    } else {
        arrDrawer.push({to: 'auth', label: 'Auth', exact: 'false'});
    }

    return (
        <React.Fragment>
            <nav className={arrStyles.join(' ')}>
                <ul>
                    {
                        arrDrawer.map((link, index) => {
                            return (
                                <li key={index}>
                                    <NavLink
                                        to={link.to} exact={link.exact}
                                        onClick={props.onClose}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </nav>
            {
                props.isOpen ? <Backdrop onClose={props.onClose}/> : null
            }

        </React.Fragment>
    )
}

export default Drawer;
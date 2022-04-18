import React, {useState} from "react";
import './Layout.css';
import MenuToggle from "./Navigation/MenuToggle/MenuToggle";
import Drawer from "./Navigation/Drawer/Drawer";
import {connect} from "react-redux";

const Layout = props => {
    const [state, setState] = useState({isOpen: false});

    const onToggleMenu = () => {
        setState((() => {
            return { isOpen: !state.isOpen}
        }))
    }

    const onClose = () => {
        setState((() => {
            return { isOpen: false}
        }))    }

    return (
        <div className="Layout">
            <Drawer
                isOpen={state.isOpen}
                onClose={onClose}
                isAuthenticated={props.isAuthenticated}
            />
            <MenuToggle
                onToggleMenu={onToggleMenu}
                isOpen={state.isOpen}
            />
            <main>
                {props.children}
            </main>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);


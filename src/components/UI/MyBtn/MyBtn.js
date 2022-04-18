import React from "react";
import './MyBtn.css';

const MyBtn = props => {
    const cls = [
        'btn',
        props.type
    ];
  return(
      <button
          onClick={props.onClick}
          className={cls.join(' ')}
          disabled={props.disabled}
      >
          {props.children}
      </button>
  )
}

export default MyBtn;
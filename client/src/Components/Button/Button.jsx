import React from "react";
import { useNavigate } from 'react-router-dom';
import Style from './Button.module.css';

const Button = ({ btnName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use the navigate function to redirect to the '/pastApod' route
    navigate('/pastApod');
  };

  return (
    <div className={Style.box}>
      <button className={Style.button} onClick={handleClick}>
        {btnName}
      </button>
    </div>
  );
};

export default Button;

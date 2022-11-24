import React from 'react';
import './background.css';

const Background = ({ children }: any) => {
  return (
    <>
      <div className='background'>
        <ul className='elements'>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {children}
    </>
  );
};

export default Background;

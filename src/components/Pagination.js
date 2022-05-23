import React from 'react';
import leftArrow from '../img/circle-arrow-left-solid.svg'
//import rightArrow from '../img/circle-arrow-right-solid.svg'

const Pagination = (props) => {
  const {page, totalPages, onLeftClick, onRightClick} = props;
  // ◀️ ▶️
  return (
    <div className='pagination-container'>
      <button onClick={onLeftClick} ><img src={leftArrow} alt="left-arrow" className='left-arrow' /> </button>
      <div>{page} de {totalPages}</div>
      <button onClick={onRightClick}><img src={leftArrow} alt="right-arrow" className='right-arrow' /></button>
    </div>
  );
}

export default Pagination;
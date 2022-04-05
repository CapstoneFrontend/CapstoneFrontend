import React from 'react';
import './relateCompareLists.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const slides = [1, 2, 3, 4, 5, 6, 7, 8];

const slideLeft = () => {
  const slider = document.getElementByClassName('slider');
  slider.scrollLeft += 500;
};

const slideRight = () => {
  const slider = document.getElementByClassName('slider');
  slider.scrollLeft -= 500;
};

const relatedList = () => (
  <div>
    <p>Related Products</p>
    <div className="slider-container">
      <MdKeyboardArrowLeft size={40} className="arrow-button-left" onClick={slideLeft} />
      <div className="slider">
        {slides.map((slide) => <div className="slider-cards" key={slide.toString()}>{slide}</div>)}
      </div>
      <MdKeyboardArrowRight size={40} className="arrow-button-right" onClick={slideRight} />
    </div>
  </div>
);

export default relatedList;

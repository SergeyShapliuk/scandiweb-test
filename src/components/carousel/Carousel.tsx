import React, { useEffect, useState } from 'react';

import s from './Carousel.module.css';

function Carousel(props: any) {
  const { children } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);
  useEffect(() => {
    setLength(children.length);
  }, [children]);
  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };
  return (
    <div className={s.carouselContainer}>
      <div className={s.carouselWrapper}>
        <button type="button" onClick={prev} className={s.leftArrow}>
          &lt;
        </button>
        <div className={s.carouselContentWrapper}>
          <div
            className={s.carouselContent}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {children}
          </div>
        </div>
        <button type="button" onClick={next} className={s.rightArrow}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Carousel;

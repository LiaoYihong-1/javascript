import React, { useState } from 'react';
import './App.scss';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';

const images = [image1, image2, image3];

interface ImageSliderProps {
  initialWidth: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ initialWidth }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(initialWidth);

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageWidth(Number(e.target.value));
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="image-slider-container">
      <div className="image-wrapper">
        <button className="arrow-button" onClick={goToPreviousImage}>
          {'<'}
        </button>
        <img
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          style={{ width: `${imageWidth}px`, height: 'auto' }}
        />
        <button className="arrow-button" onClick={goToNextImage}>
          {'>'}
        </button>
      </div>
      <div className="slider-container">
        <input
          type="range"
          min="100"
          max="800"
          step="1"
          value={imageWidth}
          onChange={handleWidthChange}
          className="image-width-slider"
        />
        <span className="slider-value">{imageWidth}px</span>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="app-container">
      <h1>Size adapter</h1>
      <ImageSlider initialWidth={400} />
    </div>
  );
};

export default App;    
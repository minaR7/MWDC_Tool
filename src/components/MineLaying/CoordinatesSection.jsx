import React from 'react';
import './CoordinatesSection.css';

const CoordinatesSection = ({
  coordinates,
  onAddCoordinate,
  onRemoveCoordinate,
  onClearAllCoordinates,
  onUpdateCoordinate
}) => {
  return (
    <div className="coordinates-section">
      <div className="coordinates-header">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 7.5C15 11.2448 10.8457 15.1447 9.45075 16.3492C9.32079 16.447 9.1626 16.4998 9 16.4998C8.8374 16.4998 8.67921 16.447 8.54925 16.3492C7.15425 15.1447 3 11.2448 3 7.5C3 5.9087 3.63214 4.38258 4.75736 3.25736C5.88258 2.13214 7.4087 1.5 9 1.5C10.5913 1.5 12.1174 2.13214 13.2426 3.25736C14.3679 4.38258 15 5.9087 15 7.5Z" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="coordinates-title">Coordinates</h3>
      </div>

      <div className="coordinates-list">
        {coordinates.map((coord, index) => (
          <div key={coord.id} className="coordinate-row">
            <span className="coordinate-number">{index + 1}.</span>
            <input
              type="text"
              className="coordinate-input"
              value={coord.lat}
              onChange={(e) => onUpdateCoordinate(coord.id, 'lat', e.target.value)}
              placeholder="Latitude"
            />
            <input
              type="text"
              className="coordinate-input"
              value={coord.lng}
              onChange={(e) => onUpdateCoordinate(coord.id, 'lng', e.target.value)}
              placeholder="Longitude"
            />
            <button 
              className="delete-coordinate-btn"
              onClick={() => onRemoveCoordinate(coord.id)}
            >
              <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.46429 9.1442H0.821429C0.603572 9.1442 0.394639 9.0539 0.240591 8.89317C0.0865431 8.73244 0 8.51443 0 8.28712C0 8.05981 0.0865431 7.84181 0.240591 7.68107C0.394639 7.52034 0.603572 7.43004 0.821429 7.43004H7.39286V4.85708C7.39286 4.62977 7.4794 4.41177 7.63345 4.25103C7.7875 4.0903 7.99643 4 8.21429 4H14.7857C15.0036 4 15.2125 4.0903 15.3666 4.25103C15.5206 4.41177 15.6071 4.62977 15.6071 4.85708V7.43004H22.1786C22.3964 7.43004 22.6054 7.52034 22.7594 7.68107C22.9135 7.84181 23 8.05981 23 8.28712C23 8.51443 22.9135 8.73244 22.7594 8.89317C22.6054 9.0539 22.3964 9.1442 22.1786 9.1442H20.5357V27.1429C20.5357 27.3702 20.4492 27.5882 20.2951 27.749C20.1411 27.9097 19.9321 28 19.7143 28H3.28571C3.06786 28 2.85892 27.9097 2.70488 27.749C2.55083 27.5882 2.46429 27.3702 2.46429 27.1429V9.1442ZM13.9643 7.43004V5.71588H9.03571V7.43004H13.9643ZM4.10714 26.2858H18.8929V9.1442H4.10714V26.2858ZM9.03571 22.8575C8.81786 22.8575 8.60892 22.7672 8.45488 22.6065C8.30083 22.4457 8.21429 22.2277 8.21429 22.0004V13.4296C8.21429 13.2023 8.30083 12.9843 8.45488 12.8236C8.60892 12.6628 8.81786 12.5725 9.03571 12.5725C9.25357 12.5725 9.4625 12.6628 9.61655 12.8236C9.7706 12.9843 9.85714 13.2023 9.85714 13.4296V22.0004C9.85714 22.2277 9.7706 22.4457 9.61655 22.6065C9.4625 22.7672 9.25357 22.8575 9.03571 22.8575ZM13.9643 22.8575C13.7464 22.8575 13.5375 22.7672 13.3834 22.6065C13.2294 22.4457 13.1429 22.2277 13.1429 22.0004V13.4296C13.1429 13.2023 13.2294 12.9843 13.3834 12.8236C13.5375 12.6628 13.7464 12.5725 13.9643 12.5725C14.1821 12.5725 14.3911 12.6628 14.5451 12.8236C14.6992 12.9843 14.7857 13.2023 14.7857 13.4296V22.0004C14.7857 22.2277 14.6992 22.4457 14.5451 22.6065C14.3911 22.7672 14.1821 22.8575 13.9643 22.8575Z" fill="black"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="coordinates-actions">
        <button className="add-points-btn" onClick={onAddCoordinate}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33337 8H12.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 3.33337V12.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Add points
        </button>
        <button className="clear-all-btn" onClick={onClearAllCoordinates}>
          <svg width="32" height="36" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.1025 15.0546L18.9389 18.9089L15.7752 15.0546L14.3674 16.7669L17.5311 20.6212L14.3674 24.4695L15.7752 26.1818L18.9389 22.3275L22.1025 26.1818L23.5103 24.4695L20.3466 20.6212L23.5103 16.7669L22.1025 15.0546Z" fill="white"/>
          </svg>
          Clear all points
        </button>
      </div>
    </div>
  );
};

export default CoordinatesSection;

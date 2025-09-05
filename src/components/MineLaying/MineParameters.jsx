import React from 'react';
import CoordinatesSection from './CoordinatesSection';
import './MineParameters.css';

const MineParameters = ({
  parameters,
  coordinates,
  onUpdateParameters,
  onAddCoordinate,
  onRemoveCoordinate,
  onClearAllCoordinates,
  onUpdateCoordinate,
  onGenerateMines
}) => {
  const handleParameterChange = (field, value) => {
    onUpdateParameters({ ...parameters, [field]: value });
  };

  const handleDrawingModeChange = (mode) => {
    handleParameterChange('drawingMode', mode);
  };

  return (
    <div className="mine-parameters">
      <div className="parameters-header">
        <svg width="18" height="18" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_151_1135)">
            <path d="M8.58337 16.8334C12.3113 16.8334 15.3334 13.8113 15.3334 10.0834C15.3334 6.35545 12.3113 3.33337 8.58337 3.33337C4.85545 3.33337 1.83337 6.35545 1.83337 10.0834C1.83337 13.8113 4.85545 16.8334 8.58337 16.8334Z" stroke="#162E45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.0958 3.82085L12.5583 2.35835C12.897 2.02127 13.3555 1.83203 13.8333 1.83203C14.3112 1.83203 14.7696 2.02127 15.1083 2.35835L16.3083 3.55835C16.4761 3.72557 16.6093 3.92428 16.7001 4.14307C16.791 4.36187 16.8377 4.59644 16.8377 4.83335C16.8377 5.07025 16.791 5.30483 16.7001 5.52362C16.6093 5.74241 16.4761 5.94112 16.3083 6.10835L14.8458 7.57085" stroke="#162E45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16.8334 1.83337L15.7084 2.95837" stroke="#162E45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_151_1135">
              <rect width="18" height="18" fill="white" transform="translate(0.333374 0.333374)"/>
            </clipPath>
          </defs>
        </svg>
        <h3 className="parameters-title">Mine Parameters</h3>
      </div>

      <div className="parameter-group">
        <label className="parameter-label">Mine Type</label>
        <select 
          className="parameter-select"
          value={parameters.mineType}
          onChange={(e) => handleParameterChange('mineType', e.target.value)}
        >
          <option value="Contact Mine">Contact Mine</option>
          <option value="Proximity Mine">Proximity Mine</option>
          <option value="Magnetic Mine">Magnetic Mine</option>
        </select>
      </div>

      <div className="parameter-group">
        <label className="parameter-label">
          <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_151_1149)">
              <path d="M8.33342 15.0001C12.0153 15.0001 15.0001 12.0153 15.0001 8.33342C15.0001 4.65152 12.0153 1.66675 8.33342 1.66675C4.65152 1.66675 1.66675 4.65152 1.66675 8.33342C1.66675 12.0153 4.65152 15.0001 8.33342 15.0001Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.33337 12.3334C10.5425 12.3334 12.3334 10.5425 12.3334 8.33337C12.3334 6.12424 10.5425 4.33337 8.33337 4.33337C6.12424 4.33337 4.33337 6.12424 4.33337 8.33337C4.33337 10.5425 6.12424 12.3334 8.33337 12.3334Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.33333 9.66667C9.06971 9.66667 9.66667 9.06971 9.66667 8.33333C9.66667 7.59695 9.06971 7 8.33333 7C7.59695 7 7 7.59695 7 8.33333C7 9.06971 7.59695 9.66667 8.33333 9.66667Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_151_1149">
                <rect width="16" height="16" fill="white" transform="translate(0.333374 0.333374)"/>
              </clipPath>
            </defs>
          </svg>
          Target Type
        </label>
        <select 
          className="parameter-select"
          value={parameters.targetType}
          onChange={(e) => handleParameterChange('targetType', e.target.value)}
        >
          <option value="Surface Vessel">Surface Vessel</option>
          <option value="Submarine">Submarine</option>
          <option value="Any Vessel">Any Vessel</option>
        </select>
      </div>

      <div className="parameter-group">
        <label className="parameter-label">
          <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_151_1160)">
              <path d="M14.82 12.3334L9.48666 3.00003C9.37037 2.79483 9.20173 2.62415 8.99794 2.50541C8.79416 2.38666 8.56252 2.3241 8.32666 2.3241C8.0908 2.3241 7.85916 2.38666 7.65538 2.50541C7.45159 2.62415 7.28295 2.79483 7.16666 3.00003L1.83333 12.3334C1.71578 12.5369 1.65415 12.768 1.65467 13.003C1.65519 13.2381 1.71785 13.4689 1.83629 13.6719C1.95474 13.875 2.12476 14.0431 2.32912 14.1592C2.53349 14.2754 2.76493 14.3355 2.99999 14.3334H13.6667C13.9006 14.3331 14.1303 14.2713 14.3328 14.1542C14.5353 14.0371 14.7035 13.8688 14.8203 13.6661C14.9372 13.4635 14.9987 13.2336 14.9986 12.9997C14.9986 12.7658 14.937 12.536 14.82 12.3334Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.33337 6.33337V9.00004" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.33337 11.6667H8.34004" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_151_1160">
                <rect width="16" height="16" fill="white" transform="translate(0.333374 0.333374)"/>
              </clipPath>
            </defs>
          </svg>
          Threat Level
        </label>
        <select 
          className="parameter-select"
          value={parameters.threatLevel}
          onChange={(e) => handleParameterChange('threatLevel', e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="parameter-group">
        <label className="parameter-label">Actuation Width</label>
        <div className="parameter-input-with-unit">
          <input 
            type="number"
            className="parameter-input"
            value={parameters.actuationWidth}
            onChange={(e) => handleParameterChange('actuationWidth', e.target.value)}
          />
          <span className="parameter-unit">meters</span>
        </div>
      </div>

      <div className="parameter-group">
        <label className="parameter-label">Drawing Mode</label>
        <div className="drawing-mode-buttons">
          <button 
            className={`drawing-mode-btn ${parameters.drawingMode === 'Area' ? 'inactive' : ''}`}
            onClick={() => handleDrawingModeChange('Area')}
          >
            <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.75 2.33337H3.41671C2.68033 2.33337 2.08337 2.93033 2.08337 3.66671V13C2.08337 13.7364 2.68033 14.3334 3.41671 14.3334H12.75C13.4864 14.3334 14.0834 13.7364 14.0834 13V3.66671C14.0834 2.93033 13.4864 2.33337 12.75 2.33337Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Area
          </button>
          <button 
            className={`drawing-mode-btn ${parameters.drawingMode === 'Channel' ? 'active' : ''}`}
            onClick={() => handleDrawingModeChange('Channel')}
          >
            <svg width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_151_1184)">
                <path d="M4.0625 15C5.16707 15 6.0625 14.1046 6.0625 13C6.0625 11.8954 5.16707 11 4.0625 11C2.95793 11 2.0625 11.8954 2.0625 13C2.0625 14.1046 2.95793 15 4.0625 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.0625 13.0001H11.7292C12.348 13.0001 12.9415 12.7542 13.3791 12.3167C13.8167 11.8791 14.0625 11.2856 14.0625 10.6667C14.0625 10.0479 13.8167 9.45442 13.3791 9.01683C12.9415 8.57925 12.348 8.33341 11.7292 8.33341H4.39583C3.77699 8.33341 3.1835 8.08758 2.74592 7.65C2.30833 7.21241 2.0625 6.61892 2.0625 6.00008C2.0625 5.38124 2.30833 4.78775 2.74592 4.35017C3.1835 3.91258 3.77699 3.66675 4.39583 3.66675H10.0625" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.0625 5.66675C13.1671 5.66675 14.0625 4.77132 14.0625 3.66675C14.0625 2.56218 13.1671 1.66675 12.0625 1.66675C10.9579 1.66675 10.0625 2.56218 10.0625 3.66675C10.0625 4.77132 10.9579 5.66675 12.0625 5.66675Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_151_1184">
                  <rect width="16" height="16" fill="white" transform="translate(0.0625 0.333374)"/>
                </clipPath>
              </defs>
            </svg>
            Channel
          </button>
        </div>
      </div>

      {parameters.drawingMode === 'Channel' && (
        <div className="parameter-group">
          <label className="parameter-label">Channel Width</label>
          <div className="parameter-input-with-unit">
            <input 
              type="number"
              className="parameter-input"
              value={parameters.channelWidth}
              onChange={(e) => handleParameterChange('channelWidth', e.target.value)}
            />
            <span className="parameter-unit">meters</span>
          </div>
        </div>
      )}

      <CoordinatesSection
        coordinates={coordinates}
        onAddCoordinate={onAddCoordinate}
        onRemoveCoordinate={onRemoveCoordinate}
        onClearAllCoordinates={onClearAllCoordinates}
        onUpdateCoordinate={onUpdateCoordinate}
      />

      <button className="generate-mines-btn" onClick={onGenerateMines}>
        <svg width="16" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_151_1297)">
            <path d="M8.2915 14.6666C11.6052 14.6666 14.2915 11.9803 14.2915 8.66663C14.2915 5.35292 11.6052 2.66663 8.2915 2.66663C4.9778 2.66663 2.2915 5.35292 2.2915 8.66663C2.2915 11.9803 4.9778 14.6666 8.2915 14.6666Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.5249 3.09999L11.8249 1.79999C12.126 1.50036 12.5335 1.33215 12.9582 1.33215C13.383 1.33215 13.7905 1.50036 14.0916 1.79999L15.1582 2.86666C15.3074 3.0153 15.4258 3.19193 15.5065 3.38641C15.5873 3.5809 15.6288 3.78941 15.6288 3.99999C15.6288 4.21057 15.5873 4.41908 15.5065 4.61357C15.4258 4.80805 15.3074 4.98468 15.1582 5.13332L13.8582 6.43332" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15.625 1.33337L14.625 2.33337" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <defs>
            <clipPath id="clip0_151_1297">
              <rect width="16" height="16" fill="white" transform="translate(0.958252)"/>
            </clipPath>
          </defs>
        </svg>
        Generate Mines
      </button>
    </div>
  );
};

export default MineParameters;

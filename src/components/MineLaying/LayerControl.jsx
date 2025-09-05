import React from 'react';
import './LayerControl.css';

const LayerControl = ({ controls, onUpdate }) => {
  const handleControlChange = (key) => {
    onUpdate({ ...controls, [key]: !controls[key] });
  };

  return (
    <div className="layer-control">
     <div className="layer-control-header">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6666 16.6667C17.1087 16.6667 17.5326 16.4911 17.8451 16.1785C18.1577 15.866 18.3333 15.442 18.3333 15V6.66667C18.3333 6.22464 18.1577 5.80072 17.8451 5.48816C17.5326 5.17559 17.1087 5 16.6666 5H10.0833C9.80455 5.00273 9.52958 4.93551 9.28354 4.80448C9.0375 4.67346 8.82826 4.48281 8.67496 4.25L7.99996 3.25C7.8482 3.01956 7.6416 2.8304 7.39871 2.6995C7.15581 2.56859 6.88422 2.50005 6.60829 2.5H3.33329C2.89127 2.5 2.46734 2.67559 2.15478 2.98816C1.84222 3.30072 1.66663 3.72464 1.66663 4.16667V15C1.66663 15.442 1.84222 15.866 2.15478 16.1785C2.46734 16.4911 2.89127 16.6667 3.33329 16.6667H16.6666Z" stroke="#162E45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="layer-control-title">Mine Warfare - Mine Laying</h2>
      </div>
      
      <div className="layer-control-section">
        <div className="section-header">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_151_1096)">
              <path d="M9.62247 1.63502C9.42705 1.54589 9.21476 1.49976 8.99997 1.49976C8.78518 1.49976 8.57289 1.54589 8.37747 1.63502L1.94997 4.56002C1.81689 4.61871 1.70373 4.71482 1.62429 4.83667C1.54486 4.95851 1.50256 5.10082 1.50256 5.24627C1.50256 5.39173 1.54486 5.53404 1.62429 5.65588C1.70373 5.77773 1.81689 5.87384 1.94997 5.93252L8.38497 8.86502C8.58039 8.95416 8.79268 9.00029 9.00747 9.00029C9.22226 9.00029 9.43455 8.95416 9.62997 8.86502L16.065 5.94002C16.1981 5.88134 16.3112 5.78522 16.3907 5.66338C16.4701 5.54154 16.5124 5.39923 16.5124 5.25377C16.5124 5.10832 16.4701 4.96601 16.3907 4.84417C16.3112 4.72232 16.1981 4.62621 16.065 4.56752L9.62247 1.63502Z" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 9C1.49965 9.14345 1.54044 9.28399 1.61754 9.40496C1.69464 9.52593 1.80482 9.62225 1.935 9.6825L8.385 12.615C8.5794 12.703 8.79035 12.7486 9.00375 12.7486C9.21715 12.7486 9.4281 12.703 9.6225 12.615L16.0575 9.69C16.1903 9.63033 16.3028 9.53332 16.3814 9.4108C16.4599 9.28828 16.5012 9.14555 16.5 9" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1.5 12.75C1.49965 12.8935 1.54044 13.034 1.61754 13.155C1.69464 13.2759 1.80482 13.3723 1.935 13.4325L8.385 16.365C8.5794 16.453 8.79035 16.4986 9.00375 16.4986C9.21715 16.4986 9.4281 16.453 9.6225 16.365L16.0575 13.44C16.1903 13.3803 16.3028 13.2833 16.3814 13.1608C16.4599 13.0383 16.5012 12.8955 16.5 12.75" stroke="#1C3D5A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
              <clipPath id="clip0_151_1096">
                <rect width="18" height="18" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <h3 className="section-title">Layer Control</h3>
        </div>
        {/*  
        <div className="layer-options">
          <div className="layer-option">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="mapLayer"
                checked={controls.mapLayer}
                onChange={() => handleControlChange('mapLayer')}
                className="layer-checkbox"
              />
              <label htmlFor="mapLayer" className="checkbox-label">
                <svg className="checkbox-icon" width="14" height="14" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 4L5.25004 10.4167L2.33337 7.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>
            </div>
            <div className="layer-label">
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.755 5.32171C11.9863 5.45465 12.2414 5.52385 12.5 5.52385C12.7586 5.52385 13.0137 5.45465 13.245 5.32171L16.2942 3.56796C16.4213 3.4949 16.5626 3.46045 16.7046 3.46788C16.8466 3.47532 16.9845 3.52439 17.1054 3.61045C17.2262 3.6965 17.3259 3.81666 17.395 3.95952C17.4641 4.10238 17.5002 4.26317 17.5 4.42663V16.6588C17.4999 16.8367 17.4568 17.0111 17.3754 17.1624C17.294 17.3137 17.1776 17.436 17.0392 17.5155L13.245 19.6977C13.0137 19.8306 12.7586 19.8998 12.5 19.8998C12.2414 19.8998 11.9863 19.8306 11.755 19.6977L8.245 17.6794C8.01367 17.5465 7.75861 17.4773 7.5 17.4773C7.2414 17.4773 6.98634 17.5465 6.755 17.6794L3.70584 19.4332C3.57863 19.5063 3.43727 19.5407 3.29522 19.5332C3.15316 19.5258 3.01513 19.4766 2.89427 19.3904C2.7734 19.3043 2.67372 19.184 2.60471 19.041C2.5357 18.898 2.49965 18.7371 2.5 18.5735V6.34234C2.50009 6.16441 2.54324 5.99002 2.62463 5.83871C2.70602 5.68739 2.82244 5.56512 2.96084 5.48559L6.755 3.30346C6.98634 3.17052 7.2414 3.10132 7.5 3.10132C7.75861 3.10132 8.01367 3.17052 8.245 3.30346L11.755 5.32171Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 5.52393V19.8989" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.5 3.10107V17.4761" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Map Layer</span>
            </div>
          </div>

          <div className="layer-option">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="mines"
                checked={controls.mines}
                onChange={() => handleControlChange('mines')}
                className="layer-checkbox"
              />
              <label htmlFor="mines" className="checkbox-label">
                <svg className="checkbox-icon" width="14" height="14" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 4L5.25004 10.4167L2.33337 7.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>
            </div>
            <div className="layer-label">
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_151_1117)">
                  <path d="M9.16663 21.0833C13.3088 21.0833 16.6666 17.2217 16.6666 12.4583C16.6666 7.6948 13.3088 3.83325 9.16663 3.83325C5.02449 3.83325 1.66663 7.6948 1.66663 12.4583C1.66663 17.2217 5.02449 21.0833 9.16663 21.0833Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M11.9584 4.4563L13.5834 2.58755C13.9597 2.15684 14.4691 1.91504 15 1.91504C15.531 1.91504 16.0404 2.15684 16.4167 2.58755L17.75 4.12089C17.9365 4.33457 18.0844 4.58847 18.1854 4.86804C18.2863 5.14761 18.3383 5.44734 18.3383 5.75005C18.3383 6.05277 18.2863 6.3525 18.1854 6.63207C18.0844 6.91164 17.9365 7.16554 17.75 7.37922L16.125 9.24797" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18.3334 1.91675L17.0834 3.35425" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_151_1117">
                    <rect width="20" height="23" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span>Mines</span>
            </div>
          </div>

          <div className="layer-option">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="areasRoutes"
                checked={controls.areasRoutes}
                onChange={() => handleControlChange('areasRoutes')}
                className="layer-checkbox"
              />
              <label htmlFor="areasRoutes" className="checkbox-label">
                <svg className="checkbox-icon" width="14" height="14" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6667 4L5.25004 10.4167L2.33337 7.5" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </label>
            </div>
            <div className="layer-label">
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.755 5.32171C11.9863 5.45465 12.2414 5.52385 12.5 5.52385C12.7586 5.52385 13.0137 5.45465 13.245 5.32171L16.2942 3.56796C16.4213 3.4949 16.5626 3.46045 16.7046 3.46788C16.8466 3.47532 16.9845 3.52439 17.1054 3.61045C17.2262 3.6965 17.3259 3.81666 17.395 3.95952C17.4641 4.10238 17.5002 4.26317 17.5 4.42663V16.6588C17.4999 16.8367 17.4568 17.0111 17.3754 17.1624C17.294 17.3137 17.1776 17.436 17.0392 17.5155L13.245 19.6977C13.0137 19.8306 12.7586 19.8998 12.5 19.8998C12.2414 19.8998 11.9863 19.8306 11.755 19.6977L8.245 17.6794C8.01367 17.5465 7.75861 17.4773 7.5 17.4773C7.2414 17.4773 6.98634 17.5465 6.755 17.6794L3.70584 19.4332C3.57863 19.5063 3.43727 19.5407 3.29522 19.5332C3.15316 19.5258 3.01513 19.4766 2.89427 19.3904C2.7734 19.3043 2.67372 19.184 2.60471 19.041C2.5357 18.898 2.49965 18.7371 2.5 18.5735V6.34234C2.50009 6.16441 2.54324 5.99002 2.62463 5.83871C2.70602 5.68739 2.82244 5.56512 2.96084 5.48559L6.755 3.30346C6.98634 3.17052 7.2414 3.10132 7.5 3.10132C7.75861 3.10132 8.01367 3.17052 8.245 3.30346L11.755 5.32171Z" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.5 5.52393V19.8989" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.5 3.10107V17.4761" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Areas/Routes</span>
            </div>
          </div>
        </div>*/}
        <div className="layer-options">
          <div className="layer-option">
            <div className="checkbox-container">
          <label>
            <input
              type="checkbox"
              checked={controls.mines}
              onChange={() => onUpdate({ ...controls, map: !controls.map })}
            />
            Map
          </label>  </div> </div>  </div>
        <label>
          <input
            type="checkbox"
            checked={controls.channels}
            onChange={() =>
              onUpdate({ ...controls, channels: !controls.channels })
            }
          />
          Channels
        </label>
        <label>
          <input
            type="checkbox"
            checked={controls.areas}
            onChange={() => onUpdate({ ...controls, areas: !controls.areas })}
          />
          Areas
        </label>
        <label>
          <input
            type="checkbox"
            checked={controls.mines}
            onChange={() => onUpdate({ ...controls, mines: !controls.mines })}
          />
          Mines
        </label>
     </div>
    </div> 
  );
};

export default LayerControl;

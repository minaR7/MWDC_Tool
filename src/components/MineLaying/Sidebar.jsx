import React from 'react';
import LayerControl from './LayerControl';
import MineParameters from './MineParameters';
import './Sidebar.css';
import Split from 'react-split';

const Sidebar = ({
  coordinates,
  mineParameters,
  layerControls,
  onAddCoordinate,
  onRemoveCoordinate,
  onClearAllCoordinates,
  onUpdateCoordinate,
  onUpdateMineParameters,
  onUpdateLayerControls,
  onGenerateMines
}) => {
  return (
    <div className="sidebar">
      <Split
        sizes={[40, 60]}      // Initial size ratio
        minSize={100}         // Minimum size of each panel
        direction="vertical"  // Vertical split
        gutterSize={2}        // Gutter width
      >
        {/* <div className="panel">
          <LayerControl 
            controls={layerControls}
            onUpdate={onUpdateLayerControls}
          />
        </div> */}
      <div className="sidebar-divider"></div>
      
        <div className="panel">
          <MineParameters
            parameters={mineParameters}
            coordinates={coordinates}
            onUpdateParameters={onUpdateMineParameters}
            onAddCoordinate={onAddCoordinate}
            onRemoveCoordinate={onRemoveCoordinate}
            onClearAllCoordinates={onClearAllCoordinates}
            onUpdateCoordinate={onUpdateCoordinate}
            onGenerateMines={onGenerateMines}
          />
        </div>
      </Split>
    </div>
  );
};

export default Sidebar;

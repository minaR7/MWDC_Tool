import React, { useState } from 'react';
import Sidebar from './MineLaying/Sidebar';
import LeafletDraw from './DrawOnMap';
import './MineLayingPage.css';

const MineLayingPage = () => {
  // const [coordinates, setCoordinates] = useState([
  //   { id: 1, lat: '24.757803', lng: '67.908235' },
  //   { id: 2, lat: '24.757803', lng: '66.308235' },
  //   { id: 3, lat: '24.757803', lng: '66.908235' }
  // ]);
    const [coordinates, setCoordinates] = useState([]);

  const [mineParameters, setMineParameters] = useState({
    mineType: 'Contact Mine',
    targetType: 'Surface Vessel',
    threatLevel: 'Medium',
    actuationWidth: '5000',
    channelWidth: '500',
    drawingMode: 'Channel'
  });

  const [layerControls, setLayerControls] = useState({
    mapLayer: true,
    mines: true,
    areasRoutes: true
  });

  const addCoordinate = () => {
    const newId = Math.max(...coordinates.map(c => c.id), 0) + 1;
    setCoordinates([...coordinates, { id: newId, lat: '', lng: '' }]);
  };

  const removeCoordinate = (id) => {
    setCoordinates(coordinates.filter(coord => coord.id !== id));
  };

  const clearAllCoordinates = () => {
    setCoordinates([]);
  };

  const updateCoordinate = (id, field, value) => {
    setCoordinates(coordinates.map(coord => 
      coord.id === id ? { ...coord, [field]: value } : coord
    ));
  };

  const generateMines = () => {
    console.log('Generating mines with parameters:', mineParameters);
    console.log('Using coordinates:', coordinates);
  };

  return (
    <div className="mine-laying-page">
      <div className="main-content">
        <Sidebar
          coordinates={coordinates}
          mineParameters={mineParameters}
          layerControls={layerControls}
          onAddCoordinate={addCoordinate}
          onRemoveCoordinate={removeCoordinate}
          onClearAllCoordinates={clearAllCoordinates}
          onUpdateCoordinate={updateCoordinate}
          onUpdateMineParameters={setMineParameters}
          onUpdateLayerControls={setLayerControls}
          onGenerateMines={generateMines}
        />
        <LeafletDraw coordinates={coordinates} drawingMode={mineParameters.drawingMode} channelWidth={mineParameters.channelWidth}
        layerControls={layerControls} onUpdateCoordinatesFromMap={(newCoords) => setCoordinates(newCoords)}/>
      </div>
    </div>
  );
};

export default MineLayingPage;

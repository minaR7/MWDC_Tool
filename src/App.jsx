import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Mission from './pages/Mission';
import Assets from './pages/Assets';
import Environment from './pages/Environment';
import DataExplorer from './pages/DataExplorer';
import Intelligence from './pages/Intelligence';
import MineLayingPage from './components/MineLayingPage';
import MapLayout from './components/Map';

function App() {
  return (
    <>
      <Navbar />
      <div className='' style={{height: "92vh", width:"99vw"}}>
        <Routes>
          <Route path="/" element={<Navigate to="/mission" replace />} />
          <Route path="/mission/*" element={<Mission />} />
          <Route path="/map" element={<MapLayout />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/environment" element={<Environment />} />
          <Route path="/data-explorer" element={<DataExplorer />} />
          <Route path="/mine-laying" element={<MineLayingPage />} />
          <Route path="/intelligence" element={<Intelligence />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, Marker, Popup, Polyline, Polygon, LayersControl, LayerGroup, } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import '../style/leaflet-custom.css';
import * as turf from "@turf/turf";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

// ✅ Custom small circle marker
const customMarkerIcon = L.divIcon({
  className: "custom-coordinate-marker",
  html: '<div style="width:12px;height:12px;background:#007bff;border-radius:50%;border:2px solid white;"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const LeafletDraw = ({coordinates = [{lat: '', lng: '' }], drawingMode="Area", minelaying = true,  channelWidth, layerControls,
  onUpdateCoordinatesFromMap  }) => {
  
  const [center] = useState({ lat: 24.4539, lng: 54.3773 }); // Abu Dhabi
  const ZOOM_LEVEL = 12;
  const mapRef = useRef();
  const [drawnLine, setDrawnLine] = useState(null);
  const [bufferPolygon, setBufferPolygon] = useState(null);
  const [drawnPolygon, setDrawnPolygon] = useState(null);


    console.log(" drawingMode:", drawingMode, "channelWidth", channelWidth);
    // ✅ Filter valid coords
  const validCoords = coordinates?.filter(coord => coord?.lat && coord?.lng)?.map(coord => [parseFloat(coord.lat), parseFloat(coord.lng)]);

  const bounds = [
    [24.757803, 66.908235], // South-West (lat, lng)
    [24.853930, 67.048491]  // North-East
  ];

  const handleCreated = (e) => {
    const { layerType, layer } = e;
    let shapeData = {};

    console.log("Shape created:", e);
    console.log("Created type:", layerType, layer.getLatLngs());
    
    if (layerType === "polyline" || layerType === "polygon") {
      const latlngs = layerType === "polygon" ? layer.getLatLngs()[0] : layer.getLatLngs();

      const newCoords = latlngs.map((pt, index) => ({
        id: `${Date.now()}-${index}`,
        lat: pt.lat.toFixed(6),
        lng: pt.lng.toFixed(6),
      }));

      onUpdateCoordinatesFromMap(newCoords);

      if (layerType === "polyline") {
        setDrawnLine(latlngs);
        setDrawnPolygon(null);
        shapeData = { type: "channel", coords: latlngs };
      } else if (layerType === "polygon") {
        setDrawnPolygon(latlngs);
        setDrawnLine(null);
       shapeData = { type: "area", coords: latlngs };
      }
    }
    //  Save to localStorage
    const existingShapes = JSON.parse(localStorage.getItem("mapShapes")) || [];
    existingShapes.push(shapeData);
    localStorage.setItem("mapShapes", JSON.stringify(existingShapes));
 };

   // Handle shape edits
  const handleEdited = (e) => {
    e.layers.eachLayer((layer) => {
      const latlngs = layer.getLatLngs()[0] || layer.getLatLngs();
      const updatedCoords = latlngs.map((pt, index) => ({
        id: `${Date.now()}-${index}`,
        lat: pt.lat.toFixed(6),
        lng: pt.lng.toFixed(6),
      }));
      onUpdateCoordinatesFromMap(updatedCoords);
    });
  };

  // Handle shape deletions
  const handleDeleted = () => {
    onUpdateCoordinatesFromMap([]);
    setDrawnLine(null);
    setDrawnPolygon(null);
    setBufferPolygon(null);
  };

  // Compute buffer whenever line or width changes
  useEffect(() => {
    if (drawnLine && channelWidth) {
      const lineGeoJSON = turf.lineString(
        drawnLine.map((pt) => [pt.lng, pt.lat])
      );
      const buffered = turf.buffer(lineGeoJSON, parseFloat(channelWidth), {
        units: "meters",
      });

      // Convert buffer polygon to Leaflet LatLng array
      if (buffered.geometry.type === "Polygon") {
        const coords = buffered.geometry.coordinates[0].map((c) => [c[1], c[0]]);
        setBufferPolygon(coords);
      }
    }
  }, [drawnLine, channelWidth]);


  useEffect(() => {

    if (validCoords.length > 1) {
      if (drawingMode === "Channel") {
        setDrawnLine(validCoords.map((c) => ({ lat: c[0], lng: c[1] })));
        setDrawnPolygon(null);
      } else if (drawingMode === "Area") {
        setDrawnPolygon(validCoords.map((c) => ({ lat: c[0], lng: c[1] })));
        setDrawnLine(null);
      }
    } else {
      setDrawnLine(null);
      setDrawnPolygon(null);
      setBufferPolygon(null);
    }
  }, [coordinates, drawingMode]);


  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <MapContainer
        // center={center}
        // zoom={ZOOM_LEVEL}
        bounds={bounds}
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={handleCreated}
            onEdited={handleEdited}
            onDeleted={handleDeleted}
            draw={{
              polyline: true,
              polygon: true,
              rectangle: true, 
              circle: true,
              marker: true,
            }}
          />
        </FeatureGroup>

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />


        {/* Render markers for coordinates */}
        {validCoords.map((pos, index) => (
          <Marker key={index} position={pos} icon={customMarkerIcon}>
            <Popup>Lat: {pos[0]}, Lng: {pos[1]}</Popup>
          </Marker>
        ))}
        
      
        {/* Channels Layer */}
            {validCoords.length > 1 && drawingMode === "Channel" && (
              <Polyline positions={validCoords} color="green"  weight={ 3} />
            )} 
            {/*  Render original polyline */}
            {drawnLine && <Polyline positions={drawnLine} color="red" weight={3}/>}
            {/* Render the buffer polygon */}
            {bufferPolygon && (
              <Polygon positions={bufferPolygon} color="red" fillOpacity={0.3} />
            )}
           

        {/* Areas Layer */}
              {validCoords.length > 2 && drawingMode === "Area" && (
              <Polygon positions={validCoords} color="green" weight={3} fillColor="rgba(0,255,0,0.3)" />
            )}
              {/* Render the buffer polygon */}
              {drawnPolygon && (
                <Polygon positions={drawnPolygon} color="pink" fillOpacity={0.3} />
              )}


        {/* Render markers */}
        {validCoords.map((pos, index) => (
            <Marker key={index} position={pos} icon={customMarkerIcon}>
              <Popup>Lat: {pos[0]}, Lng: {pos[1]}</Popup>
            </Marker>
          ))}
       
      </MapContainer>
    </div>
  );
};

export default LeafletDraw;

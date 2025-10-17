import React, { useState, useRef, useEffect } from "react";
import Split from 'react-split';
// import Map, { Layer, Source } from "react-map-gl";
import mapboxgl from 'mapbox-gl'
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import MineParameters from "./MineLaying/MineParameters";

const MAPBOX_TOKEN = "pk.eyJ1IjoibWluYS1yNyIsImEiOiJjbWYwdGZsbzUxdXc5MnNxeTJoa2w2aDF6In0.rRvBY6yp5SkMSJ5kol0Asg"; // Replace with your token

const initialLayers = [
  { id: "base-map", name: "Base Map", visible: true },
];

const priorityColors = {
  High: "#FF0000",
  Medium: "#FFA500",
  Low: "#00FF00",
};


const LayerControls = ({ layers, toggleLayer, toggleDrawnLayer, drawnLayers,  }) => {
  return (
    <div className="p-4 text-white bg-gray-800 h-full overflow-auto">
      <h2 className="text-lg font-bold mb-4">Layers</h2>
      {layers.map((layer) => (
        <label key={layer.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={layer.visible}
            onChange={() => toggleLayer(layer.id)}
            className="mr-2"
          />
          {layer.name}
        </label>
      ))}
      {/* Drawn Layers */}
      <h3 className="mt-4 mb-2 font-semibold">Drawn Shapes</h3>
      {drawnLayers.length === 0 ? (
        <p className="text-gray-400 text-sm">No shapes drawn yet</p>
      ) : (
        drawnLayers.map((layer) => (
          <label key={layer.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={layer.visible}
              onChange={() => toggleDrawnLayer(layer.id)}
              className="mr-2"
            />
            {layer.name}
          </label>
        ))
      )}
    </div>
  );
};

const CustomComponent = ({draw,   coordinates,
  mineParameters,
  onAddCoordinate,
  onRemoveCoordinate,
  onClearAllCoordinates,
  onUpdateCoordinate,
  onUpdateMineParameters,
  onGenerateMines}) => (


  <div className="p-4 bg-gray-700 text-white h-full">
    {/* <h3 className="font-bold mb-2">Custom Component</h3> */}
    <div className="p-4 bg-gray-400 text-white">
    <h3 className="font-bold mb-2">Drawing Tools</h3>
    <div className="space-y-2">
      <button
        onClick={() => draw.current?.changeMode('draw_polygon')}
        className="block w-full bg-blue-500 rounded p-2"
      >
        Draw Polygon
      </button>
      <button
        onClick={() => draw.current?.changeMode('draw_line_string')}
        className="block w-full bg-green-500 rounded p-2"
      >
        Draw Line
      </button>
      <button
        onClick={() => draw.current?.changeMode('draw_point')}
        className="block w-full bg-yellow-500 rounded p-2"
      >
        Draw Point
      </button>
      <button
        onClick={() => draw.current?.trash()}
        className="block w-full bg-red-500 rounded p-2"
      >
        Delete
      </button>
      <button
        onClick={() => {
          const data = draw.current.getAll();
          if (data.features.length === 0) {
            alert("No shapes drawn!");
          } else {
            const geoJSONStr = JSON.stringify(data, null, 2);
            console.log("Exported GeoJSON:", geoJSONStr);
            // Optional: download as file
            const blob = new Blob([geoJSONStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'drawn-shapes.geojson';
            link.click();
          }
        }}
        className="block w-full bg-purple-500 rounded p-2"
      >
        Export GeoJSON
      </button>
    </div>
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

  </div>
  );

function EditForm({ featureId, initialValues, onSave }) {
  const [formValues, setFormValues] = useState(initialValues);

  return (
    <div style={{ width: 220, fontFamily: "sans-serif" }}>
      <h4>Edit Area</h4>
      <label>ID:</label>
      <input value={featureId} readOnly style={{ width: "100%", marginBottom: 6 }} />

      <label>Name:</label>
      <input
        value={formValues.name}
        onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
        style={{ width: "100%", marginBottom: 6 }}
      />

      <label>Status:</label>
      <select
        value={formValues.status}
        onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
        style={{ width: "100%", marginBottom: 6 }}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <label>Priority:</label>
      <select
        value={formValues.priority}
        onChange={(e) => setFormValues({ ...formValues, priority: e.target.value })}
        style={{ width: "100%", marginBottom: 8 }}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <button
        onClick={() => onSave(formValues)}
        style={{ width: "100%", background: "#007aff", color: "white", border: "none", padding: 6 }}
      >
        Save
      </button>
    </div>
  );
}
function MapboxPopup({ lngLat, children, onClose }) {
  const popupContainer = document.createElement("div");

  useEffect(() => {
    const map = document.querySelector(".mapboxgl-map")._map;
    const popup = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(lngLat)
      .setDOMContent(popupContainer)
      .addTo(map);

    return () => popup.remove();
  }, [lngLat]);

  return ReactDOM.createPortal(children, popupContainer);
}

const MapLayout = ({drawingMode="Channel"}) => {
  const [layers, setLayers] = useState(initialLayers);
  const [drawnLayers, setDrawnLayers] = useState([]);
   const mapRef = useRef()
  const mapContainerRef = useRef()
  const drawRef = useRef(null);
  const onUpdateCoordinatesFromMap=(newCoords) => setCoordinates(newCoords)
  const [coordinates, setCoordinates] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null); 

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

    const toggleDrawnLayer = (id) => {
      setDrawnLayers((prev) =>
        prev.map((layer) =>
          layer.id === id ? { ...layer, visible: !layer.visible } : layer
        )
      );
    };

      // Show popup on right-click
    // const handleRightClick = (e) => {
    //   e.preventDefault();

    //   if (!mapRef.current || !drawRef.current) return;

    //   const map = mapRef.current;

    //   const drawLayers = [
    //     "gl-draw-polygon-fill-inactive",
    //     "gl-draw-polygon-fill-active",
    //     "gl-draw-polygon-stroke-inactive",
    //     "gl-draw-polygon-stroke-active",
    //     "gl-draw-line-inactive",
    //     "gl-draw-line-active",
    //     "gl-draw-point-inactive",
    //     "gl-draw-point-active"
    //   ];

    //     // ✅ Filter only layers that actually exist
    //     const existingLayers = drawnLayers.filter((layer) =>
    //     {
    //       console.log(layer),
    //       map.getLayer(layer)
    //     }
    //     );

    //     if (existingLayers.length === 0) {
    //       console.warn("No draw layers exist yet.");
    //       return;
    //     }

    //   // Get features at the clicked point
    //   const features = map.queryRenderedFeatures(e.point, { layers: drawLayers });

    //     if (!features.length) {
    //       console.log("No feature found at clicked point.");
    //       return;
    //     }
    //   const feature = features[0];
    //   const featureId = feature.properties.id || feature.id;

    //   // If no ID exists, assign one
    //   if (!featureId) {
    //     feature.properties.id = `area-${Date.now()}`;
    //   }

    //   // Remove existing popup if any
    //   const existingPopup = document.querySelector(".mapbox-popup");
    //   if (existingPopup) existingPopup.remove();

    //   // Create form HTML for popup
    //   const popupContent = document.createElement("div");
    //   popupContent.innerHTML = `
    //     <div style="width: 200px; font-family: sans-serif;">
    //       <h4 style="margin-bottom: 8px;">Edit Area</h4>
    //       <label style="font-size: 12px;">ID:</label>
    //       <input type="text" value="${featureId}" readonly style="width: 100%; margin-bottom: 6px;" />

    //       <label style="font-size: 12px;">Name:</label>
    //       <input id="area-name" type="text" placeholder="Enter name" style="width: 100%; margin-bottom: 6px;" />

    //       <label style="font-size: 12px;">Status:</label>
    //       <select id="area-status" style="width: 100%; margin-bottom: 6px;">
    //         <option value="Active">Active</option>
    //         <option value="Inactive">Inactive</option>
    //       </select>

    //       <label style="font-size: 12px;">Priority:</label>
    //       <select id="area-priority" style="width: 100%; margin-bottom: 8px;">
    //         <option value="High">High</option>
    //         <option value="Medium">Medium</option>
    //         <option value="Low">Low</option>
    //       </select>

    //       <button id="save-area" style="width: 100%; background: #007aff; color: white; border: none; padding: 6px; cursor: pointer;">
    //         Save
    //       </button>
    //     </div>
    //   `;

    //   // Create popup
    //   const popup = new mapboxgl.Popup()
    //     .setLngLat(e.lngLat)
    //     .setDOMContent(popupContent)
    //     .addTo(map);

    //   // Save button logic
    //   popupContent.querySelector("#save-area").addEventListener("click", () => {
    //     const name = popupContent.querySelector("#area-name").value;
    //     const status = popupContent.querySelector("#area-status").value;
    //     const priority = popupContent.querySelector("#area-priority").value;

    //     console.log(`Updated Feature ${featureId}:`, { name, status, priority });

    //     // Update feature properties
    //     drawRef.current.setFeatureProperty(feature.id, "name", name);
    //     drawRef.current.setFeatureProperty(feature.id, "status", status);
    //     drawRef.current.setFeatureProperty(feature.id, "priority", priority);

    //     // Change color based on priority
    //     let color = "#00FF00"; // default green
    //     if (priority === "High") color = "#FF0000"; // red
    //     else if (priority === "Medium") color = "#FFA500"; // orange

    //     map.setPaintProperty(feature.layer.id, "fill-color", color); // for polygons
    //     map.setPaintProperty(feature.layer.id, "line-color", color); // for lines
    //     map.setPaintProperty(feature.layer.id, "circle-color", color); // for points

    //     popup.remove();
    //   });
    // };

const handleRightClick = (e) => {
  e.preventDefault();

  if (!mapRef.current || !drawRef.current) return;
  const map = mapRef.current;

  const drawLayers = [
    "gl-draw-polygon-fill-inactive",
    "gl-draw-polygon-fill-active",
    "gl-draw-line-inactive",
    "gl-draw-line-active",
    "gl-draw-point-inactive",
    "gl-draw-point-active"
  ];

  const features = map.queryRenderedFeatures(e.point, { layers: drawLayers });
  if (!features.length) {
    console.log("No feature found at clicked point.");
    return;
  }

  const feature = features[0];
  const featureId = feature.id;
  const { name = "", status = "Active", priority = "Low" } = feature.properties;

  setPopupInfo({
    featureId,
    lngLat: e.lngLat,
    name,
    status,
    priority
  });
};

  useEffect(() => {
    if (!drawRef.current) return; // Wait for draw to initialize
    const draw = drawRef.current;
    console.log(draw, drawRef)
    console.log("Draw instance after adding to map:", draw);
    console.log("Has getAll method?", typeof draw.getAll === "function");

    if (!draw.getAll) return; 
    const currentFeatures = draw.getAll();
      // Remove all shapes
    currentFeatures.features.forEach((f) => draw.delete(f.id));

    // Re-add only visible shapes
    drawnLayers
      .filter((layer) => layer.visible)
      .forEach((layer) => draw.add(layer.feature));
  }, [drawnLayers]);

  function updateDrawnLayers() {
    if (!drawRef.current) return;
    const data = drawRef.current.getAll();
    if (!data || !data.features) return; // extra safety
    const layers = data.features.map((feature, index) => ({
      id: feature.id,
      name: `Shape ${index + 1} (${feature.geometry.type})`,
      visible: true,
      feature
    }));
    setDrawnLayers(layers);

    // Extract coordinates from latest drawn/selected feature
    const latestFeature = layers[layers.length - 1]?.feature;
    if (latestFeature) {
      const coords = latestFeature.geometry.coordinates.flat(); // flatten for LineString/Polygon
      const formatted = coords.map(([lng, lat], i) => ({
        id: i + 1,
        lat: lat.toFixed(6),
        lng: lng.toFixed(6)
      }));
      onUpdateCoordinatesFromMap(formatted);
  }
  }

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // mapRef.current = new mapboxgl.Map({
    //   container: mapContainerRef.current,
    //   center: [-74.0242, 40.6941],
    //   zoom: 10.12
    // });
    const bounds = [
      [66.908235, 24.757803], // southwest corner
      [67.048491, 24.853930]  // northeast corner
    ];

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [66.978363, 24.805866], // temporary center (optional)
      // center: [-74.0242, 40.6941],
      zoom: 10 // temporary zoom (optional)
      // bounds: bounds,
      // fitBoundsOptions: { padding: 40 },
    });

    map.fitBounds(bounds, { padding: 40 });

    //  const draw = new MapboxDraw({
    //   displayControlsDefault: false,
    //   controls: {
    //     polygon: true,
    //     line_string: true,
    //     point: true,
    //     trash: true
    //   }
    // });
    // map.addControl(draw, 'top-left');

      map.on("load", () => {
        const draw = new MapboxDraw({
          displayControlsDefault: false,
          userProperties: true,// allow custom props like name, priority
          styles: [
            {
              id: "gl-draw-polygon-fill-inactive",
              type: "fill",
              paint: {
                "fill-color": [
                  "match",
                  ["get", "priority"],
                  "High", "#FF0000",
                  "Medium", "#FFA500",
                  "Low", "#00FF00",
                  "#3bb2d0" // default
                ],
                "fill-opacity": 0.5
              }
            },
            {
              id: "gl-draw-line-inactive",
              type: "line",
              paint: {
                "line-color": [
                  "match",
                  ["get", "priority"],
                  "High", "#FF0000",
                  "Medium", "#FFA500",
                  "Low", "#00FF00",
                  "#3bb2d0"
                ],
                "line-width": 2
              }
            }
          ]
        });

        map.addControl(draw);
        drawRef.current = draw;

        map.on("draw.create", updateDrawnLayers);
        map.on("draw.update", updateDrawnLayers);
        map.on("draw.delete", updateDrawnLayers);

        map.on("contextmenu", handleRightClick);map.on("contextmenu", handleRightClick);
      });

      mapRef.current = map;

      return () => {
        map.off('draw.create', updateDrawnLayers);
        map.off('draw.delete', updateDrawnLayers);
        map.off('draw.update', updateDrawnLayers);
        drawRef.current = null;  // prevent stale access
        // map.remove();
        map.off("contextmenu", handleRightClick);
        mapRef.current.remove()
      }
    }, [])


    const updateShapeColor = (map, priority) => {
      let color = "#00ff00"; // default green
      if (priority === "High") color = "#ff0000";
      else if (priority === "Medium") color = "#ffa500";
      else if (priority === "Low") color = "#00ff00";

      map.setPaintProperty("gl-draw-polygon-fill-inactive.cold", "fill-color", [
        "match",
        ["get", "priority"],
        "High",
        "#ff0000",
        "Medium",
        "#ffa500",
        "Low",
        "#00ff00",
        "#cccccc"
      ]);

      map.setPaintProperty("gl-draw-polygon-fill-active.hot", "fill-color", [
        "match",
        ["get", "priority"],
        "High",
        "#ff0000",
        "Medium",
        "#ffa500",
        "Low",
        "#00ff00",
        "#cccccc"
      ]);
    };

  
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const baseMapLayer = layers.find(l => l.id === "base-map");

    if (!baseMapLayer) return;

    if (map.isStyleLoaded()) {
      // Style is loaded, apply immediately
      if (baseMapLayer.visible) {
        map.setStyle("mapbox://styles/mapbox/streets-v11");
      } else {
        map.setStyle({
          version: 8,
          sources: {},
          layers: []
        });
      }
    } else {
      // Wait for style to load
      map.on("load", () => {
        if (baseMapLayer.visible) {
          map.setStyle("mapbox://styles/mapbox/streets-v11");
        } else {
          map.setStyle({
            version: 8,
            sources: {},
            layers: []
          });
        }
      });
    }
  }, [layers]);

  useEffect(() => {
  if (!drawRef.current) return;

  const draw = drawRef.current;

  // Clear all features before adding new ones from coordinates
  const existing = draw.getAll();
  if (existing.features.length > 0) {
    existing.features.forEach(f => draw.delete(f.id));
  }

  if (coordinates.length > 1) {
    let feature;
    if (drawingMode === "Channel") {
      feature = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinates.map(c => [parseFloat(c.lng), parseFloat(c.lat)])
        },
        properties: {}
      };
    } else if (drawingMode === "Area") {
      feature = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[...coordinates.map(c => [parseFloat(c.lng), parseFloat(c.lat)]), coordinates[0] ? [parseFloat(coordinates[0].lng), parseFloat(coordinates[0].lat)] : []]]
        },
        properties: {}
      };
    }

    if (feature) {
      draw.add(feature);
    }
  }
}, [coordinates, drawingMode]);

  const toggleLayer = (id) => {
    setLayers((prev) =>
      prev.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  return (
    <div className="h-full w-full">
       <Split
        sizes={[25, 75]}      // Initial size ratio
        minSize={200}         // Minimum size of each panel
        direction="horizontal"  // horizontal split
        gutterSize={8}        // Gutter width
        className="split-pane horizontal"
      >
        {/* LEFT SIDE: Controls + Custom Component */} 
        <Split direction="vertical"    sizes={[30, 70]}  minSize={100}  gutterSize={6}   className="split-pane vertical" >
          <LayerControls layers={layers} toggleLayer={toggleLayer} toggleDrawnLayer={toggleDrawnLayer} drawnLayers={drawnLayers} />
          <CustomComponent  draw={drawRef}  
            coordinates={coordinates}
            mineParameters={mineParameters}
            onAddCoordinate={addCoordinate}
            onRemoveCoordinate={removeCoordinate}
            onClearAllCoordinates={clearAllCoordinates}
            onUpdateCoordinate={updateCoordinate}
            onUpdateMineParameters={setMineParameters}
            onGenerateMines={generateMines}/>
        </Split>

        {/* RIGHT SIDE: Map */}
              <div id="map-container" ref={mapContainerRef}>
                {popupInfo && (
                <MapboxPopup lngLat={popupInfo.lngLat} onClose={() => setPopupInfo(null)}>
                  <EditForm
                    featureId={popupInfo.featureId}
                    initialValues={{
                      name: popupInfo.name,
                      status: popupInfo.status,
                      priority: popupInfo.priority
                    }}
                    onSave={(values) => {
                      drawRef.current.setFeatureProperty(popupInfo.featureId, "name", values.name);
                      drawRef.current.setFeatureProperty(popupInfo.featureId, "status", values.status);
                      drawRef.current.setFeatureProperty(popupInfo.featureId, "priority", values.priority);
                      setPopupInfo(null);
                    }}
                  />
                </MapboxPopup>
                )}

          {/* {console.log("Token:", MAPBOX_TOKEN)} */}
          {/* <Map
            initialViewState={{
              longitude: -74,
              latitude: 40.7,
              zoom: 9,
            }}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/streets-v11"
            // mapboxApiAccessToken={MAPBOX_TOKEN}
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Source
              id="base"
              type="geojson"
              data={{
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Polygon",
                      coordinates: [
                        [
                          [-74.1, 40.7],
                          [-73.9, 40.7],
                          [-73.9, 40.8],
                          [-74.1, 40.8],
                          [-74.1, 40.7],
                        ],
                      ],
                    },
                  },
                ],
              }}
            />

            {layers.map(
              (layer) =>
                layer.visible && (
                  <Layer
                    key={layer.id}
                    id={layer.id}
                    type="fill"
                    source="base"
                    paint={{ "fill-color": "#088", "fill-opacity": 0.5 }}
                  />
                )
            )}
          </Map> */}

        </div>
      </Split>

    </div>
  );
};

export default MapLayout;

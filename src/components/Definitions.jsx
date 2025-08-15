// // pages/DefineItems.tsx
// import React, { useState, useEffect } from "react";

// function Definitions() {
//   // State for Areas & Channels
//   const [areas, setAreas] = useState<{ id: number; name: string; length: number; breadth: number; unit: string; areaSqm: number; }[]>([]);
//   const [channels, setChannels] = useState<{ id: number; name: string; length: number; breadth: number; unit: string; areaSqm: number; }[]>([]);

//   // Form inputs
//   const [areaInput, setAreaInput] = useState({ name: "", length: 0, breadth: 0, unit: "m" });
//   const [channelInput, setChannelInput] = useState({ name: "", length: 0, breadth: 0, unit: "m"});

//   // Load from localStorage on mount
//   useEffect(() => {
//     const savedAreas = localStorage.getItem("areas");
//     const savedChannels = localStorage.getItem("channels");
//     if (savedAreas) setAreas(JSON.parse(savedAreas));
//     if (savedChannels) setChannels(JSON.parse(savedChannels));
//   }, []);

//   // Save to localStorage whenever data changes
//   useEffect(() => {
//     localStorage.setItem("areas", JSON.stringify(areas));
//   }, [areas]);

//   useEffect(() => {
//     localStorage.setItem("channels", JSON.stringify(channels)  );
//   }, [channels]);

//   // Add Area
//   const addArea = () => {
//     const areaSqm = areaInput.unit === "m"
//       ? areaInput.length * areaInput.breadth
//       : (areaInput.length * areaInput.breadth) * 0.092903; // ft² to m²

//     const newArea = {
//       id: Date.now(),
//       ...areaInput,
//       areaSqm: parseFloat(areaSqm.toFixed(2))
//     };

//     setAreas([...areas, newArea]);
//     setAreaInput({ name: "", length: 0, breadth: 0, unit: "m" });
//   };

//   // Add Channel
//   const addChannel = () => {
//       const areaSqm = areaInput.unit === "m"
//     ? areaInput.length * areaInput.breadth
//     : (areaInput.length * areaInput.breadth) * 0.092903; // ft² to m²

//     const newChannel = {
//       id: Date.now(),
//       ...channelInput,
//       areaSqm: parseFloat(areaSqm.toFixed(2))
//     };
//     setChannels([...channels, newChannel]);
//     setChannelInput({ name: "", length: 0, breadth: 0, unit: "m" });
//   };

//   return (
//     <div className="px-8 bg-[#1C1C1C] min-h-screen text-white">
//       <h2 className="text-2xl font-bold text-[#0A7CAD] mb-6">Define Areas & Channels</h2>

//       {/* AREA FORM */}
//       <div className="mb-6 p-4 bg-[#2A2A2A] rounded-lg">
//         <h3 className="text-lg font-semibold text-[#4FC3F7] mb-2">Add Area</h3>
//         <input type="text" placeholder="Name" value={areaInput.name}
//           onChange={(e) => setAreaInput({ ...areaInput, name: e.target.value })}
//           className="p-2 rounded bg-[#1C1C1C] mr-2"
//         />
//         <input type="number" placeholder="Length" value={areaInput.length}
//           onChange={(e) => setAreaInput({ ...areaInput, length: +e.target.value })}
//           className="p-2 rounded bg-[#1C1C1C] mr-2"
//         />
//         <input type="number" placeholder="Breadth" value={areaInput.breadth}
//           onChange={(e) => setAreaInput({ ...areaInput, breadth: +e.target.value })}
//           className="p-2 rounded bg-[#1C1C1C] mr-2"
//         />
//         <select value={areaInput.unit}
//           onChange={(e) => setAreaInput({ ...areaInput, unit: e.target.value })}
//           className="p-2 rounded bg-[#1C1C1C] mr-2"
//         >
//           <option value="m">Meters</option>
//           <option value="ft">Feet</option>
//         </select>
//         <button onClick={addArea} className="bg-[#0A7CAD] p-2 rounded">Add</button>
//       </div>

//       {/* AREA LIST */}
//       <div className="space-y-2 mb-8">
//         {areas.map((area) => (
//           <div key={area.id} className="bg-[#2A2A2A] p-3 rounded-lg">
//             <h4 className="text-[#4FC3F7] font-bold">{area.name}</h4>
//             <p className="text-sm text-gray-300">
//               {area.length} x {area.breadth} {area.unit} → {area.areaSqm} m²
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* CHANNEL FORM */}
//       <div className="mb-6 p-4 bg-[#2A2A2A] rounded-lg">
//         <h3 className="text-lg font-semibold text-[#4FC3F7] mb-2">Add Channel</h3>
//         <input type="text" placeholder="Name" value={channelInput.name}
//           onChange={(e) => setChannelInput({ ...channelInput, name: e.target.value })}
//           className="p-2 rounded bg-[#1C1C1C] mr-2"
//         />
//         {/* <input type="text" placeholder="Description" value={channelInput.description}
//           onChange={(e) => setChannelInput({ ...channelInput, description: e.target.value })}
//           className="p-2 rounded bg-[#1C1C1C] mr-2"
//         /> */}
//          <input type="number" placeholder="Length" value={channelInput.length}
//           onChange={(e) => setChannelInput({ ...channelInput, length: +e.target.value })}
//           className="p-2 rounded bg-[#1C1C1C] mr-2"
//         />
//         <input type="number" placeholder="Breadth" value={channelInput.breadth}
//           onChange={(e) => setChannelInput({ ...channelInput, breadth: +e.target.value })}
//           className="p-2 rounded bg-[#1C1C1C] mr-2"
//         />
//         <select value={channelInput.unit}
//           onChange={(e) => setChannelInput({ ...channelInput, unit: e.target.value })}
//           className="p-2 rounded bg-[#1C1C1C] mr-2"
//         >
//           <option value="m">Meters</option>
//           <option value="ft">Feet</option>
//         </select>
//         <button onClick={addChannel} className="bg-[#0A7CAD] p-2 rounded">Add</button>
//       </div>

//       {/* CHANNEL LIST */}
//       <div className="space-y-2">
//         {channels.map((channel) => (
//           <div key={channel.id} className="bg-[#2A2A2A] p-3 rounded-lg">
//             <h4 className="text-[#4FC3F7] font-bold">{channel.name}</h4>
//             <p className="text-sm text-gray-300">
//               {channel.length} x {channel.breadth} {channel.unit} → {channel.areaSqm} m²
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Definitions;
import React from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import AreaTable from './AreaTable';
import ChannelTable from './ChannelTable';
import FeaturesTable from './FeaturesTable';
import { useApp } from './contexts/AppContext';
import SurveyDurationMap from './SurveyDurationMap';

export default function Definitions() {
  const { state } = useApp();
  return (
    <div className="space-y-6">

      <Tabs defaultValue="features" className="w-full px-6 py-2">
        <TabsList className="grid w-full grid-cols-2">
          {/* <TabsTrigger value="areas">Areas</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger> */}
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="surveymap">Survey Duration</TabsTrigger>
        </TabsList>

        {/* <TabsContent value="areas" className="space-y-4">
          <AreaTable />
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <ChannelTable />
        </TabsContent> */}


        <TabsContent value="features" className="space-y-4">
          <FeaturesTable />
        </TabsContent>

        <TabsContent value="surveymap" className="space-y-4">
          <SurveyDurationMap
            features={state.features} // existing feature state
            ships={["Ship1", "Ship2", "Ship3"]}
            />
        </TabsContent>

      </Tabs>
    </div>
    //  <div className="flex space-x-6 px-6 py-4 min-h-screen">
    //   {/* Vertical Tabs orientation="vertical"*/}
    //   <Tabs defaultValue="features"  className="flex w-full">
    //     <TabsList className="flex flex-col w-48 space-y-2"> {/*grid w-full grid-cols-3*/}
    //       <TabsTrigger value="features">Features</TabsTrigger>
    //       <TabsTrigger value="surveymap">Survey Duration</TabsTrigger>
    //     </TabsList>

    //     <TabsContent value="features" className="flex-1">
    //       <FeaturesTable />
    //     </TabsContent>
    //     <TabsContent value="surveymap" className="flex-1">
    //       <SurveyDurationMap
    //         features={state.features} // existing feature state
    //         ships={["Ship1", "Ship2", "Ship3"]}
    //       />
    //     </TabsContent>
    //   </Tabs>
    // </div>
  );
  
}

import React, { useState, useEffect, useRef } from "react";
import orderFormSchema from "../utils/schemas/taskOrderFormSchema.json";
import UnitsSection from "./UnitsSection";
import FormFieldRenderer from "./form/FormFields";

const OrderForm = () => {
  const [activeFields, setActiveFields] = useState({}); // { sectionId: [fieldNames] }
  const [formData, setFormData] = useState({}); // { sectionId: { fieldName: value } }
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const allShips = ["Ship1", "Ship2", "Ship3"];
  const [ships, setShips] = useState([{ id: 1, selectedShip: "" }]);
const numberOfUnits = ships?.filter((s) => s.selectedShip !== "").length;


  const addShipDropdown = () => {
    if (shipSelections.length < shipOptions.length) {
      setShipSelections([...shipSelections, ""]);
    }
  };

  const handleShipChange = (index, value) => {
    const updated = ships.map((ship, i) =>
      i === index ? { ...ship, selectedShip: value } : ship
    );
    setShips(updated);
    // onChange && onChange(updated);
  };

  const addShip = () => {
    setShips([...ships, { id: ships.length + 1, selectedShip: "" }]);
  };

  // collect all selected ships to exclude them from dropdown
  const selectedShips = ships.map((s) => s.selectedShip).filter(Boolean);

  // ✅ Toggle checkbox for fields
  const toggleField = (sectionId, fieldName) => {
    setActiveFields((prev) => {
      const sectionFields = prev[sectionId] || [];
      const updatedFields = sectionFields.includes(fieldName)
        ? sectionFields.filter((f) => f !== fieldName)
        : [...sectionFields, fieldName];

      return {
        ...prev,
        [sectionId]: updatedFields,
      };
    });

    // ✅ If unchecked, remove its value from formData
    setFormData((prevData) => {
      const newSection = { ...prevData[sectionId] };
      if (activeFields[sectionId]?.includes(fieldName)) {
        delete newSection[fieldName];
      }
      return {
        ...prevData,
        [sectionId]: newSection,
      };
    });
  };

  // ✅ Handle input changes
  const handleChange = (sectionId, fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [fieldName]: value,
      },
    }));
  };

  // ✅ Handle coordinates array
  const addBetweenPoint = (sectionId) => {
    setFormData((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        betweenPoints: [
          ...(prev[sectionId]?.betweenPoints || []),
          { pointA: "", pointB: "" },
        ],
      },
    }));
  };

  const removeBetweenPoint = (sectionId, index) => {
    setFormData((prev) => {
      const points = [...(prev[sectionId]?.betweenPoints || [])];
      points.splice(index, 1);
      return {
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          betweenPoints: points,
        },
      };
    });
  };

  const handleCoordinatesChange = (sectionId, index, key, value) => {
    setFormData((prev) => {
      const points = [...(prev[sectionId]?.betweenPoints || [])];
      points[index][key] = value;
      return {
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          betweenPoints: points,
        },
      };
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  const cleanedData = {};
  for (const sectionId in formData) {
    const section = formData[sectionId];
    const nonEmpty = {};

    // Special handling for units section
    if (sectionId === "units") {
      const unitsData = {};
      let numberOfUnitsVar = numberOfUnits;

      // go through each selected ship
      ships.forEach((ship) => {
        if (ship.selectedShip) {
          const shipData = {};

          // loop over fields like "Ship1_discretion"
          Object.keys(section).forEach((key) => {
            if (key.startsWith(`${ship.selectedShip}_`)) {
              const field = key.split("_")[1]; // discretion, callSign
              const value = section[key];

              if (
                (typeof value === "string" && value.trim() !== "") ||
                typeof value === "boolean" ||
                (typeof value === "number" && !isNaN(value))
              ) {
                shipData[field] =
                  typeof value === "string" ? value.trim() : value;
              }
            }
          });

          unitsData[ship.selectedShip] = shipData;
        }
      });

      // count how many ships are filled
      numberOfUnitsVar = Object.keys(unitsData).length;
      unitsData.numberOfUnits = numberOfUnitsVar;

      cleanedData[sectionId] = unitsData;
    } else {
      // Default handling for other sections
      for (const key in section) {
        const value = section[key];
        if (
          (Array.isArray(value) && value.length > 0) ||
          (typeof value === "string" && value.trim() !== "") ||
          typeof value === "boolean" ||
          (typeof value === "number" && !isNaN(value))
        ) {
          nonEmpty[key] = value;
        }
      }
      if (Object.keys(nonEmpty).length > 0) cleanedData[sectionId] = nonEmpty;
    }
  }

  alert(JSON.stringify(cleanedData, null, 2));
  console.log("JSON Output:", cleanedData);
};

  return (
    <div className="p-6 text-white rounded-lg">
      {/* <h1 className="text-2xl font-bold mb-6">{orderFormSchema.title}</h1> */}
      <form onSubmit={handleSubmit}>

        {orderFormSchema.sections.map((section) => {  
          // console.log(section) 
          if (section.id === "units") {
                        const shipOptions =
              section.superfield?.options ||
              section.fields.find((f) => f.name === "ships")?.options ||
              [];

            return (
              <div key={section.id} className="units-section mb-6">
                <h3 className="text-lg font-semibold mb-2">{section.label}</h3>

                            {/* Ship Dropdowns + Add button */}
                <div className="mb-4">
                {ships.map((ship, index) => {
                  const availableShips = shipOptions.filter(
                    (s) => !selectedShips.includes(s) || s === ship.selectedShip
                  );

                  return (
                    <div key={ship.id} className="mb-2">
                      <label className="block mb-1">Select Ship {ship.id}</label>
                      <select
                        value={ship.selectedShip}
                        onChange={(e) => handleShipChange(index, e.target.value)}
                        className="w-full px-2 py-1 rounded text-black"
                      >
                        <option value="">-- Select Ship --</option>
                        {availableShips.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                                  {/* Per-ship inputs show when a ship is chosen */}
                
                      <div className="flex gap-4">
                        <div className="w-1/2">                {/* Render per-ship fields only when a ship is selected */}
                          {ship.selectedShip && (
                            <div className="mt-2 space-y-2">
                              {section.fields
                                .filter(
                                  (f) =>
                                    ["discretion", "callSign"].includes(f.name) 
                                  // &&  activeFields[section.id]?.includes(f.name)
                                )
                                .map((field) => {
                                                  // ✅ Text, Number, DateTime fields
                              if (
                                field.type === "text" ||
                                field.type === "number" ||
                                field.type === "datetime"
                              ) {
                                return (
                                  <div key={field.name} className="flex mb-4 items-center">
                                    <label className="block text-gray-300 mb-1 w-1/2 items-center">
                                      {field.label}
                                    </label>
                                    <input
                                      type={
                                        field.type === "datetime" ? "datetime-local" : field.type
                                      }
                                      className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#0A7CAD]"
                                      onChange={(e) =>
                                        handleChange(section.id, `${ship.selectedShip}_${field.name}`, e.target.value)
                                      }
                                    />
                                  </div>
                                );
                              }

                              // ✅ Boolean toggle fields
                              if (field.type === "boolean") {
                                return (
                                  <div
                                    key={field.name}
                                    className="mb-4 flex items-center justify-between"
                                  >
                                    <label className="text-gray-300">{field.label}</label>
                                    <div
        className="relative w-12 h-6 bg-gray-600 rounded-full cursor-pointer"
        onClick={() =>
          handleChange(
            section.id,
            `${ship.selectedShip}_${field.name}`, // ✅ prefix with ship name
            !formData[section.id]?.[`${ship.selectedShip}_${field.name}`]
          )
        }
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-all ${
            formData[section.id]?.[`${ship.selectedShip}_${field.name}`]
              ? "bg-[#0A7CAD] translate-x-6"
              : "bg-gray-400"
          }`}
        ></div>
      </div>
                                  </div>
                                );
                              }
                                            
                              })}
                            </div>
                                    )}
                          </div> 
                        </div>
                      </div>
                  );
                })}

                <button
                  type="button"
                  onClick={addShip}
                  disabled={
                    ships[ships.length - 1].selectedShip === "" ||
                    ships.length >= shipOptions.length
                  }
                  className={`mt-2 px-3 py-1 rounded ${
                    ships[ships.length - 1].selectedShip === "" ||
                    ships.length >= shipOptions.length
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  + Add Ship
                </button>
              </div>

                {/* Use activeFields like other sections */}
                <div className="flex gap-4">
                  {/* Left side: field selection (checkbox/radio) */}
            

                  {/* Right side: render active fields */}
                  <div className="w-1/2">
                    {/* Render numberOfUnits once */}
                    {activeFields[section.id]?.includes("numberOfUnits") && (
                      <div className="mt-4">
                        <label className="block mb-1">Number of Units</label>
                        <input
                          type="number"
                          // value={formData[section.id]?.numberOfUnits ?? ""}
                          // onChange={(e) =>
                          //   handleChange(section.id, "numberOfUnits", e.target.value)
                          // }
                          value={numberOfUnits}
                          readOnly
                          className="w-full px-2 py-1 rounded text-black"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }

          return(
            <div key={section.id} className="mb-3">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">
                {section.label}
              </h2>

              <div className="flex gap-4">
                {/* Dropdown for selecting fields */}
                <div className="relative mb-4  w-1/2" ref={dropdownRef}>
                  <button
                    type="button"
                    className="w-full bg-gray-700 text-white px-4 py-2 rounded flex justify-between items-center"
                    onClick={() =>
                      setOpenDropdown(openDropdown === section.id ? null : section.id)
                    }
                  >
                    {`Select Fields (${activeFields[section.id]?.length || 0})`}
                    <span>{openDropdown === section.id ? "▲" : "▼"}</span>
                  </button>

                  {openDropdown === section.id && (
                    <div className="absolute mt-2 w-full bg-gray-800 border border-gray-600 rounded shadow-lg p-2 z-10 max-h-48 overflow-y-auto">
                      {/* {section.fields.map((field) => (
                        <label
                          key={field.name}
                          className="flex items-center mb-1 text-gray-300"
                        >
                          <input
                            type="checkbox"
                            checked={
                              activeFields[section.id]?.includes(field.name) || false
                            }
                            onChange={() => toggleField(section.id, field.name)}
                            className="mr-2"
                          />
                          {field.label}
                        </label>
                      ))} */}
                      {section.fields.map((field) => {
                          const isMultiple = section.fieldtype === "multiple";
                          const isSelected = activeFields[section.id]?.includes(field.name);

                          return (
                            <label
                              key={field.name}
                              className="flex items-center mb-1 text-gray-300 cursor-pointer"
                            >
                              <input
                                type={isMultiple ? "checkbox" : "radio"}
                                name={section.id}
                                checked={isSelected}
                                onChange={() => {
                                  if (isMultiple) {
                                    // ✅ Multiple selection allowed
                                    toggleField(section.id, field.name);
                                  } else {
                                    // ✅ Single selection allowed
                                    setActiveFields((prev) => ({
                                      ...prev,
                                      [section.id]: [field.name], // only one selected
                                    }));
                                  }
                                }}
                                className="mr-2"
                              />
                              {field.label}
                            </label>
                          );
                        })}
                    </div>
                  )}
                </div>

                <div className="flex flex-col self-center px-4 w-1/2" style={{borderRadius: "4px"}}>
                  {/* Render selected fields bg-gray-600  */}
                {activeFields[section.id]?.map((fieldName) => {
                  const field = section.fields.find((f) => f.name === fieldName);
                                  // ✅ Render select fields
                  if (field.type === "select") {
                    return (
                      <div key={field.name} className="flex mb-4 items-center">
                        <label className="block text-gray-300 mb-1  w-1/2 items-center">
                          {field.label}
                        </label>
                        <select
                          multiple={field.multiSelect || false}
                          onChange={(e) => {
                            if (field.multiSelect) {
                              const selectedOptions = Array.from(
                                e.target.selectedOptions
                              ).map((opt) => opt.value);
                              handleChange(section.id, field.name, selectedOptions);
                            } else {
                              handleChange(section.id, field.name, e.target.value);
                            }
                          }}
                          className="w-full px-4 py-2 rounded bg-white text-black border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0A7CAD]"
                        >
                          {!field.multiSelect && (
                            <option value="">Select {field.label}</option>
                          )}
                          {field.options.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  }

                  // ✅ Text, Number, DateTime fields
                  if (
                    field.type === "text" ||
                    field.type === "number" ||
                    field.type === "datetime"
                  ) {
                    return (
                      <div key={field.name} className="flex mb-4 items-center">
                        <label className="block text-gray-300 mb-1 w-1/2 items-center">
                          {field.label}
                        </label>
                        <input
                          type={
                            field.type === "datetime" ? "datetime-local" : field.type
                          }
                          className="w-full px-4 py-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#0A7CAD]"
                          onChange={(e) =>
                            handleChange(section.id, field.name, e.target.value)
                          }
                        />
                      </div>
                    );
                  }

                  // ✅ Boolean toggle fields
                  if (field.type === "boolean") {
                    return (
                      <div
                        key={field.name}
                        className="mb-4 flex items-center justify-between"
                      >
                        <label className="text-gray-300">{field.label}</label>
                        <div
                          className="relative w-12 h-6 bg-gray-600 rounded-full cursor-pointer"
                          onClick={() =>
                            handleChange(
                              section.id,
                              field.name,
                              !formData[section.id]?.[field.name]
                            )
                          }
                        >
                          <div
                            className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-all ${
                              formData[section.id]?.[field.name]
                                ? "bg-[#0A7CAD] translate-x-6"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                      </div>
                    );
                  }

                  // ✅ Coordinates field
                  if (field.type === "coordinates") {
                    const points = formData[section.id]?.betweenPoints || [];
                    return (
                      <div key={field.name} className="mb-4">
                        <label className="block text-gray-300 mb-2">
                          {field.label}
                        </label>
                        {points.map((point, idx) => (
                          <div key={idx} className="flex gap-2 mb-2">
                            <input
                              type="text"
                              placeholder="Point A"
                              value={point.pointA}
                              onChange={(e) =>
                                handleCoordinatesChange(
                                  section.id,
                                  idx,
                                  "pointA",
                                  e.target.value
                                )
                              }
                              className="w-1/2 px-3 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-[#0A7CAD]"
                            />
                            <input
                              type="text"
                              placeholder="Point B"
                              value={point.pointB}
                              onChange={(e) =>
                                handleCoordinatesChange(
                                  section.id,
                                  idx,
                                  "pointB",
                                  e.target.value
                                )
                              }
                              className="w-1/2 px-3 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-[#0A7CAD]"
                            />
                            {points.length > 1 && (
                              <button
                                type="button"
                                className="text-red-400 hover:text-red-500"
                                onClick={() => removeBetweenPoint(section.id, idx)}
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addBetweenPoint(section.id)}
                          className="text-[#0A7CAD] hover:text-[#0891B2] font-semibold"
                        >
                          + Add Point
                        </button>
                      </div>
                    );
                  }

                  return null;
                })}
                </div>
              </div>
            </div>
          )
        })}
      
          <button
            type="submit"
            className="w-full bg-[#0A7CAD] hover:bg-[#0891B2] text-white font-bold py-3 rounded"
          >
            Save Form
          </button>
      </form>
    </div>
  );
};

export default OrderForm;

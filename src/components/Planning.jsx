// // // import { React, useState } from "react";

// // // function Planning() {
// // //   const data = [
// // //     { id: 1, task: 'Deploy system to server', status: 'Pending', dueDate: '2025-08-01' },
// // //     { id: 2, task: 'Create mission report', status: 'In Progress', dueDate: '2025-08-05' },
// // //     { id: 3, task: 'Data backup', status: 'Completed', dueDate: '2025-07-20' },
// // //   ];
// // //   const [plandescription, setPlandescription] = useState("")
// // //   const [year, setYear] = useState("")
// // //   return (
// // //     <div className="px-8 text-white bg-[#1C1C1C] min-h-screen">
// // //       <h2 className="text-2xl font-bold text-[#0A7CAD] mb-6">Planning Overview</h2>

// // //       <label>
// // //       Plan Description
// // //       <input
// // //         type="text"
// // //         placeholder="Name"
// // //         value={plandescription}
// // //         onChange={(e) => setPlandescription(e.target.value)}
// // //       />
// // //     </label>

// // //     <label>
// // //       Year
// // //       <input
// // //         type="number"
// // //         placeholder="Year"
// // //         value={year}
// // //         onChange={(e) => setYear(e.target.value)}
// // //       />
// // //     </label>
// // //       <div className="overflow-x-auto">
// // //         <table className="min-w-full bg-[#2A2A2A] rounded-lg shadow-md">
// // //           <thead>
// // //             <tr className="text-left border-b border-gray-600">
// // //               <th className="py-3 px-4">#</th>
// // //               <th className="py-3 px-4">Task</th>
// // //               <th className="py-3 px-4">Status</th>
// // //               <th className="py-3 px-4">Due Date</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {data.map((row) => (
// // //               <tr key={row.id} className="hover:bg-[#383838] transition">
// // //                 <td className="py-3 px-4">{row.id}</td>
// // //                 <td className="py-3 px-4">{row.task}</td>
// // //                 <td className="py-3 px-4">
// // //                   <span
// // //                     className={`px-2 py-1 rounded text-sm font-semibold ${
// // //                       row.status === 'Completed'
// // //                         ? 'bg-green-600 text-white'
// // //                         : row.status === 'In Progress'
// // //                         ? 'bg-yellow-500 text-black'
// // //                         : 'bg-red-500 text-white'
// // //                     }`}
// // //                   >
// // //                     {row.status}
// // //                   </span>
// // //                 </td>
// // //                 <td className="py-3 px-4">{row.dueDate}</td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // export default Planning;
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApp } from "./contexts/AppContext";
import { Plus, ArrowLeft } from "lucide-react";

const surveyDurationMap = {
  "Main Area": {
    ship1: "300 hours",
    ship2: "850 hours",
    ship3: "1400 hours"
  },
  "Channel 1": {
    ship1: "2120 hours",
    ship2: "1200 hours",
    ship3: "560 hours"
  },
  "Channel 2": {
    ship1: "300 hours",
    ship2: "850 hours",
    ship3: "1400 hours"
  },
  "Alpha": {
    ship1: "300 hours",
    ship2: "850 hours",
    ship3: "1400 hours"
  },
  "Bravo": {
    ship1: "300 hours",
    ship2: "850 hours",
    ship3: "1400 hours"
  },
  "Charlie": {
    ship1: "2120 hours",
    ship2: "1200 hours",
    ship3: "560 hours"
  }
};

export default function Planning() {
  const { state, addPlan, addPlanRecord } = useApp();

  const [currentView, setCurrentView] = useState("periods");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);

  const [planFormData, setPlanFormData] = useState({
    period: "",
    description: "",
  });

  const [recordFormData, setRecordFormData] = useState({
    operation: "",
    itemId: "",
    startDate: "",
    endDate: "",
    ship: "",
    surveyDuration: "",
  })
  const [selectedUnits, setSelectedUnits] = useState({}); // { [recordId]: "meters" }

const handleUnitChange = (recordId, unit) => {
  console.log("handleUnitChange",recordId,unit)
  setSelectedUnits((prev) => ({
    ...prev,
    [recordId]: unit
  }));
};

  const convertValue = (valueInMeters, unit) => {
    if (unit === "meters") return valueInMeters;
    if (unit === "nautical miles") return valueInMeters / 1852;
    return valueInMeters;
  };

  const NM_IN_M = 1852;

  const convertBetweenUnits = (val, fromUnit, toUnit) => {
    console.log(val, fromUnit, toUnit)
    if (fromUnit === toUnit) return val;
    if (fromUnit === "meters" && toUnit === "nautical miles") return val / NM_IN_M;
    if (fromUnit === "nautical miles" && toUnit === "meters") return val * NM_IN_M;
    console.log(val , "retrun")
    return val; // fallback
  };

  useEffect(() => {
    if (recordFormData.itemId && recordFormData.ship) {

      const selectedArea = state.features.find((f) => f.name === String(recordFormData.itemId))?.name;

      // console.log("itemId", recordFormData.itemId, "ship", recordFormData.ship)    
      // state.features.map((f) => console.log(f) )
      // console.log("recordFormData", recordFormData) 
      // console.log("Selected Area:", selectedArea, surveyDurationMap[selectedArea]);

      if (selectedArea && surveyDurationMap[selectedArea]) {

        const duration = surveyDurationMap[selectedArea][recordFormData.ship];
          console.log("duration",  duration)
          setRecordFormData((prev) => ({
            ...prev,
            surveyDuration: duration || "",
          }));
      } else {
        setRecordFormData((prev) => ({ ...prev, surveyDuration: "" }));
      }
    }
  }, [recordFormData.itemId, recordFormData.ship, state.features]);

  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (planFormData.period && planFormData.description) {
      addPlan({
        period: planFormData.period,
        description: planFormData.description,
        records: [],
      });
      setPlanFormData({ period: "", description: "" });
      setIsDialogOpen(false);
    }
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (
      selectedPlan &&
      recordFormData.operation &&
      recordFormData.itemId &&
      recordFormData.startDate &&
      recordFormData.endDate &&
      recordFormData.ship
    ) {
      console.log(state)
      // const selectedFeature = state.features.find(
      //   (f) => f.id === recordFormData.itemId
      // );

      const selectedFeature = state.features.find(
        (f) => f.name === String(recordFormData.itemId)
          // (f) => f.itemId === recordFormData.itemId
      );
      if (!selectedFeature) {
        console.error("Feature not found for ID:", recordFormData.itemId);
        return;
      }

      const dimensions = `${selectedFeature.length} x ${selectedFeature.breadth} ${selectedFeature.unit}`;
      const areaInSqm = selectedFeature.areaInSqm;

      addPlanRecord(selectedPlan, {
        id: `record_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        operation: recordFormData.operation,
        itemId: recordFormData.itemId,
        itemName: selectedFeature.name,
        dimensions,
        areaInSqm,
        startDate: recordFormData.startDate,
        endDate: recordFormData.endDate,
        ship: recordFormData.ship,
        surveyDuration: recordFormData.surveyDuration,
        unit: selectedFeature.unit 
      });

      setRecordFormData({
        operation: "",
        itemId: "",
        startDate: "",
        endDate: "",
        ship: "",
        surveyDuration: "",
        unit: ""
      });
      setIsRecordDialogOpen(false);
    }
  };

  const handlePlanClick = (planId) => {
    setSelectedPlan(planId);
    setCurrentView("plan");
  };

  const currentPlan = selectedPlan
    ? state.plans.find((p) => p.id === selectedPlan)
    : null;

  const availableFeatures = state.features.filter(
    (f) => f.type.toLowerCase() === recordFormData.operation.toLowerCase()
  );

  if (currentView === "periods") {
    return (
      <div className="space-y-6 px-6">
           <div className="flex items-center gap-4 ">
          <h1 className="text-white text-lg font-semibold whitespace-nowrap">
            Yearly Plan
          </h1>
          <div className="w-full h-[2px] bg-blue-400"></div>
        </div>
        <div className="flex justify-between items-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className={"bg-white text-black"}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Plan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Plan</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreatePlan} className="space-y-4">
                <div>
                  <Label htmlFor="period">Period</Label>
                  <Input
                    id="period"
                    value={planFormData.period}
                    onChange={(e) =>
                      setPlanFormData({ ...planFormData, period: e.target.value })
                    }
                    placeholder="e.g., 2024 Q1, January 2024"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={planFormData.description}
                    onChange={(e) =>
                      setPlanFormData({
                        ...planFormData,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter plan description"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Plan</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {state.plans.map((plan) => (
            <Card
              key={plan.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handlePlanClick(plan.id)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{plan.period}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">{plan.description}</p>
                <p className="text-sm text-muted-foreground">
                  {plan.records.length} record
                  {plan.records.length !== 1 ? "s" : ""}
                </p>
              </CardContent>
            </Card>
          ))}
          {state.plans.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  No plans created yet. Click "Create New Plan" to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (

    <div className="space-y-6 px-6">
        <div className="flex items-center gap-4 ">
          <h1 className="text-white text-lg font-semibold whitespace-nowrap">
            Yearly Plan
          </h1>
          <div className="w-full h-[2px] bg-blue-400"></div>
        </div>
      <div className="flex items-center justify-between">
         
        <div className="flex items-center space-x-4">
          <Button
            // variant="outline"
            size="sm"
            className="flex items-center gap-2 px-4 py-1 bg-[#0A7CAD] text-white rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm"
            onClick={() => setCurrentView("periods")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Periods
          </Button>
          <div>
            
            <h2 className="text-2xl font-bold">{currentPlan?.period}</h2>
            <p className="text-muted-foreground">{currentPlan?.description}</p>
          </div>
        </div>
        <Dialog open={isRecordDialogOpen} onOpenChange={setIsRecordDialogOpen}>
          <DialogTrigger asChild>
            <Button className={"bg-white text-black"}>
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Plan Record</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddRecord} className="space-y-4">
              <div>
                <Label htmlFor="operation">Operation</Label>
                <Select
                  value={recordFormData.operation}
                  onValueChange={(value) =>
                    setRecordFormData({
                      ...recordFormData,
                      operation: value,
                      itemId: "",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select operation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="channel">Channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {recordFormData.operation && (
                <div>
                  <Label htmlFor="item">Select {recordFormData.operation}</Label>
                  <Select
                    value={recordFormData.itemId}
                    onValueChange={(value) =>
                      setRecordFormData({ ...recordFormData, itemId: value })
                    }
                      //  value={recordFormData.itemId ? Number(recordFormData.itemId) : undefined}
                      // onChange={(value) => setRecordFormData({ ...recordFormData, itemId: Number(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableFeatures.map((feature) => (
                        <SelectItem key={feature.id} value={feature.name}>
                          {/* {console.log(feature)} */}
                          {feature.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="ship">Ship</Label>
                <Select
                  value={recordFormData.ship}
                  onValueChange={(value) =>
                    setRecordFormData({ ...recordFormData, ship: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ship1">Ship 1</SelectItem>
                    <SelectItem value="ship2">Ship 2</SelectItem>
                    <SelectItem value="ship3">Ship 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={recordFormData.startDate}
                  onChange={(e) =>
                    setRecordFormData({
                      ...recordFormData,
                      startDate: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={recordFormData.endDate}
                  onChange={(e) =>
                    setRecordFormData({
                      ...recordFormData,
                      endDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsRecordDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Record</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Planned Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Operation</TableHead>
                <TableHead className="w-32">Item</TableHead>
                <TableHead className="w-32">Dimensions</TableHead>
                <TableHead className="w-32">Area (sqm)</TableHead>
                <TableHead className="w-32">Ship</TableHead>
                <TableHead className="w-32">Survey Duration</TableHead>
                <TableHead className="w-32">Start Date</TableHead>
                <TableHead className="w-32">End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPlan?.records.map((record) => {
                 const parseDimensions = (dimString) => {
                  if (!dimString) return { length: 0, breadth: 0 };
                  const match = dimString.match(/([\d.]+)\s*x\s*([\d.]+)/);
                  if (!match) return { length: 0, breadth: 0 };
                  return { length: parseFloat(match[1]), breadth: parseFloat(match[2]) };
                }

                const { length, breadth } = parseDimensions(record.dimensions);
                const unit = selectedUnits[record.id] || record.unit || "meters";

                return (
                <TableRow key={record.id}>
                  <TableCell className="capitalize">
                    {record.operation}
                  </TableCell>
                  <TableCell>{record.itemName}</TableCell>
                  {/* <TableCell>{record.dimensions || "-"}</TableCell> */}
                   <TableCell>
                    <div className="flex items-center gap-4">
                      {/* {selectedUnits[record.id]
                        ? `${convertValue(length, selectedUnits[record.id]).toFixed(2)} x ${convertValue(breadth, selectedUnits[record.id]).toFixed(2)}`
                        : `${length} x ${breadth}`}  */}
                       {/* {selectedUnits[record.id]
                        ? `${convertValue(length, unit).toFixed(2)} x ${convertValue(breadth,unit).toFixed(2)}`
                        : `${length.toFixed(2)} x ${breadth.toFixed(2)}`} 
                             {  console.log(selectedUnits[record.id])} */}
                          < div className="w-40">
                             {(() => {
                              const originalUnit = record.unit || "meters";
                              const displayUnit = selectedUnits[record.id] || originalUnit;

                              // If user hasn't changed the unit, show original numbers
                              const showLength =
                                selectedUnits[record.id]
                                  ? convertBetweenUnits(length, originalUnit, displayUnit)
                                  : length;

                              const showBreadth =
                                selectedUnits[record.id]
                                  ? convertBetweenUnits(breadth, originalUnit, displayUnit)
                                  : breadth;

                              return `${showLength.toFixed(2)} x ${showBreadth.toFixed(2)}`;
                            })()}
                          </div>
                          < div className="w-40">
                      <Select
                         value={selectedUnits[record.id] || record.unit || unit}
                        // value={unit}
                        onValueChange={(value) => handleUnitChange(record.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meters">Meters</SelectItem>
                          <SelectItem value="nautical miles">Nautical Miles</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {record.areaInSqm ? record.areaInSqm.toFixed(2) : "-"}
                  </TableCell>
                  <TableCell className="capitalize">{record.ship}</TableCell>
                  <TableCell >{record.surveyDuration}</TableCell>
                  <TableCell>{record.startDate}</TableCell>
                  <TableCell>{record.endDate}</TableCell>
                </TableRow>
              );
              })}
              {(!currentPlan?.records || currentPlan.records.length === 0) && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground"
                  >
                    No records added yet. Click "Add Record" to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

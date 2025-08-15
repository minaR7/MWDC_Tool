import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useApp } from "./contexts/AppContext";

const SurveyDurationMap = ({ features, ships }) => {
  const [durationMap, setDurationMap] = useState({});

  // Prepare table data based on features and ships
  const tableData = features.map((feature) => {
    const featureDurations = durationMap[feature.name] || {};
    return {
      feature: feature.name,
      durations: ships.reduce((acc, ship) => {
        acc[ship] = featureDurations[ship] || "";
        return acc;
      }, {}),
    };
  });

  const handleDurationChange = (featureName, ship, value) => {
    setDurationMap((prev) => ({
      ...prev,
      [featureName]: {
        ...prev[featureName],
        [ship]: value,
      },
    }));
  };

  const handleSave = () => {
    console.log("Survey Duration Map:", durationMap);
    // Optionally dispatch to context or backend here
  };

  return (
    // <div className="space-y-4">
    //   <h3 className="text-lg font-semibold">Survey Duration Map</h3>
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Survey Duration Map</CardTitle>
        </CardHeader>

        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-40">Feature</TableHead>
                    {ships.map((ship) => (
                    <TableHead key={ship}>{ship}</TableHead>
                    ))}
                </TableRow>
                </TableHeader>
                <TableBody>
                {tableData.map((row) => (
                    <TableRow key={row.feature}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    {ships.map((ship) => (
                        <TableCell key={ship}>
                        <Input
                            type="number"
                            min={0}
                            value={row.durations[ship]}
                            onChange={(e) =>
                            handleDurationChange(row.feature, ship, e.target.value)
                            }
                            className="w-24"
                        />
                        </TableCell>
                    ))}
                    </TableRow>
                ))}
                </TableBody>
            </Table>

            <Button onClick={handleSave}>Save Durations</Button>
      </CardContent>
    </Card>
  );
};

export default SurveyDurationMap;

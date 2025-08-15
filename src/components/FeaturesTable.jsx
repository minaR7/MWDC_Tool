import React, { useState, useEffect, useContext } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useApp } from './contexts/AppContext';
import { Plus } from 'lucide-react';

const predefinedFeatures = [
  {
    id: 1,
    name: 'Main Area',
    type: 'area',
    coordinates: '0,0,100,100',
    length: 1000,
    breadth: 1800,
    unit: 'meters',
    areaInSqm: 10000,
  },
  {
    id: 2,
    name: 'Channel 1',
    type: 'channel',
    coordinates: '10,10,50,50',
    length: 400,
    breadth: 840,
    unit: 'meters',
    areaInSqm: 1600,
  },
  {
    id: 3,
    name: 'Channel 2',
    type: 'channel',
    coordinates: '10,10,50,50',
    length: 2300,
    breadth: 4000,
    unit: 'meters',
    areaInSqm: 1600,
  },
  {
    id: 4,
    name: 'Alpha',
    type: 'area',
    coordinates: '10,10,50,50',
    length: 6300,
    breadth: 4967,
    unit: 'meters',
    areaInSqm: 1600,
  },
  {
    id: 5,
    name: 'Bravo',
    type: 'area',
    coordinates: '10,10,50,50',
    length: 26,
    breadth: 12,
    unit: 'nautical miles',
    areaInSqm: 1600,
  },
  {
    id: 6,
    name: 'Charlie',
    type: 'area',
    coordinates: '10,10,50,50',
    length: 20,
    breadth: 32,
    unit: 'nautical miles',
    areaInSqm: 1600,
  },
];


export default function FeaturesTable() {
    const { state, addFeature } = useApp();
  const [features, setFeatures] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'Area', // default type
    length: '',
    breadth: '',
    unit: 'meters',
    coordinates: '',
  });

    // Load from localStorage or use predefined features
    useEffect(() => {
      const NM_IN_M = 1852;

      const updatedFeatures = predefinedFeatures.map((feature) => {
        let lengthInMeters = feature.length;
        let breadthInMeters = feature.breadth;

        // Convert length and breadth to meters if original unit is nautical miles
        if (feature.unit === 'nautical miles') {
          lengthInMeters *= NM_IN_M;
          breadthInMeters *= NM_IN_M;
        }

        // Calculate area in square meters
        const areaInSqm = lengthInMeters * breadthInMeters;

        return {
          ...feature,
          areaInSqm: parseFloat(areaInSqm.toFixed(2)), // always in m²
        };
      });
      // Save to localStorage
      localStorage.setItem('features', JSON.stringify(updatedFeatures));
      // addFeature(predefinedFeatures);
        //   // predefinedFeatures.forEach(feature => addFeature(feature));
      const saved = localStorage.getItem('features');
      if (saved) {
        setFeatures(JSON.parse(saved));
      } else {
        // Set state
        // setFeatures(predefinedFeatures);
        setFeatures(updatedFeatures);
      }
    }, []);


  // Save to localStorage whenever features change
  useEffect(() => {
    localStorage.setItem('features', JSON.stringify(features));
  }, [features]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.type && formData.length && formData.breadth) {
      const areaInSqm =
        formData.unit === 'meters'
          ? parseFloat(formData.length) * parseFloat(formData.breadth)
          : parseFloat(formData.length) * parseFloat(formData.breadth) * 0.092903; // feet² to m²

      const newFeature = {
        id: Date.now(),
        ...formData,
        length: parseFloat(formData.length),
        breadth: parseFloat(formData.breadth),
        areaInSqm: parseFloat(areaInSqm.toFixed(2)),
      };

      setFeatures([...features, newFeature]);
        addFeature(newFeature); // ✅ add to context
      setFormData({ name: '', type: 'Area', length: '', breadth: '', unit: 'meters', coordinates: '' });
      setIsDialogOpen(false);
    }
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.name && formData.length && formData.breadth && formData.coordinates) {
//       addFeature({
//         ...formData,
//         length: parseFloat(formData.length),
//         breadth: parseFloat(formData.breadth),
//       });
//       setFormData({
//         name: '',
//         length: '',
//         breadth: '',
//         unit: 'meters',
//         type: 'area',
//         coordinates: '',
//       });
//       setIsDialogOpen(false);
//     }
//   };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Features</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Feature
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Feature</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter feature name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="type">Feature Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="channel">Channel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="coordinates">Bounding Box</Label>
                <Input
                  id="coordinates"
                  value={formData.coordinates}
                  onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                  placeholder="e.g., [x1,y1,x2,y2]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="length">Length</Label>
                <Input
                  id="length"
                  type="number"
                  step="0.01"
                  value={formData.length}
                  onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                  placeholder="Enter length"
                  required
                />
              </div>

              <div>
                <Label htmlFor="breadth">Breadth</Label>
                <Input
                  id="breadth"
                  type="number"
                  step="0.01"
                  value={formData.breadth}
                  onChange={(e) => setFormData({ ...formData, breadth: e.target.value })}
                  placeholder="Enter breadth"
                  required
                />
              </div>

              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => setFormData({ ...formData, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="nautical miles">Nautical Mile</SelectItem>
                    {/* <SelectItem value="yards">Yards</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Feature</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Coordinates</TableHead>
              <TableHead>Length</TableHead>
              <TableHead>Breadth</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Area (sqm)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.features.map((feature) => (
              <TableRow key={feature.id}>
                <TableCell>{feature.name}</TableCell>
                <TableCell className="capitalize">{feature.type}</TableCell>
                <TableCell>{feature.coordinates}</TableCell>
                <TableCell>{feature.length}</TableCell>
                <TableCell>{feature.breadth}</TableCell>
                <TableCell className="capitalize">{feature.unit}</TableCell>
                <TableCell>{feature.areaInSqm?.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {state.features.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  No features defined yet. Click "Add Feature" to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

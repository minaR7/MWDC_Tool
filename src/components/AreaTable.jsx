import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useApp } from './contexts/AppContext';
import { Plus } from 'lucide-react';

export default function AreaTable() {
  const { state, addArea } = useApp();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    length: '',
    breadth: '',
    unit: 'meters',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.length && formData.breadth) {
      addArea({
        name: formData.name,
        length: parseFloat(formData.length),
        breadth: parseFloat(formData.breadth),
        unit: formData.unit,
      });
      setFormData({ name: '', length: '', breadth: '', unit: 'meters' });
      setIsDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Areas</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Area
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Area</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="areaName">Name</Label>
                <Input
                  id="areaName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter area name"
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
                <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="feet">Feet</SelectItem>
                    <SelectItem value="yards">Yards</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Area</Button>
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
              <TableHead>Length</TableHead>
              <TableHead>Breadth</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Area (sqm)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {state.areas.map((area) => (
              <TableRow key={area.id}>
                <TableCell className="font-medium">{area.name}</TableCell>
                <TableCell>{area.length}</TableCell>
                <TableCell>{area.breadth}</TableCell>
                <TableCell>{area.unit}</TableCell>
                <TableCell>{area.areaInSqm.toFixed(2)}</TableCell>
              </TableRow>
            ))}
            {state.areas.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  No areas defined yet. Click "Add Area" to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

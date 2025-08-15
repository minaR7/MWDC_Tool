import React, { useState } from 'react';
// import { Button } from '../ui/button';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useApp } from './contexts/AppContext';
import { Plus } from 'lucide-react';

export default function ChannelTable() {
  const { state, addChannel } = useApp();
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
      addChannel({
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
        <CardTitle>Channels</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Channel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Channel</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="channelName">Name</Label>
                <Input
                  id="channelName"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter channel name"
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
                <Button type="submit">Add Channel</Button>
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
              {state.channels.map((channel) => (
                <TableRow key={channel.id}>
                  <TableCell className="font-medium">{channel.name}</TableCell>
                  <TableCell>{channel.length}</TableCell>
                  <TableCell>{channel.breadth}</TableCell>
                  <TableCell>{channel.unit}</TableCell>
                  <TableCell>{channel.areaInSqm.toFixed(2)}</TableCell>
                </TableRow>
              ))}
              {state.channels.length === 0 && (
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

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MainNav } from "@/components/main-nav";
import { UserNav } from "@/components/user-nav";
import {
  Search,
  Filter,
  SortAsc,
  Settings,
  Share2,
  Download,
  Trash2,
  Plus,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Column {
  id: string;
  name: string;
}

interface EvaluationRow {
  id: number;
  timestamp: string;
  [key: string]: string | number;
}

export default function DataTablePage() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [columns, setColumns] = useState<Column[]>([
    { id: "inputColumn", name: "Input Column" },
    { id: "actionColumn", name: "Action Column" },
    { id: "enrichCompany", name: "Enrich Company" },
  ]);
  const [data, setData] = useState<EvaluationRow[]>([
    {
      id: 1,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      inputColumn: "Cell 1",
      actionColumn: "Bitscale Evaluation - Account relevancy check",
      enrichCompany: "Bitscale",
    },
    {
      id: 2,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      inputColumn: "Cell data size exceeds limit",
      actionColumn: "BMW Evaluation - Relevancy check",
      enrichCompany: "BMW",
    },
    {
      id: 3,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      inputColumn: "https://www.linkedin.com/bitScale",
      actionColumn: "Google Evaluation - Lilevancy check",
      enrichCompany: "Google",
    },
    {
      id: 4,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      inputColumn: "Loading data, Please wait",
      actionColumn: "Apple Evaluation - Olivancy check",
      enrichCompany: "Apple",
    },
    {
      id: 5,
      timestamp: "Oct 12, 2024 at 14:08 PM",
      inputColumn: "Loading data, Please wait",
      actionColumn: "Figma Evaluation - Evancy check",
      enrichCompany: "Figma",
    },
  ]);
  const [newRow, setNewRow] = useState<Partial<EvaluationRow>>({});
  const [isAddingRow, setIsAddingRow] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");

  const handleAddRow = () => {
    if (Object.keys(newRow).length > 0) {
      setData([
        ...data,
        {
          id: data.length + 1,
          timestamp: new Date().toLocaleString(),
          ...newRow,
        },
      ]);
      setNewRow({});
      setIsAddingRow(false);
    }
  };

  const handleAddColumn = () => {
    if (newColumnName) {
      const newColumnId = newColumnName.toLowerCase().replace(/\s+/g, "");
      setColumns([...columns, { id: newColumnId, name: newColumnName }]);
      setData(data.map((row) => ({ ...row, [newColumnId]: "" })));
      setNewColumnName("");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b px-2 py-4">
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </Button>
          </SidebarHeader>
          <SidebarContent>
            <MainNav isCollapsed={isCollapsed} />
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 gap-4">
              <SidebarTrigger />
              <Input placeholder="Name of the file" className="max-w-[240px]" />
              <div className="ml-auto flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch />
                  <span className="text-sm font-medium">Auto Save</span>
                </div>
                <UserNav />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-t">
              <div className="flex flex-wrap items-center gap-2 flex-1">
                <div className="relative max-w-[240px]">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
                <Select defaultValue="1/1">
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Row View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1/1">1/1 Row</SelectItem>
                    <SelectItem value="3/3">3/3 Column</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SortAsc className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <div className="relative group inline-block">
                    <Sparkles className="h-4 w-4" />
                    <span className="sr-only">Enrich</span>
                    <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gray-800 text-white text-sm rounded px-2 py-1 shadow-lg">
                      Enrich
                    </div>
                  </div>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="p-4 overflow-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="h-4 w-4" />
                      Time
                    </div>
                  </TableHead>
                  {columns.map((column) => (
                    <TableHead key={column.id}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-purple-100 text-purple-800 w-6 h-6 flex items-center justify-center rounded">
                            {column.name[0].toUpperCase()}
                          </span>
                          {column.name}
                        </div>
                      </div>
                    </TableHead>
                  ))}
                  <TableHead>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Column
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Column</DialogTitle>
                          <DialogDescription>
                            Enter the name for your new column.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={newColumnName}
                              onChange={(e) => setNewColumnName(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handleAddColumn}>Add Column</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.timestamp}</TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.id}>{row[column.id]}</TableCell>
                    ))}
                  </TableRow>
                ))}
                {isAddingRow && (
                  <TableRow>
                    <TableCell>New</TableCell>
                    <TableCell>{new Date().toLocaleString()}</TableCell>
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        <Input
                          placeholder={column.name}
                          value={newRow[column.id] || ""}
                          onChange={(e) =>
                            setNewRow({
                              ...newRow,
                              [column.id]: e.target.value,
                            })
                          }
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={columns.length + 3}>
                    {isAddingRow ? (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={handleAddRow}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Save Row
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsAddingRow(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsAddingRow(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Row
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

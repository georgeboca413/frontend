"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X, Calendar, Target, MapPin, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addOperationSchema, type AddOperationFormData } from "./schemas/add-operation-schema";

// Helper functions for generating default values
const generateOperationId = () => {
  const prefixes = ["OP-ALPHA", "OP-BETA", "OP-GAMMA", "OP-DELTA", "OP-OMEGA", "OP-SIGMA", "OP-THETA"];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomNumber = Math.floor(Math.random() * 999) + 1;
  return `${randomPrefix}-${randomNumber.toString().padStart(3, "0")}`;
};

const generateOperationName = () => {
  const adjectives = ["SHADOW", "CRIMSON", "SILENT", "STEEL", "PHANTOM", "ARCTIC", "STORM", "VIPER"];
  const nouns = ["PROTOCOL", "SENTINEL", "GUARDIAN", "NEXUS", "CIPHER", "VERTEX", "MATRIX", "FORGE"];
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
};

const getDefaultStartDate = () => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // Adjust for timezone
  return now.toISOString().slice(0, 16); // Format for datetime-local input
};

const getDefaultEndDate = () => {
  const future = new Date();
  future.setDate(future.getDate() + 7); // Default to 1 week from now
  future.setMinutes(future.getMinutes() - future.getTimezoneOffset()); // Adjust for timezone
  return future.toISOString().slice(0, 16); // Format for datetime-local input
};

const getDefaultLocation = () => {
  const locations = [
    "Eastern Europe",
    "Southeast Asia",
    "Northern Africa",
    "Central America",
    "Western Pacific",
    "Mediterranean Basin",
    "Arctic Circle",
    "Sub-Saharan Africa",
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

const getDefaultDescription = () => {
  return "Classified mission requiring tactical coordination and strategic intelligence gathering. All operational parameters subject to field commander discretion.";
};

const getDefaultObjectives = () => {
  const defaultObjectives = [
    {
      title: "Establish operational perimeter",
      description: "Secure designated area and establish communication protocols",
    },
    { title: "Gather intelligence", description: "Collect and analyze target intelligence data" },
    { title: "Complete mission objectives", description: "Execute primary mission parameters as briefed" },
  ];
  return [defaultObjectives[0]]; // Start with one objective, user can add more
};

interface AddOperationModalProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

interface AddOperationModalProps {
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

export function AddOperationModal({ onSuccess, trigger }: AddOperationModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AddOperationFormData>({
    resolver: zodResolver(addOperationSchema),
    defaultValues: {
      operationId: generateOperationId(),
      name: generateOperationName(),
      status: "planning",
      priority: "medium",
      location: getDefaultLocation(),
      description: getDefaultDescription(),
      startDate: getDefaultStartDate(),
      estimatedCompletion: getDefaultEndDate(),
      objectives: getDefaultObjectives(),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "objectives",
  });

  const onSubmit = async (data: AddOperationFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/operations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          startDate: new Date(data.startDate).toISOString(),
          estimatedCompletion: new Date(data.estimatedCompletion).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create operation");
      }

      const result = await response.json();

      // Reset form
      form.reset();
      setOpen(false);

      // Call success callback
      onSuccess?.();
    } catch (error) {
      console.error("Error creating operation:", error);
      // You could add toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "planning":
        return "bg-blue-500/20 text-blue-400";
      case "completed":
        return "bg-gray-500/20 text-gray-400";
      case "compromised":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400";
      case "high":
        return "bg-orange-500/20 text-orange-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Operation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 border border-orange-500/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white tracking-wider flex items-center">
            <Target className="w-5 h-5 mr-2 text-orange-500" />
            CREATE NEW OPERATION
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-white text-sm font-medium tracking-wider">
                  OPERATION DETAILS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="operationId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xs font-medium tracking-wider">
                          OPERATION ID
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="OP-OMEGA-001"
                            className="bg-black/50 border-neutral-600 text-white placeholder:text-neutral-500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs text-neutral-400">
                          Format: OP-[CODE]-[NUMBER]
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xs font-medium tracking-wider">
                          OPERATION NAME
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="SHADOW PROTOCOL"
                            className="bg-black/50 border-neutral-600 text-white placeholder:text-neutral-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xs font-medium tracking-wider">
                          STATUS
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-neutral-600 text-white">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-neutral-900 border-neutral-700">
                            <SelectItem value="planning">
                              <div className="flex items-center">
                                <Badge className={getStatusColor("planning")} variant="secondary">
                                  Planning
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="active">
                              <div className="flex items-center">
                                <Badge className={getStatusColor("active")} variant="secondary">
                                  Active
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="completed">
                              <div className="flex items-center">
                                <Badge className={getStatusColor("completed")} variant="secondary">
                                  Completed
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="compromised">
                              <div className="flex items-center">
                                <Badge className={getStatusColor("compromised")} variant="secondary">
                                  Compromised
                                </Badge>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xs font-medium tracking-wider">
                          PRIORITY
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/50 border-neutral-600 text-white">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-neutral-900 border-neutral-700">
                            <SelectItem value="low">
                              <div className="flex items-center">
                                <Badge className={getPriorityColor("low")} variant="secondary">
                                  Low
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="medium">
                              <div className="flex items-center">
                                <Badge className={getPriorityColor("medium")} variant="secondary">
                                  Medium
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="high">
                              <div className="flex items-center">
                                <Badge className={getPriorityColor("high")} variant="secondary">
                                  High
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="critical">
                              <div className="flex items-center">
                                <Badge className={getPriorityColor("critical")} variant="secondary">
                                  Critical
                                </Badge>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-xs font-medium tracking-wider flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        LOCATION
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Eastern Europe"
                          className="bg-black/50 border-neutral-600 text-white placeholder:text-neutral-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white text-xs font-medium tracking-wider">
                        DESCRIPTION
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Detailed operation description..."
                          className="bg-black/50 border-neutral-600 text-white placeholder:text-neutral-500 min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-white text-sm font-medium tracking-wider flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  TIMELINE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xs font-medium tracking-wider">
                          START DATE
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="bg-black/50 border-neutral-600 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="estimatedCompletion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white text-xs font-medium tracking-wider">
                          ESTIMATED COMPLETION
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            className="bg-black/50 border-neutral-600 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Objectives */}
            <Card className="bg-neutral-900/50 border-neutral-700">
              <CardHeader>
                <CardTitle className="text-white text-sm font-medium tracking-wider flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    OBJECTIVES
                  </div>
                  <Button
                    type="button"
                    onClick={() => append({ title: "", description: "" })}
                    variant="outline"
                    size="sm"
                    className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Objective
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="space-y-3 p-3 bg-black/30 rounded border border-neutral-700">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-medium text-white tracking-wider">OBJECTIVE {index + 1}</h4>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => remove(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>

                    <FormField
                      control={form.control}
                      name={`objectives.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-xs font-medium tracking-wider">
                            TITLE
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Locate and secure target"
                              className="bg-black/50 border-neutral-600 text-white placeholder:text-neutral-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`objectives.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white text-xs font-medium tracking-wider">
                            DESCRIPTION (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Detailed objective description..."
                              className="bg-black/50 border-neutral-600 text-white placeholder:text-neutral-500"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-neutral-600 text-neutral-300 hover:bg-neutral-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 text-white min-w-[100px]"
              >
                {isSubmitting ? "Creating..." : "Create Operation"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

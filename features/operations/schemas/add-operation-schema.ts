import { z } from "zod";

export const addOperationSchema = z.object({
  operationId: z
    .string()
    .min(1, "Operation ID is required")
    .regex(/^OP-[A-Z]+-\d{3}$/, "Operation ID must follow format: OP-OMEGA-001"),
  name: z
    .string()
    .min(1, "Operation name is required")
    .min(3, "Operation name must be at least 3 characters"),
  status: z.enum(["planning", "active", "completed", "compromised"], {
    required_error: "Status is required",
  }),
  priority: z.enum(["low", "medium", "high", "critical"], {
    required_error: "Priority is required",
  }),
  location: z.string().min(1, "Location is required").min(3, "Location must be at least 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  startDate: z.string().min(1, "Start date is required"),
  estimatedCompletion: z.string().min(1, "Estimated completion date is required"),
  objectives: z
    .array(
      z.object({
        title: z
          .string()
          .min(1, "Objective title is required")
          .min(3, "Objective title must be at least 3 characters"),
        description: z.string().optional(),
      })
    )
    .min(1, "At least one objective is required"),
});

export type AddOperationFormData = z.infer<typeof addOperationSchema>;

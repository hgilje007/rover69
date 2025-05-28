import { LucideProps } from 'lucide-react';
import React from 'react';

export enum ApprovalStatus {
  Pending = 'Pending Approval',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export interface FormSubmission {
  id: string;
  formName: string;
  submittedBy: string;
  submissionDate: string; // ISO string
  status: ApprovalStatus;
  customerName?: string;
  data: Record<string, any>; 
  pdfUrl?: string; 
  vismaInvoiceId?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  organizationNumber?: string;
  address?: string;
  visma_customer_id?: string;
  submissionCount: number; // Added for display
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  unitPrice: number;
  unit: string;
  description?: string;
  visma_product_id?: string;
  stock?: number; // Added for display
}

export interface NavItem {
  path: string;
  label: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

// Form Builder Types
export enum FormFieldType {
  Text = 'text',
  Textarea = 'textarea',
  Number = 'number',
  Checkbox = 'checkbox',
  Dropdown = 'dropdown',
  // Advanced types (can be added later)
  // Image = 'image',
  // GPS = 'gps',
  // Signature = 'signature',
}

export type FormFieldConfigValue = string | number | boolean | string[];

export interface FormFieldConfig {
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For dropdown, radio, etc.
  defaultValue?: FormFieldConfigValue;
  // Add other config options as needed, e.g., min/max for number
}

export interface FormField extends FormFieldConfig {
  id: string; // Unique ID for the field instance in a form
  type: FormFieldType;
  name: string; // Field name used for data submission, derived from label
}

export interface FormDefinition {
  id: string; // Unique ID for the form definition
  name: string;
  description?: string;
  fields: FormField[];
  createdAt: string;
  updatedAt: string;
}

// For React DND
export interface DNDItem {
  type: FormFieldType; // Type of field being dragged from palette
  id?: string; // ID of field being dragged within canvas (for reordering - future)
}

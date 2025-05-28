import { Home, FileText, Users, PackageIcon, SettingsIcon, ClipboardPlus, Type, MessageSquare, Hash, CheckSquare, ChevronDown } from 'lucide-react';
import { FormSubmission, Customer, Product, NavItem, ApprovalStatus, FormFieldType, FormFieldConfig } from './types';

export const NAVIGATION_ITEMS: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: Home },
  { path: '/submissions', label: 'Submissions', icon: FileText },
  { path: '/form-builder', label: 'Form Builder', icon: ClipboardPlus },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/products', label: 'Products', icon: PackageIcon },
  { path: '/settings', label: 'Settings', icon: SettingsIcon },
];

export const INITIAL_SUBMISSIONS: FormSubmission[] = [
  {
    id: 'sub1',
    formName: 'Field Service Report',
    submittedBy: 'John Doe',
    submissionDate: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    status: ApprovalStatus.Pending,
    customerName: 'Tech Solutions Inc.',
    data: {
      serviceDate: '2024-07-14',
      technicianName: 'John Doe',
      issueDescription: 'Server unresponsive after power outage.',
      workPerformed: 'Checked power supply, rebooted server, verified network connectivity. All systems nominal.',
      partsUsed: [{ part: 'PSU Cable', quantity: 1 }, { part: 'Network Patch Cord', quantity: 1 }],
      customerSignature: 'signature_data_placeholder_customer.png',
      technicianSignature: 'signature_data_placeholder_technician.png',
    },
  },
  {
    id: 'sub2',
    formName: 'Site Inspection Checklist',
    submittedBy: 'Jane Smith',
    submissionDate: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    status: ApprovalStatus.Approved,
    customerName: 'BuildWell Corp',
    data: {
      inspectionDate: '2024-07-13',
      inspector: 'Jane Smith',
      siteSafety: 'Pass',
      equipmentCheck: 'Pass',
      notes: 'All safety protocols are being followed. Minor debris needs clearing near sector B.',
    },
    pdfUrl: '/mock-docs/site-inspection-sub2.pdf',
    vismaInvoiceId: 'INV-2024-00123'
  },
  {
    id: 'sub3',
    formName: 'Equipment Maintenance Log',
    submittedBy: 'Robert Brown',
    submissionDate: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    status: ApprovalStatus.Rejected,
    customerName: 'Heavy Machinery Ltd.',
    data: {
      equipmentId: 'HM-005',
      maintenanceDate: '2024-07-12',
      technician: 'Robert Brown',
      tasksPerformed: 'Oil change, filter replacement.',
      issuesFound: 'Hydraulic leak detected, requires further investigation.',
      rejectionReason: 'Incomplete details on hydraulic leak. Please provide estimated repair time and parts needed.',
    },
  },
   {
    id: 'sub4',
    formName: 'Client Onboarding Form',
    submittedBy: 'Alice Green',
    submissionDate: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    status: ApprovalStatus.Pending,
    customerName: 'New Innovations Co.',
    data: {
      companyName: 'New Innovations Co.',
      contactPerson: 'Mr. Charles Xavier',
      contactEmail: 'charles@newinnovations.co',
      servicesRequired: ['Cloud Setup', 'Data Migration'],
      onboardingDate: '2024-07-11',
    },
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'cust1', name: 'Tech Solutions Inc.', email: 'hakon@rovrespons.com', organizationNumber: 'TS-98765', address: '123 Tech Park, Silicon Valley, CA', visma_customer_id: 'V-CUST-001', submissionCount: 15 },
  { id: 'cust2', name: 'BuildWell Corp', email: 'hakon@rovrespons.com', organizationNumber: 'BW-12345', address: '456 Construction Ave, New York, NY', visma_customer_id: 'V-CUST-002', submissionCount: 8 },
  { id: 'cust3', name: 'Heavy Machinery Ltd.', email: 'hakon@rovrespons.com', organizationNumber: 'HM-67890', address: '789 Industrial Rd, Chicago, IL', visma_customer_id: 'V-CUST-003', submissionCount: 22 },
  { id: 'cust4', name: 'New Innovations Co.', email: 'hakon@rovrespons.com', organizationNumber: 'NI-24680', address: '1 Innovation Plaza, Austin, TX', visma_customer_id: 'V-CUST-004', submissionCount: 3 },
];

export const INITIAL_PRODUCTS: Product[] = [
  { id: 'prod1', name: 'Standard On-Site Service Hour', sku: 'SERV-HOUR-01', unitPrice: 120.00, unit: 'hrs', description: 'One hour of standard on-site technical support.', visma_product_id: 'V-PROD-S01', stock: 999 },
  { id: 'prod2', name: 'PSU Cable ATX 24-pin', sku: 'HW-PSU-CBL-001', unitPrice: 15.50, unit: 'pcs', description: 'Standard ATX 24-pin power supply unit cable.', visma_product_id: 'V-PROD-H01', stock: 150 },
  { id: 'prod3', name: 'Network Patch Cord Cat6 - 3ft', sku: 'HW-NET-CAT6-3F', unitPrice: 5.00, unit: 'pcs', description: '3-foot Cat6 Ethernet patch cable.', visma_product_id: 'V-PROD-H02', stock: 300 },
  { id: 'prod4', name: 'Hydraulic Fluid ISO VG 32 - 1 Gallon', sku: 'FL-HYD-VG32-1G', unitPrice: 25.00, unit: 'gallon', description: 'Premium hydraulic fluid, ISO VG 32, 1 gallon.', visma_product_id: 'V-PROD-F01', stock: 75 },
];

export const submissionStatsData = [
    { name: 'Jan', submitted: 30, approved: 20, rejected: 5 },
    { name: 'Feb', submitted: 45, approved: 35, rejected: 3 },
    { name: 'Mar', submitted: 60, approved: 50, rejected: 8 },
    { name: 'Apr', submitted: 50, approved: 40, rejected: 4 },
    { name: 'May', submitted: 70, approved: 65, rejected: 2 },
    { name: 'Jun', submitted: 80, approved: 70, rejected: 6 },
];

// Form Builder Constants
export const DND_ITEM_TYPES = {
  FIELD_TYPE: 'FIELD_TYPE', // For dragging from palette to canvas
  CANVAS_FIELD: 'CANVAS_FIELD', // For reordering fields within the canvas (future)
};

interface AvailableFormField extends FormFieldConfig {
  type: FormFieldType;
  displayName: string;
  icon: NavItem['icon']; // Reuse NavItem icon type
}

export const AVAILABLE_FORM_FIELDS: AvailableFormField[] = [
  {
    type: FormFieldType.Text,
    displayName: 'Text Input',
    icon: Type,
    label: 'Text Field',
    placeholder: 'Enter text',
    required: false,
  },
  {
    type: FormFieldType.Textarea,
    displayName: 'Text Area',
    icon: MessageSquare,
    label: 'Text Area',
    placeholder: 'Enter multi-line text',
    required: false,
  },
  {
    type: FormFieldType.Number,
    displayName: 'Number Input',
    icon: Hash,
    label: 'Number Field',
    placeholder: 'Enter a number',
    required: false,
  },
  {
    type: FormFieldType.Checkbox,
    displayName: 'Checkbox',
    icon: CheckSquare,
    label: 'Checkbox Field',
    required: false,
    defaultValue: false,
  },
  {
    type: FormFieldType.Dropdown,
    displayName: 'Dropdown',
    icon: ChevronDown,
    label: 'Dropdown Field',
    required: false,
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
];
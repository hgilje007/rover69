
import React, { useState } from 'react';
import { Customer } from '../types';
import { INITIAL_CUSTOMERS } from '../constants';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Input from '../components/ui/Input';
import { Search, Filter, PlusCircle, Edit3, Trash2 } from 'lucide-react';

const CustomersListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.organizationNumber && customer.organizationNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const columns = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'organizationNumber', header: 'Org Number', sortable: true, render: (item: Customer) => item.organizationNumber || 'N/A' },
    { key: 'address', header: 'Address', sortable: false, render: (item: Customer) => item.address || 'N/A' },
    { key: 'submissionCount', header: 'Submissions', sortable: true, render: (item: Customer) => <span className="font-mono">{item.submissionCount}</span> },
    { key: 'visma_customer_id', header: 'Visma ID', sortable: true, render: (item: Customer) => item.visma_customer_id || 'N/A' },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Customer) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => alert(`Edit customer ${item.id} (not implemented)`)} className="p-1">
            <Edit3 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => alert(`Delete customer ${item.id} (not implemented)`)} className="p-1 text-red-500 hover:bg-red-100">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
       <Card>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <Input 
              id="search-customers"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search />}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4"/>}>
              Filter
            </Button>
            <Button variant="primary" leftIcon={<PlusCircle className="h-4 w-4"/>} onClick={() => alert('Navigate to New Customer page (not implemented).')}>
              Add Customer
            </Button>
          </div>
        </div>
      </Card>
      <Table<Customer>
        columns={columns}
        data={filteredCustomers}
        onRowClick={(item) => alert(`View customer ${item.name} details (not implemented)`)}
      />
    </div>
  );
};

export default CustomersListPage;

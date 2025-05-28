
import React, { useState } from 'react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../constants';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Input from '../components/ui/Input';
import { Search, Filter, PlusCircle, Edit3, Trash2 } from 'lucide-react';

const ProductsListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const columns = [
    { key: 'name', header: 'Product Name', sortable: true },
    { key: 'sku', header: 'SKU', sortable: true },
    { 
      key: 'unitPrice', 
      header: 'Unit Price', 
      sortable: true, 
      render: (item: Product) => `$${item.unitPrice.toFixed(2)}` 
    },
    { key: 'unit', header: 'Unit', sortable: true },
    { key: 'stock', header: 'Stock', sortable: true, render: (item: Product) => item.stock ?? 'N/A' },
    { key: 'visma_product_id', header: 'Visma ID', sortable: true, render: (item: Product) => item.visma_product_id || 'N/A' },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: Product) => (
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={() => alert(`Edit product ${item.id} (not implemented)`)} className="p-1">
            <Edit3 className="h-4 w-4" />
          </Button>
          {/* Products might be primarily managed in Visma, so delete might be restricted */}
          <Button variant="ghost" size="sm" onClick={() => alert(`View product ${item.id} details (not implemented)`)} className="p-1 text-slate-500 hover:bg-slate-100">
            View
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
              id="search-products"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search />}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4"/>}>
              Filter
            </Button>
            <Button variant="primary" leftIcon={<PlusCircle className="h-4 w-4"/>} onClick={() => alert('Adding products might be disabled if synced from Visma.NET (not implemented).')}>
              Add Product
            </Button>
          </div>
        </div>
      </Card>
      <Table<Product>
        columns={columns}
        data={filteredProducts}
        onRowClick={(item) => alert(`View product ${item.name} details (not implemented)`)}
      />
    </div>
  );
};

export default ProductsListPage;

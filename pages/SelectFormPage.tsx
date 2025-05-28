
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ListChecks, Edit, ArrowLeft } from 'lucide-react';
import { FormDefinition } from '../types';

interface SelectFormPageProps {
  savedFormDefinitions: FormDefinition[];
}

const SelectFormPage: React.FC<SelectFormPageProps> = ({ savedFormDefinitions }) => {
  const navigate = useNavigate(); 

  const availableForms = savedFormDefinitions;

  return (
    <div className="space-y-6">
      <div className="flex justify-start">
        <Button variant="outline" onClick={() => window.history.back()} leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back
        </Button>
      </div>
      <Card title="Select a Form to Fill Out" className="shadow-xl">
        <p className="text-slate-600 mb-6">
          Choose from the available forms below. These forms were created in the Form Builder.
        </p>
        
        {availableForms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableForms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col h-full">
                  <div className="flex-grow mb-4">
                    <div className="flex items-center mb-2">
                      <ListChecks className="h-6 w-6 text-sky-600 mr-3" />
                      <h3 className="text-lg font-semibold text-slate-800">{form.name}</h3>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-3">{form.description || 'No description available.'}</p>
                  </div>
                  <div className="mt-auto">
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => navigate(`/fill-form/${form.id}`)} 
                      leftIcon={<Edit className="h-4 w-4"/>}
                    >
                      Fill This Form
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <ListChecks className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-slate-600">No Forms Available</p>
            <p className="text-sm text-slate-500">
              Forms created in the Form Builder will appear here. Go to the <Link to="/form-builder" className="text-sky-600 hover:underline">Form Builder</Link> to create one.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SelectFormPage;
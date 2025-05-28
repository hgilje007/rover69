
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Checkbox from '../components/ui/Checkbox';
import { ArrowLeft, FileEdit, Send } from 'lucide-react';
import { FormDefinition, FormFieldType } from '../types';

interface FillFormPageProps {
  savedFormDefinitions: FormDefinition[];
  onAddNewSubmission: (submissionData: { formId: string; formName: string; data: Record<string, any> }) => void;
}

const FillFormPage: React.FC<FillFormPageProps> = ({ savedFormDefinitions, onAddNewSubmission }) => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [currentForm, setCurrentForm] = useState<FormDefinition | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const formToFill = savedFormDefinitions.find(def => def.id === formId);
    if (formToFill) {
      setCurrentForm(formToFill);
      // Initialize formData with defaultValues if any
      const initialData: Record<string, any> = {};
      formToFill.fields.forEach(field => {
        if (field.defaultValue !== undefined) {
          initialData[field.name] = field.defaultValue;
        } else if (field.type === FormFieldType.Checkbox) {
          initialData[field.name] = false; // Default checkbox to false if no defaultValue
        } else {
          initialData[field.name] = ''; // Default other fields to empty string
        }
      });
      setFormData(initialData);
    } else {
      // Handle form not found, maybe redirect or show an error
      navigate('/select-form'); 
    }
  }, [formId, savedFormDefinitions, navigate]);

  const handleInputChange = useCallback((fieldName: string, value: any) => {
    setFormData(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
    // Clear error for this field on change
    if (formErrors[fieldName]) {
      setFormErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }, [formErrors]);

  const validateForm = useCallback(() => {
    if (!currentForm) return false;
    const errors: Record<string, string> = {};
    currentForm.fields.forEach(field => {
      if (field.required && (formData[field.name] === undefined || formData[field.name] === '' || (field.type === FormFieldType.Checkbox && formData[field.name] === false))) {
        errors[field.name] = `${field.label} is required.`;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentForm, formData]);

  const handleSubmit = () => {
    if (!currentForm || !validateForm()) {
        if (Object.keys(formErrors).length > 0 || (currentForm && currentForm.fields.some(f => f.required && !formData[f.name]))) {
             alert("Please fill in all required fields.");
        }
      return;
    }

    onAddNewSubmission({
      formId: currentForm.id,
      formName: currentForm.name,
      data: formData,
    });
    navigate('/submissions');
  };

  if (!currentForm) {
    return (
      <div className="text-center p-10">
        <FileEdit className="h-16 w-16 text-slate-400 mx-auto mb-4" />
        <p className="text-lg font-medium text-slate-600">Loading form or form not found...</p>
        <Button variant="outline" onClick={() => navigate('/select-form')} leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to Form Selection
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-start">
        <Button variant="outline" onClick={() => navigate('/select-form')} leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to Form Selection
        </Button>
      </div>
      <Card title={`Filling: ${currentForm.name}`} className="shadow-xl">
        {currentForm.description && <p className="text-slate-600 mb-6">{currentForm.description}</p>}
        
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
          {currentForm.fields.map(field => (
            <div key={field.id}>
              {field.type === FormFieldType.Text && (
                <Input
                  id={field.id}
                  label={`${field.label}${field.required ? ' *' : ''}`}
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  error={formErrors[field.name]}
                  aria-required={field.required}
                />
              )}
              {field.type === FormFieldType.Number && (
                <Input
                  id={field.id}
                  label={`${field.label}${field.required ? ' *' : ''}`}
                  type="number"
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.valueAsNumber || e.target.value)} // Handle number input correctly
                  error={formErrors[field.name]}
                  aria-required={field.required}
                />
              )}
              {field.type === FormFieldType.Textarea && (
                <Input
                  as="textarea"
                  id={field.id}
                  label={`${field.label}${field.required ? ' *' : ''}`}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  error={formErrors[field.name]}
                  rows={4}
                  aria-required={field.required}
                />
              )}
              {field.type === FormFieldType.Checkbox && (
                <Checkbox
                  id={field.id}
                  label={`${field.label}${field.required ? ' *' : ''}`}
                  checked={!!formData[field.name]}
                  onChange={(e) => handleInputChange(field.name, e.target.checked)}
                  aria-required={field.required}
                  // Note: Checkbox component might need an error display prop if desired
                />
              )}
              {field.type === FormFieldType.Dropdown && (
                <div>
                  <label htmlFor={field.id} className="block text-sm font-medium text-slate-700 mb-1">
                    {`${field.label}${field.required ? ' *' : ''}`}
                  </label>
                  <select
                    id={field.id}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className={`block w-full px-4 py-3 rounded-2xl border ${formErrors[field.name] ? 'border-red-500' : 'border-slate-300'} shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm placeholder-slate-400 transition-colors`}
                    aria-required={field.required}
                  >
                    <option value="">{field.placeholder || 'Select an option'}</option>
                    {field.options?.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  {formErrors[field.name] && <p className="mt-1 text-xs text-red-600">{formErrors[field.name]}</p>}
                </div>
              )}
              {field.type === FormFieldType.Checkbox && formErrors[field.name] && (
                <p className="mt-1 text-xs text-red-600">{formErrors[field.name]}</p>
              )}
            </div>
          ))}
          <div className="pt-4 border-t border-slate-200">
            <Button type="submit" variant="primary" size="lg" leftIcon={<Send className="h-5 w-5"/>}>
              Submit Form
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FillFormPage;
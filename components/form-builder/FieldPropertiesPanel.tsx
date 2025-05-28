import React, { useEffect, useState } from 'react';
import { FormField, FormDefinition, FormFieldConfig } from '../../types';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Checkbox from '../ui/Checkbox'; // Assuming Checkbox component is created
import Button from '../ui/Button';
import { Settings2, FileJson } from 'lucide-react';

interface FieldPropertiesPanelProps {
  selectedField: FormField | null;
  formDefinition: FormDefinition;
  onUpdateField: (fieldId: string, newProperties: Partial<FormField>) => void;
  onUpdateForm: (newProperties: Partial<Pick<FormDefinition, 'name' | 'description'>>) => void;
}

const FieldPropertiesPanel: React.FC<FieldPropertiesPanelProps> = ({
  selectedField,
  formDefinition,
  onUpdateField,
  onUpdateForm,
}) => {
  // Local state for input values to avoid direct mutation and allow debouncing if needed
  const [fieldProps, setFieldProps] = useState<Partial<FormField>>({});
  const [formProps, setFormProps] = useState<Partial<Pick<FormDefinition, 'name' | 'description'>>>({});

  useEffect(() => {
    if (selectedField) {
      setFieldProps({
        label: selectedField.label,
        placeholder: selectedField.placeholder,
        required: selectedField.required,
        options: selectedField.options,
        name: selectedField.name, // Field name for submission key
      });
    } else {
      setFormProps({
        name: formDefinition.name,
        description: formDefinition.description,
      });
    }
  }, [selectedField, formDefinition.name, formDefinition.description]);

  const handleFieldChange = (key: keyof FormFieldConfig | 'name', value: any) => {
    if (selectedField) {
      const updatedProps = { ...fieldProps, [key]: value };
      setFieldProps(updatedProps); // Update local state immediately for responsiveness
      onUpdateField(selectedField.id, { [key]: value }); // Propagate change
       if (key === 'label') { // Auto-update name from label
        const newName = String(value).toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '');
        setFieldProps(prev => ({...prev, name: newName}));
        onUpdateField(selectedField.id, { name: newName });
      }
    }
  };

  const handleFormChange = (key: 'name' | 'description', value: string) => {
    const updatedProps = { ...formProps, [key]: value };
    setFormProps(updatedProps);
    onUpdateForm({ [key]: value });
  };

  const handleOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (selectedField) {
      const optionsArray = e.target.value.split('\n').map(opt => opt.trim()).filter(opt => opt);
      handleFieldChange('options', optionsArray);
    }
  };

  const renderFieldProperties = () => {
    if (!selectedField) return null;

    return (
      <>
        <h4 className="text-md font-semibold text-slate-700 mb-1">Field: <span className="font-normal text-sky-600">{selectedField.label}</span></h4>
        <p className="text-xs text-slate-500 mb-4">Type: {selectedField.type}</p>
        
        <Input
          label="Label"
          id={`prop-label-${selectedField.id}`}
          value={fieldProps.label || ''}
          onChange={(e) => handleFieldChange('label', e.target.value)}
          className="mb-3"
        />
        <Input
          label="Field Name (for submission)"
          id={`prop-name-${selectedField.id}`}
          value={fieldProps.name || ''}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          className="mb-3"
          disabled // Auto-generated from label, can be made editable
        />
        { (selectedField.type === 'text' || selectedField.type === 'textarea' || selectedField.type === 'number' || selectedField.type === 'dropdown') && (
            <Input
                label="Placeholder"
                id={`prop-placeholder-${selectedField.id}`}
                value={fieldProps.placeholder || ''}
                onChange={(e) => handleFieldChange('placeholder', e.target.value)}
                className="mb-3"
            />
        )}
        <Checkbox
          label="Required"
          id={`prop-required-${selectedField.id}`}
          checked={!!fieldProps.required}
          onChange={(e) => handleFieldChange('required', e.target.checked)}
          className="mb-3 py-2"
        />
        {selectedField.type === 'dropdown' && (
          <Input
            as="textarea" // Using enhanced Input as textarea
            label="Options (one per line)"
            id={`prop-options-${selectedField.id}`}
            value={(fieldProps.options || []).join('\n')}
            onChange={handleOptionsChange}
            className="mb-3"
            rows={4}
          />
        )}
        {/* Add more specific properties based on field.type */}
      </>
    );
  };

  const renderFormProperties = () => {
    return (
      <>
        <h4 className="text-md font-semibold text-slate-700 mb-3">Form Properties</h4>
        <Input
          label="Form Name"
          id="form-prop-name"
          value={formProps.name || ''}
          onChange={(e) => handleFormChange('name', e.target.value)}
          className="mb-3"
        />
        <Input
          as="textarea" // Using enhanced Input as textarea
          label="Form Description"
          id="form-prop-description"
          value={formProps.description || ''}
          onChange={(e) => handleFormChange('description', e.target.value)}
          className="mb-3"
          rows={3}
        />
      </>
    );
  };

  return (
    <Card 
        title={selectedField ? "Field Properties" : "Form Settings"} 
        className="h-full flex flex-col shadow-none border border-slate-200 rounded-2xl overflow-hidden"
        titleClassName="sticky top-0 bg-white z-10"
    >
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {selectedField ? renderFieldProperties() : renderFormProperties()}
      </div>
      <div className="p-4 border-t border-slate-200">
         {selectedField ? 
            <p className="text-xs text-slate-500">Edit properties for the selected field.</p> :
            <p className="text-xs text-slate-500">Edit general form information.</p>
         }
      </div>
    </Card>
  );
};

export default FieldPropertiesPanel;

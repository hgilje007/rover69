
import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import FieldPalette from '../components/form-builder/FieldPalette';
import FormCanvas from '../components/form-builder/FormCanvas';
import FieldPropertiesPanel from '../components/form-builder/FieldPropertiesPanel';
import { FormDefinition, FormField, FormFieldType } from '../types';
import { AVAILABLE_FORM_FIELDS } from '../constants';
import { Save, Trash2, Eye, CheckCircle } from 'lucide-react';

const initialFormDefinition: FormDefinition = {
  id: uuidv4(),
  name: 'Untitled Form',
  description: '',
  fields: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface FormBuilderPageProps {
  onSaveFormDefinition: (formDefinition: FormDefinition) => void;
}

const FormBuilderPage: React.FC<FormBuilderPageProps> = ({ onSaveFormDefinition }) => {
  const [formDefinition, setFormDefinition] = useState<FormDefinition>(initialFormDefinition);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [showSaveNotification, setShowSaveNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const addFieldToCanvas = useCallback((fieldType: FormFieldType) => {
    const baseFieldConfig = AVAILABLE_FORM_FIELDS.find(f => f.type === fieldType);
    if (!baseFieldConfig) return;

    const newField: FormField = {
      id: uuidv4(),
      type: fieldType,
      name: `${baseFieldConfig.label.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/gi, '')}_${formDefinition.fields.length + 1}`,
      label: `${baseFieldConfig.label} ${formDefinition.fields.length + 1}`,
      placeholder: baseFieldConfig.placeholder,
      required: baseFieldConfig.required,
      options: baseFieldConfig.options ? [...baseFieldConfig.options] : undefined,
      defaultValue: baseFieldConfig.defaultValue,
    };
    setFormDefinition(prev => ({
      ...prev,
      fields: [...prev.fields, newField],
      updatedAt: new Date().toISOString(),
    }));
    setSelectedFieldId(newField.id); // Auto-select the new field
  }, [formDefinition.fields.length]);

  const updateFieldProperties = useCallback((fieldId: string, newProperties: Partial<FormField>) => {
    setFormDefinition(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, ...newProperties } : field
      ),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateFormProperties = useCallback((newProperties: Partial<Pick<FormDefinition, 'name' | 'description'>>) => {
    setFormDefinition(prev => ({
      ...prev,
      ...newProperties,
      updatedAt: new Date().toISOString(),
    }));
  }, []);


  const removeFieldFromCanvas = useCallback((fieldId: string) => {
    setFormDefinition(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
      updatedAt: new Date().toISOString(),
    }));
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  }, [selectedFieldId]);

  const handleSaveForm = () => {
    onSaveFormDefinition(formDefinition);
    setNotificationMessage('Form saved and available for submission!');
    setShowSaveNotification(true);
    setTimeout(() => {
      setShowSaveNotification(false);
    }, 3000);
  };

  const handleClearForm = () => {
    const newId = uuidv4();
    setFormDefinition({
      id: newId,
      name: 'Untitled Form',
      description: '',
      fields: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setSelectedFieldId(null);
  };

  const selectedField = formDefinition.fields.find(f => f.id === selectedFieldId) || null;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full max-h-[calc(100vh-var(--header-height,100px)-2rem)] relative"> {/* Adjust for header height and add relative positioning */}
        
        {/* Save Notification */}
        {showSaveNotification && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 w-auto max-w-md z-50">
            <div className="bg-green-500 text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              {notificationMessage}
            </div>
          </div>
        )}

        {/* Header / Actions */}
        <Card className="mb-4 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center p-2">
            <h1 className="text-2xl font-semibold text-slate-800">{formDefinition.name || 'Form Builder'}</h1>
            <div className="flex space-x-2 mt-2 sm:mt-0">
              <Button variant="outline" onClick={() => alert('Preview not implemented')} leftIcon={<Eye className="h-4 w-4" />}>
                Preview
              </Button>
              <Button variant="secondary" onClick={handleClearForm} leftIcon={<Trash2 className="h-4 w-4" />}>
                Clear Form
              </Button>
              <Button variant="primary" onClick={handleSaveForm} leftIcon={<Save className="h-4 w-4" />}>
                Save Form
              </Button>
            </div>
          </div>
        </Card>

        {/* Main Layout: Palette, Canvas, Properties */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden">
          {/* Field Palette (Left) */}
          <div className="md:col-span-3 h-full">
             <FieldPalette />
          </div>

          {/* Form Canvas (Center) */}
          <div className="md:col-span-6 h-full overflow-y-auto bg-white rounded-2xl shadow-lg p-1">
            <FormCanvas
              fields={formDefinition.fields}
              onDropField={addFieldToCanvas}
              onSelectField={setSelectedFieldId}
              selectedFieldId={selectedFieldId}
              onRemoveField={removeFieldFromCanvas}
            />
          </div>

          {/* Properties Panel (Right) */}
          <div className="md:col-span-3 h-full overflow-y-auto bg-white rounded-2xl shadow-lg p-1">
            <FieldPropertiesPanel
              selectedField={selectedField}
              formDefinition={formDefinition}
              onUpdateField={updateFieldProperties}
              onUpdateForm={updateFormProperties}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default FormBuilderPage;
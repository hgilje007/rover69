import React from 'react';
import { AVAILABLE_FORM_FIELDS } from '../../constants';
import DraggableFieldType from './DraggableFieldType';
import Card from '../ui/Card';

const FieldPalette: React.FC = () => {
  return (
    <Card title="Form Fields" className="h-full flex flex-col shadow-none border border-slate-200 rounded-2xl overflow-hidden">
      <div className="p-0 overflow-y-auto flex-grow">
        <div className="grid grid-cols-1 gap-2 p-4">
          {AVAILABLE_FORM_FIELDS.map((field) => (
            <DraggableFieldType key={field.type} fieldType={field.type} displayName={field.displayName} icon={field.icon} />
          ))}
        </div>
      </div>
       <div className="p-4 border-t border-slate-200">
        <p className="text-xs text-slate-500">Drag fields to the canvas.</p>
      </div>
    </Card>
  );
};

export default FieldPalette;

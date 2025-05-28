
import React from 'react';
import { useDrop } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../constants';
import { FormField, FormFieldType, DNDItem } from '../../types';
import CanvasField from './CanvasField';
import Card from '../ui/Card';
import { LayoutGrid } from 'lucide-react';

interface FormCanvasProps {
  fields: FormField[];
  onDropField: (fieldType: FormFieldType) => void;
  onSelectField: (fieldId: string) => void;
  selectedFieldId: string | null;
  onRemoveField: (fieldId: string) => void;
  // onReorderField: (draggedId: string, targetId: string) => void; // For future reordering
}

const FormCanvas: React.FC<FormCanvasProps> = ({
  fields,
  onDropField,
  onSelectField,
  selectedFieldId,
  onRemoveField,
}) => {
  const [{ isOver, canDrop }, dropConnector] = useDrop(() => ({ // Renamed drop to dropConnector for clarity
    accept: DND_ITEM_TYPES.FIELD_TYPE,
    drop: (item: DNDItem) => onDropField(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  // Create a type-compatible ref callback for react-dnd's drop target
  const dndRefCallback: React.RefCallback<HTMLDivElement> = (instance) => {
    dropConnector(instance); // Connect the react-dnd drop target to the DOM element instance
  };

  return (
    <Card
      ref={dndRefCallback} // Use the compatible ref callback
      title="Form Canvas"
      className={`h-full flex flex-col shadow-none border border-slate-200 rounded-2xl overflow-hidden
                  ${isOver && canDrop ? 'bg-sky-50 ring-2 ring-sky-400 ring-inset' : ''}
                  ${!isOver && canDrop ? 'bg-slate-50' : 'bg-white'}`}
      titleClassName="sticky top-0 bg-white z-10"
    >
      <div className="flex-grow p-4 space-y-3 overflow-y-auto">
        {fields.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 p-10">
            <LayoutGrid className="h-16 w-16 mb-4" />
            <p className="text-lg font-medium">Drag & Drop Fields Here</p>
            <p className="text-sm">Start building your form by dragging fields from the left panel.</p>
          </div>
        )}
        {fields.map((field, index) => (
          <CanvasField
            key={field.id}
            field={field}
            isSelected={field.id === selectedFieldId}
            onSelect={() => onSelectField(field.id)}
            onRemove={() => onRemoveField(field.id)}
            // index={index} // For future reordering
            // onMoveField={onReorderField} // For future reordering
          />
        ))}
      </div>
    </Card>
  );
};

export default FormCanvas;

import React from 'react';
import { FormField, FormFieldType } from '../../types';
import Button from '../ui/Button';
import { Trash2, Edit3, Type, MessageSquare, Hash, CheckSquare, ChevronDown, GripVertical } from 'lucide-react'; // Added GripVertical for drag handle (future)

interface CanvasFieldProps {
  field: FormField;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  // index: number; // For future reordering
  // onMoveField: (draggedId: string, targetId: string) => void; // For future reordering
}

const getFieldIcon = (type: FormFieldType) => {
  switch (type) {
    case FormFieldType.Text: return Type;
    case FormFieldType.Textarea: return MessageSquare;
    case FormFieldType.Number: return Hash;
    case FormFieldType.Checkbox: return CheckSquare;
    case FormFieldType.Dropdown: return ChevronDown;
    default: return Type;
  }
};

const CanvasField: React.FC<CanvasFieldProps> = ({ field, isSelected, onSelect, onRemove }) => {
  const FieldIcon = getFieldIcon(field.type);

  // Placeholder for drag and drop reordering (using react-dnd useDrag and useDrop)
  // const ref = React.useRef<HTMLDivElement>(null);
  // const [{ isDragging }, drag, preview] = useDrag(...);
  // const [, drop] = useDrop(...);
  // drag(drop(ref)); // Combine drag and drop refs

  return (
    <div
      // ref={preview} // Connect DND preview
      onClick={onSelect}
      className={`p-4 border rounded-xl cursor-pointer transition-all duration-150 ease-in-out bg-white shadow-sm hover:shadow-md
                  ${isSelected ? 'ring-2 ring-sky-500 border-sky-500' : 'border-slate-300 hover:border-slate-400'}
                 `}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
    >
      <div className="flex items-start justify-between">
        <div className="flex-grow">
          <div className="flex items-center mb-2">
            {/* <div ref={drag} className="cursor-move p-1 mr-2 text-slate-400 hover:text-slate-600"> <GripVertical size={18} /> </div> */}
            <FieldIcon className="h-5 w-5 mr-2 text-slate-500" />
            <label className="block text-sm font-semibold text-slate-800 truncate" title={field.label}>
              {field.label || `Untitled ${field.type} field`}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
          
          {/* Simplified field preview */}
          <div className="text-xs text-slate-500 ml-7">
            {field.type === FormFieldType.Text && <input type="text" placeholder={field.placeholder} className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50" disabled />}
            {field.type === FormFieldType.Textarea && <textarea placeholder={field.placeholder} rows={2} className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50" disabled />}
            {field.type === FormFieldType.Number && <input type="number" placeholder={field.placeholder} className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50" disabled />}
            {field.type === FormFieldType.Checkbox && (
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 mr-2 border-slate-300 rounded bg-slate-50" disabled defaultChecked={!!field.defaultValue} />
                <span className="text-sm text-slate-700">{field.label}</span>
              </div>
            )}
            {field.type === FormFieldType.Dropdown && (
              <select className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-slate-50" disabled>
                <option value="">{field.placeholder || 'Select an option'}</option>
                {field.options?.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
              </select>
            )}
          </div>
        </div>
        
        <div className="flex flex-col space-y-1 ml-2 flex-shrink-0">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onSelect(); }} className="p-1 text-sky-600 hover:bg-sky-100" aria-label="Edit field">
            <Edit3 size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1 text-red-500 hover:bg-red-100" aria-label="Remove field">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CanvasField;

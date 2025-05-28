
import React, { useRef } from 'react'; // Import useRef
import { useDrag } from 'react-dnd';
import { DND_ITEM_TYPES } from '../../constants';
import { FormFieldType } from '../../types';
import { LucideProps } from 'lucide-react';


interface DraggableFieldTypeProps {
  fieldType: FormFieldType;
  displayName: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

const DraggableFieldType: React.FC<DraggableFieldTypeProps> = ({ fieldType, displayName, icon: Icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({ // drag is ConnectDragSource
    type: DND_ITEM_TYPES.FIELD_TYPE,
    item: { type: fieldType },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const elementRef = useRef<HTMLDivElement>(null); // Create a ref for the div
  drag(elementRef); // Connect the drag source to this ref

  return (
    <div
      ref={elementRef} // Assign the ref to the div
      className={`flex items-center p-3 rounded-xl border border-slate-300 bg-white hover:bg-sky-50 hover:border-sky-500 cursor-grab transition-all duration-150 ease-in-out shadow-sm hover:shadow-md
                  ${isDragging ? 'opacity-50 ring-2 ring-sky-500' : ''}`}
      role="button"
      aria-label={`Drag to add ${displayName} field`}
    >
      <Icon className="h-5 w-5 mr-3 text-sky-600 flex-shrink-0" />
      <span className="text-sm font-medium text-slate-700">{displayName}</span>
    </div>
  );
};

export default DraggableFieldType;

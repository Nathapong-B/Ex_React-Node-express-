import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default function DraggableImage(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className='text-center'>
            <img src={URL.createObjectURL(props.data)} alt="ตัวอย่างรูปภาพ" style={{ height: "100px",width:"90px", objectFit: 'contain' }} className="m-auto"></img>
        </div>
    );
}
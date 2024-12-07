import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });
    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <img src={'./img/'+props.name+'.png'} alt='img' style={{ width: '100px' }} ></img>
            {/* <img src={URL.createObjectURL(props.data)} alt="ตัวอย่างรูปภาพ" style={{ height: "50px" }} className="me-2"></img> */}
        </div>
    );
}
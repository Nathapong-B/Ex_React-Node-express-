import { useDroppable } from '@dnd-kit/core';

export default function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
    });
    const style = {
        opacity: isOver || props.children!=='drop here' ? 1 : 0.5,
        width: '100px',
        height: '100px'
    };

    return (
        <div ref={setNodeRef} style={style} className='border border-info m-2'>
            {props.children}
            {/* {console.log(props.children)} */}
        </div>
    );
}
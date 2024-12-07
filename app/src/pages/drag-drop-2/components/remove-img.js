import { useDroppable } from '@dnd-kit/core';

export default function RemoveImgList(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.data,
    });

    const style = {
        width: '50px',
        height: '50px',
        opacity: isOver ? 1 : 0.5,
        border: '1px dashed red',
        borderRadius: '5px',
    };

    return (
        <div className="d-inline p-2 m-2" ref={setNodeRef}
            style={style}>
            <div className="d-flex w-100 h-100 align-items-center justify-content-center">
                <i className="fa fa-trash text-danger" aria-hidden="true"></i>
            </div>
        </div>
    )
}
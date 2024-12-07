import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function UserList(props) {
    const { attributes,
        listeners,
        setNodeRef,
        transform,
        transition, } = useSortable({
            id: props.id,
            animateLayoutChanges: () => false, // เพิ่มบันทัดนี้ เมื่อมีการใช้ strategy={rectSwappingStrategy} เนื่องจากวัตถุมีการเคลื่อนที่บางอย่างที่ไม่พึงประสงค์
        });

    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
        transition,
        width: '200px',
        // height:'100px'
    };

    return (
        <div ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}>
            <div className="card m-2">
                <div className="card-body">
                    {props.name}
                </div>
            </div>
        </div>
    )
}
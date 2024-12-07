import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ImgList(props) {
    const { attributes,
        listeners,
        setNodeRef,
        transform,
        transition, } = useSortable({
            id: props.data.id,
            animateLayoutChanges: () => false, // เพิ่มบันทัดนี้ เมื่อมีการใช้ strategy={rectSwappingStrategy} เนื่องจากวัตถุมีการเคลื่อนที่บางอย่างที่ไม่พึงประสงค์
        });

    const style = {
        // Outputs `translate3d(x, y, 0)`
        transform: CSS.Translate.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}>
            <img src={props.dragging?'white.png':URL.createObjectURL(props.data)} alt="ตัวอย่างรูปภาพ" style={{ height: "50px" }} className="m-auto"></img>
        </div >
    )
}
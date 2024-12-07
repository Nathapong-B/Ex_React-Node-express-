import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImgList from './components/imglist';
import RemoveImgList from './components/remove-img';
import { intervalTest } from '../interval-Test';

export default function DragAndDrop2() {
    const [imgSelect, setImgSelect] = useState([]);
    const [isDragging, setIsDragging] = useState();
    const [countId, setCountId] = useState(0);

    const elBrowseFile = () => {
        return (
            <div className="d-inline-block border rounded-lg p-1 m-2" style={{ cursor: 'pointer' }}>
                <img src="upload.png" alt="รออัพโหลด" style={{ height: '45px' }} onClick={browseFile}></img>
            </div>
        )
    };

    const browseFile = () => {
        document.getElementById('input_browse_file').click();
    };

    const handleSelectFile = async (items) => {
        const files = [...items.target.files];
        console.log(files)
        if (imgSelect.length + files.length > 8) {
            // aler message
            console.log('image over flow')
            return false;
        }
        files.map((e, i) => {
            e.id = (i + countId).toString();
            e.position = i;
        });
        setImgSelect([...imgSelect, ...files]);
        setCountId(countId + files.length);
    };

    const dragEnd = (event) => {
        console.log(event)
        setIsDragging();
        const { active, over } = event;

        if (!over) return true;
        if (active.id === over.id) return true;

        if (over.id === 'remove') {
            const index = imgSelect.findIndex(el => el.id === active.id);
            imgSelect.splice(index, 1);
        } else {
            setImgSelect(imgSelect => {
                const oldPos = imgSelect.findIndex(el => el.id === active.id);
                const newPos = imgSelect.findIndex(el => el.id === over.id);

                return arrayMove(imgSelect, oldPos, newPos);
            });
        }
    };

    function handleDragStart(e) {
        const index = imgSelect.findIndex(el => el.id === e.active.id);
        setIsDragging(() => { return imgSelect[index] });
    };

    useEffect(() => {
            intervalTest()
    }, []);

    return (
        <div className='container shadow p-4 w-50'>
            <div>
                <Link to={'/'}><span className='text-secondary'>HOME</span></Link>
            </div>
            <h3 className='text-center'>Ex. Drag - Drop 2</h3>
            <p className='text-center'>ตัวอย่างการย้ายตำแหน่งรูปภาพด้วยการคลิกลาก-วาง</p>
            <p className='text-center'>ด้วยไลบลารี่ dnd-kit</p>
            <p className='text-center'>
                <span className="me-2">ในตัวอย่างจะใช้โมดูล3ตัวนี้</span>
                <span className="badge text-bg-secondary">
                    <span className="me-2">npm install</span>
                    <span className="text-info">@dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities</span>
                </span>
            </p>
            <p className="text-center">ในตัวอย่างนี้จะเป็นการเลือกรูปภาพเข้ามาแล้วทำการจัดเรียงตำแหน่งที่ต้องการ</p>
            <p className='text-center'>และสามารถลบรูปภาพที่ไม่ต้องการออกได้ ในการลากรูปภาพไปพื้นที่ drop zone อื่นนั้น ทำให้กราฟฟิกรูปภาพไม่แสดงที่หน้าจอตามการลากมาด้วย</p>
            <p className='text-center'>ซึ่งจะแก้ปัญหาด้วยการใช้ DropOverlay ทำให้แสดงกราฟฟิกรูปภาพข้าม drop zone ได้</p>

            <hr className='w-50 mx-auto'></hr>

            <div>เลือกรูปภาพ</div>
            <input id="input_browse_file" className="d-none" type="file" multiple onChange={e => { handleSelectFile(e) }}></input>

            {imgSelect.length > 0
                ? <div className="d-flex flex-wrap align-items-center">
                    <DndContext id="dnd_container" collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={dragEnd}>

                        <SortableContext id="sortable_container" items={imgSelect}>
                            {imgSelect.map((e, i) => {
                                return (
                                    <div key={i} className="d-inline-block border rounded-lg p-1 m-2">
                                        <ImgList data={e} dragging={isDragging?.id === e.id ? true : false} />
                                    </div>
                                )
                            })}
                        </SortableContext>

                        {isDragging ? <RemoveImgList data={'remove'} /> : <></>}

                        <DragOverlay>
                            {isDragging ? (
                                <ImgList data={isDragging} />
                            ) : null}
                        </DragOverlay>
                    </DndContext>
                    {imgSelect?.length < 8
                        ? elBrowseFile()
                        : <></>
                    }
                </div>
                : elBrowseFile()
            }

        </div>
    )
}
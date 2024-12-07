import { Link } from "react-router-dom";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { arrayMove, arraySwap, rectSwappingStrategy, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import UserList from "./components/user-list";
import { useState } from "react";
import Droppable from "./components/droppable";
import Draggable from "./components/draggable";
import DraggableImage from "./components/draggable-img";

export default function DragAndDrop() {
    const [img, setImg] = useState([
        { id: '0', name: 'one' },
        { id: '1', name: 'two' },
        { id: '2', name: 'three' },
        { id: '3', name: 'four' },
        { id: '4', name: 'five' },
        { id: '5', name: 'six' },
        { id: '6', name: 'seven' },
    ])
    const arr = [...Array(4)];
    const [parent, setParent] = useState('block0');
    const imgDragEnd = (e) => {
        console.log(e)
        const { active, over } = e;
        setParent(over ? over.id : null);

        setImg((img) => {
            const activePos = img.findIndex(item => active.id === item.id);
            const overPos = over.id;

            console.log(activePos, overPos)

            return arrayMove(img, activePos, overPos);
        })
    }

    // -- sortable -- //
    const [user, setUser] = useState([
        { id: 'one1', name: 'John' },
        { id: '2two', name: 'Game' },
        { id: '3', name: 'Bank' },
        { id: '4', name: 'Bank2' },
    ]);
    const [inputData, setInput] = useState('');

    const findPos = (item) => user.findIndex(i => i.id === item.id);

    const dragEnd = (e) => {
        const { active, over } = e;

        if (active.id === over.id) return true;

        setUser(user => {
            const activePos = findPos(active);
            const overPos = findPos(over)

            return arraySwap(user, activePos, overPos); // ใช้ arraySwap เมื่อใช้ strategy={rectSwappingStrategy}
            // return arrayMove(user, activePos, overPos);
        });
    };

    const addData = () => {
        setUser([...user, { id: user.length + 1, name: inputData }]);
        setInput('');
    }

    // --- input images
    const [imgSelect, setImgSelect] = useState([]);

    const elBrowseFile = () => {
        return (
            <div className="d-inline-block border rounded-lg p-1" style={{ cursor: 'pointer' }}>
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
            // props.alert('warning');
            return false;
        }
        files.map((e, i) => e.id = (i + imgSelect.length).toString());
        setImgSelect([...imgSelect, ...files]);
    };

    const imgdragEnd = (event) => {
        console.log(event)
        const { active, over } = event;

        if (active.id === over.id) return true;

        setImgSelect(imgSelect => {
            const oldPos = imgSelect.findIndex(el => el.id === active.id);
            const newPos = over.id;
            console.log(oldPos, newPos)

            return arrayMove(imgSelect, oldPos, newPos);
        });
    };

    const debug = () => {
        console.log(imgSelect)
    }

    return (
        <div className='container shadow p-4 w-50'>
            <button className="btn btn-info" onClick={debug}>debug</button>
            <div>
                <Link to={'/'}><span className='text-secondary'>HOME</span></Link>
            </div>
            <h3 className='text-center'>Ex. Drag - Drop</h3>
            <p className='text-center'>ตัวอย่างการย้ายตำแหน่งรูปภาพด้วยการคลิกลาก-วาง</p>
            <p className='text-center'>ด้วยไลบลารี่ dnd-kit</p>
            <p className='text-center'>
                <span className="me-2">ในตัวอย่างจะใช้โมดูล3ตัวนี้</span>
                <span className="badge text-bg-secondary">
                    <span className="me-2">npm install</span>
                    <span className="text-info">@dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities</span>
                </span>
            </p>
            <hr className='w-50 mx-auto'></hr>

            {/* -- droppable draggable -- */}
            <p>Ex1. Droppable hook and Draggable hook</p>
            {/* <DndContext onDragEnd={imgDragEnd}>
                <Droppable id='block1'>
                    {parent === 'block1' ? <Draggable id='img' /> : 'drop here'}
                </Droppable>

                <Droppable id='block2'>
                    {parent === 'block2' ? <Draggable id='img' /> : 'drop here'}
                </Droppable>
            </DndContext> */}

            <DndContext onDragEnd={imgDragEnd}>
                <div className="d-flex flex-wrap">
                    {img.map((e, i) => {
                        return (
                            <div key={i}>
                                <Droppable id={i}>
                                    <Draggable id={e.id} name={e.name} />
                                    {/* {parent === `block${i}` ? <Draggable id='img' /> : i} */}
                                </Droppable>
                            </div>
                        )
                    })}
                </div>
            </DndContext>
            {/* -- end droppable draggable -- */}

            <hr className='w-50 mx-auto'></hr>

            {/* -- sortable -- */}
            <p>Ex2. Droppable hook and Draggable hook</p>
            <div className="input-group p-2">
                <input className="form-control" onChange={e => setInput(e.target.value)} value={inputData}></input>
                <button className="btn btn-info" onClick={addData}><b>+</b> item</button>
            </div>

            <DndContext collisionDetection={closestCenter} onDragEnd={dragEnd}>
                <SortableContext items={user} strategy={rectSwappingStrategy}>
                    {/* <SortableContext items={user} strategy={verticalListSortingStrategy}> */}
                    <div className="d-flex flex-wrap">
                        {user.map((e) => {
                            return (
                                <UserList id={e.id} name={e.name} key={e.id} />
                            )
                        })}
                    </div>

                </SortableContext>
            </DndContext>
            {/* -- end sortable -- */}

            <hr className='w-50 mx-auto'></hr>

            {/* {--- input images ---} */}
            <p>Ex3. Droppable hook and Draggable hook from input Images </p>
            <input id="input_browse_file" className="d-none" type="file" multiple onChange={e => { handleSelectFile(e) }}></input>

            {imgSelect.length > 0
                ? <div>
                    <DndContext collisionDetection={closestCenter} onDragEnd={imgdragEnd}>
                        {imgSelect.map((e, i) => {
                            return (
                                <div key={i} className="d-inline-block p-1 mr-2">
                                    <Droppable id={i}>
                                        <DraggableImage id={e.id} name={e.name} data={e} />
                                    </Droppable>
                                </div>
                            )
                        })}
                    </DndContext>
                    {imgSelect?.length < 8
                        ? elBrowseFile()
                        : <></>
                    }
                </div>
                : elBrowseFile()
            }
            {/* --- end input images --- */}

        </div>
    )
}
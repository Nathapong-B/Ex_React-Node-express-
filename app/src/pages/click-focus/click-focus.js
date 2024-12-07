import { useEffect } from 'react';
// import './click-focus-style.css';

export default function ClickFocus() {
    let toggle = true;
    const root = document.querySelector(':root');
    // const show_coordsEl = document.getElementById("show_coords");
    // const eggEl = document.getElementById("egg");

    const focusPage = (e) => {
        const eggEl = document.getElementById("egg");
        toggle = !toggle;
        console.log(e)

        root.style.setProperty('--top', `${e.clientY}px`);
        root.style.setProperty('--left', `${e.clientX}px`);

        if (toggle) {
            eggEl.classList.remove('egg1');
        } else {
            eggEl.classList.add('egg1');
        }
    }

    const setCoords = (e) => {
        const show_coordsEl = document.getElementById("show_coords");
        show_coordsEl.innerHTML = `
            Offset X/Y: ${e.offsetX}, ${e.offsetY}
            Viewport X/Y: ${e.clientX}, ${e.clientY}
            Page X/Y: ${e.pageX}, ${e.pageY}
            Screen X/Y: ${e.screenX}, ${e.screenY}
            `;
    }

    const onkeypress = (e) => {
        console.log(e)
    }

    const keypress = () => {
        console.log('keypress')
        const btnEl = document.getElementById('btn_click');

        btnEl.addEventListener('keydown', onkeypress);
    }

    const contentsfocus=()=>{
        console.log('contentsfocus')
        const contentsEl=document.getElementById('contents');

        contentsEl.addEventListener('click',focusPage);
    }

    useEffect(() => {
        keypress();
        document.addEventListener("mousemove", setCoords);
        // window.addEventListener("click", focusPage);
        contentsfocus()
    }, [])


    return (
        <div>
            <p>Focus page :</p>

            <button id='btn_click' className='btn btn-info'>click</button>

            <div id='contents' className='border m-2 p-2'>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus reprehenderit facilis accusantium, itaque
                        atque a illum est magni enim. Impedit corrupti, reiciendis at iure blanditiis quaerat necessitatibus
                        nobis
                        natus eaque voluptatibus dicta vero nemo consectetur commodi ullam dignissimos ducimus repudiandae
                        dolores
                        molestias velit consequuntur quo a atque! Ut, deserunt eos.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus reprehenderit facilis accusantium, itaque
                        atque a illum est magni enim. Impedit corrupti, reiciendis at iure blanditiis quaerat necessitatibus
                        nobis
                        natus eaque voluptatibus dicta vero nemo consectetur commodi ullam dignissimos ducimus repudiandae
                        dolores
                        molestias velit consequuntur quo a atque! Ut, deserunt eos.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus reprehenderit facilis accusantium, itaque
                        atque a illum est magni enim. Impedit corrupti, reiciendis at iure blanditiis quaerat necessitatibus
                        nobis
                        natus eaque voluptatibus dicta vero nemo consectetur commodi ullam dignissimos ducimus repudiandae
                        dolores
                        molestias velit consequuntur quo a atque! Ut, deserunt eos.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus reprehenderit facilis accusantium, itaque
                        atque a illum est magni enim. Impedit corrupti, reiciendis at iure blanditiis quaerat necessitatibus
                        nobis
                        natus eaque voluptatibus dicta vero nemo consectetur commodi ullam dignissimos ducimus repudiandae
                        dolores
                        molestias velit consequuntur quo a atque! Ut, deserunt eos.</p>
                </div>
            </div>

            <div id="show_coords"></div>

            <div id="egg" className="egg0"></div>
        </div>
    )
}
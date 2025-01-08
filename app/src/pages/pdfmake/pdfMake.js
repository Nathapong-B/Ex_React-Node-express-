import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import pdfMake from "pdfmake/build/pdfmake";
// import "pdfmake/build/vfs_fonts";
// ควรนำไฟล์ vfs_fonts ไปไว้นอก node_modules เพราะการ build fonts ครั้งถัดไปอาจจะไม่แสดงผล
import "./font/vfs_fonts";

pdfMake.fonts = {
    Kanit: {
        normal: 'Kanit-Regular.ttf',
        bold: 'Kanit-Bold.ttf',
        italics: 'Kanit-Italic.ttf',
        bolditalics: 'Kanit-BoldItalic.ttf'
    },
    Roboto: {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-MediumItalic.ttf'
    },
    THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew-Bold.ttf',
        italics: 'THSarabunNew-Italic.ttf',
        bolditalics: 'THSarabunNew-BoldItalic.ttf'
    },
}

export default function PdfMake() {
    const [data, setData] = useState();

    const fetchData = async () => {
        try {
            //code
            const res = await axios.get('https://jsonplaceholder.typicode.com/users');
            console.log(res.data)
            if (res.status === 200) {
                return setData(res.data)
            }

            return console.log(res)
        } catch (err) {
            console.log(data)
        }
    };

    const pdfTable = (data) => {
        return (
            {
                pageBreak: 'before',
                // layout: 'noBorders', // optional
                // layout: 'headerLineOnly', // optional
                layout: 'lightHorizontalLines', // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ['auto', '*', '*', '*'],

                    body: [
                        // headers 1 row
                        ['Id', 'Username', 'Name', 'Website'],
                        // contents
                        // [{ text: 'Value 1' }, { text: 'Value 2', bold: true }, { text: 'Value 3', italics: true, fillColor: 'yellow' }, { text: 'Value 4', bolditalics: true }],
                        // [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
                        // ['val 1', { text: 'Italics value', italics: true, fillColor: 'red' }, 'Val 3', 'Val 4']
                        ...data.map(e => ([
                            { text: `${e.id}` },
                            { text: `${e.username}` },
                            { text: `${e.name}` },
                            { text: `${e.website}` },
                        ]))
                    ]
                }
            }
        )
    };

    const pdfHeaders = (data) => {
        return ([
            { text: 'My PDF', fontSize: 16, alignment: 'center', lineHeight: 2 },
            {
                pageBreak: 'after',
                fontSize: 10,
                stack: [
                    { text: `Value 1` },
                    { text: `Value 2` },
                    { text: `Value 3` },
                    { text: `Value 4` },
                ]
            },

            {
                columns: [
                    { width: '25%', text: 'First column' },
                    {
                        width: '25%',
                        stack: [
                            { text: 'Second column',italics:true },
                            { text: `Value 1` },
                            { text: `Value 2` },
                            { text: `Value 3` },
                            { text: `Value 4` },
                        ]
                    },
                    { width: '25%', text: 'Third column' },
                    { width: '25%', text: 'Fourth column' }
                ],
                // optional space between columns
                columnGap: 10,
                margin: [0, 10, 0, 10],
            },

            { text: `Customer phone : ` },
        ])
    };

    function printPDF() {
        var docDefinition = {
            content: [
                { text: `ทดสอบ ${data[0].name}`, fontSize: 15, lineHeight: 2 },
                pdfHeaders(),
                pdfTable(data)
            ],
            defaultStyle: {
                font: 'Kanit'
                // font: 'THSarabunNew'
            },
            // pageSize: { width: 200, height: 'auto' },
        };
        pdfMake.createPdf(docDefinition).open()
    }

    const debug = () => {
        console.log('debug')
    }

    return (
        <div className='container shadow p-4 w-50'>
            <div>
                {/* <button className='btn btn-info' onClick={debug}>debug</button> */}
                <Link to={'/'}><span className='text-secondary'>HOME</span></Link>
            </div>
            <h3 className='text-center'>Ex. Create PDF</h3>
            <h4 className='text-center mb-4'>with Pdfmake</h4>
            <h6 className='text-center mb-4'>ติดตั้งแพ็คเกจ : npm install pdfmake --save</h6>
            <div className='mb-4'>
                <span>การติดตั้ง fonts เพิ่มเติม</span>
                <ol>
                    <li>ไปที่ ./node_modules/pdfmake/</li>
                    <li>สร้าง folder /examples/fonts</li>
                    <li>จากนั้น copy fonts ที่ต้องการไปไว้ที่ /examples/fonts</li>
                    <li>พิมพ์คำสั่ง node build-vfs.js "./examples/fonts"</li>
                    <li>จะได้ไฟล์ build/vfs_fonts.js ใหม่ **ควรนำไฟล์ vfs_fonts ไปไว้นอก node_modules เพราะการ build fonts ครั้งถัดไปอาจจะไม่แสดงผล</li>
                    <li>ก่อนเรียกใช้ fonts ให้ตั้งค่า pdfMake.addFontsor legacy pdfMake.fonts ก่อน</li>
                </ol>
                <div>เพิ่มเติม : <Link to={`https://pdfmake.github.io/docs/`} target="blank" >pdfmake.github.io/docs</Link></div>
                <div>enjoy..</div>
            </div>

            <div>
                <span>เริ่มด้วย ทดลองดึงข้อมูลจาก </span>
                <a href="#" onClick={fetchData}>JSONPlaceholder</a>
            </div>

            <div>
                {data
                    ?
                    <div>
                        <button className="btn btn-sm btn-primary" onClick={printPDF}>Creat PDF</button>
                        <ol>
                            {data.map((e, i) => (
                                <li key={i}>{e.name}</li>
                            ))}
                        </ol>
                    </div>
                    : <></>}
            </div>
        </div>
    )
};
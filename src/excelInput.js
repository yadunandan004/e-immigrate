import React, { useState } from 'react';
import ExcelJS from 'exceljs';

const ExcelInput = () => {
    const [uploadedFile, setUploadedFile] = useState(null);

    const submitUpload = (ev) => {
        ev.preventDefault();

        const wb = new ExcelJS.Workbook();
        const reader = new FileReader();
        var file = document.getElementById('fileUpload');
        reader.readAsArrayBuffer(file.files[0]);
        reader.onload = () => {
            const buffer = reader.result;
            wb.xlsx.load(buffer).then((workbook) => {
                console.log(workbook, 'workbook instance');
                workbook.eachSheet((sheet, id) => {
                    sheet.eachRow((row, rowIndex) => {
                        // console.log(row.values, rowIndex);
                        console.log(JSON.stringify(row.values));
                    });
                });
            });
        };
    };

    return (
        <div>
            <form onSubmit={submitUpload}>
                <input
                    type="file"
                    id="fileUpload"
                    name="fileUpload"
                    accept=".xls, .xlsx"
                    // onChange={(ev) => submit(ev.target.files[0])}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ExcelInput;

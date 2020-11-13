import React, { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';
import file from './questionnaires/Questionnaire.xlsx';

const ExcelInput = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedData, setUploadedData] = useState({
        wb: new ExcelJS.Workbook(),
        reader: new FileReader(),
    });

    const { wb, reader } = uploadedData;
    console.log('file :>> ', file);
    useEffect(() => {
        console.log('im firing');

        wb.xlsx.readFile('Questionnaire.xlsx').then(function (workbook) {
            console.log('workbook :>> ', workbook);
            workbook.eachSheet((sheet) => {
                sheet.eachRow((row) => {
                    console.log({
                        number: row.values[1],
                        category: row.values[2],
                        text: row.values[3],
                        type: row.values[4],
                        answerSelections: row.values[5],
                        required: row.values[6] === 'Yes' ? true : false,
                        followUp: row.values[7],
                        toolTip: row.values[8],
                    });
                });

                // var worksheet = wb.getWorksheet(sheet);
                // worksheet.eachRow({ includeEmpty: true }, function (
                //     row,
                //     rowNumber
                // ) {
                //     console.log(
                //         'Row ' + rowNumber + ' = ' + JSON.stringify(row.values)
                //     );
            });
        });

        // const file = document.getElementById('fileUpload');
        // reader.readAsArrayBuffer(file);
        // reader.onload = () => {
        //     const buffer = reader.result;
        //     wb.xlsx.load(buffer).then((workbook) => {
        //         console.log(workbook, 'workbook instance');
        //         workbook.eachSheet((sheet, id) => {
        //             sheet.eachRow((row, rowIndex) => {
        //                 // console.log(row.values, rowIndex);
        //                 console.log({
        //                     number: row.values[1],
        //                     category: row.values[2],
        //                     text: row.values[3],
        //                     type: row.values[4],
        //                     answerSelections: row.values[5],
        //                     required: row.values[6] === 'Yes' ? true : false,
        //                     followUp: row.values[7],
        //                     toolTip: row.values[8],
        //                 });
        //             });
        //         });
        //     });
        // };
    }, [wb, reader]);

    const submitUpload = (ev) => {
        ev.preventDefault();

        const wb = new ExcelJS.Workbook();
        const reader = new FileReader();
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

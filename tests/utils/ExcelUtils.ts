import ExcelJs from 'exceljs'

export async function writeExcel(filePath:string,searchCellValue:any,replaceValue:any,changeLocation:{row:number,column:number}) {
    const workbook: ExcelJs.Workbook= new ExcelJs.Workbook()

await workbook.xlsx.readFile(filePath)
const worksheets:ExcelJs.Worksheet|undefined=workbook.getWorksheet('Sheet1');
if(worksheets!=undefined){
const output:{row:Number, column:Number}=await readExcel(worksheets,searchCellValue)
const cell=worksheets.getCell(Number(output.row)+changeLocation.row, Number(output.column)+changeLocation.column)
cell.value=replaceValue
await workbook.xlsx.writeFile(filePath)

}
    
}

export async function readExcel(worksheets:ExcelJs.Worksheet,searchCellValue:any) {
 let output:{row:Number, column:Number}={row:-1,column:-1};   


  worksheets?.eachRow((row, rowNumber)=>{

    row.eachCell((cell,colNumber)=>{
       if (cell.value=== searchCellValue ){
        output = { row: rowNumber, column: colNumber };

       }

    })  
  })

  return output
}


import{test,expect} from '@playwright/test'
import * as path from 'path';
import{writeExcel} from './utils/ExcelUtils'

test("UploadandDownLoadTest",async({page})=>{
   
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const [download] =await Promise.all([
     page.waitForEvent('download'),
     page.locator("#downloadButton").click()
    ])

    const filePath=path.join(__dirname,'download',await download.suggestedFilename());
    await download.saveAs(filePath)
    console.log(filePath)
    await writeExcel(filePath,'Mango',250,{row:0,column:2});
    await page.locator("#fileinput").setInputFiles(filePath);
const desiredRow = await page.getByRole('row').filter({ has: page.getByText('Mango') });
  await expect(desiredRow.locator('#cell-4-undefined')).toContainText('250');

})
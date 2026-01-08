import {Locator, expect, test} from '@playwright/test'

test("Calendar based test", async({page})=>{

    const date:string="5"
    const month:string="11"
    const year: string="2024"
       const expectedList = [month,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
    await page.locator("div.react-date-picker__inputGroup").click();
    await page.pause()
    await page.locator("button.react-calendar__navigation__label").click();
    await page.locator("button.react-calendar__navigation__label").click();
    await page.locator("button.react-calendar__decade-view__years__year").filter({hasText:year}).click()
    await page.locator("button.react-calendar__year-view__months__month").nth(Number(month)-1).click()
    
    await page.locator("//abbr[text()='"+date+"']").click()
        const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
 
    }
})
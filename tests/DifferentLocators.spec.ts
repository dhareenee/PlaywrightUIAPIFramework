import {Locator, expect, test} from '@playwright/test'


test("Different playwright locator check",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.pause();
    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByPlaceholder("Password").fill("12234");
    await page.getByText("Employed").check()
    await page.getByRole("button",{name:"Submit"}).click()

})
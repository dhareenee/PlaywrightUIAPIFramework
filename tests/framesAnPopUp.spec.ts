import {FrameLocator, Locator, expect, test} from '@playwright/test'

test("Visible and hidden test",async({page})=>{

   await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
   expect(await page.locator("#displayed-text").isVisible()).toBeTruthy();
   await page.locator("#hide-textbox").click();
   expect(await page.locator("#displayed-text").isHidden()).toBeTruthy();

})

test("Javascript pop up test", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.pause()
    page.once('dialog',async dialog=>await dialog.accept());
    await page.locator("#alertbtn").click()
     page.once('dialog',async dialog=>await dialog.dismiss());
    await page.locator("#confirmbtn").click()

})

test("iframe test case",async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.pause()
    const framePage:FrameLocator= page.frameLocator("#courses-iframe")
    await framePage.locator("a[href*='lifetime-access']:visible").click();
   expect(await framePage.locator(".content-side h2 span").textContent()).toEqual("13,522")

})
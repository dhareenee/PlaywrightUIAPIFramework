import {Locator, expect, test,type BrowserContext, type Page } from '@playwright/test'

test('First Playwright test', async ({page})=>{
    const userName:Locator = page.locator('#username');
    const password:Locator = page.locator('#password');
    const signInBtn:Locator = page.locator('#signInBtn');
    const errorMsgTxt:Locator=page.locator("[style='display: none;']")
    const listOfItems:Locator=page.locator(".card-body a")
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    await userName.fill('dhareene')
    await password.fill('learning')
    await signInBtn.click()
    console.log(await errorMsgTxt.textContent())
    await expect(errorMsgTxt).toContainText('Incorrect username/password.')
    await userName.fill("");
    await userName.fill("rahulshettyacademy")
    await signInBtn.click();
    console.log(await (listOfItems).nth(0).textContent());   
});

test('Different UI locators test', async ({page})=>{
    const userName:Locator = page.locator('#username');
    const password:Locator = page.locator('#password');
    const signInBtn:Locator = page.locator('#signInBtn');
    const userRadiobtn:Locator=page.locator("[value='user']")
    const adminRadiobtn:Locator=page.locator("[value='admin']")
    const userConfirmOkPopUp:Locator=page.locator('button.btn-success')
    const dropdown:Locator=page.locator('select.form-control')
    const conditionCheckBox:Locator=page.locator('#terms')
    const listOfItems:Locator=page.locator(".card-body a")
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')
    await userName.fill("rahulshettyacademy")
    await password.fill('learning')
    await userRadiobtn.click()
    await userConfirmOkPopUp.click()
    await expect(userRadiobtn).toBeChecked();
    await dropdown.selectOption('teach');
    //await expect(dropdown.textContent()).toContain('teacher')
    await conditionCheckBox.click()
    await expect(conditionCheckBox).toBeChecked()
    await conditionCheckBox.uncheck()
    expect(await conditionCheckBox.isChecked()).toBeFalsy()
    await signInBtn.click();
    console.log(await (listOfItems).nth(0).textContent());   
});

test.only('Child tab test', async ({browser})=>{

    const context:BrowserContext= await browser.newContext();
    const page :Page=await context.newPage();
    const blinkingTxt=page.locator("[href *='documents-request']")
    await page.goto('https://rahulshettyacademy.com/loginpagePractise');
    const userName:Locator = page.locator('#username');
    expect(blinkingTxt).toHaveAttribute('class','blinkingText');
    const [newPage]:any=await Promise.all([
     context.waitForEvent('page'),
     blinkingTxt.click()
    ])
    const redline:string=await newPage.locator('p.red').textContent()
    await page.locator('#username').fill(redline.split('@')[1].split(' ')[0])
    console.log(await page.locator('#username').inputValue())
    

})


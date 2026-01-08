import { Locator, Page } from '@playwright/test'
class loginPage {
    readonly emailId: Locator
    readonly password: Locator
    readonly loginBtn: Locator
    readonly page:Page
    
    constructor(page: Page) {
        this.page=page
        this.emailId = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.loginBtn = page.locator('#login')
    }


    async goto(){
       await  this.page.goto("https://rahulshettyacademy.com/client")
    }

    async vaildLogin(userEmail:string,password:string){
        await this.emailId.fill(userEmail)
        await this.password.fill(password)
        await this.loginBtn.click()
    }


}

export {loginPage}
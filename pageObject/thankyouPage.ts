   import { Locator, Page } from "@playwright/test"
   class thankyouPage{

    private readonly page:Page
    private readonly orderPageLoad:Locator
    private readonly orderConfirmationMsg:Locator
    private readonly orderId:Locator

    constructor(page:Page){
        this.page=page
        this.orderPageLoad=this.page.locator('tbody').first()
        this.orderConfirmationMsg=this.page.locator('h1.hero-primary')
        this.orderId=page.locator('td.em-spacer-1 label').last()
    }

    async orderSuccessMessage():Promise<string|null>{
        await this.orderPageLoad.waitFor()
        return await this.orderConfirmationMsg.textContent()
    }

    async getOrderId(){
         let orderIdText:any= (await this.orderId.textContent())?.split(' ')[2]
         return orderIdText

    }


   }

   export {thankyouPage}
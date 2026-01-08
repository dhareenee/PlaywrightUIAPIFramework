import { Locator, Page } from "@playwright/test";

   class orderDetailsPage{
    private readonly page:Page
    private readonly viewOrderLoad:Locator

    constructor(page:Page){
        this.page=page
        this.viewOrderLoad= page.locator('div.email-container')

    }

    async getOrderEmailId(userEmail:string): Promise<boolean>{

        this.viewOrderLoad.waitFor()
        return await this.page.getByText(`${userEmail}`).first().isVisible()

    }
        async getOrderCountry(countryName:string): Promise<boolean>{

        this.viewOrderLoad.waitFor()
        return await this.page.getByText(`India`).first().isVisible()

    }
   }

export {orderDetailsPage}
import { Locator, Page } from "@playwright/test";

class orderListPage {

    private readonly page: Page
    private readonly orderPageLink: Locator
    private readonly orderIdList: Locator
    private readonly orderPageLoad: Locator

    constructor(page: Page) {
        this.page = page
        this.orderPageLink = this.page.locator('button[routerlink="/dashboard/myorders"]')
        this.orderIdList = page.locator('tbody tr')
        this.orderPageLoad = page.locator('tbody').first()
    }

    async clickOnOrderPage() {
        await this.orderPageLink.click();
        await this.orderPageLoad.waitFor()

    }

    async orderIdValidation(orderId:string): Promise<boolean> {
        let orderIdValidation: boolean = false
        for (let i = 0; i < await this.orderIdList.count(); i++) {
            if ((await this.orderIdList.locator('th').nth(i).textContent()) ===orderId ) {
                await this.orderIdList.locator('td button').first().click();
                orderIdValidation = true
                break
            }


        }
        return orderIdValidation
    }
}

export {orderListPage}

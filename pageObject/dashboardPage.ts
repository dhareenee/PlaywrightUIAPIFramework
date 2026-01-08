import { Locator, Page } from "@playwright/test"

class dashboardPage {

    private readonly page: Page
    private readonly product: Locator
    private readonly productName: Locator
    private readonly cartLink: Locator
    private readonly cartpageLoad: Locator

    constructor(page: Page) {
        this.page = page
        this.product = this.page.locator('.card-body')
        this.productName = this.page.locator('.card-body b')
        this.cartLink = this.page.locator('[routerlink="/dashboard/cart"]')
        this.cartpageLoad = this.page.locator('div.cart')

    }

    async logallProductText() {
        await this.productName.first().waitFor()
        console.log(await this.productName.allTextContents())
    }

    async searchAndAddtoCardProduct(productName: string) {
        for (let i = 0; i < await this.product.count(); i++) {
            if ((await this.product.nth(i).locator('b').textContent()) === productName) {
                await this.product.nth(i).locator('button .fa-shopping-cart').click();
                break;
            }
        }
    }

    async navigateCartPage() {
        await this.cartLink.click();

    }


}


export {dashboardPage}


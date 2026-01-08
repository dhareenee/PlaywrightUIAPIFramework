import { Locator, Page } from "@playwright/test";

class cartPage {
    private readonly page: Page
    private readonly checkoutBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.checkoutBtn = page.locator('[style="list-style-type: none;"] button')


    }

    async cartProductNameVisiblity(userInputProductName: string) {
        let productAddedToCart: boolean
        const cartProductName: Locator = this.page.locator(`h3:has-text("${userInputProductName}")`)
        await cartProductName.waitFor()
        productAddedToCart = await cartProductName.isVisible()
        return productAddedToCart

    }

    async clickCheckOutButton() {
        await this.checkoutBtn.click()
    }

}

export {cartPage}


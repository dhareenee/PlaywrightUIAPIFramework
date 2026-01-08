import { Page, Locator } from "@playwright/test";

class paymentPage {
    private readonly page: Page
    private readonly paymentPage: Locator;
    private readonly creditCardNumber: Locator
    private readonly ccvCode: Locator
    private readonly nameOnCard: Locator
    private readonly coupon: Locator
    private readonly couponSuccMsg: Locator
    private readonly applyCouponBtn: Locator
    private readonly paymentEmailId: Locator
    private readonly userCountry: Locator
    private readonly countryDropDown: Locator
    private readonly countryOptions: Locator
    private readonly placeOrder: Locator


    constructor(page: Page) {
        this.page = page
        this.paymentPage = this.page.locator('div .payment__info')
        this.creditCardNumber = this.page.locator('div form div input').nth(0)
        this.ccvCode = this.page.locator('div form div input').nth(1)
        this.nameOnCard = this.page.locator('div form div input').nth(2)
        this.coupon = this.page.locator('div form div input').nth(3)
        this.couponSuccMsg = this.page.locator('.payment__cc div p')
        this.applyCouponBtn = this.page.locator('.payment__cc [type="submit"]')
        this.paymentEmailId = this.page.locator(".payment__shipping input[type='text']")
        this.userCountry = this.page.locator("[placeholder='Select Country']")
        this.countryDropDown = this.page.locator('section.ta-results')
        this.countryOptions = this.countryDropDown.locator('button')
        this.placeOrder = this.page.locator('a.action__submit')

    }

    async fillCardDetails(cardNumber: string, ccvCode: string, nameOnCard: string) {

        await this.paymentPage.waitFor()
        await this.creditCardNumber.fill(cardNumber)
        await this.ccvCode.fill(ccvCode)
        await this.nameOnCard.fill(nameOnCard)


    }

    async applyCoponAndGetSuccessMsg(coupon:string) {
        await this.coupon.fill(coupon)
        await this.applyCouponBtn.click()
        return await this.couponSuccMsg.textContent()

    }

    async getPaymentPageUserEmailId() {
        return await this.paymentEmailId.inputValue()
    }

    async updateUserCountryInOrder() {

        await this.userCountry.pressSequentially('ind');
        await this.countryDropDown.waitFor()
        for (let i = 0; i < await this.countryOptions.count(); i++) {
            let text: any = await this.countryOptions.nth(i).textContent()
            if (text === ' India') {
                await this.countryOptions.nth(i).click();
                break
            }
        }

    }
    async clickOnPlaceOrder() {
        await this.placeOrder.click()
    }

}

export {paymentPage}
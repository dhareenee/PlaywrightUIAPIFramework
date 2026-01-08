import { Locator, expect, test } from '@playwright/test'
import { gettoken, createOrder } from './handlers/WebAPIHandler';
//email dhasue@gmail.com
//password Test@12345

const loginPayLoad = { userEmail: "dhasue@gmail.com", userPassword: "Test@12345" };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "68a961459320a140fe1ca57a" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" };
let token: any;

test.beforeAll(async () => {
    token = await gettoken('https://rahulshettyacademy.com/api/ecom/auth/login', loginPayLoad)
    console.log(token)

})
test.only('E2E Flow', async ({ page }) => {
    const userEmail: string = 'dhasue@gmail.com'
    const userInputProductName: string = 'ZARA COAT 3'
    let productAddedToCart: boolean = false
    let orderIdValidation: boolean = false
    const emailId: Locator = page.locator('#userEmail')
    const password: Locator = page.locator('#userPassword')
    const loginBtn: Locator = page.locator('#login')
    const product: Locator = page.locator('.card-body')
    const productName: Locator = page.locator('.card-body b')
    const cartLink: Locator = page.locator('[routerlink="/dashboard/cart"]')
    const cartpageLoad: Locator = page.locator('div.cart')
    const cartProductName: Locator = page.locator(`h3:has-text("${userInputProductName}")`);
    const checkoutBtn: Locator = page.locator('[style="list-style-type: none;"] button')
    const paymentPage: Locator = page.locator('div .payment__info');
    const creditCardNumber: Locator = page.locator('div form div input').nth(0)
    const ccvCode: Locator = page.locator('div form div input').nth(1)
    const nameOnCard: Locator = page.locator('div form div input').nth(2)
    const coupon: Locator = page.locator('div form div input').nth(3)
    const couponSuccMsg: Locator = page.locator('.payment__cc div p')
    const applyCouponBtn: Locator = page.locator('.payment__cc [type="submit"]')
    const expiryDateMonth: Locator = page.locator('input ddl').nth(0)
    const expiryDateYear: Locator = page.locator('input ddl').nth(1)
    const paymentEmailId: Locator = page.locator(".payment__shipping input[type='text']")
    const userCountry: Locator = page.locator("[placeholder='Select Country']")
    const countryDropDown: Locator = page.locator('section.ta-results')
    const countryOptions: Locator = countryDropDown.locator('button')
    const placeOrder: Locator = page.locator('a.action__submit')
    const orderPageLoad: Locator = page.locator('tbody').first()
    const orderConfirmationMsg = page.locator('h1.hero-primary')
    const orderId = page.locator('td.em-spacer-1 label').last()
    const orderPageLink = page.locator('button[routerlink="/dashboard/myorders"]')
    const orderIdList = page.locator('tbody tr')
    const viewOrderLoad = page.locator('div.email-container')
    const viewOrderEmailId = page.getByText(`${userEmail}`).first()
    const viewOrdercountrt = page.getByText(`Cuba`).first()

    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, token)
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash')
    const orderIdText = await createOrder(token, 'https://rahulshettyacademy.com/api/ecom/order/create-order', orderPayLoad)

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        
            const response = await page.request.fetch(route.request());
            const body = JSON.stringify(fakePayLoadOrders)
            await route.fulfill({ response, body, })
        })

    
    await orderPageLink.click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    
    //await page.pause()
     expect(await page.locator(".mt-4").textContent()).toContain("You have No Orders to show at this time. Please Visit Back Us")


});

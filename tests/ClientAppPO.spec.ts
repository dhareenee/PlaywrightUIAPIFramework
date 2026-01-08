import {Locator, expect, test} from '@playwright/test'
import { poManager } from '../pageObject/poManager';
import data from  '../testData/ClientAppOrderTestData.json'
import { json } from 'stream/consumers';
let  dataset:any
test.beforeAll(async () => {
const stringdataset=JSON.stringify(data)
dataset= JSON.parse(stringdataset)
console.log(dataset)
})

test.only('E2E Flow',async ({page}) =>{

   const PoManager:poManager=new poManager(page)
   const LoginPage=PoManager.getLoginPage();
   await LoginPage.goto();
   await LoginPage.vaildLogin(dataset[0].userEmail,dataset[0].password);
   expect(await page.title()).toContain(`Let's Shop`)
   const DashboardPage=PoManager.getDashBoardPage()
   await DashboardPage.logallProductText()
   await DashboardPage.searchAndAddtoCardProduct(dataset[0].userInputProductName)
   await DashboardPage.navigateCartPage()
   const cartPage=PoManager.getCartPage()
   await cartPage.cartProductNameVisiblity(dataset[0].userInputProductName)
   await cartPage.clickCheckOutButton()
   const PaymentPage=PoManager.getPaymentPage()
   await PaymentPage.fillCardDetails(dataset[0].creditCardNumber,dataset[0].ccvNumber,dataset[0].creditcardHolderName);
   expect(await PaymentPage.applyCoponAndGetSuccessMsg(dataset[0].coupon)).toContain('Coupon Applied')
   expect(await PaymentPage.getPaymentPageUserEmailId()).toContain(dataset[0].userEmail)
   await PaymentPage.updateUserCountryInOrder()
   await PaymentPage.clickOnPlaceOrder()
   const ThankyouPage=PoManager.getOrderThankyouPage()
  expect(await ThankyouPage.orderSuccessMessage()).toContain('Thankyou for the order.')
  const orderId=await ThankyouPage.getOrderId()
  const OrderPageList=PoManager.getOrderListPage()
  await OrderPageList.clickOnOrderPage()
  expect(await OrderPageList.orderIdValidation(orderId)).toBeTruthy()
  const OrderDetailsPage=PoManager.getOrderDetailsPage()
   expect(await  OrderDetailsPage.getOrderEmailId(dataset[0].userEmail)).toBeTruthy();
   expect(await  OrderDetailsPage.getOrderCountry(dataset[0].userCountry)).toBeTruthy();

  });

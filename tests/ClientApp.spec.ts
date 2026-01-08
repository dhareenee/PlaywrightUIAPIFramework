import {Locator, expect, test} from '@playwright/test'
//email dhasue@gmail.com
//password Test@12345


  test('Get First Item Test',async ({page}) =>{
    const emailId:Locator= page.locator('#userEmail')
    const password:Locator= page.locator('#userPassword')
    const loginBtn:Locator= page.locator('#login')
    const productName:Locator=page.locator('.card-body b')
    await page.goto('https://rahulshettyacademy.com/client')
    await emailId.fill('dhasue@gmail.com')
    await password.fill('Test@12345')
    await loginBtn.click();
   expect(await page.title()).toContain(`Let's Shop`)
   //console.log(await productList.nth(0).textContent())
   //await page.waitForLoadState('networkidle')
   await productName.first().waitFor()
   console.log(await productName.allTextContents())
  
  
  });

  test.only('E2E Flow',async ({page}) =>{
    const userEmail:string ='dhasue@gmail.com'
    const userInputProductName:string='ZARA COAT 3'
    let productAddedToCart:boolean=false
    let orderIdValidation:boolean=false
    const emailId:Locator= page.locator('#userEmail')
    const password:Locator= page.locator('#userPassword')
    const loginBtn:Locator= page.locator('#login')
    const product:Locator= page.locator('.card-body')
    const productName:Locator=page.locator('.card-body b')
    const cartLink:Locator=page.locator('[routerlink="/dashboard/cart"]')
    const cartpageLoad:Locator=page.locator('div.cart')
    const cartProductName:Locator=page.locator(`h3:has-text("${userInputProductName}")`);
    const checkoutBtn:Locator=page.locator('[style="list-style-type: none;"] button')
    const paymentPage:Locator=page.locator('div .payment__info');
    const creditCardNumber:Locator=page.locator('div form div input').nth(0)
    const ccvCode:Locator=page.locator('div form div input').nth(1)
    const nameOnCard:Locator=page.locator('div form div input').nth(2)
    const coupon:Locator=page.locator('div form div input').nth(3)
    const couponSuccMsg:Locator=page.locator('.payment__cc div p')
    const applyCouponBtn:Locator=page.locator('.payment__cc [type="submit"]')
    const expiryDateMonth:Locator=page.locator('input ddl').nth(0)
    const expiryDateYear:Locator=page.locator('input ddl').nth(1)
    const paymentEmailId:Locator=page.locator(".payment__shipping input[type='text']")
    const userCountry:Locator=page.locator("[placeholder='Select Country']")
    const countryDropDown:Locator=page.locator('section.ta-results')
    const countryOptions:Locator=countryDropDown.locator('button')
    const placeOrder:Locator=page.locator('a.action__submit')
    const orderPageLoad:Locator=page.locator('tbody').first()
    const orderConfirmationMsg=page.locator('h1.hero-primary')
    const orderId=page.locator('td.em-spacer-1 label').last()
    const orderPageLink=page.locator('button[routerlink="/dashboard/myorders"]')
    const orderIdList=page.locator('tbody tr')
    const viewOrderLoad=page.locator('div.email-container')
    const viewOrderEmailId=page.getByText(`${userEmail}`).first() 
    const viewOrdercountrt=page.getByText(`India`).first()
    
    
    await page.goto('https://rahulshettyacademy.com/client')
    await emailId.fill(userEmail)
    await password.fill('Test@12345')
    await loginBtn.click();
   expect(await page.title()).toContain(`Let's Shop`)
   await productName.first().waitFor()
   console.log(await productName.allTextContents())

   for(let i=0;i< await product.count();i++){
     if((await product.nth(i).locator('b').textContent()) === userInputProductName){
        await product.nth(i).locator('button .fa-shopping-cart').click();
        break;
     }
   }
   
   await cartLink.click();
   await cartProductName.waitFor()

   productAddedToCart=await cartProductName.isVisible()
   expect(productAddedToCart).toBeTruthy();
   await checkoutBtn.click()

   await paymentPage.waitFor()
   await creditCardNumber.fill('1234567890')
   //await expiryDateMonth.selectOption({label: '02'})
   //await expiryDateYear.selectOption({label: '27'})
   await ccvCode.fill("227")
   await nameOnCard.fill('Dhareene')
   await coupon.fill('rahulshettyacademy')
   await applyCouponBtn.click()
   expect(await couponSuccMsg.textContent()).toContain('Coupon Applied')
   expect(await paymentEmailId.inputValue()).toContain(userEmail)
   await userCountry.pressSequentially('ind');
   await countryDropDown.waitFor()
   for(let i=0;i< await countryOptions.count();i++){
     let text:any=await countryOptions.nth(i).textContent()
     if(text===' India'){
        await countryOptions.nth(i).click();
        break
     }
   }
   await placeOrder.click()
   await orderPageLoad.waitFor()
   expect(await orderConfirmationMsg.textContent()).toContain('Thankyou for the order.')
   let orderIdText:any= (await orderId.textContent())?.split(' ')[2]
   console.log(orderIdText)
   await orderPageLink.click();
   await orderPageLoad.waitFor()
   await page.pause()
   for(let i=0; i< await orderIdList.count();i++){
    if((await orderIdList.locator('th').nth(i).textContent())=== orderIdText){
        await orderIdList.locator('td button').first().click();
        orderIdValidation=true
        break
    }
   }

   expect(orderIdValidation).toBeTruthy()
   await viewOrderLoad.waitFor()
   expect(await viewOrderEmailId.isVisible()).toBeTruthy();
   expect(await viewOrdercountrt.isVisible()).toBeTruthy();
   expect(await page.getByText(orderIdText).isVisible()).toBeTruthy();


   


  
  });

import { Page } from "@playwright/test";
import { loginPage } from "./loginPage";
import { dashboardPage } from "./dashboardpage";
import {cartPage} from "./cartPage"
import { paymentPage } from "./paymentPage";
import { thankyouPage } from "./thankyouPage";
import { orderListPage } from "./orderListPage";
import { orderDetailsPage } from "./orderdetailsPage";

class poManager{
    private readonly page:Page
    private readonly loginPage:loginPage
    private readonly dashboardPage:dashboardPage
    private readonly cartPage:cartPage
    private readonly paymentPage:paymentPage
    private readonly thankyouPage:thankyouPage
    private readonly orderListPage:orderListPage
    private readonly orderDetailsPage:orderDetailsPage

    constructor(page:Page){
        this.page=page
        this.loginPage=new loginPage(this.page)
        this.dashboardPage=new dashboardPage(this.page)
        this.cartPage=new cartPage(this.page)
        this.paymentPage=new paymentPage(this.page)
        this.thankyouPage=new thankyouPage(this.page)
        this.orderListPage=new orderListPage(this.page)
        this.orderDetailsPage=new orderDetailsPage(this.page)
    }

    getLoginPage(){
       return this.loginPage
    }

    getDashBoardPage(){
        return this.dashboardPage
    }

    getCartPage(){
        return this.cartPage
    }

    getPaymentPage(){

        return this.paymentPage

    }
    getOrderThankyouPage(){
        return this.thankyouPage
    }

    getOrderListPage(){
        return this.orderListPage

    }

    getOrderDetailsPage(){
        return this.orderDetailsPage
    }
}

export {poManager}
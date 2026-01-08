import { apiUtils } from "../utils/APIUtils";

export async function gettoken(url:string,requestBody:any):Promise<string> {

    const headers={
        'Content-Type': 'application/json'
    }
    const tokenResponse=await apiUtils.default().sendRequest('post',url,headers,requestBody);
    const body=await tokenResponse?.json();
    return body.token  
    
}

export async function  createOrder(token:string,url:string,requestBody:any) {
        
        const headers={
        'Authorization': token,
        'Content-Type': 'application/json'
    }
    const orderResponse=await apiUtils.default().sendRequest('post',url,headers,requestBody);
    const orderResponseJson = await orderResponse?.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        return orderId;
}
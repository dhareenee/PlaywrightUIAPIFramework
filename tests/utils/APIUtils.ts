import { APIRequest,APIRequestContext,request } from "@playwright/test";
export class APIUtils{

    private requestContext:Promise<APIRequestContext>

    constructor(requestContext:Promise<APIRequestContext>){
        this.requestContext=requestContext;

    }

    static  default(): APIUtils{
        return new APIUtils(request.newContext())
    }

    async sendRequest(method:string,url:string,header:Record<string,string>|null=null,requestBody:any){

        const requestContext=await this.requestContext;
        const safeHeaderParams =header|| {};

        switch(method.toLowerCase()){
            case 'post':
                return await requestContext.post(url,{headers:safeHeaderParams,data:requestBody})
}
        }

    }

export const apiUtils=APIUtils;
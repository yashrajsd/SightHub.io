import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import {Webhook} from 'svix'

import { createUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const SIGNING_SECRET = process.env.WEBHOOK_SECRET

    if(!SIGNING_SECRET){
        throw new Error("Error: Please add SIGNING_SECRET you mf");
    }

    const wh = new Webhook(SIGNING_SECRET);

    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get('svix-signature');

    if(!svix_id || !svix_timestamp || !svix_signature){
        return new Response('Error: Svix Chud gaya bhidu',{
            status:400
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    try{
        evt = wh.verify(body,{
            'svix-id':svix_id,
            'svix-signature':svix_signature,
            'svix-timestamp':svix_timestamp
        }) as WebhookEvent
    }catch(err){
        console.error("Error: Webhook chud gaya guru: ",err)
        return new Response("Error: Verifition ki ma ki akh ho gayi (error)",{
            status:400
        })
    }
    const { id } = evt.data
    const eventType = evt.type

    if(eventType=='user.created'){
        const {id,email_addresses,first_name,last_name} = evt.data

        const user ={
            name:first_name+" "+last_name,
            email:email_addresses,
            userId:id,
            projects:[]
        }
        const newUser = await createUser(user)
        return NextResponse.json({message:'New user created rey baba',user:newUser})
    }

    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', body)
  
    return new Response('Webhook received', { status: 200 })
}

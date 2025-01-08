import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { clerkClient } from "@clerk/nextjs/server";
import {Webhook} from 'svix'

import { createUser } from "@/lib/actions/user.action";

export async function POST(req:Request){
    
}
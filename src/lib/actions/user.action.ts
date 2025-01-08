'use server'
import { auth, currentUser } from "@clerk/nextjs/server";
import {connect} from "../asraclient"
import { NextResponse } from "next/server";

export async function createUser(user:any) {
    try{
        const db = await connect();
        const userCollection = db.collection('users')
        const {userId} = await auth(); 
        const userDoc = await userCollection.findOne({userId:userId})
        if(userDoc){
            return JSON.parse(JSON.stringify(userDoc))
        }
        const user = await currentUser();
        const newUser = await userCollection.insertOne({
            name:user?.firstName +" "+ user?.lastName,
            email:user?.emailAddresses,
            userId:userId,
            projects:[]
        })
        return JSON.parse(JSON.stringify(newUser))
    }catch(err){
        NextResponse.json({message:"oops ma chud gayi",status:505})
    }
}

'use server'
import { connect } from "../asraclient";
import { NextResponse } from "next/server";

interface User {
    name: string;
    email: string;
    id: string;
}

export async function createUser(user: User) {
    try {
        const db = await connect();
        const userCollection = db.collection('users');

        const userDoc = await userCollection.findOne({ email: user.email });
        if (userDoc) {
            return JSON.parse(JSON.stringify(userDoc));
        }

        const newUser = await userCollection.insertOne({
            name: user.name,
            email: user.email,
            userId: user.id,
            projects: []  
        });

        return JSON.parse(JSON.stringify(newUser));  
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Oops, something went wrong", status: 505 });
    }
}

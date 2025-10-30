import { PrismaClient } from "@prisma/client";
import { LoginProps, RegisterProps } from "../types";
import bcrypt from "bcryptjs";




const prisma = new PrismaClient()



export const registerUser = async ({name,email,password}:RegisterProps) => {
    try {
        //check if user already exist
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if(existingUser){
            return { error : "User Already exist"}

        }

        //Hash Password
        const hashedPassword = await bcrypt.hash(password,10)

        //Create new user
        const  newUser = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role:"USER"
            }
        })

        return { user: newUser}
    } catch (error) {
         console.error("Error registering user:", error);
    return { error: "Something went wrong" };
    }
    
}


export const loginUser = async ({email,password}: LoginProps) => {
    try {
        const user = await prisma.user.findUnique({
            where: {email},
        })

        if(!user){
            return {error : "Invalid email or password"}
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return {error : "Invalid Password"}

        }
        return {user}
    } catch (error) {
            console.error("Error logging in user:", error);
    }

}
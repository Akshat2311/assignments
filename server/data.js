import bcrypt from "bcryptjs"
export const users = [
    {
        name:"Aditya",
        phone_number:"8770471714",
        password:bcrypt.hashSync('123456', 10)
    },
    {
        name: "Akshat",
        phone_number: "7389074391",
        password: bcrypt.hashSync('123456', 10)
    }
]


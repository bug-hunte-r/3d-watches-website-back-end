import { compare, hash } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"

const hashPassHandler = async (password: any) => {
    const hashedPass = hash(password, 12)
    return hashedPass
}

const tokenGenerator = (data: any) => {
    const token = sign({...data}, process.env.PRIVATE_KEY, {
        expiresIn: '48h'
    })
    return token
}

const verifyPassHandler = async (password: any, hashedPass: any) => {
    const verifedPass = compare(password, hashedPass)
    return verifedPass
}

const verifyTokenHandler = async (token: any) => {
    try {
        const verifedToken = verify(token, process.env.PRIVATE_KEY)
        return verifedToken
    } catch (error) {
        console.log(error);
    }
}

export { hashPassHandler, tokenGenerator, verifyPassHandler, verifyTokenHandler }
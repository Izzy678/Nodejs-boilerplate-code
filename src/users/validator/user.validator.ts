import * as joi from 'joi'
export const signUpValidator = joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    userName:joi.string().required(),
    email:joi.string().email().required(),
    password:joi.string().required().min(8)
})
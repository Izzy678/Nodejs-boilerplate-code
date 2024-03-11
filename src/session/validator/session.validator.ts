import * as joi from 'joi'
export const createSessionSchema = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required()
})
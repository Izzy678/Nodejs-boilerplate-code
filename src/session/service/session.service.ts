import { Session } from "../model/session.model";
import {IUpdateSession } from "../dto/session.dto";
import {
  BadRequestException,
  NotFoundException,
} from "../../common/error/http.error.";
import { decodeToken, generateTokens } from "../../auth/service/token.service";
import { User } from "../../users/model/user.model";

export const createSession = async (userId: string, userAgent: string) => {
  const createdSession = await Session.create({ user: userId, userAgent });
  return createdSession;
};

export const updateSession = async (
  query: Object,
  update:IUpdateSession
) => {
  const session = await Session.findOne({ where: { ...query } });
  if (session) return session.update({ ...update });
  throw new BadRequestException("session not found or expired");
};

export const deleteSession = async (query: Object)=> {
  const session = await Session.findOne({where:{...query}});
  if(!session) throw new BadRequestException("session not found");
  const deletedSession =  await session.destroy();
  console.log(deletedSession);
}


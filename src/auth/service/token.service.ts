import jwt from "jsonwebtoken";
import { TokenDto } from "../dto/token.dto";
import {
  BadRequestException,
  NotFoundException,
} from "../../common/error/http.error.";
import { User } from "../../users/model/user.model";
import { config } from "../../config/environment.config";
import { Session } from "../../session/model/session.model";

const { jwtSecretKey, accessTokenTTL, refreshTokenTTL } = config.TOKEN;

export function generateTokens(user: User, sessionId?: string) {
  const accessTokenPayload = {
    email: user.email,
    user: user.id,
    userName: user.userName,
    ...(sessionId && { session: sessionId }), // Only include session ID if it's provided
  };
  const accessToken = jwt.sign(accessTokenPayload, jwtSecretKey, {
    expiresIn: accessTokenTTL,
  });

  const refreshTokenPayload = {
    user: user.id,
    ...(sessionId && { session: sessionId }), // Only include session ID if it's provided
  };

  const refreshToken = jwt.sign(refreshTokenPayload, jwtSecretKey, {
    expiresIn: refreshTokenTTL,
  });

  return {
    accessToken,
    refreshToken,
  };
}

export function decodeToken(token: string): {
  tokenData: TokenDto | undefined;
  isExpired: boolean;
} {
  try {
    const tokenData = jwt.verify(token, jwtSecretKey) as unknown as TokenDto;
    return {
      tokenData: tokenData,
      isExpired: false,
    };
  } catch (error: any) {
    if (error.message === "jwt expired") {
      return {
        isExpired: true,
        tokenData: undefined,
      };
    } else {
      return {
        isExpired: false,
        tokenData: undefined,
      };
    }
  }
}

export async function reIssueAccessTokens(refreshToken: string) {
  const { tokenData, isExpired } = decodeToken(refreshToken);
  if (isExpired || !tokenData)
    throw new BadRequestException(
      "Invalid refresh token. Please login to get a new access token."
    );

  if (tokenData.session) {
    const session = await Session.findOne({ where: { id: tokenData.session } });

    if (!session || !session.valid)
      throw new BadRequestException("Session expired.");

    const user = await User.findOne({ where: { id: session.user } });

    if (!user) throw new NotFoundException("User not found.");

    return generateTokens(user, session.id);
  } else {
    const user = await User.findOne({ where: { id: tokenData.user } });

    if (!user) throw new NotFoundException("User not found.");

    return generateTokens(user);
  }
}

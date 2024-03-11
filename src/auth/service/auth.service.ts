import { HttpStatusCode } from "../../common/enums/httpStatusCode.enum";
import { BadRequestException } from "../../common/error/http.error.";
import { IAppResponse } from "../../common/interfaces/app.return";
import { comparePassword } from "../../common/utils/function/bcrypt";
import log from "../../common/utils/function/logger";
import { ISignIn } from "../../users/dto/user.dto";
import { User } from "../../users/model/user.model";
import { findUserByEmail } from "../../users/servies/user.service";

export async function signIn(signInUserData: ISignIn): Promise<User> {
  const { email, password } = signInUserData;
  const foundUser = await findUserByEmail(email);
  if (!foundUser) throw new BadRequestException("invalid email or password");
  const isValidPassword = await comparePassword(password, foundUser.password);
  if (!isValidPassword) throw new BadRequestException("invalid email or password");
  return foundUser;
}

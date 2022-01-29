import { LoginInput, RegisterInput, UserResponse } from "../types/user";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { validateField } from "../utils/validate";
import {
  VALID_EMAIL_REGEX,
  VALID_PASSWORD_REGEX,
  VALID_USERNAME_REGEX,
} from "../utils/constants";
import { User } from "../entities/User";
import { compare, hash } from "bcryptjs";

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "Hello World";
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("user") { username, email, password }: RegisterInput
  ): Promise<UserResponse> {
    if (!validateField(username, VALID_USERNAME_REGEX))
      return {
        error: {
          field: "username",
          message:
            "Username must be between 3-30 characters, contain only characters, numbers, underscores, no space",
        },
      };

    if (!validateField(email, VALID_EMAIL_REGEX))
      return {
        error: {
          field: "email",
          message: "Invalid email.",
        },
      };

    if (!validateField(password, VALID_PASSWORD_REGEX))
      return {
        error: {
          field: "password",
          message:
            "Password should be above 6 characters, contain uppercase and lowercase letters, numbers and special characters.",
        },
      };
    let existingUser = await User.findOne({ where: { username } });
    if (existingUser)
      return {
        error: {
          field: "username",
          message: "User already exists",
        },
      };
    existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return {
        error: { field: "email", message: "Email has already been taken." },
      };

    const hashedPassword = await hash(password, 12);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    }).save();
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("user") { email, password }: LoginInput
  ): Promise<UserResponse> {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser)
      return { error: { field: "email", message: "User does not exist." } };

    const isValidPassword = await compare(password, existingUser.password);
    if (!isValidPassword)
      return { error: { field: "password", message: "Incorrect password." } };

    return {
      user: existingUser,
    };
  }
}

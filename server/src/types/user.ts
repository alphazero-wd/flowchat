import { User } from "../entities/User";
import { Field, InputType, ObjectType } from "type-graphql";
import { ErrorResponse } from "./error";

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => ErrorResponse, { nullable: true })
  error?: ErrorResponse | null;
}

@InputType()
export class RegisterInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

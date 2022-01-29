import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ErrorResponse {
  @Field(() => String, { nullable: true })
  field: string | null;

  @Field()
  message: string;
}

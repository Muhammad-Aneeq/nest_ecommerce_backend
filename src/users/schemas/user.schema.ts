import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../enums/role.enum';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  name: string;

  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;

  @Prop({
    type: [{type: String, enum: Role}],
    default: [Role.User]
  })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

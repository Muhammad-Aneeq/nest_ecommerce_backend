import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Address  {
 @Prop()
 address: string;

 @Prop()
 city: string;

 @Prop()
 pincode: string;

 @Prop()
 phone: string;

 @Prop()
 notes: string;

}
export const AddressSchema = SchemaFactory.createForClass(Address)


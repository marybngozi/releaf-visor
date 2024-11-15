import { User, UserSchema } from 'src/schemas/user.schema';
import { Mill, MillSchema } from 'src/schemas/mill.schema';

export default [
  { name: User.name, schema: UserSchema },
  { name: Mill.name, schema: MillSchema },
];

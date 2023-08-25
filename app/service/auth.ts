import bcrypt from 'bcrypt';
import User from '../../models/user.ts';
import { LoginForm, RegisterForm } from '../@types/index.d.ts';
import DatabaseError from '../helpers/errors/database.error.ts';
import ServerError from '../helpers/errors/server.error.ts';
import UserInputError from '../helpers/errors/userInput.error.ts';
import createAccesToken from '../helpers/token/create.access.ts';

export async function createUser(data: RegisterForm): Promise<boolean> {

  const { email, username, password } = data;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds).catch((err: any) => {
      if (err) throw new ServerError("Couldn't hash user password");
    });

    if (!hashedPassword) throw new ServerError('hash password is missing');

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    return !!newUser;
  } catch (error) {
    throw new DatabaseError('Most likely the user already exists', 'user', error);
  }
}

export async function login(data: LoginForm):
  Promise<{ accessToken: string; }> {
  const { username, password } = data;

  // set to 1 minute for testing
  // set to an higher value after succed in testing
  const expireTimeAccess = '1m'; // '10 min

  const user = await User.findOne({ username, password });

  if (!user) throw new UserInputError('Wrong credentials');

  if (!await bcrypt.compare(password, user.password)) throw new UserInputError("Password didn't match", 'wrong credentials');

  const accessToken = createAccesToken(
    expireTimeAccess,
    { userId: user.id },
  );

  return { accessToken };
}

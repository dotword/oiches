/* eslint-disable no-useless-catch */
import { compare, hash } from "bcrypt";

export const passwordChangeService = async (password,newPassword,user) => {
  try {
    
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw {
        status: 400,
        message: 'Credenciales inválidas.',
        code: 'Bad Request'
      };
    }

   
    const hashedPass = await hash(newPassword, 10);
    return{
      hashedPass
    }

  } catch (error) {
    throw(error);
  }
};

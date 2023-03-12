import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/dbConnect";
import User from "../../model/User";
import bcrypt from 'bcrypt'

interface ResponseData {
  error?: string;
  message?: string;
  success?: boolean;
  data?: any;
}

const validateForm = async (
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
) => {

  if(password !== passwordConfirm) {
    return { error: 'Passwords do not match', message: 'Passwords do not match. Please check your password again'}
  }

  await dbConnect();

  const emailUser = await User.findOne({ email: email})

  if(emailUser) {
    return { error: 'Email already exitst', message: 'Entered email already exists. Please try with different email address'}
  }

  if(password.length < 5) {
    return { error: 'less than 5', message: 'Password must have 5 or more characters'}
  }

  return null
}

export default async function registerAccount(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if(req.method !== 'POST') {
    return res.status(200).json({ error: 'reqeust is not POST'})
  }

  const { name, email, password, passwordConfirm } = req.body;

  const errorMessage = await validateForm(name, email, password, passwordConfirm)

  const hashedPassword = await bcrypt.hash(password, 12)

  try {
    const userRegister = await new User({
      name: name,
      email: email,
      password: hashedPassword
    })
  
    await userRegister.save()

    res.status(200).json({
      success: true,
      message: 'Registered successfully',
      data: userRegister
    })

  } catch (err: any) {
    console.log(err)
    res.status(400).json({
      success: false,
      message: 'Error found at registering',
    })
  }
}
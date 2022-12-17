import type { Request } from "itty-router";
import { generateAccessToken } from "../../lib/jwt";
import { prisma } from "../../lib/prisma";

export const getData = async ({ params }: Request) => {
  const { email } = params;

  try {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        detail: true,
      },
    });
    
    return new Response(JSON.stringify({ data, message: "Okay" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to find user data" }), { status: 400 });
  }
};

export const signup = async (req: Request) => {
  const { email, password, name } = await req.json();
  const token = generateAccessToken(email);
  try {
    await prisma.user.create({
      data: {
        email,
        password,
        name: name && "",
        token,
      },
    });

    return new Response(JSON.stringify({ message: "Created account" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Created account already" }));
  }
};

export const login = async (req: Request) => {
  const { email, password } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user?.password === password) {
      return new Response(JSON.stringify({
        verified: true,
        token: user?.token,
        message: "User login successfully",
      }));
    }

    return new Response(JSON.stringify({ verified: false, message: "User login unsuccessfully" }), { status: 400 });
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unknown error" }));
  }
};

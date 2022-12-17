import { Request } from "itty-router";
import { prisma } from "../../lib/prisma";

export const getAll = async (req: Request) => {
  const { email } = await req.json();
  try {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        detail: true,
      },
    });
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to find user data" }), { status: 400 });
  }
};

export const getSpecific = async (req: Request) => {
  const { id } = req.params;

  try {
    const data = await prisma.task.findUnique({
      where: {
        id,
      },
    });
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to find user data" }), { status: 400 });
  }
};

export const create = async (req: Request) => {
  const { name, description } = await req.json();

  try {
    const data = await prisma.task.create({
      data: {
        name,
        description,
      },
    });
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to find user data" }), { status: 400 });
  }
};

export const update = async (req: Request) => {
  const { id } = req.params;
  const { name, description } = await req.json();

  try {
    const data = await prisma.task.update({
      where: {
        id,
      },
      data: {
        name,
        description,
      },
    });
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to find user data" }), { status: 400 });
  }
};

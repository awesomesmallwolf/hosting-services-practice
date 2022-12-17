import { Request } from "itty-router";
import { prisma } from "../../lib/prisma";

export const get = async (req: Request) => {
  try {
    const data = await prisma.news.findMany();
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to find user detail data" }), { status: 400 });
  }
};

export const create = async (req: Request) => {
  const { title, text } = await req.json();
  try {
    const data = await prisma.news.create({
      data: {
        title,
        text,
      },
    });
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to create user detail data" }), { status: 400 });
  }
};

export const update = async (req: Request) => {
  const { id } = req.params;
  const { title, text } = await req.json();
  try {
    const data = await prisma.news.update({
      where: {
        id,
      },
      data: { title, text },
    });
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to update user detail data" }), { status: 400 });
  }
};

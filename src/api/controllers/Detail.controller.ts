import { Request } from "itty-router";
import { prisma } from "../../lib/prisma";

export const get = async (req: Request) => {
  const { email } = req.params;
  try {
    const data = await prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .detail();
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to find user detail data" }), { status: 400 });
  }
};
export const create = async (req: Request) => {
  const {
    email,
    temperature,
    blood_pressure,
    pulse_rate,
    hemoglobin,
    hematocrit,
    white_cell,
    platelet,
  } = await req.json();
  try {
    const data = await prisma.detail.create({
      data: {
        temperature,
        blood_pressure,
        pulse_rate,
        hemoglobin,
        hematocrit,
        white_cell,
        platelet,
        user: {
          connect: {
            email,
          },
        },
      },
    });
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to create user detail data" }), { status: 400 });
  }
};
export const update = async (req: Request) => {
  const { id } = req.params;
  const {
    temperature,
    blood_pressure,
    pulse_rate,
    hemoglobin,
    hematocrit,
    white_cell,
    platelet,
  } = await req.json();
  try {
    const data = await prisma.detail.update({
      where: {
        id,
      },
      data: {
        temperature,
        blood_pressure,
        pulse_rate,
        hemoglobin,
        hematocrit,
        white_cell,
        platelet,
      },
    });
    return new Response(JSON.stringify({ data, message: "ok" }));
  } catch (e) {
    return new Response(JSON.stringify({ message: "Unable to update user detail data" }), { status: 400 });
  }
};

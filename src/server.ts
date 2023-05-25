import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { Prisma, PrismaClient } from "@prisma/client";
import { urso } from "@prisma/client";
import cors from '@fastify/cors';
import { request } from 'http';

const prisma = new PrismaClient();
const app = Fastify();
app.register(cors, {
    origin: "*",
});

app.post('/create', async (request: FastifyRequest, reply: FastifyReply) => {
    const { id, name, age, description, gender} = request.body as urso;
    const urso = await prisma.urso.create({
        data: {
            id,
            name,
            age,
            description,
            gender,
        },
    });
    reply.send('Urso created')
});
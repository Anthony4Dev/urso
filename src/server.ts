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

app.get('/ursos', async (request: FastifyRequest, reply: FastifyReply) => {
    const ursos = await prisma.urso.findMany();
    reply.send(ursos)
})

app.get('/ursos/search', async (request: FastifyRequest, reply: FastifyReply) => {
    const { query } = request.query as { query: string };
    try {
        const ursos = await prisma.urso.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { description: { contains: query, mode: 'insensitive' } },
                ],
            },
        });
        reply.send(ursos);
    } catch (error) {
        console.error('Something went wrong:', error);
    }
});
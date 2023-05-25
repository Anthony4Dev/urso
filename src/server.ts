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
    const { id, name, age, description, gender } = request.body as urso;
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

app.put('/ursos/:name', async (request: FastifyRequest, reply: FastifyReply) => {
    const { name } = request.params as { name: string };
    const ursoData = request.body as Prisma.ursoUpdateInput;;

    try {
        const updatedUrso = await prisma.urso.updateMany({
            where: { name: name },
            data: ursoData,
        });

        reply.send('Urso updated!')
    } catch (error) {
        console.error('Something went wrong:', error);
    }
});

app.delete('/ursos/:name', async (request: FastifyRequest, reply: FastifyReply) => {
    const { name } = request.params as { name: string };

    try {
        const deletedUrso = await prisma.urso.deleteMany({
            where: { name: name },
        });

        reply.send('Urso deleted.')

    } catch (error) {
        console.error('Something went wrong:', error);
    }
});

const start = async () => {
    try {
        await app.listen({ port: 3333 });
        console.log('Server listening at http://localhost:3333');
    } catch (error) {
        console.error('Something went wrong.');
        process.exit(1);
    }
};

start();
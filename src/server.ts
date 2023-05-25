import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import { Prisma, PrismaClient } from "@prisma/client";
import { urso } from "@prisma/client";
import cors from '@fastify/cors';
import { request } from 'http';
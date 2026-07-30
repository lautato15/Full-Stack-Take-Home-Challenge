import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../src/generated/client';
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log(process.env.DATABASE_URL);
  await prisma.users.create({
    data: {
      email: 'admin@mail.com',
      password: '1234',
    },
  });
  await prisma.users.create({
    data: {
      email: 'yari@mail.com',
      password: '1234',
    },
  });
  const admin = await prisma.users.findUnique({
    where: { email: 'admin@mail.com' },
  });
  if (admin) {
    await prisma.notifications.create({
      data: {
        authorId: admin.id,
        title: 'Email de bienvenida',
        content: 'Bienvenido',
        channel: 'EMAIL',

        email: {
          create: {
            recipient: 'yari@mail.com',
            sentAt: new Date(),
          },
        },
      },
    });
    (await prisma.notifications.create({
      data: {
        authorId: admin.id,
        title: 'Verificacion por codigo',
        content: 'Su codigo de verificacion es 123456',
        channel: 'SMS',

        sms: {
          create: {
            recipient: 87654321,
            sentAt: new Date(),
          },
        },
      },
    }),
      await prisma.notifications.create({
        data: {
          authorId: admin.id,
          title: 'Promocion',
          content: 'No te pierdas nuestros descuentos',
          channel: 'PUSH',

          push: {
            create: {
              recipient: '4jK9sW2mX8pQ5vL3nB7z',
              sentAt: new Date(),
            },
          },
        },
      }));
    await prisma.notifications.create({
      data: {
        authorId: admin.id,
        title: 'Reunion de los martes',
        content:
          'Queremos avisar que el siguiente martes la reunion sera cancelada por temas de disponibilidad de agenda',
        channel: 'EMAIL',
        email: {
          create: {
            recipient: '4jK9sW2mX8pQ5vL3nB7z',
            sentAt: null,
          },
        },
      },
    });
  }
}

main()
  .then(() => console.log('Seeds ejecutados'))
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IUser {
  name: string;
  email: string;
};

const createUser = async (user: IUser) => {
  const newUser = await prisma.user.create({ data: user });
  console.log(newUser);
};

async function main() {
  createUser({
    name: 'John',
    email: 'john@prisma.io',
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })

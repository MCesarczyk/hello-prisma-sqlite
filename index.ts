import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface IUser {
  name: string;
  email: string;
};

interface IUserWithPosts extends IUser {
  posts: {
    create: {
      title: string;
    }
  }
};

const createUser = async (user: IUser) => {
  const newUser = await prisma.user.create({ data: user });
  console.log(newUser);
};

const fetchUsers = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
};

const createUserWithPost = async (user: IUserWithPosts) => {
  const newUser = await prisma.user.create({ data: user });
  console.log(newUser);
};

const fetchUsersWithPosts = async () => {
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });

  console.dir(usersWithPosts, { depth: null })
};

async function main() {
  // createUser({
  //   name: 'John',
  //   email: 'john@prisma.io',
  // });

  // fetchUsers();

  // createUserWithPost({
  //   name: 'Bob',
  //   email: 'bob@prisma.io',
  //   posts: {
  //     create: {
  //       title: 'Hello World',
  //     },
  //   },
  // });

  fetchUsersWithPosts();
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

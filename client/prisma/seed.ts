import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: { name: "Vaibhav" },
  });

  // Create a poll with reference to the created user
  const poll = await prisma.poll.create({
    data: {
      question: "What is your favourite color?",
      userId: user.id,
      createdAt: new Date(), // Use new Date() to get the current date and time
      options: {
        create: [
          { text: "Red" },
          { text: "Blue" },
          { text: "Green" },
          { text: "Yellow" },
        ],
      },
    },
    include: {
      options: true,
    },
  });

  console.log("User created:", user);
  console.log("Poll created with options:", poll);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

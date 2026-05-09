import { config } from 'dotenv';
config();
import prisma from './lib/db';

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'admin@alhaddaf.ae' }
  });
  console.log('User found:', user);
}
main().catch(console.error);

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import fs from 'fs/promises';

const ROLES = {
  admin: 'admin',
  user: 'user',
};

const users = [
  {
    name: 'vlad',
    password: '123123',
    role: ROLES.admin,
  },
  {
    name: 'dumpUser',
    password: '123123',
    role: ROLES.user,
  },
];

const rl = readline.createInterface({ input, output });

const name = await rl.question('Name: ');

const password = await rl.question('Password: ');

const user = users.find(
  user => user.name === name && user.password === password,
);

if (user) {
  console.log(`Hello ${user.name}`);

  const storage = await rl.question('Chose disk: ');

  const disks = ['A', 'B', 'C'];

  if (disks.includes(storage)) {
    const action = await rl.question('Chose action: ');

    switch (action) {
      case 'read':
        console.log(await fs.readdir(storage));
        break;

      case 'create':
        if (user.role === ROLES.admin) {
          const file = await rl.question('Write file name: ');
          const data = await rl.question('Write file data: ');

          await fs.writeFile(storage + '/' + file, data);
          break;
        }
        console.warn('You are not admin !');
        break;

      default:
        console.warn('Choose correct option (create/read)');
    }
  } else {
    console.warn('Choose correct disk (A/B/C)');
  }
} else {
  console.log('Login error');
}

rl.close();
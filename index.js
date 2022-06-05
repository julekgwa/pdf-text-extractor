import { makeApp } from './app/app.js';

makeApp()
  .then((app) => app.listen(8080, '192.168.1.115'))
  .then(() => {

    console.log('Server started');

  })
  .catch((err) => {

    console.error('caught error', err);

  });

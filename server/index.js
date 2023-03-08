const app = require('./app');

const { syncAndSeed, client } = require('./db');
// const express = require('express')
// const server = express();

// const apiRouter = require('./api');
// server.use('api', apiRouter);

// const morgan = require('morgan');
// server.use(morgan('dev'))




const init = async()=> {
  try {
    await client.connect();
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    const server = app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();




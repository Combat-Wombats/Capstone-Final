const app = require('./app');
const { syncAndSeed, syncProductsTable, client } = require('./db');


const init = async()=> {
  try {
    await client.connect();
    await syncAndSeed();
    await syncProductsTable();

    const port = process.env.PORT || 5432;
    const server = app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();




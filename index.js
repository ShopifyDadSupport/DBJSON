const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(jsonServer.bodyParser);
var Datastore = require('nedb')
  , db = new Datastore("database.db");
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
});

// Define a custom route to handle POST requests
server.post('/orders', (req, res) => {
  // Get the data from the request body
  const newData = req.body;

  // Add the data to db.json
  router.db.get('order').push(newData).write();

  // Respond with the added data
  res.json(newData);
});

// Define a custom route to handle DELETE requests
server.delete('/orders/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Remove the order with the specified id from db.json
  router.db.get('order').remove({ order_id: id }).write();

  // Respond with a success message
  res.json({ message: `Order with id ${id} deleted successfully.` });
});

server.use(router);

var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://dbjson-fbvh.onrender.com/order',
  'headers': {
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
  data = JSON.parse(response.body);
  db.insert(data);
});

server.listen(3004, () => {
  console.log('JSON Server is running');
});

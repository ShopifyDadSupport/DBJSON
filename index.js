const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

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

server.listen(3004, () => {
  console.log('JSON Server is running');
});

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/db.json');
const middlewares = jsonServer.defaults();
const fs = require('fs');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// แก้ไขข้อมูลใน db.json โดยตรง
server.put('/courses', (req, res) => {
  const newData = req.body;
  fs.writeFileSync('data/db.json', JSON.stringify({ students: require('./data/db.json').students, courses: newData }, null, 2));
  res.sendStatus(200);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
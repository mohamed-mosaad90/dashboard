const express = require('express');
const { connect } = require("./DataBase/database");
const routes = require("./Routes/route");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors()); // Add CORS middleware here

app.use(bodyParser.json());
app.use(express.json());
const port = 3000;
app.use('/', routes);
app.use("/images", express.static('images'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

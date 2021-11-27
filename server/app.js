const express = require("express");
require('dotenv').config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");

const app = express();
const db=require("./helpers/db")();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(5000, () => {
  console.log("server is running on port 5000");
});

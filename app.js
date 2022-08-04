const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
var { graphqlHTTP } = require('express-graphql');
const  graphqlSchema = require('./graphql/schema');
const  graphqlResolver = require('./graphql/resolvers');

const MONGODB_URI =
'mongodb+srv://root:root@cluster0.ps3p8.mongodb.net/test?retryWrites=true&w=majority';

const app = express();

app.use('/graphql',graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver

}));
mongoose
.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

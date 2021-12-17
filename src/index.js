import React from 'react';
import ReactDOM from 'react-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  HttpLink,
} from "@apollo/client";

import Proyectos from './components/Proyectos';
import CrearProyecto from './components/CrearProyecto';
import Menu from './components/Menu';
import ListaUsuarios from './components/ListaUsuarios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NoExiste from './components/NoExiste';
import Login from './components/Autenticar';
import EditarProyecto from './components/EditarProyecto';
import CrearUsuario from './components/CrearUsuario';


const httpLink = new HttpLink({ uri: 'http://localhost:9092/graphql' });

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('auth_token');
  operation.setContext({
    headers: {
      authorization: token ? `${token}` : ''
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


const inicio = document.getElementById("root")

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/usuario/registro" component={CrearUsuario} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/usuario" component={ListaUsuarios} />
        <Route exact path="/proyecto" component={CrearProyecto} />
        <Route exact path="/proyecto/listar" component={Proyectos} />
        <Route exact path="/proyecto/:idProyecto" component={EditarProyecto} />
        <Route path="/" component={NoExiste} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>, inicio)
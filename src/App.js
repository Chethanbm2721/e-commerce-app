import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import Category from './pages/Category';
import Checkout from './pages/Checkout';
import Home from './pages/Home';

function App() {
  return (
    <>
    <Navbar />
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/category/:id">
        <Category />
      </Route>

      <Route exact path="/checkout">
        <Checkout />
      </Route>
    </Switch>
    </>
  )
}

export default App;

import React, { useEffect } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import CreateBreed from './components/Create/CreateBreed';
import BreedDetail from './components/Breeds/BreedDetail';
import NotFound from './components/Status/NotFound';
import { useDispatch } from 'react-redux';
import { getBreeds, getTemperaments } from './redux/actions';

axios.defaults.baseURL = 'https://pi-breeds-production.up.railway.app/';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBreeds());
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route>
          <NavBar />
          <Switch>
            <Route exact path='/breeds'>
              <Home />
            </Route>
            <Route exact path='/breeds/:id'>
              <BreedDetail />
            </Route>
            <Route exact path='/create'>
              <CreateBreed />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </>
  );
}

export default App;

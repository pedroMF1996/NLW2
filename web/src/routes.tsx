import React from  'react';
import { BrowserRouter, Route} from 'react-router-dom';
import Landing from './assets/pages/Landing';
import TeatcherList from './assets/pages/TeatcherList';
import TeatcherFrom from './assets/pages/TeatcherForm';

function Routes(){
    return (
    <BrowserRouter>
        <Route path="/" exact component={Landing}></Route>
        <Route path="/study" component={TeatcherList}></Route>
        <Route path="/give-classes" component={TeatcherFrom}></Route>
    </BrowserRouter>
);
}

export default Routes;
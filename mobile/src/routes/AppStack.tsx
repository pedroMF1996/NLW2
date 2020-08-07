import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import LandingPage from '../Pages/Landing';
import GiveClassesPage from '../Pages/GiveClasses';
import TeatcherList from '../Pages/TeatcherList';
import Favorites from '../Pages/Favorites';
import StudyTabs from './StudyTabs';

const {Navigator, Screen} = createStackNavigator()

function AppStack(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false}}>
                <Screen name="Landing" component={LandingPage}/>
                <Screen name="Give Classes" component={GiveClassesPage}/>
                <Screen name="Study" component={StudyTabs}/>
            </Navigator>
        </NavigationContainer>
    )
}

export default AppStack;
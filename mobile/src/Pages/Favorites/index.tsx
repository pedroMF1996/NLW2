import React, { useState} from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect} from '@react-navigation/native';

import PageHeader from '../../Components/PageHeader';
import TeatcherItem, { Teatcher } from '../../Components/TeatcherItem';

import styles from './style';

function Favorites(){
    const [favorites,setFavorites] = useState([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(res => {
            if(res){
                const favoritedTeachers = JSON.parse(res);

                setFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(()=>{
        React.useCallback(() =>{ loadFavorites()},[]);
    });

    return(
        <View>
            <PageHeader title="Meus proffys favritos"/>
            <ScrollView style={styles.teatcherList} contentContainerStyle={{paddingHorizontal:16, paddingBottom:16}}>
                {favorites.map((teatcher:Teatcher) =>{
                    return <TeatcherItem teatcher={teatcher} key={teatcher.id} favorited={true}/>
                })}
                
            </ScrollView>
        </View>
    )
}

export default Favorites;
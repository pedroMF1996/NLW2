import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import {Feather} from '@expo/vector-icons'
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


import PageHeader from '../../Components/PageHeader/index';
import TeatcherItem, { Teatcher } from '../../Components/TeatcherItem'; 

import api from '../../services/api';

import styles from './style';
import { useFocusEffect } from '@react-navigation/native';

function TeatcherList(){
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [subject,setSubject] = useState('');
    const [week_day,setWeekDay] = useState('');
    const [time,setTime] = useState('');
    const [teatchers,setTeatchers] = useState([]);
    const [favorites,setFavorites] = useState<number[]>([]);

    function loadFavorites(){
        AsyncStorage.getItem('favorites').then(res => {
            if(res){
                const favoritedTeachers = JSON.parse(res);
                
                const favoritedTeachersIds = favoritedTeachers.map((teacher:Teatcher) => {
                    return teacher.id
                });

                setFavorites(favoritedTeachersIds);
            }
        });
    }
    
    useFocusEffect(()=>{
        React.useCallback(() =>{ loadFavorites()},[]);
    });
    
    function handleToggleFilttersVisible(){
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit(){

        const response = await api.get('classes',{
            params:{
                subject, 
                week_day, 
                time
            }
        });

        setTeatchers(response.data);
        handleToggleFilttersVisible();
        loadFavorites();
    }


    return(
        <View>
            <PageHeader title="Proffys disponíveis" headerRight={(
                <BorderlessButton onPress={handleToggleFilttersVisible}>
                    <Feather name="filter" size={20} color="#fff"/>
                </BorderlessButton>
            )}>
                {isFiltersVisible && (
                <View style={styles.searchForm}>

                    <Text style={styles.label}>
                        Matéria:
                    </Text>

                    <TextInput
                        placeholderTextColor='#c1dccc' 
                        style={styles.input}
                        placeholder="Qual a matéria?"
                        value={subject}
                        onChangeText={text => setSubject(text)}
                    />

                    <View style={styles.inputGroup}>

                        <View style={styles.inputBlock}>

                            <Text style={styles.label}>Dia da semana:</Text>

                            <TextInput
                                placeholderTextColor='#c1dccc'
                                style={styles.input}
                                placeholder='Qual o dia?'
                                value={week_day}
                                onChangeText={text => setWeekDay(text)}
                            />

                        </View>

                        <View style={styles.inputBlock}>

                            <Text style={styles.label}>Horário:</Text>

                            <TextInput
                                placeholderTextColor='#c1dccc'
                                style={styles.input}
                                placeholder='Qual horário?'
                                value={time}
                                onChangeText={text => setTime(text)}
                            />

                        </View>
                    </View>
                    
                    <RectButton 
                        style={styles.submitButton}
                        onPress={handleFiltersSubmit}
                    >
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>

                </View>
            )}

            </PageHeader>
            <ScrollView style={styles.teatcherList} contentContainerStyle={{paddingHorizontal:16, paddingBottom:16}}>
                {teatchers.map((teatcher:Teatcher, index) => {
                    return (
                        <TeatcherItem 
                            teatcher={teatcher} 
                            favorited={favorites.includes(teatcher.id)}
                            key={index}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeatcherList;
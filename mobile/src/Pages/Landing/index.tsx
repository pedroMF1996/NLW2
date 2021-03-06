import React, { useState, useEffect } from 'react';
import styles from './style';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import {RectButton} from 'react-native-gesture-handler';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png'
import giveClassesIcon from '../../assets/images/icons/give-classes.png'
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';

function Landing(){

    const [totalConnections, setTotalConnection] = useState(0);

    useEffect(()=>{
        api.get('connections').then( res => {
            const {total} = res.data;

            setTotalConnection(total);
        });
    });

    const {navigate} = useNavigation();


    function handleNavegateToClassesPage(){
        navigate('Give Classes');
    }

    function handleNavigateToStudyPage(){
        navigate('Study');
    }

    return(
        <View style={styles.container}>
            <Image source={landingImg} style={styles.baner}/>
            <Text style={styles.title}>
                Seja bem vindo {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton 
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={handleNavigateToStudyPage}
                >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>
                <RectButton 
                    style={[styles.button, styles.buttonSecondary]} 
                    onPress={handleNavegateToClassesPage}
                >
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas {' '}
                <Image source={heartIcon}/>
            </Text>
        </View>
    )
};

export default Landing;
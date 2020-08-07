import React from 'react';
import { View, Image, ImageBackground, Text } from 'react-native';

import giveClassBackgroundImage from '../../assets/images/give-classes-background.png';

import styles from './style';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){

    const {goBack} = useNavigation();

    function handleNavigateBack(){
        goBack();
    }

    return(
        <View style={styles.container}>
            <ImageBackground 
                source={giveClassBackgroundImage} 
                style={styles.content}
                resizeMode="contain"
            >
                <Text style={styles.title}>
                    Quer ser um Proffy?
                </Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar em nossa plataforma web.
                </Text>
            </ImageBackground>
            <RectButton 
                style={styles.AllOkButton}
                onPress={handleNavigateBack}
            >
                <Text style={styles.okButtonText}>
                    Tudo bem!
                </Text>
            </RectButton>
        </View>
    );
};

export default GiveClasses;

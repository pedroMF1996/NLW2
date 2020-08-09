import React, { useState } from 'react';
import { View, Image, Text, Linking} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartIcon from '../../assets/images/icons/heart-outline.png';
import unfavoritIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './style';
import api from '../../services/api';

export interface Teatcher{
    id:number,
    avatar: string,
    name:string,
    subject: string,
    bio:string,
    whatsapp:string,
    cost:string
}

interface TeatcherItemProps{
    teatcher: Teatcher,
    favorited: boolean
}

const TeatcherItem: React.FC<TeatcherItemProps> = ({teatcher, favorited})=>{
    const [isFavorited, setIsFavorited] = useState(favorited);

    function handleLinkToWhastapp(){
        api.post('connections', {
            user_id: teatcher.id
        });
        Linking.openURL(`whatsapp://send?phone=${teatcher.whatsapp}`);
    }

    async function onToggleFavorit(){
        const res = await AsyncStorage.getItem('favorites') || '[]';
        const favoritesArray = JSON.parse(res);

        if(isFavorited){
            const newFavoriteArray = favoritesArray.filter((item: Teatcher) => item.id !== teatcher.id)
            updateAsyncStorage(newFavoriteArray);
        }else{
            favoritesArray.push(teatcher);
            updateAsyncStorage(favoritesArray);
        }
    }

    async function  updateAsyncStorage(favoritesArray: Teatcher[]){
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
        setIsFavorited(!isFavorited);
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    source={{uri:  teatcher.avatar}}
                    style={styles.avatar}
                />
                <View style={styles.profileInfo}>
                        <Text style={styles.name}>{teatcher.name}</Text>
                        <Text style={styles.subject}>{teatcher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {teatcher.bio}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'    '}
                    <Text style={styles.priceValue}>
                        R$ {teatcher.cost}
                    </Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton 
                        style={[styles.favButton, isFavorited && styles.favorited]}
                        onPress={onToggleFavorit}
                    >
                        {isFavorited  ?
                            <Image source={unfavoritIcon}/>  : 
                            <Image source={heartIcon}/>}                        
                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleLinkToWhastapp}>
                        <Image source={whatsappIcon}/>
                        <Text style={styles.contactButtonText}>
                            Entar em contato.
                        </Text>
                    </RectButton>
                    
                </View>
            </View>
        </View>
    )
}

export default TeatcherItem;
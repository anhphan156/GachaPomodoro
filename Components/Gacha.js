import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import Burger from './Utilities/Burger';
import { db } from '../misc/firebase';
import { useAuth } from '../Contexts/AuthContext';

const getCharacters = async () => {
    const querySnapShot = await db.collection('Characters').get();

    return querySnapShot.docs.map(x => x.data());
};

const getCurrentUser = async currentUserId => {
    const querySnapShot = await db.collection('Users').doc(currentUserId).get();

    return querySnapShot.data();
};

const getRandomItem = async () => {
    const n = Math.floor(Math.random() * 100);

    if(n === 0){
        const rarity5 = (await getCharacters()).filter(x => x.rarity === 5);

        return rarity5[Math.floor(Math.random() * rarity5.length)];
    }else if(n <= 10){
        const rarity4 = (await getCharacters()).filter(x => x.rarity === 4);

        return rarity4[Math.floor(Math.random() * rarity4.length)];
    }else{
        return {gold: 10000, book: 20};
    }
};

const Gacha = ({navigation}) => {

    const currentUserId = useAuth().currentUser.uid;

    const [box, setBox] = useState(0);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCurrentUser(currentUserId).then(data => {
                setBox(data.item.box.amount);
            });
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={{flex:1, padding:30}}>
                <Burger navigation={navigation} />
            </View>
            <View style={[styles.centeredView,{flex: 10}]}>
                <View style={{marginBottom: 30}}>
                    <Text style={{fontSize: 20}}>{box} Box available</Text>
                </View>
                <Image style={{width:150, height:150}} source={require('../assets/cube.png')} />
                <View style={{marginTop: 30}}>
                    <Button 
                        title="open" 
                    />
                </View>
            </View>
        </View>
    );
};

// const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Gacha;
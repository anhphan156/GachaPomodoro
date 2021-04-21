import React, { useEffect, useState } from 'react';
import { Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Burger from './Utilities/Burger';
import { db } from '../misc/firebase';
import { useAuth } from '../Contexts/AuthContext';

import ItemShow from './ItemShow';
import { getCurrentUser, getCharacters } from '../misc/DA';
import firebase from 'firebase/app'; // to get the arrayUnion function

const getRandomItem = async () => {
    const n = Math.floor(Math.random() * 100);

    if (n <= 1) {
        const rarity5 = (await getCharacters()).filter(x => x.rarity === 5);

        return rarity5[Math.floor(Math.random() * rarity5.length)];
    } else if (n <= 10) {
        const rarity4 = (await getCharacters()).filter(x => x.rarity === 4);

        return rarity4[Math.floor(Math.random() * rarity4.length)];
    } else {
        return { name: "10000 Golds and 20 Experience Books", gold: 10000, book: 20, rarity: 3, image: 'gold.png' };
    }
};


const GachaScreen = ({ navigation }) => {

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
            <View style={{ flex: 1, padding: 30 }}>
                <Burger navigation={navigation} />
            </View>
            <View style={[styles.centeredView, { flex: 10 }]}>
                <View style={{ marginBottom: 30 }}>
                    <Text style={{ fontSize: 20 }}>{box} Box available</Text>
                </View>
                <Image style={{ width: 150, height: 150 }} source={require('../assets/cube.png')} />
                <View style={{ marginTop: 30 }}>
                    <Button
                        title="open"
                        disabled={box <= 0}
                        onPress={() => {
                            getRandomItem().then(item => {
                                const updateInventory = item.rarity === 3?
                                    {
                                        'item.book.amount': firebase.firestore.FieldValue.increment(item.book),
                                        'item.gold.amount': firebase.firestore.FieldValue.increment(item.gold),
                                        'item.box.amount': firebase.firestore.FieldValue.increment(-1)
                                    }:
                                    {
                                        ['item.character.'+item.name]: firebase.firestore.FieldValue.increment(1),
                                        'item.box.amount': firebase.firestore.FieldValue.increment(-1)
                                    };
                                db.collection('Users') // update the reward to the user
                                    .doc(currentUserId)
                                    .update(
                                        updateInventory
                                    ).then(() => {
                                        navigation.navigate('ItemShow', { item });
                                    }).catch(err => reject('Error: ' + err));
                            });
                        }}
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

const Stack = createStackNavigator();

const Gacha = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Gacha" component={GachaScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ItemShow" component={ItemShow} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Gacha;
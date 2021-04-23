import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Dimensions, ScrollView, Image, Button } from 'react-native';

import Burger from './Utilities/Burger';
import { useAuth } from '../Contexts/AuthContext';
import { getCurrentUser, getCharacters } from '../misc/DA';
import { Images } from './Utilities/LoadImage';
import { db } from '../misc/firebase';
import firebase from 'firebase/app'; // to get the arrayUnion function

const onAscend = (currentUserId, requiredGold, requiredBook, characterName) => {
    db.collection('Users') 
    .doc(currentUserId)
    .update({
        'item.book.amount': firebase.firestore.FieldValue.increment(-1 * requiredBook),
        'item.gold.amount': firebase.firestore.FieldValue.increment(-1 * requiredGold),
        ['item.character.'+characterName]: firebase.firestore.FieldValue.increment(1)
    }).then(() => {
    }).catch(err => reject('Error: ' + err));
}

const Character = ({navigation}) => {

    const currentUserId = useAuth().currentUser.uid;

    const [currentUserCharacters, setCurrentUserCharacters] = useState();
    const [currentUserGold, setCurrentUserGold] = useState();
    const [currentUserBook, setCurrentUserBook] = useState();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getCurrentUser(currentUserId).then(user => {
                setCurrentUserGold(user.item.gold.amount);
                setCurrentUserBook(user.item.book.amount);
                getCharacters().then(characters => {
                    setCurrentUserCharacters(
                        characters
                            .filter(x => Object.keys(user.item.character).includes(x.name))
                            .map(x => ({...x, level: user.item.character[x.name]}))
                    );
                });
            });
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1, paddingHorizontal: 30}}>
                <Burger navigation={navigation} />
            </View>
            <View style={{flex: 4}}>
                <ScrollView 
                    horizontal={true} 
                    pagingEnabled={true} 
                    showsHorizontalScrollIndicator={false} 
                    bounces={true}
                >
                {
                    currentUserCharacters && currentUserCharacters.map(x => {

                        const requiredGold = x.gold + x.goldRate * x.level;
                        const enoughGold = currentUserGold > requiredGold;

                        const requiredBook = x.book + x.bookRate * x.level;
                        const enoughBook = currentUserBook > requiredBook;

                        return (
                            <View>
                                <View>
                                    <Text style={{fontSize: 30, textAlign:'center'}}>{x.name}</Text>
                                </View>
                                <View style={styles.row}>
                                    <View style={{ width: width * 0.7 }}>
                                        <Image style={{width: 250, height: 250}} source={Images[x.name.toLowerCase()]}/>
                                    </View>
                                    <View style={{marginTop: 30}}>
                                        <Text>Level: {x.level}</Text>
                                        <Text>HP: {x.level * x.HPRate + x.HP}</Text>
                                        <Text>ATK: {x.level * x.ATKRate + x.ATK}</Text>
                                        <Text>DEF: {x.level * x.DEFRate + x.DEF}</Text>
                                    </View>
                                </View>
                                <View style={{paddingHorizontal: 30}}>
                                    <Text style={{fontSize: 30, textAlign:'center', marginBottom: 20}}>Ascend</Text>
                                    <Text>
                                        Gold:  
                                        <Text style={{color: enoughGold? 'green' : 'red'}}> {currentUserGold} </Text> 
                                        / {requiredGold}
                                    </Text>
                                    <Text>
                                        Book:  
                                        <Text style={{color: enoughBook? 'green' : 'red'}}> {currentUserBook} </Text> 
                                        / {requiredBook}
                                    </Text>
                                    <View style={{width: width*0.2, alignSelf:'center', marginTop: 20}}>
                                        <Button 
                                            title="Ascend" 
                                            disabled={!enoughBook || !enoughGold}
                                            onPress={() => {
                                                onAscend(currentUserId, requiredGold, requiredBook, x.name);
                                                setCurrentUserGold(currentUserGold - requiredGold);
                                                setCurrentUserBook(currentUserBook - requiredBook);

                                                x.level += 1;
                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                        );
                    })
                }
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 40,
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
        width
    }
});

export default Character;
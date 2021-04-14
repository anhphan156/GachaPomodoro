import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Modal, Button } from 'react-native';

import Burger from './Utilities/Burger';
import { Prompt } from './Utilities/Prompt';
import TimerPicker from './Utilities/TimerPicker';
import { db } from '../misc/firebase';
import { useAuth } from '../Contexts/AuthContext';
import { FlatList } from 'react-native-gesture-handler';

import firebase from 'firebase/app'; // to get the arrayUnion function

// Get all the frequently used categories of current user
const getCurrentUserCategories = async function(currentUserId){
    const result = await db.collection('Users').doc(currentUserId).get();

    return result.data().categories;
};

const Timer = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [category, setCategory] = useState('Category');
    const [taskName, setTaskName] = useState('');

    // const minutes = [...Array(121).keys()].slice(10); // to render a list of minutes
    const minutes = [...Array(121).keys()]; 

    const [duration, setDuration] = useState(); // to store the duration that user clicked

    const [newInterval, setNewInterval] = useState(); // id of interval object from firestore

    const [currentUserCategories, setCurrentUserCategories] = useState();

    const currentUserId = useAuth().currentUser.uid;

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <Burger navigation={navigation} />
            </View>
            {/* Asking for TaskName, and Category */}
            <View style={[styles.taskName, {flex: 1}]}>
                <Prompt placeholder="Pick a Task" onChangeText={x => setTaskName(x)} />
                <Modal 
                    animationType='slide'
                    transparent={false}     
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <View style={{flex:3}}>
                            <FlatList 
                                data={currentUserCategories} 
                                renderItem={({item}) => <Text onPress={() => {setCategory(item); setModalVisible(false)}} style={{fontSize: 30, borderBottomWidth: 1}}>{item}</Text>}
                            />
                        </View>
                        {/* Add a new category to firestore */}
                        <View style={{flex:1}}>
                            <Prompt placeholder="Add a New Category" onChangeText={x => {setCategory(x); }} />
                            <Button 
                                title="Select"
                                onPress={() => {
                                    db.collection('Users')
                                    .doc(currentUserId)
                                    .update({
                                        categories: firebase.firestore.FieldValue.arrayUnion(category)
                                    }).then(() => setModalVisible(false));
                                }}
                            />
                        </View>
                    </View>
                </Modal>
                <Pressable 
                    style={[styles.roundedButton, {marginTop: 10}]} 
                    onPress={() => {
                        setModalVisible(!modalVisible);
                        getCurrentUserCategories(currentUserId).then(x => setCurrentUserCategories(x));
                    }}
                >
                    <Text style={category === 'Category' ? {color: 'grey'} : {color: 'black'}}>{category}</Text>
                </Pressable>
            </View>
            {/* Showing rewards */}
            <View style={[styles.centeredView, {flex: 2}]}>
                <Text>10 Experience Books</Text>
                <Text>1 Box</Text>
            </View>
            {/* Showing Time picker */}
            <View style={[styles.centeredView, {flex: 3}]}>
                <TimerPicker 
                    data={minutes} 
                    setDuration={setDuration}
                    onStart={() => {
                        return new Promise((resolve, reject) => {
                            db.collection('Intervals').add({
                                uid: currentUserId,
                                start: new Date(),
                                duration,
                                taskName,
                                category
                            }).then(x => {
                                setNewInterval(x._delegate._key.path.segments[1]);
                                resolve();
                            }).catch(err => reject(`Error: ${err}`));
                        });
                    }}
                    onEnd={() => {
                        return new Promise((resolve, reject) => {
                            db.collection('Intervals')
                            .doc(newInterval)
                            .update({
                                end: new Date()
                            }).then(() => {
                                resolve();
                            }).catch(err => reject(`Error: ${err}`));
                        });
                    }}
                />
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 40,
        flexDirection: 'column',
    },
    taskName: {
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    roundedButton: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 2,
        elevation: 1
    }
});

export default Timer;
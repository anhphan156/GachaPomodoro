import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Modal } from 'react-native';

import Burger from './Utilities/Burger';
import { Prompt } from './Utilities/Prompt';
import TimerPicker from './Utilities/TimerPicker';
import { db } from '../misc/firebase';
import { useAuth } from '../Contexts/AuthContext';

const Timer = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [category, setCategory] = useState('Category');
    const [taskName, setTaskName] = useState('');

    // const minutes = [...Array(121).keys()].slice(10);
    const minutes = [...Array(121).keys()];

    const [newInterval, setNewInterval] = useState();

    const currentUserId = useAuth().currentUser.uid;

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <Burger navigation={navigation} />
            </View>
            <View style={[styles.taskName, {flex: 1}]}>
                <Prompt placeholder="Pick a Task" onChangeText={x => setTaskName(x)} />
                <Modal 
                    animationType='slide'
                    transparent={false}     
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(!modalVisible)}
                >
                    <View style={styles.centeredView}>
                        <Text onPress={() => { setCategory('Study'); setModalVisible(!modalVisible); }}>Study</Text>
                        <Text onPress={() => { setCategory('Working'); setModalVisible(!modalVisible); }}>Working</Text>
                    </View>
                </Modal>
                <Pressable style={[styles.roundedButton, {marginTop: 10}]} onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={category === 'Category' ? {color: 'grey'} : {color: 'black'}}>{category}</Text>
                </Pressable>
            </View>
            <View style={[styles.centeredView, {flex: 2}]}>
                <Text>10 Experience Books</Text>
                <Text>1 Box</Text>
            </View>
            <View style={[styles.centeredView, {flex: 3}]}>
                <TimerPicker 
                    data={minutes} 
                    onStart={() => {
                        return new Promise((resolve, reject) => {
                            db.collection('Intervals').add({
                                uid: currentUserId,
                                start: new Date(),
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
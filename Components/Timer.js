import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Modal, Button } from 'react-native';


import Burger from './Utilities/Burger';
import { Prompt } from './Utilities/Prompt';
import TimerPicker from './Utilities/TimerPicker';

const Timer = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [category, setCategory] = useState('Category');

    const minutes = [...Array(121).keys()].slice(10);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <Burger navigation={navigation} />
            </View>
            <View style={[styles.taskName, {flex: 1}]}>
                <Prompt placeholder="Pick a Task"/>
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
                <TimerPicker data={minutes}/>
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
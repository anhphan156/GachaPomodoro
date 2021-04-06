import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, Modal } from 'react-native';

import Burger from './Utilities/Burger';
import { PrimaryHeading } from './Texts/Heading';
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
            <View style={styles.taskName}>
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
                    <Text style={styles.textGrey}>{category}</Text>
                </Pressable>
            </View>
            <View style={[styles.centeredView, {flex: 5}]}>
                <TimerPicker data={minutes} />
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
        flex: 2,
        justifyContent: "flex-start",
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22
    },
    textGrey: {
        color: 'grey'
    },
    roundedButton: {
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 2,
        elevation: 1
    }
});

export default Timer;
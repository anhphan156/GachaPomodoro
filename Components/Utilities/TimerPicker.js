import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useState } from 'react/cjs/react.development';

import BackgroundTimer from 'react-native-background-timer';

import { pad } from './misc';

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        width: 0.47 * width,
        height: 200,
        overflow: 'hidden',
        alignItems: 'center'
    }
});

const TimePicker = props => {

    const scrollY = React.useRef(new Animated.Value(0)).current;
    
    const [showPicker, setShowPicker] = useState(true);
    const [minute, setMinute] = useState(10);
    const [second, setSecond] = useState(0);
    
    return (
        showPicker? 
            <View style={[styles.container, {flexDirection: 'column' }]}>
                <Text style={{textAlign: 'left', fontSize: 30}}>Pick a Time</Text>
                <FlatList 
                    data={props.data} 
                    keyExtractor={x => x.toString()}
                    renderItem={({item, index}) => {
                        const scale = scrollY.interpolate({
                            inputRange: [-1, 0, index * 2, (index + 2) * 20],
                            outputRange: [1, 1, 1, 0]
                        })

                        return (
                            <Animated.View style={{transform: [{scale}]}}>
                                <TouchableOpacity onPress={() => {setMinute(item); setShowPicker(!showPicker)}}>
                                    <Text style={{width: 0.15 * width, textAlign: 'center', fontSize: 30}}>{item} </Text>
                                </TouchableOpacity>
                            </Animated.View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                /> 
            </View>
            :
            <View style={{marginTop: 5}}>
                <Text style={{width: 0.2 * width, textAlign: 'center', fontSize: 30}} onPress={() => setShowPicker(!showPicker)}>{minute}:{pad(second)}</Text>
                <Button title="Start" onPress={() => {
                    BackgroundTimer.runBackgroundTimer(() => {
                        setSecond(second - 1);
                        if(second === 0){
                            // BackgroundTimer.stopBackgroundTimer();
                        }
                    }, 1000);
                }} />
            </View>
    );
};

export default TimePicker;
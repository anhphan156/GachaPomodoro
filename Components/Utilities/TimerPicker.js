import React from 'react';
import { useEffect } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import Animated, { min } from 'react-native-reanimated';
import { useState } from 'react/cjs/react.development';

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
    const [time, setTime] = useState(0);

    const [start, setStart] = useState();

    useEffect(() => {
        if (!start) return;
        
        if(time === 0){
            setTime(0);
            setMinute(10);
            setSecond(0);
            setStart(false);

            return;
        }

        setTimeout(() => {
            setTime(minute * 60 + second - 1);
            console.log(`time: ${time} -- second: ${second} -- minute: ${minute}`);


            if(second === 0){
                setSecond(59);
                setMinute(minute - 1);
            }else{
                setSecond(second - 1)
            }
        }, 1000);

    }, [start, second]);
    
    return (
        showPicker && !start? 
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
                <Text style={{width: 0.2 * width, textAlign: 'center', fontSize: 30}} onPress={() => setShowPicker(!showPicker)}>{pad(minute)}:{pad(second)}</Text>
                <Button title="Start" onPress={() => {setTime(minute * 60 + second); setStart(!start);}} />
            </View>
    );
};

export default TimePicker;
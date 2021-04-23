import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Button, Vibration } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import Animated, { min } from 'react-native-reanimated';

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
    const [minute, setMinute] = useState(10); // The minute number that the user picked
    const [second, setSecond] = useState(0); // to render on the view
    const [time, setTime] = useState(0); // Duration in seconds, for the clock to tick

    const [start, setStart] = useState();


    useEffect(() => {
        if (!start) return;
        
        if(time === 0){
            props.onEnd().then(() => {
                setTime(0);
                setMinute(10);
                props.onChange(10);
                setSecond(0);
                setStart(false);
                
                Vibration.vibrate(3000);
            }).catch(err => console.log(err));
            return;
        }

        setTimeout(() => {
            setTime(minute * 60 + second - 1);
            // console.log(`time: ${time} -- second: ${second} -- minute: ${minute}`);

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
                                <TouchableOpacity 
                                    onPress={() => {

                                        props.onChange(item);

                                        setMinute(item); 
                                        setShowPicker(!showPicker)
                                    }}
                                 >
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
                <Button 
                    title="Start" 
                    onPress={() => {
                        props.onStart().then(() => {
                            setTime(minute * 60 + second); 
                            setStart(true);
                        }).catch(err => console.log(err));
                    }}
                    disabled={start}
                />

                {/* <Button title="test pause" onPress={() => setStart(false)} /> */}
            </View>
    );
};

export default TimePicker;
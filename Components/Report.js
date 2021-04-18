import React, { useRef } from 'react';
import { View, StyleSheet, Button, Dimensions } from 'react-native';

import Burger from './Utilities/Burger';
import WeeklyReport from './ReportViews/WeeklyReport';
import DailyReport from './ReportViews/DailyReport';
import { ScrollView } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

const Report = ({ navigation }) => {
    const scrollViewRef = useRef(null);
    return (
        <View style={styles.container}>
            <View style={{flex:1, padding:30}}>
                <Burger navigation={navigation} />
            </View>
            <View style={{flex:5}}>
                <ScrollView 
                    horizontal={true} 
                    pagingEnabled={true} 
                    showsHorizontalScrollIndicator={false} 
                    bounces={true}
                    ref={scrollViewRef}
                >
                    <WeeklyReport />
                    <DailyReport />
                </ScrollView>
            </View>
            <View style={{flex:1, marginHorizontal: 0.35 * width}}>
                <Button 
                    title="Next" 
                    onPress={() => {
                        if(scrollViewRef.current !== null){
                            scrollViewRef.current.scrollTo({
                                x: width,
                                animated: true
                            })
                        }
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#7ccaf4'
    }
});

export default Report;
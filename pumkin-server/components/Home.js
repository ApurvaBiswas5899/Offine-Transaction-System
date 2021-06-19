import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

const logdata = [{To: '9326004454', From: '9969282161', Amount: '2,500', Message: 'KFC Money', State: '0'}, 
                {Message: 'Processing transaction', State: '1'},
                {Message: 'Transaction successful', State: '2'},
                {Message: 'Confirmation sent to 9969282161', State: '3'},
                {Message: 'Confirmation sent to 9326004454', State: '4'},
                {To: '9326004454', From: '9969282161', Amount: '2,500', Message: 'KFC Money', State: '0'}, 
                {Message: 'Processing transaction', State: '1'},
                {Message: 'Transaction successful', State: '2'},
                {Message: 'Confirmation sent to 9969282161', State: '3'},
                {Message: 'Confirmation sent to 9326004454', State: '4'},
                {To: '9326004454', From: '9969282161', Amount: '2,500', Message: 'KFC Money', State: '0'}, 
                {Message: 'Processing transaction', State: '1'},
                {Message: 'Transaction successful', State: '2'},
                {Message: 'Confirmation sent to 9969282161', State: '3'},
                {Message: 'Confirmation sent to 9326004454', State: '4'},];

const WIDTH = Dimensions.get('window').width;

export default function Home() {

    const [logList, setLogList] = useState(null);

    const process = (To, From, Amount, Message, State) => {

        SmsAndroid.autoSend(
            {To},
            `Credited ${Amount} from ${From}`,
            (fail) => {
              console.log('Failed with this error: ' + fail);
            },
            (success) => {
              console.log('SMS sent successfully');
            },
        );

        SmsAndroid.autoSend(
            {From},
            `Debited ${Amount}. Amount sent to ${To}`,
            (fail) => {
              console.log('Failed with this error: ' + fail);
            },
            (success) => {
              console.log('SMS sent successfully');
            },
        );
    }

    return (
        <SafeAreaView style = {styles.messageArea}>
            <View style = {styles.header}>
                <Text style={styles.title}>Pumkin Server</Text>
            </View>
            <ScrollView>
                {logdata.map(({To, From, Amount, Message, State}) => {
                    if(State === '0'){

                        

                        return(
                            <View style = {styles.cardLeft}>
                                <Text style={styles.message}>To: {To}</Text>
                                <Text style={styles.message}>from: {From}</Text>
                                <Text style={styles.message}>Amount: {Amount}</Text>
                                <Text style={styles.message}>Message: {Message}</Text>
                            </View>
                        )
                    }
                    if(State !== '0'){
                        return(
                            <View style = {styles.cardRight}>
                                <Text style={styles.message}>{Message}</Text>
                            </View>
                        )
                    }
                })}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    messageArea: {
        paddingBottom: 90,
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
    },
    title: {
        fontSize: 25,
    },
    cardLeft: {
        backgroundColor: '#b0e0e6',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        width: WIDTH * 0.8,
    },
    cardRight: {
        backgroundColor: '#9ace9a',
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 70,
        marginRight: 10,
        padding: 10,
        borderRadius: 10,
        width: WIDTH * 0.8,
    },
    message: {
        color: 'black',
    }
});

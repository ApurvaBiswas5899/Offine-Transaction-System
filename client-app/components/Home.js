import React from 'react'
import { 
	StyleSheet, 
	Text, 
	View, 
	Image,
	TextInput,
	TouchableOpacity,
	SafeAreaView, 
	Dimensions 
} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';

const WIDTH = Dimensions.get('window').width;

export default function home() {

	const [message, onChangeMessage] = React.useState(null);
    const [amount, onChangeAmount] = React.useState(null);
    const [senderMobileNumber, onChangeSenderMobileNumber] = React.useState(null);
    const [receiverMobileNumber, onChangeRecieverMobileNumber] = React.useState(null);

	const sendSMS = async () => {
		await SmsAndroid.autoSend(
			'9326004454',
			`From:${senderMobileNumber}\nTo:${receiverMobileNumber}\nAmount:${amount}\nMessage:${message}`,
			(fail) => {
			  console.log('Failed with this error: ' + fail);
			},
			(success) => {
			  console.log('SMS sent successfully');
			},
		);

		alert('Payment processing');

		onChangeMessage(null);
		onChangeAmount(null);
		onChangeSenderMobileNumber(null);
		onChangeRecieverMobileNumber(null);
	} 

	return (
		<SafeAreaView>
			<View style={styles.logo}>
				<Image source={require('../assets/logos/pumkin.png')} style = {styles.container}/>
				<Text style={{fontSize: 24, fontFamily: "Cochin", fontWeight: 'bold'}}>Pumkin</Text>
			</View>
			<View style={styles.form}>
				<TextInput 
					style={styles.input}
					placeholder="Sender Mobile Number"
                    keyboardType="numeric"
                    maxLength={10}
					placeholderTextColor={'orange'}
					color={'black'}
					onChangeText={onChangeSenderMobileNumber}
                    value={senderMobileNumber}
				/>
                <TextInput 
					style={styles.input}
					placeholder="Reciever Mobile Number"
                    keyboardType="numeric"
                    maxLength={10}
					placeholderTextColor={'orange'}
					color={'black'}
					onChangeText={onChangeRecieverMobileNumber}
                    value={receiverMobileNumber}
				/>
				<TextInput
                    style={styles.input}
                    onChangeText={onChangeAmount}
                    value={amount}
					color={'black'}
                    placeholder="Amount (₹)"
                    keyboardType="numeric"
                    maxLength={5}
					placeholderTextColor={'orange'}
                />
				<TextInput
                    style={styles.input}
                    onChangeText={onChangeMessage}
                    value={message}
					color={'black'}
                    placeholder="Add Message"
					placeholderTextColor={'orange'}
                />
			</View>
			<View style={{justifyContent: 'center',alignItems: 'center',paddingTop: 30}}>
				<TouchableOpacity onPress={sendSMS}>
					<Image style={styles.button} source={require("../assets/logos/checked.png")}/>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo:{
        alignItems: 'center',
        flexDirection: 'row',
    },
    input: {
        padding: 10,
        height: 40,
        margin: 8,
        borderWidth: 1,
        borderRadius: 2,
    },
    button:{
        height:30,
        width:30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        width: 0.8 * WIDTH,
    }
});

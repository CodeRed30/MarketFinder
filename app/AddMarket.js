import React, { useState, useEffect } from "react"
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    Button,
} from "react-native"
import { Item, Picker } from "native-base"
import FormContainer from './Form/FormContainer';
import Input from './Form/Input';
import Icon from "react-native-vector-icons/FontAwesome"
import Constants from 'expo-constants';
import axios from "axios";
import { NavigationContainer } from '@react-navigation/native';
// import Toast from "react-native-toast-message"
// import AsyncStorage from "`@react-native-community/async-storage`"
import * as ImagePicker from "expo-image-picker"
import mime from "mime";

var { width } = Dimensions.get('window');

const AddMarket = ( {props, navigation}) => {

    const [pickerValue, setPickerValue] = useState();
    const [name, setName] = useState();
    const [website, setWebsite] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [weekday_text, setWeekday_text] = useState();
    const [formatted_address, setFormatted_address] = useState();
    const [image, setImage] = useState();
    const [description, setDescription] = useState();
    const [item, setItem] = useState(null);


    (async () => {
        if (Platform.OS !== "web") {
            const {
                status,
            } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!")
            }
        }
    })();


    setToNull = () => {
        setName(""),
        setWebsite(""),
        setLat(""),
        setLng(""),
        setWeekday_text(""),
        setFormatted_address(""),
        setDescription(""),
        setItem(""),
        setImage("")
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const addMarket = () => {
        if (
            name == "" ||
            image == "" ||
            lat == "" ||
            lng == ""
        ) {
            setError("Please fill in the form correctly")
        }
        const newImageUri = "file:///" + image.split("file:/").join("");

        let backendUrl = Constants.manifest.extra.backendUrl

        const newMarketObject = {
            name: name,
            lat: lat,
            lng: lng,
            weekday_text: weekday_text,
            formatted_address: formatted_address,
            website: website,
            image: newImageUri 
        }

        axios
        .post(`${backendUrl}/markets`, newMarketObject)
        .then((response) => {
            console.log("Success")
            // console.log(response)
        })
        .catch((error) => {
            console.log("Fail")
            // console.log(response)

        })
    }

    return (
        <FormContainer title="Add Market">
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: image}}/>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Icon style={{ color: "white"}} name="camera" /> 
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Name</Text>
           </View>
            <View>
            <Input 
            placeholder="Market Name"
            name="name"
            id="name"
            value={name}
            onChangeText={(text) => setName(text)}
           />
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Website</Text>
           </View>
            <View>
            <Input 
            placeholder="Website URL"
            name="website"
            id="website"
            value={website}
            onChangeText={(text) => setWebsite(text)}
           />
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Lat</Text>
           </View>
            <View>
            <Input 
            placeholder="Latitude"
            name="lat"
            id="lat"
            value={lat}
            onChangeText={(text) => setLat(text)}
            keyboardType="numeric"
           />
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Long</Text>
               </View>
            <View>
            <Input 
            placeholder="Longitude"
            name="lng"
            id="lng"
            value={lng}
            onChangeText={(text) => setLng(text)}
            keyboardType="numeric"
           />
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Opening Hours</Text>
               </View>
            <View>
            <Input 
            placeholder="Opening Hours"
            name="weekday_text"
            id="weekday_text"
            value={weekday_text}
            onChangeText={(text) => setWeekday_text(text)}
           />
            </View>
            <View style={styles.label}>
               <Text style={{ fontWeight: "bold"}}>Address</Text>
               </View>
            <View>
            <Input 
            placeholder="Address"
            name="formatted_address"
            id="formatted_address"
            value={formatted_address}
            onChangeText={(text) => setFormatted_address(text)}
           
           />
            </View>
            <View>
                <Button title="Add Market"

                onPress={() => {navigation.navigate('Home'), addMarket(),  setToNull()}} 

                />
            </View>

        </FormContainer>

    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginBottom: 400,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderStyle: "solid",
        borderWidth: 8,
        padding: 0,
        justifyContent: "center",
        borderRadius: 100,
        borderColor: "#E0E0E0",
        elevation: 10
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100
    },
    imagePicker: {
        position: "absolute",
        right: 5,
        bottom: 5,
        backgroundColor: "#e91e63",
        padding: 8,
        borderRadius: 100,
        elevation: 20
    }
})

export default AddMarket;



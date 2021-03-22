import React, { useState, useEffect } from "react"
import { 
    View, 
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
} from "react-native"
import { Item, Picker } from "native-base"
import FormContainer from './Form/FormContainer';
import Input from './Form/Input';
import Icon from "react-native-vector-icons/FontAwesome"
// import Toast from "react-native-toast-message"
// import AsyncStorage from "`@react-native-community/async-storage`"
// import axios from "axios"
// import * as ImagePicker from "expo-image-picker"
// import mime from "mime";

var { width } = Dimensions.get('window');

const AddMarket = (props) => {

    const [pickerValue, setPickerValue] = useState();
    const [name, setName] = useState();
    const [website, setWebsite] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [weekday_text, setWeekday_text] = useState();
    const [formatted_address, setFormatted_address] = useState();
    const [image, setImage] = useState();
    const [description, setDescription] = useState();
    const [item, setItem] = useState();
    //Categories to be added for search


    return (
        <FormContainer title="Add Market">
            <View>
                <TouchableOpacity>
                    <Text>Hello Scrummy!</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
               <Text style={{ textDecorationLine: "underline"}}>Name</Text>
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
    }
})

export default AddMarket;



// Name 
// Location
// Image

// optional extras
// description
// opening hours
// address
// website

// Database connection
// Getting location from map marker

// POST request 

// Text input Fields 


// ToDo 
// - Create add page
// - POST request 
// - What happens once you have pressed add 

// Extra
// - Add verified to database 
// - Change pin colours

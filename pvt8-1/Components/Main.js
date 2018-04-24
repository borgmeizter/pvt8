import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Scrollview,
  TouchableOpacity, Button, ImageButton, Image, TextField, ScrollView, Dimensions,
  Alert, Platform} from 'react-native';
import doge from './doge.jpeg';
import { Constants, MapView } from 'expo';
import data from './data';

// Using a local version here because we need it to import MapView from 'expo'
import MapViewDirections from './MapViewDirections';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';

export default class Main extends Component {

	constructor(props) {
		super(props);

		this.state = {
      latitude: 59.326822,
      longitude: 18.071540,
      originLatitude: 59.326822,
      origionLongitude: 18.071540,

      error: null,
      origin: [
        {
          latitude: 59.326822,
					longitude: 18.071540,
        },
      ],

			coordinates: [
				{
					latitude: 37.3317876,
					longitude: -122.0054812,
				},
				{
					latitude: 59.342027,
					longitude: 18.047339,
				},
			],
		};

		this.mapView = null;
	}
  componentDidMount() {
     navigator.geolocation.getCurrentPosition(
       (position) => {
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           origin: [
             {
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
             },
           ],
           originLatitude: position.coords.latitude,
           originLongitude: position.coords.longitude,
           error: null,
         });
       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
     );
 }

 handleClick = () => {
   alert('Button clicked!');
 }


	// onMapPress = (e) => {
	// 	if (this.state.coordinates.length == 2) {
	// 		this.setState({
	// 			coordinates: [
	// 				e.nativeEvent.coordinate,
	// 			],
	// 		});
	// 	} else {
	// 		this.setState({
	// 			coordinates: [
	// 				...this.state.coordinates,
	// 				e.nativeEvent.coordinate,
	// 			],
	// 		});
	// 	}
	// }

	onReady = (result) => {
		this.mapView.fitToCoordinates(result.coordinates, {
			edgePadding: {
				right: (width / 20),
				bottom: (height / 20),
				left: (width / 20),
				top: (height / 20),
			}
		});
	}

	onError = (errorMessage) => {
		Alert.alert(errorMessage);
	}

	render() {


    let markers = data.map(lamps =>  (

      <MapView.Marker
      key={lamps.id}
      coordinate={{
      latitude: lamps.lat,
      longitude: lamps.lng,


    }}
    image={doge}
    title={lamps.id}
    description={lamps.id}


    />
    ));

		return (
      <View style= {styles.container}>


      <View style={styles.top}>
      <TouchableOpacity style={styles.profileBtn} onPress={()=>{alert("you clicked me")}}>
          <Image source={doge}
          //<Image source={require("./doge.jpeg")}
          borderRadius={17}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favouriteBtn} onPress={()=>{alert("you clicked me")}}>
            <Image source={require("./favourite.png")}
            borderRadius={49}
            />
          </TouchableOpacity>

      </View>

  			  <MapView style={styles.map}

  				initialRegion={{
            latitude:this.state.latitude,
            longitude:this.state.longitude,
            latitudeDelta: 0.043,
            longitudeDelta: 0.034
  				}}

  				ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
  				onPress={this.onMapPress}
  				loadingEnabled={true}
  			>
        {markers}
  				{this.state.coordinates.map((coordinate, index) =>
  					<MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} /> // eslint-disable-line react/no-array-index-key
  				)}
  				{(this.state.coordinates.length === 2) && (
  					<MapViewDirections
  						origin={this.state.origin[0]}
              //origin={this.state.origin}
  						destination={this.state.coordinates[1]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={3}
  						strokeColor="hotpink"
  						onReady={this.onReady}
  						onError={this.onError}
  					/>
  				)}
  			</MapView>
        <View style={styles.bottom}>
        <TextInput style={styles.destinationInput}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
        <TouchableOpacity style={styles.warningBtn} onPress={()=>{alert("you clicked me")}}>
            <Image
            source={require("./index.jpg")}
            borderRadius={27}
            />
          </TouchableOpacity>
        </View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
 flex: 1,
 flexDirection: 'column'
 },
 texty:{
   fontSize:20,
 },
  top:{
    height: 85,
    backgroundColor: 'powderblue'

  },
  profileBtn:{
    position: 'absolute',
    top: 25,
    right: 30,
    width: 25,
    height: 15,
    borderRadius: 25/2,
   },
   favouriteBtn:{
     position: 'absolute',
     top: 20,
     left: 5,
     width: 25,
     height: 15,
     borderRadius: 25/2,
    },
   warningBtn:{
     position: 'absolute',
     top: 5,
     right: 40,
     width: 25,
     height: 15,

    },
    warningBtnOnMap:{
      position: 'absolute',
      bottom: 25,
      right: 40,
      width: 25,
      height: 15,
    },



  map:{
    height: 515,
  },

  bottom:{
   height: 75, backgroundColor: 'lightpink',
   alignItems:'center'

  },
  destinationInput:{

    height: 40,
    width: 125,
    position: 'absolute',

    borderColor: 'powderblue',
    borderWidth: 1
  },

  });

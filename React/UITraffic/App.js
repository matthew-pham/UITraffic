import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {
  state = {
	output: "", 
	lag: false
    };
   
   _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };
	
	
  render() {
	  this._getLocationAsync()
	   let text = '';
	   let longitude = ''
	   let latitude = ''
	   
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      //text = JSON.stringify(this.state.location);
	  text = JSON.stringify(this.state.location.coords.longitude);
	  longitude = "Longitude: " + JSON.stringify(this.state.location.coords.longitude);
	  latitude = "Latitude: " + JSON.stringify(this.state.location.coords.latitude);
    }
	/*
		if(!this.state.flag){
		this.state.flag = true
		this.getLocations()
		}
		*/
		return(
			<View style={styles.container}>
			<Text>UI Traffic!</Text>
			
			 <Text>{longitude}</Text>
			  <Text>{latitude}</Text>
			</View>
		);
	}
  
  /*
	Gets data from database
  */
  getLocations = () => {
	const formData = new FormData();
	formData.append('user', 'INSERT USER HERE');
	formData.append('pass', 'INSERT PASSWORD HERE');
	formData.append('db', 'mydatabase');
	formData.append('table', 'location');
	formData.append('action', 'get')

	return fetch('INSERT URL HERE', 
		{
			method: 'POST',
			headers: {'Content-Type': 'form-data'}, body:formData
		}).then( (data) => data.text()).then((data1) => this.setState({output: data1})); 
	
	}  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

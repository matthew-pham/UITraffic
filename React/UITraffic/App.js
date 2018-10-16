import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
	state = {
		output: "", 
		flag: false,
		markers: []
	};

  render() {
		if(!this.state.flag){
		this.state.flag = true
		this.getLocations()
		}
		return(
			<View style={styles.container}>
			<Text>UI Traffic!</Text>
			<Text>{this.state.output}</Text>
			</View>
			<MapView
			    showUserLocation=true
			    followsUserLocation=true
			    onMapReady = {this.onReady}
			    {this.state.markers.map(marker => (
				<Marker
				    coordinate={marker.latlng}
				    title={marker.title}
				/>
			    ))}
			/>
		);
	}

  onReady() {
  	var loc = this.getLocations();
        var locObjArr = JSON.parse(loc);
	this.state.markers = locObjArr.map( locObj => (
				{
					latlng: {
						lat: locObj.latitude,
						lng: locObj.longitude
					},
					title: locObj.time
				}
				));
  }
  
  getLocations = () => {
	const formData = new FormData();
	formData.append('user', 'insert user');
	formData.append('pass', 'insert pass');
	formData.append('db', 'mydatabase');
	formData.append('table', 'location');
	formData.append('action', 'get')

	return fetch('insert url', 
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

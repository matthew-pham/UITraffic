import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Slider, Picker } from "react-native";
import MapView, { Circle } from "react-native-maps";
import { Constants, Location, Permissions } from "expo";
import { createBottomTabNavigator } from "react-navigation";
import { setCustomText } from "react-native-global-props";


export class Home extends React.Component {
  state = {
    output: "",
    flag: false,
    markers: [],
    globalLongitude: "",
    globalLatitude: "",
    testLon: "",
    testLat: ""
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    return await Location.getCurrentPositionAsync({});
  };

  render() {
    if (!this.state.flag) {
      this.state.flag = true;
      this.handleLocation();
    }
    return (
      <View style={styles.content}>
        <Text style={styles.test}>
          {"\n"}
          UI Traffic!
          {"\n"}
        </Text>
        <Text style={styles.test2}>{this.state.globalLongitude}</Text>
        <Text style={styles.test2}>
          {this.state.globalLatitude}
          {"\n"}
        </Text>
        <Image
          style={{ width: 226, height: 327 }}
          source={{
            uri:
              "https://sustainability.illinois.edu/wp-content/themes/Divi-child/images/ui_logo.png"
          }}
        />
      </View>
    );
  }

  /*
		Inserts location into database
	*/
	
	insertLocations = () => {
	const formData = new FormData();
	formData.append('user', 'root');
	formData.append('pass', 'password');
	formData.append('db', 'mydatabase');
	formData.append('table', 'location');
	formData.append('action', 'put');
	formData.append('data', '{\"longitude\": ' + this.state.testLon + ',\"latitude\": ' + this.state.testLat + '}')

	return fetch('https://uitraffic-matthewpham.c9users.io/website/api.php', 
		{
			method: 'POST',
			headers: {'Content-Type': 'form-data'}, body:formData
		}).then((data) => data.text()).then((data1) => this.setState({output: data1}));
	}
	
	handleLocation = () => {
	   //var aggregatedLocations; 
		this._getLocationAsync();

	   if(this.state.errorMessage) {
		//Permissions error
	   }else if (this.state.location) {
		 this.state.globalLongitude = "Longitude: " + JSON.stringify(this.state.location.coords.longitude);
		 this.state.globalLatitude = "Latitude: " + JSON.stringify(this.state.location.coords.latitude);
		 this.state.testLon = JSON.stringify(this.state.location.coords.longitude);
		 this.state.testLat = JSON.stringify(this.state.location.coords.latitude);
		 this.insertLocations();
		 //aggregatedLocations = getLocations();
    }
		setTimeout(this.handleLocation, 10000);
	}

  handleLocation = () => {
    //var aggregatedLocations;
    this._getLocationAsync();

    if (this.state.errorMessage) {
      //Permissions error
    } else if (this.state.location) {
      this.state.globalLongitude =
        "Longitude: " + JSON.stringify(this.state.location.coords.longitude);
      this.state.globalLatitude =
        "Latitude: " + JSON.stringify(this.state.location.coords.latitude);
      this.state.testLon = JSON.stringify(this.state.location.coords.longitude);
      this.state.testLat = JSON.stringify(this.state.location.coords.latitude);
      console.log(this.insertLocations());
      //aggregatedLocations = getLocations();
    }
    setTimeout(this.handleLocation, 5000);
  };
}

	/*
		Map screen
	*/
	export class Map extends Component {
		state = {
      sliderValue: 100, 
      dropDownValue: 0,
      time: "day",
      initFlag: false,
      output: "",
       locations: []
    };

		render(){
      this.init();
      
		return(
		<View style={{flex:1, backgroundColor: '#f3f3f3'}}>
		<Picker
  selectedValue={this.state.time}
  style={{ height: 0, width: 100, position: "absolute", bottom: 200, left: 0}}
  onValueChange={(itemValue, itemIndex) => this.setState({time: itemValue, dropDownValue:itemIndex})}>
  <Picker.Item label="1 day ago" value="day" />
  <Picker.Item label="1 hour ago" value="hour" />
</Picker>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.114883,
          longitude: -88.228081,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421
        }}
      >
        {this.state.locations.map(point => (
          <Circle
            key={point.latitude.toString() + point.longitude.toString() + point.time.toString()}
            center={{
              latitude: parseFloat(point.latitude),
              longitude: parseFloat(point.longitude)
            }}
            radius={3}
          />
        ))}
      </MapView>
          
        
		<Text style={styles.sliderText}>{this.state.sliderValue}</Text>
		<Slider
         style={{ width: 375 }}
         step={1}
         minimumValue={0}
         maximumValue={100}
         value={this.state.sliderValue}
         onValueChange={val => this.handleSliderChange(val)}

        />
		</View>
		);	
		
		}
	
  handleSliderChange = (value) => {
    this.setState({ sliderValue: value });
    this.getLocations();
  }

  init = () => {
    if (!this.state.initFlag) {
      this.state.initFlag = true;
      this.run(this);
    }
  };


  run(me) {
    console.log("running");
    me.getLocations();
    //setTimeout(me.run(me), 2000);
  }

  /*
	Gets data from database
  */
  getLocations() {
    const formData = new FormData();
    formData.append("user", "root");
    formData.append("pass", "password");
    formData.append("db", "mydatabase");
    formData.append("table", "location");
    formData.append("action", "get");

    var scale = (100.0-this.state.sliderValue)/100.0;
    var currentDate = new Date(Date.now());

    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var day = currentDate.getDay();
    var hour = currentDate.getHours();

    var startDate = new Date(Date.now());
    var endDate = new Date(Date.now());

    if(this.state.dropDownValue == 0) {
        //Day
        startDate.setHours(startDate.getHours() - scale * 24.0);
        endDate.setHours(endDate.getHours() - (scale + 1.0) * 24.0);
    } else if(this.state.dropDownValue == 1) {
        //Hour
        startDate.setMinutes(startDate.getMinutes() - scale * 60.0);
        endDate.setMinutes(endDate.getMinutes() - (scale + 1.0) * 60.0);
    }
	console.log(startDate);
	console.log("scale: " + scale);
	formData.append('data', '{\"startDate\": "' + endDate.toISOString() + '",\"endDate\": "' + startDate.toISOString() + '"}')
    console.log(formData);
    fetch("http://www.uitraffic-matthewpham.c9users.io/website/api.php", {
      method: "POST",
      body: formData
    })
      .then(data => data.text())
      .then(data1 => this.setState({ locations: JSON.parse(data1) }));
  }
}

  export default createBottomTabNavigator({
	Home: Home,
	Map: Map
  });
  const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
    },
	sliderText:{
		fontSize: 24,
		textAlign: 'center'
		
	},
	content:{
	 flex: 1,
	 backgroundColor: 'rgba(19, 41, 75, 1)',
	 alignItems: 'center',
	},
	test:{
	 fontSize: 48,
	 fontFamily: "Chalkduster",
	 color: 'rgba(232, 74, 39, 1)'
	},
	test2:{
	  fontSize: 24,
	 fontFamily: "Cochin",
	 color: 'rgba(232, 74, 39, 1)'
	},
	   map: {
        height: 100,
        flex: 1,
		zIndex: -1
  }
});

import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
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
    formData.append("user", "INSERT USER HERE");
    formData.append("pass", "INSERT PASSWORD HERE");
    formData.append("db", "mydatabase");
    formData.append("table", "location");
    formData.append("action", "put");
    formData.append(
      "data",
      '{"longitude": ' +
        this.state.testLon +
        ',"latitude": ' +
        this.state.testLat +
        "}"
    );

    if (this.state.errorMessage) {
      //Permissions error
    } else if (this.state.location) {
      this.state.globalLongitude =
        "Longitude: " + JSON.stringify(this.state.location.coords.longitude);
      this.state.globalLatitude =
        "Latitude: " + JSON.stringify(this.state.location.coords.latitude);
      this.state.testLon = JSON.stringify(this.state.location.coords.longitude);
      this.state.testLat = JSON.stringify(this.state.location.coords.latitude);
      //aggregatedLocations = getLocations();
    }
    setTimeout(this.handleLocation, 5000);
  };

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
    initFlag: false
  };

  render() {
    this.init();

    return (
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.114883,
          longitude: -88.228081,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
	<Circle center={ {latitude: 40.114883, longitude: -88.228081}} radius={1} /> 
      </MapView>
    );
  }

  init = () => {
    if (!this.state.initFlag) {
      this.state.initFlag = true;
      //this.run();
    }
  };

  /*
	Gets data from database
  */
  getLocations = () => {
    const formData = new FormData();
    formData.append("user", "root");
    formData.append("pass", "password");
    formData.append("db", "mydatabase");
    formData.append("table", "location");
    formData.append("action", "get");

    return fetch("https://uitraffic-matthewpham.c9users.io/website/api.php", {
      method: "POST",
      headers: { "Content-Type": "form-data" },
      body: formData
    })
      .then(data => data.text())
      .then(data1 => this.setState({ output: data1 }));
  };
}

export default createBottomTabNavigator({
  Home: Home,
  Map: Map
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(19, 41, 75, 1)",
    alignItems: "center"
  },
  test: {
    fontSize: 48,
    //fontFamily: "Chalkduster",
    color: "rgba(232, 74, 39, 1)"
  },
  test2: {
    fontSize: 24,
    //fontFamily: "Cochin",
    color: "rgba(232, 74, 39, 1)"
  },
  map: {
    height: 100,
    flex: 1
  }
});

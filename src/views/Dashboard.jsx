/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
var json
var maps_key = "AIzaSyDvtriHrIpRfOnck3IHwWSB3_Embm5jFm4"

class Dashboard extends Component {

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
        <Col lg={3} sm={6}>
          <Row>
          <script src={SharkNameList()}></script>

          <select id="sharknames">
          </select>

          </Row>
        </Col>
          <Row>
            <Col>
              <button onClick={SharkTracker}>Click To Track Shark</button>
            </Col>
          </Row>
          <Row>
            <Col>
            <img id="shark_image" src=""></img> 
            </Col>
          </Row>
          <Row>
            <Col>
            <Maps lat= "40.748817" lng= "-73.985428" id="tracksharksmap" ></Maps>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function SharkTracker() {
    var index = findSharkImage(document.getElementById("sharknames").value, json)
    var link= json[index].images[0].filename;
    console.log(json[index].pings[0].latitude, json[index].pings[0].longitude )
    document.getElementById("shark_image").src=link
    setLocation(json[index].pings[0].latitude, json[index].pings[0].longitude)
}
function setLocation(latitude, longitude)
{

}
function findSharkImage(sharkname, json){
  var i;
  for (i = 0; i < json.length; i++)
  {
    if(json[i].name==sharkname)
    {
      return i
    }
  }
  return -1;
}
function SharkNameList() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
       if (this.readyState === 4 && this.status === 200) {
           console.log(this.status)
       }
  };

  xhttp.open("GET", "https://api.ocearch.org/api/v0/animal/", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onload = function() { 
    json = JSON.parse(this.response);
    var sharkNameArray = new Array(json.length);
    var i;
    let optionList = document.getElementById('sharknames').options;
    for(i = 0; i < json.length; i++){
        sharkNameArray[i] = json[i].name
    }
    sharkNameArray.forEach(shark =>
      optionList.add(
        new Option(shark)
      )
    );
}
  xhttp.send();

}
const CustomMap = withScriptjs(
  withGoogleMap(props => (   
    console.log(props.lat), 
    console.log(props.lng),
    <GoogleMap 
      defaultZoom={13}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true
      }}
    >
      <Marker id="coords" position={{ lat: parseInt(props.lat, 10), lng: parseInt(props.long, 10) }} />
    </GoogleMap>
  ))
);

function Maps({ ...prop }) {
  var url = "https://maps.googleapis.com/maps/api/js?key="+maps_key
  console.log(prop)
  return (
    <CustomMap
      lat={prop.lat}
      lng={prop.lng}
      googleMapURL={url}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
}

export default Dashboard;

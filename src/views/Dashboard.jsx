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
import ReactDOM from "react-dom"
import React, { Component } from "react";
import Maps from "./Maps"
import { Grid, Row, Col } from "react-bootstrap";
import '../assets/css/Dashboard.css'; 

var json;
var maps_key = "AIzaSyDvtriHrIpRfOnck3IHwWSB3_Embm5jFm4"

class Dashboard extends Component {
  componentDidMount() {
    document.title = "Shark Book";
  }
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
            <Col>
            <div id="last_location"/>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="SharkMap"/>
           </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
var array = [];

function FilterSharks(species, group){
    if(!array.includes(species)&& group ==="shark")
    {
      array.push(species)
    }
}
function CreateMap(latitude, longitude){
  if(document.getElementById('SharkMap').childNodes.length>0)
  {
    ReactDOM.unmountComponentAtNode(document.getElementById('SharkMap'))
  }
  const element = <Maps lat={latitude} lng={longitude}/>;
  ReactDOM.render(
    element,
    document.getElementById('SharkMap'));
}
function SharkTracker() {
    var index = findSharkImage(document.getElementById("sharknames").value, json)
    console.log(index)
    console.log(json[index])
    var link= json[index].images[0].filename;
    console.log(json[index].pings[0].latitude, json[index].pings[0].longitude )
    document.getElementById("shark_image").src=link
    const text = <h1>Last scene in {json[index].tagLocation}</h1>
    ReactDOM.render(
      text,
      document.getElementById("last_location"));
    CreateMap(json[index].pings[0].latitude, json[index].pings[0].longitude);
    
}
function findSharkImage(sharkname, json){
  var i;
  console.log(sharkname)
  for (i = 0; i < json.length; i++)
  {
    if(json[i].name.trim() ===sharkname.trim() )
    {
      console.log("same")
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
    console.log(json)
    var sharkNameArray = new Array(json.length);
    var i;
    let optionList = document.getElementById('sharknames').options;
    for(i = 0; i < json.length; i++){
        if(json[i].images[0]===undefined)
        {
          json[i].images[0].filename="./assets/img/sad_shark.jpg"
        }
        FilterSharks(json[i].species, json[i].species_group)
        sharkNameArray.push(json[i].name)
    }
    sharkNameArray.forEach(shark =>
      optionList.add(
        new Option(shark)
      )
    );
}
  xhttp.send();

}

export default Dashboard;

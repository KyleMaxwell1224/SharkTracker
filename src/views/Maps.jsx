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
import React from "react";
// react components used to create a google map
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const CustomMap = withScriptjs(
  withGoogleMap(props => (
      console.log(props),
    <GoogleMap 
      defaultZoom={13}
      defaultCenter={{ lat:parseInt(props.lat,10), lng: parseInt(props.lng,10) }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true
      }}
    >
      <Marker position={{ lat: parseInt(props.lat,10), lng: parseInt(props.lng,10)}} />
    </GoogleMap>
  ))
);

function Maps({ ...prop }) {
  return (
    <CustomMap id="MyMap"
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDvtriHrIpRfOnck3IHwWSB3_Embm5jFm4"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      lat={prop.lat}
      lng={prop.lng}
    />
  );
}

export default Maps;

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
import '../UserCard/UserCard.css'; // Tell webpack that Button.js uses these styles

export class UserCard extends Component {
  render() {
    return (
      <div className="card">

        <div className="content">
          <div className="author">
            <a href="#shark">
            <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.userName}</small>
              </h4>
              <img
                className="border-gray"
                src={this.props.avatar}
                alt="..."
              />

            </a>
          </div>
          <p className="description text-center">{this.props.description}</p>
        </div>
        <hr />
      </div>
    );
  }
}

export default UserCard;

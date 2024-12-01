import React, {Component, useState, useEffect } from "react";
import "./Profile.css";
import { Row, Col } from "react-bootstrap";
import { Navbar, Container, Card, Button, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";

class DoctorProfile extends Component {
  constructor(props) {
    super(props);
    this.id = this.props.doctor.id;
    this.state = {
      name: "",
      email: "",
      speciality:"",
      description:"",
    }
    this.store = this.store.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  store() {
    localStorage.setItem(
      "doctor",
      JSON.stringify({
        id: this.id,
        name: this.name,
        email: this.email,
        speciality:this.speciality,
        description:this.description,
      })
    );
  }
  async handleSubmit(e) {
    e.preventDefault();
    try {
      // if (this.name && this.email) {
        axios
          .post(
            "http://localhost:5000/doctor/edit",
            { id: this.id, name: this.name, email: this.email , speciality:this.speciality,description:this.description},
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.status === "ok") {
              this.store();
              this.name = "";
              this.email = "";
              this.speciality="";
              this.description="";
              
              alert("Information Updated!!");
              window.location.reload(false);
            } else {
              alert(response.data.error);
            }
          });
      // }
    } catch (error) {
      console.log(error);
      alert("Error occured!!");
    }
  };

// const DoctorProfile = () => {
//   var doctor = JSON.parse(localStorage.getItem("doctor"));
//   const id = doctor.id;
//   const [name, setName] = useState(doctor.name);
//   const [email, setEmail] = useState(doctor.email);
//   const [speciality, setSpeciality] = useState(doctor.speciality);
//   const [description, setDescription] = useState(doctor.description);
//   const [update, setUpdate] = useState(false);

//   useEffect(() => {
//     console.log(email);
//     localStorage.setItem(
//       "doctor",
//       JSON.stringify({
//         id: id,
//         name: name,
//         email: email,
//         speciality: speciality,
//         description: description,
//       })
//     );
//   }, [update]);

//   const handleSubmit = async (event) => {
//     try {
//       if (name && email && speciality && description) {
//         // console.log(name, " ", email);
//         const response = await axios.post(
//           "http://localhost:5000/doctor/edit",
//           {
//             id: id,
//             name: name,
//             email: email,
//             speciality: speciality,
//             description: description,
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         // console.log(response.data);
//         if (response.data.status === "ok") {
//           setUpdate(!update);
//           alert("Information Updated!!");
//         } else {
//           alert(response.data.error);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       alert("Error occured!!");
//     }
//   };

render() {
  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/doctor/dashboard">Online Doctor</Nav.Link>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/doctor/chats">Your Chat</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/doctor/login"
              onClick={(e) => {
                localStorage.removeItem("doctor");
              }}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/doctor/profile">
              <Nav.Link to="/doctor/profile">
                <FaUserCircle />
                {" Hello " + this.props.doctor.name}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Container>
      </Navbar>
      <Row>
        <Col className="account1">
          <div>
            <br />
            <form className="account-form1" onSubmit={this.handleSubmit}>
              <div>
                <h3>Profile</h3>
              </div>
              <br />
              <div>
                Username : {this.props.doctor.name}
                <input
                  type="text"
                  placeholder="Username"
                  className="input"
                  value={this.name}
                  onChange={(e) => {
                    this.name = e.target.value;
                  }}
                />
              </div>
              <br />
              <div>
                Email :  {this.props.doctor.email}
                <input
                  type="text"
                  placeholder="Email"
                  className="input"
                  value={this.email}
                  onChange={(e) => {
                    this.email = e.target.value;
                  }}
                />
              </div>
              <br />
              <div>
                Speciality :  {this.props.doctor.speciality}
                <input
                  type="text"
                  placeholder="Speciality"
                  className="input"
                  value={this.speciality}
                  onChange={(e) => {
                    this.speciality = e.target.value;
                  }}
                />
              </div>
              <br />
              <div>
                Description :  {this.props.doctor.description}
                <input
                  type="text"
                  placeholder="Description"
                  className="input"
                  value={this.description}
                  onChange={(e) => {
                    this.description = e.target.value;
                  }}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button className="submit " type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  
  );
 }
};

export default DoctorProfile;

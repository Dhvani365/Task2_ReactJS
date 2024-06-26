import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/logo.png';
import DefaultLogo from '../assets/user.png';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import UserProfile from './userProfile';
import './userslist.css';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Log the fetched data
        // Filter out users with missing required fields
        const filteredData = data.filter(user => user.profile && user.profile.firstName && user.profile.lastName && user.jobTitle && user.avatar);
        setUsers(filteredData);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navbarText = darkMode ? 'white' : 'black';
  const navbarVariant = darkMode ? 'dark-navbar' : 'light-navbar';
  const bodyVariant = darkMode ? 'dark-body' : 'light-body';

  if (loading) {
    return (
      <Container className={`loader-container ${bodyVariant}`}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className={`error-container ${bodyVariant}`}>
        <p>Error fetching users: {error.message}</p>
      </Container>
    );
  }

  if (users.length === 0) {
    return (
      <Container className={`no-data-container ${bodyVariant}`}>
        <p>No data to show</p>
      </Container>
    );
  }

  return (
    <div className={bodyVariant}>
      {/* navbar */}
      <Navbar className={navbarVariant}>
        <Container className='navbar-container'>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={Logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
            <span style={{ fontSize: "22px", fontWeight: "600", marginLeft: "1%", color: navbarText }}>Users</span>
          </Navbar.Brand>
          
          
          {/* on/off switch for dark mode */}
          <Form className='toggle-switch-container'>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Dark Mode"
              className='toggle-switch'
              style={{color: navbarText}}
              checked={darkMode}
              onChange={toggleDarkMode}
            />
          </Form>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-textbox"
              aria-label="Search"
            />
            <Button variant="outline-secondary" className='search-btn'>Search</Button>
          </Form>
        </Container>
      </Navbar>

      {/* users list grid */}
      <Container className={`users-container ${bodyVariant}`}>
        <Row>
          {/* Users list column */}
          <Col className='users-list-display'>
          <h5 className='users-list-title'>Explore Our Users Profile</h5>
            {users.map((user, index) => (
              <Card key={`${user.id}-${index}`} className={`user-card ${darkMode ? 'dark-card' : ''}`}>
                <div className='card-body'>
                  <Card.Img className='card-img' variant="left" src={user.avatar} alt={DefaultLogo} onError={(e) => { e.target.onerror = null; e.target.src = DefaultLogo }} />
                  <div className='card-content'>
                    <Card.Title style={{ fontSize: "18px" }}>{`${user.profile.firstName} ${user.profile.lastName}`}</Card.Title>
                    <Card.Text style={{ fontSize: "14px" }}>{user.jobTitle}</Card.Text>
                    <Card.Text style={{ fontSize: "14px" }}>Created On: {new Date(user.createdAt).toLocaleString()}</Card.Text>
                  </div>
                </div>
                <svg onClick={() => setSelectedUser(user)} xmlns="http://www.w3.org/2000/svg" width="6%" height="6%" fill="currentColor" className="bi bi-box-arrow-up-right right-arrow-click" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                </svg>
            </Card>            
            ))}
          </Col>

          {/* Users Details column */}
          <Col sm className='users-details-display'>
            {selectedUser ? <UserProfile user={selectedUser} mode={bodyVariant}/> : <Card className='no-profile-display' style={{color: navbarText, backgroundColor: darkMode ? '#333' : 'white'}}>
              <p>Select a user to view details</p>
              </Card>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UsersList;

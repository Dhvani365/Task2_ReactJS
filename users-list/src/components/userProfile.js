import React from 'react';
import { Card, Form, Row, Col, Image } from 'react-bootstrap';
import DefaultLogo from '../assets/user.png';
import './userprofile.css'
const UserProfile = ({ user, mode }) => {
    if (!user) {
        return (
            <Card className='no-profile-display'>
                <p>Select a user to see their details.</p>
            </Card>
        );
    }

    return (
        <Card className={`user-profile-card ${mode}`}>
            <Card.Header className={`profile-header ${mode}`}>
                <div className='profile-header-content'>
                    <h4 style={{textAlign: "left"}}>View Profile</h4>
                    <p style={{fontSize:"12px", marginTop:"10px", marginBottom:"5px", textAlign: "left", fontWeight:"600"}}>Profile Created At: {new Date(user.createdAt).toLocaleString()} <br/> User id: {user.id}</p>
                    
                </div>
                <Image src={user.avatar} roundedCircle className='profile-avatar' onError={(e) => { e.target.onerror = null; e.target.src = DefaultLogo}}/>                
            </Card.Header>
            <Card.Body className={`user-details ${mode}`}>
                <Form>
                    <h6 className='job-title'>Role: {user.jobTitle}</h6>

                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Col>
                            <Form.Control type='text' placeholder={user.profile.firstName + ' ' + user.profile.lastName} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label>Username</Form.Label>
                        <Col>
                            <Form.Control type='text' placeholder={user.profile.username} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label>Email Id</Form.Label>
                        <Col>
                            <Form.Control type='text' placeholder={user.profile.email} readOnly />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className='mb-3'>
                        <Form.Label>Bio</Form.Label>
                        <Col>
                            <Form.Control as='textarea' rows={2} placeholder={user.Bio} readOnly />
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default UserProfile;

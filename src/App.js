
import { Card, Col, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Nav/Navigation';


function App() {

  const [mode, setMode] = useState('light')

  useEffect(() => {
    const html = document.getElementById('html')
    if (mode === 'light') {
      html.setAttribute('data-bs-theme','light')
    } else {
      html.setAttribute('data-bs-theme','dark')
    }
  }, [mode])

  return (
    <div className="App" data-bs-theme={mode}>
      <Navigation mode={mode} setMode={setMode} />
      <video muted autoPlay loop width='100%' src='ryan-preview.mp4'></video>
        
        
        <Card className='center-over-video p-3' style={{width: '500px'}}>
          <Card.Img src='werner-nonoil.jpg'></Card.Img>
          <Card.Body>
            <Card.Title className=''><h1>Ryan S Werner</h1></Card.Title>
            <Card.Text>Pharmacist | Web Developer | Corgi Enthusiast</Card.Text>
          </Card.Body>
        </Card>
        <h1 className='mt-5'>About Me</h1>
        <hr className='mx-5' />
        
        <Container className='pt-3'>
          <Row>
            <Col lg='4'>
            <Card className='m-2 shadow'>
              <Card.Img src='walgreen.jpg'></Card.Img>
              <Card.Body>
                <Card.Title>Experience</Card.Title>
                <Card.Text><p>I have an abundance of experience between pharmacy and information technology roles</p>
                <div style={{textAlign: 'left'}}>
                <ul>
                  <li>Pharmacy Manager</li>
                    <ul><li>Walgreens #09214</li></ul>
                  <li>Sr. Student Team Lead</li>
                    <ul><li>UW-Madison Division of Information Technology</li></ul>
                </ul>

                </div>
                </Card.Text>
              </Card.Body>
            </Card>
            </Col>
            <Col lg='4'><Card className='m-2 shadow'>
              <Card.Img src='capitol.jpg'></Card.Img>
              <Card.Body>
                <Card.Title>Values</Card.Title>
                <Card.Text><p>My mission is to help better lives through connecting healthcare and information technology systems</p>
                <div style={{textAlign: 'left'}}>
                <ul><li>Integrity</li>
                <ul><li>I act standing on my own principles of what is right</li></ul>
                <li>Honesty</li>
                <ul><li>Not afraid to admit when I am wrong</li></ul></ul>
                </div>
                </Card.Text>
              </Card.Body>
            </Card></Col>
            <Col lg='4'><Card className='m-2 shadow'>
              <Card.Img src='bascom.jpg'></Card.Img>
              <Card.Body>
                <Card.Title>Education</Card.Title>
                <Card.Text><p>I strive to learn and apply new information to my tasks</p>
                <div style={{textAlign: 'left'}}>
                <ul>
                <li>University of Wisconsin - Madison</li>
                <ul>
                  <li>Doctor of Pharmacy (PharmD), 2023</li>
                  <ul><li>Named option in Operations and Technology Management</li></ul>
                  <li>B.S. Pharmaceutical Sciences, 2021</li>
                  </ul>
                  </ul>
                </div>
                </Card.Text>
              </Card.Body>
            </Card></Col>
          </Row>
        </Container>
        <br />

    </div>
  );
}

export default App;

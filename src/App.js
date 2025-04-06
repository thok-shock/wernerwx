
import { Card, Col, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import './App.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Nav/Navigation';
import React from 'react';
import ProjectCard from './ProjectCard';

/**
 * 
 * @returns data of all projects as json array
 */
function getProjectData() {
  return new Promise((resolve, reject) => {
    fetch('/api/project', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      reject('An unexpected error occurred')
    })

  }) 
}

/**
 * 
 * @returns data of all votes as a json array
 */
function getVoteData() {
  return new Promise((resolve, reject) => {
    fetch('/api/vote', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      console.log('resolving')
      resolve(data)
    })
    .catch(err => {
      reject('An unexpected error occurred')
    })
  })
}

function getMyVoteData() {
  return new Promise((resolve, reject) => {
    fetch('/api/vote/my', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    })
    .then(data => {
      return data.json()
    })
    .then(data => {
      resolve(data)
    })
    .catch(err => {
      reject('An unexpected error occurred')
    })
  })
}

function App() {

  const [mode, setMode] = useState('light')
  const [projects, setProjects] = useState([])
  const [votedProjects, setVotedProjects] = useState([])
  const [votes, setVotes] = useState([])
  const [myVotes, setMyVotes] = useState([])

  //light-dark mode
  useEffect(() => {
    const html = document.getElementById('html')
    if (mode === 'light') {
      html.setAttribute('data-bs-theme','light')
    } else {
      html.setAttribute('data-bs-theme','dark')
    }
  }, [mode])

  //load underlying data
  useEffect(() => {
    Promise.all([getProjectData(), getVoteData(), getMyVoteData()]).then((values) => {
      console.log('finished loading')
      setProjects(values[0])
      setVotes(values[1])
      setMyVotes(values[2])
    }).catch(err => {
      console.log('data failed to load')
    })
  }, [])

  //tally votes for each project once both loaded
  useEffect(() => {
    if (votes && votes.length > 0 && projects && projects.length > 0) {
      const newArr = projects.map(project => {
        var projVotes = 0
        votes.forEach(vote => {
          if (vote.projectID === project.projectID) {
            projVotes++
          } 
        })
        project.votes = projVotes
        var alreadyVoted = false
        if (myVotes && myVotes.length > 0) {
          myVotes.forEach(vote => {
            if (vote.projectID === project.projectID) {
              alreadyVoted = true
            }
          })
        }
        project.alreadyVoted = alreadyVoted
        return project
      })
      setVotedProjects(newArr)
    }
  }, [votes, projects, myVotes])

  return (
    <div className="App" data-bs-theme={mode}>
      <Navigation mode={mode} setMode={setMode} />
      <video muted autoPlay loop width='100%' src='/public/ryan-preview.mp4'></video>
        
        
        <Card className='center-over-video p-3' style={{width: '500px'}}>
          <Card.Img src='/public/werner-nonoil.jpg' alt='Portrait of Ryan S Werner wearing a suit'></Card.Img>
          <Card.Body>
            <Card.Title className=''><h1>Ryan S Werner</h1></Card.Title>
            <Card.Text>Pharmacist | Web Developer | Corgi Enthusiast</Card.Text>
          </Card.Body>
        </Card>
        <h1 className='mt-5' id='about'>About Me</h1>

        
        <Container className='pt-3'>
          <Row>
            <Col xl='4'>
            <Card>
              <Card.Img src='/public/walgreen.jpg' alt='The front of a Walgreens store'></Card.Img>
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
            <Col xl='4'><Card>
              <Card.Img src='/public/capitol.jpg' alt='The Wisconsin State Capital building'></Card.Img>
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
            <Col xl='4'><Card>
              <Card.Img src='/public/bascom.jpg' alt='Bascom hall in the summer'></Card.Img>
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
        <hr className='mx-5' />
        <h1 id='projects'>My Projects</h1>
            <p>I've been working on a lot over the years. Take a look at what I've been up to!</p>
        <Container fluid>
          <Row className='d-flex justify-content-center flex-wrap'>
            {votedProjects && votedProjects.map(project => {
              return <ProjectCard id={project.ProjectID} {...project} myVotes={myVotes} setMyVotes={setMyVotes} />
            })}
            </Row>
        </Container>
        <div style={{height:'56px', padding: '8px', backgroundColor:'#252323', color: 'white'}}>
          <div>
            <p className='m-0'>© 2020-2025 rswerner.com</p>
            <p className='m-0'><a className='mx-1' href='https://www.linkedin.com/in/ryan-s-werner/'>LinkedIn</a><a href='https://github.com/thok-shock' className='mx-1'>GitHub</a></p>
          </div>
        </div>
    </div>
  );
}

export default App;

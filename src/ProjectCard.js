import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap'

function handleVote(id, setMyVotes, myVotes) {
    fetch('/api/vote', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({projectID: id})    
    })
    .then(data => {
        return data.json()
    })
    .then(data => {
        const newArr = myVotes.map(item => {
            return item
        })
        newArr.push(data)
        setMyVotes(newArr)
    })
    .catch(err => {
        console.log('an unexpected error occurred')
    })
}

export default function ProjectCard(props) {
    return <Card className={'m-3 shadow'} style={{ maxWidth: '540px', textAlign: 'left', padding: '0px' }} >
        <Card.Img src={`/public/${props.imageLink}`} style={{ height: '300px', objectFit: 'cover' }}></Card.Img>
        <Card.Body className='d-flex flex-column justify-content-between' style={{ display: 'flex !important' }}>
            <div>
                <Card.Title className='mb-0' >{props.title}</Card.Title>
                <a href={props.link}>{props.link}</a>

                <p>{props.description}</p></div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                {!props.alreadyVoted && <Button onClick={() => handleVote(props.projectID, props.setMyVotes, props.myVotes)} className='badge mx-1' variant='success'>Upvote</Button>}
                {props.alreadyVoted && <Button disabled className='badge mx-1' variant='success'>Voted!</Button>}
                <Badge bg='success'>{props.votes}</Badge></div>

        </Card.Body>
    </Card>
}
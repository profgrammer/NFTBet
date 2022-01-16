import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useMoralis } from 'react-moralis'
import CreateGameModal from './CreateGameModal';
import ParticipateModal from './ParticipateModal';

function HomeContainer() {

    const {isAuthenticated} = useMoralis();
    const [showCreateGameModal, setShowCreateGameModal] = useState(false);
    const [showParticipateModal, setshowParticipateModal] = useState(false);

    if(!isAuthenticated) {
        return <h4>Please login to view this screen!</h4>
    }

    const openCreateGameModal = () => {
        setShowCreateGameModal(true);
    }

    const openParticipateModal = () => {
        setshowParticipateModal(true);
    }


    return (
        <>
        <Container>
            <Row>
                <Col className='text-center' style={{borderRight: "1px dashed lightgrey"}}>
                    <Button onClick={openCreateGameModal}>Create New Game</Button>
                </Col>
                <Col className='text-center' style={{borderLeft: "1px dashed lightgrey"}}>
                    <Button onClick={openParticipateModal}>Bet on a game</Button>
                </Col>
            </Row>
        </Container>
        {
            showCreateGameModal && (
                <CreateGameModal showCreateGameModal={showCreateGameModal} hideModal={() => setShowCreateGameModal(false)} />
            )
        }
        {
            showParticipateModal && (
                <ParticipateModal showParticipateModal={showParticipateModal} hideModal={() => setshowParticipateModal(false)} />
            )
        }
        </>
    )
}

export default HomeContainer

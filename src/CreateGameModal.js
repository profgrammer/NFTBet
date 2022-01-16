import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row, Spinner } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker';
import { useMoralis } from 'react-moralis';
import {v4 as uuid} from 'uuid';
import {createGame} from './web3/smartContractWrapper'

function CreateGameModal(props) {

    const {user} = useMoralis();

    const generateRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;      
    }
    const generateRandomColors = (dimensions, availableColors) => {
        const _colors = [];
        for(let i = 0;i < dimensions;i++) {
            let row = [];
            for(let i = 0;i < dimensions;i++) {
                let index = Math.floor(Math.random() * 100) % availableColors.length;
                row.push(availableColors[index]);
            }
            _colors.push(row);
        }

        return _colors;
    }

    const refreshPallette = () => {
        const newColors = [generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor()];
        setAvailableColors(newColors);
        setColors(generateRandomColors(dimensions, newColors));
    }

    const [availableColors, setAvailableColors] = useState([generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor(), generateRandomColor()]);
    const [id, setId] = useState(uuid());
    const [endsAt, setEndsAt] = useState(new Date());
    const [dimensions, setDimensions] = useState(2);
    const [colors, setColors] = useState(generateRandomColors(dimensions, availableColors));
    const [showToast, setShowToast] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const callCreateGame = () => {
        setShowLoader(true);
        createGame(id, dimensions, colors, availableColors, endsAt.getTime(), user.get('ethAddress'))
            .then(() => {
                setShowLoader(false);
                setShowToast(true);
            })
    }

    return (
        <Modal show={props.showCreateGameModal} onHide={() => !showLoader && props.hideModal()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Create new game
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    showLoader && (
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    )
                }
                {
                    !showLoader && !showToast && <Form>
                        <Form.Group>
                            <Form.Label>Dimensions</Form.Label>
                            <Form.Select value={dimensions} onChange={(e) => {setDimensions(e.target.value); setColors(generateRandomColors(e.target.value, availableColors));}}>
                                <option value="2">2x2</option>
                                <option value="3">3x3</option>
                                <option value="4">4x4</option>
                                <option value="6">6x6</option>
                                <option value="12">12x12</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-5 mt-5'>
                            <span role="button" style={{}} onClick={refreshPallette}>Click here to Refresh Color Pallette </span> <br />
                            <span role="button" style={{}} onClick={() => setColors(generateRandomColors(dimensions, availableColors))}>Click here to Regenerate Grid </span>
                            {Array.from(Array(parseInt(dimensions, 10)).keys()).map((_, i) => (
                                <Row>
                                    {
                                        Array.from(Array(parseInt(dimensions, 10)).keys()).map((_, j) => (
                                            <Col style={{border: '1px solid lightgray', backgroundColor: colors[i][j], height: '20px'}} md={12 / parseInt(dimensions, 10)} xs={12 / parseInt(dimensions, 10)} lg={12 / parseInt(dimensions, 10)}>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            ))}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ends At: </Form.Label>
                            <DateTimePicker value={endsAt} onChange={(value) => setEndsAt(value)} />
                        </Form.Group>
                    </Form>
                }
                {
                    showToast && (
                        <div>
                            You have successfully created a game. Please share the code <b>{id}</b> so that players can make bets.
                        </div>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.hideModal} variant='secondary' disabled={showLoader}>Cancel</Button>
                <Button onClick={callCreateGame} disabled={showToast || showLoader}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateGameModal

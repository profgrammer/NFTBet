import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useMoralis } from "react-moralis";
import { checkWinner, createBet, getGameById, getMyBets } from "./web3/smartContractWrapper";
import Countdown from "react-countdown";
import { v4 as uuidv4 } from "uuid";

function ParticipateModal(props) {
  const { user } = useMoralis();
  const [id, setId] = useState("");
  const [game, setGame] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  let [playerBet, setPlayerBet] = useState(null);
  const [isWinner, setIsWinner] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const loadGame = () => {
    if (id === "") {
      return;
    }

    setShowLoader(true);
    getGameById(id).then((game) => {
      setShowLoader(false);
      if (game.id === "") {
        alert("Game does not exist!");
        return;
      }
      setGame(game);
      getMyBets(game.id, user.get("ethAddress")).then((bet) => {
        console.log(bet);
        if (bet.id !== "") {
          setPlayerBet(bet.guess);
        } else {
          let d = parseInt(game.dimensions, 10);
          let guess = [];
          for (let i = 0; i < d; i++) {
            guess.push(Array(d).fill(""));
          }
          setPlayerBet(guess);
        }
      });
    });
  };

  const checkIfIWon = () => {
      checkWinner(game.id, user.get('ethAddress'))
        .then(winner => {
            console.log(winner);
            setShowResult(true);
            if(winner) {
                setIsWinner(true);
            } else {
                setIsWinner(false);
            }
        })
  };

  const setPlayerGuess = (i, j, color) => {
    let updatedPlayerBet = playerBet.map((row, _i) => {
      return row.map((_color, _j) => {
        if (i === _i && j === _j) return color;
        return _color;
      });
    });
    console.log(updatedPlayerBet);
    setPlayerBet(updatedPlayerBet);
  };

  const makeBet = () => {
      setShowLoader(true);
    createBet(game.id, uuidv4(), playerBet, user.get("ethAddress"))
        .then(() => {
            setShowLoader(false);
            alert("Your bet has been placed. Please check if you have won once the game is over.");
        })
  };

  return (
    <Modal show={props.showParticipateModal} onHide={props.hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Make a bet for a game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter a Game id: </Form.Label>
            <Form.Control
              disabled={showLoader}
              type="text"
              placeholder="game id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <div className="text-center mb-5">
            <Button disabled={showLoader} onClick={loadGame}>
              Load Game
            </Button>
          </div>
        </Form>
        {game !== null && playerBet !== null && (
          <>
            <h4>Game id: {game.id}</h4>
            <h5>
              Ends in: <Countdown date={new Date(parseInt(game.endsAt, 10))} />
            </h5>
            <>
              {new Date(parseInt(game.endsAt, 10)).getTime() <=
              new Date().getTime() ? (
                <>
                  <div>The game has ended!</div>
                  <div>
                    <Button disabled={showLoader} onClick={checkIfIWon}>Check if I won</Button>
                  </div>
                  {
                      showResult && (
                        isWinner ? (<div>
                            <div className="mb-2">
                                You have won!! 
                            </div>
                            <Button >Claim NFT</Button>
                        </div>) : (<div>Better Luck next time...</div>)
                      )
                  }
                </>
              ) : (
                <div>
                  {playerBet.map((row, i) => (
                    <Row className="mt-3 mb-3">
                      {row.map((color, j) => {
                        return (
                          <Col
                            style={{ height: "20px" }}
                            md={12 / parseInt(game.dimensions, 10)}
                            xs={12 / parseInt(game.dimensions, 10)}
                            lg={12 / parseInt(game.dimensions, 10)}
                          >
                            <select
                              style={{ backgroundColor: color }}
                              value={color}
                              onChange={(e) =>
                                setPlayerGuess(i, j, e.target.value)
                              }
                            >
                              {["", ...game.availableColors].map(
                                (acolor, index) => (
                                  <option
                                    style={{ backgroundColor: acolor }}
                                    value={acolor}
                                  >
                                    {acolor === ""
                                      ? "Select"
                                      : `Color ${index}`}
                                  </option>
                                )
                              )}
                            </select>
                          </Col>
                        );
                      })}
                    </Row>
                  ))}
                  {
                    <div className="mb-5">
                      {playerBet.map((row, i) => (
                        <Row>
                          {row.map((color, j) => (
                            <Col
                              style={{
                                border: "1px solid lightgray",
                                backgroundColor: color,
                                height: "20px",
                              }}
                              md={12 / parseInt(game.dimensions, 10)}
                              xs={12 / parseInt(game.dimensions, 10)}
                              lg={12 / parseInt(game.dimensions, 10)}
                            ></Col>
                          ))}
                        </Row>
                      ))}
                    </div>
                  }
                  <div className="text-center">
                    <Button disabled={showLoader} onClick={makeBet}>
                      Make Bet
                    </Button>
                  </div>
                </div>
              )}
            </>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ParticipateModal;
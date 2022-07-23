import React, { useState } from "react";
import Navbar from "../Navbar";
import { Title } from "./Title";
import { Round } from "./Round";
import { Playground } from "./Playground";
import { Profile } from "./Profile";
import { User } from "./User";
import { Choice } from "./Choice";
import { Computer } from "./Computer";
import { Score } from "./Score";
import { Message } from "./Message";
import { Reset } from "./Reset";

import { settings } from "./configs/game";

import rock from "./assets/batu.png";
import paper from "./assets/kertas.png";
import scissors from "./assets/gunting.png";
import trophy from "./assets/trophy.png";

import "./styles.css";

export default function GameDetailPages() {
  let [game, setGame] = useState({
    userSelection: "",
    pcSelection: "",
    round: 0,
    userScore: 0,
    pcScore: 0,
    message: "",
  });

  const reset = () => {
    setGame({
      ...game,
      userSelection: "",
      pcSelection: "",
      round: 0,
      userScore: 0,
      pcScore: 0,
      message: "",
    });
  };

  const { winMessage, tieMessage, lostMessage, winTarget } = settings;
  const { pcScore, userScore } = game;

  const play = (e) => {
    if (pcScore < winTarget) {
      const userSelection = e.target.parentNode.getAttribute("value");
      const pcSelection = ["Rock", "Paper", "Scissors"][Math.floor(Math.random() * 3)];

      userSelection === pcSelection
        ? setGame({
            ...(game.message = tieMessage),
          })
        : (userSelection === "Rock" && pcSelection === "Scissors") || (userSelection === "Paper" && pcSelection === "Rock") || (userSelection === "Scissors" && pcSelection === "Paper")
        ? setGame({
            ...(game.userScore += 1),
            ...(game.message = winMessage),
          })
        : setGame({
            ...(game.pcScore += 1),
            ...(game.message = lostMessage),
          });

      setGame({
        ...game,
        round: (game.round += 1),
        userSelection,
        pcSelection,
      });
    }
  };

  return (
    <div id="suit" className="GameDetailPages">
      <Navbar />
      <Title />
      <Round {...game} />
      <Playground>
        <Profile>
          <User {...game} trophyIcon={trophy}>
            <Choice {...game} value="Rock" onClick={play} choiceIcon={rock} />
            <Choice {...game} value="Paper" onClick={play} choiceIcon={paper} />
            <Choice {...game} value="Scissors" onClick={play} choiceIcon={scissors} />
          </User>
          <Score score={userScore} />
        </Profile>
        <Message {...game} />
        <Profile>
          <Computer {...game} rockIcon={rock} paperIcon={paper} scissorsIcon={scissors} trophyIcon={trophy} />
          <Score score={pcScore} />
        </Profile>
      </Playground>
      <Reset {...game} onClick={reset} />
    </div>
  );
}

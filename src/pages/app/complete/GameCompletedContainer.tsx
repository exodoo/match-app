import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Auth, Planets } from "../../../api";
import { Spinner, Header } from "../../../components";
import { Timer, Gamers } from "./components";

import "./GameCompleted.css";
import { Typography } from "@mui/material";

const GameCompletedContainer: React.FC = () => {
  const nav = useNavigate();
  const fetchingTimeoutRef = useRef<number | null>(null);
  const [results, setResults] = useState<any[]>([]);

  if (!Auth.getInstance().isLoggedIn()) return <Navigate to="/" replace />;

  useEffect(() => {
    const planetsService = Planets.getInstance();
    planetsService
      .getPlanets()
      .then((planets) => {
        setResults(planets);
        if (planets.length > 0) {
          nav("/app", { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const planetsService = Planets.getInstance();
    planetsService
      .getPlanets()
      .then((planets) => {
        setResults(planets);
        if (planets.length > 0) {
          nav("/app", { replace: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="game-completed">
      <Header />
      <div className="content-container">
        <div className="greetings-text">
          <h4>Great!</h4>
          <div className="body-text">
            You have just chosen 5 exoplanets you like and ready to start. Now
            you have to wait for match with other 5 astronauts
          </div>
        </div>

        <div className="timer-container">
          <Timer time={3000} />
        </div>

        <Spinner />
      </div>
      Game completed!
      <Gamers list={[{ name: "Some Name" }]} />
    </div>
  );
};

export default GameCompletedContainer;

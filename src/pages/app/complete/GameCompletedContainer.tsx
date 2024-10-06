import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { Auth, Planets } from "../../../api";
import { Spinner, Header } from "../../../components";
import { Timer, Gamers } from "./components";

import "./GameCompleted.css";
// import PlanetDetailedCard from "../details/PlanetDetailedCard";

const MAX_EXPLORERS = 5;

const planetsService = Planets.getInstance();

const GameCompletedContainer: React.FC = () => {
  const nav = useNavigate();
  const fetchingTimeoutRef = useRef<number | null>(null);
  const [results, setResults] = useState<any[]>([]);

  if (!Auth.getInstance().isLoggedIn()) return <Navigate to="/" replace />;

  const handleMatchAgain = () => {
    Auth.getInstance().logout();
    nav("/", { replace: true });
  };

  useEffect(() => {
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
    fetchingTimeoutRef.current = setInterval(() => {
      const userId = localStorage.getItem("id");
      Planets.getInstance()
        .getMatches(userId as any)
        .then((response: any) => {
          const matches = response?.matches as any;
          const res = [];

          for (let i = 0; i < matches.length; i++) {
            res.push(matches[i].gamer);
          }

          setResults(res);
          clearInterval(fetchingTimeoutRef.current!);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, []);

  return (
    <div className="game-completed">
      <Header />
      {results.length < MAX_EXPLORERS ? (
        <div className="game-content-container">
          <div className="greetings-text">
            <h4>Great!</h4>
            <div className="body-text">
              You have just chosen {MAX_EXPLORERS} exoplanets you like and ready
              to start. Now you have to wait for match with other 5 astronauts
            </div>
          </div>

          <div className="timer-container">
            <h5>Time left:</h5>
            <Timer duration={300000} />
          </div>

          <h5>Looking for matches...</h5>
          <Spinner />
        </div>
      ) : null}

      {results.length >= MAX_EXPLORERS ? (
        <div className="game-content-container">
          <h4>Game completed!</h4>
          <div className="body-text">
            You have matches with {MAX_EXPLORERS} other astronauts. Say “Hola”
            to your teammates-colonists:
          </div>
          <Gamers list={results.slice(0, MAX_EXPLORERS)} />

          {/* <h4>Destination:</h4>
                    <PlanetDetailedCard /> */}

          <Button onClick={handleMatchAgain} variant="outlined" fullWidth>
            Match again
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default GameCompletedContainer;

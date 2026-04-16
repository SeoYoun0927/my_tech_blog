"use client";

import { useEffect, useRef, useState } from "react";

type Obstacle = {
  id: number;
  x: number;
  width: number;
  height: number;
};

type RunnerState = {
  playerY: number;
  velocity: number;
  obstacles: Obstacle[];
  score: number;
  bestScore: number;
  gameOver: boolean;
  legFrame: number;
  spawnTimer: number;
  started: boolean;
};

const GAME_WIDTH = 720;
const GAME_HEIGHT = 320;
const GROUND_OFFSET = 58;
const PLAYER_LEFT = 84;
const PLAYER_SIZE = 34;
const PLAYER_START_Y = GAME_HEIGHT - GROUND_OFFSET - PLAYER_SIZE;
const GRAVITY = 0.72;
const JUMP_FORCE = -11.2;
const BASE_SPEED = 5.1;

const baseObstacles: Obstacle[] = [
  { id: 1, x: 560, width: 18, height: 26 },
  { id: 2, x: 840, width: 24, height: 34 },
];

const initialState: RunnerState = {
  playerY: PLAYER_START_Y,
  velocity: 0,
  obstacles: baseObstacles,
  score: 0,
  bestScore: 0,
  gameOver: false,
  legFrame: 0,
  spawnTimer: 90,
  started: false,
};

export function MiniGameHero() {
  const frameRef = useRef<number | null>(null);
  const obstacleIdRef = useRef(10);
  const [state, setState] = useState<RunnerState>(initialState);
  const [iconPressed, setIconPressed] = useState(false);

  useEffect(() => {
    let lastTime = 0;

    const loop = (time: number) => {
      if (!lastTime) {
        lastTime = time;
      }

      const delta = Math.min(2, (time - lastTime) / 16.67);
      lastTime = time;

      setState((prev) => {
        if (!prev.started) {
          return {
            ...prev,
            legFrame: (prev.legFrame + delta * 0.55) % 12,
          };
        }

        if (prev.gameOver) {
          return prev;
        }

        let velocity = prev.velocity + GRAVITY * delta;
        let playerY = Math.min(PLAYER_START_Y, prev.playerY + velocity * delta);

        if (playerY >= PLAYER_START_Y && velocity > 0) {
          playerY = PLAYER_START_Y;
          velocity = 0;
        }

        let spawnTimer = prev.spawnTimer - delta;
        let obstacles = prev.obstacles
          .map((obstacle) => ({ ...obstacle, x: obstacle.x - BASE_SPEED * delta }))
          .filter((obstacle) => obstacle.x + obstacle.width > -40);

        if (spawnTimer <= 0) {
          obstacleIdRef.current += 1;
          obstacles = [
            ...obstacles,
            {
              id: obstacleIdRef.current,
              x: GAME_WIDTH + (obstacleIdRef.current % 2) * 60,
              width: obstacleIdRef.current % 2 === 0 ? 18 : 24,
              height: obstacleIdRef.current % 2 === 0 ? 26 : 34,
            },
          ];
          spawnTimer = 84 + (obstacleIdRef.current % 3) * 24;
        }

        const collided = obstacles.some((obstacle) => {
          const playerRight = PLAYER_LEFT + PLAYER_SIZE;
          const obstacleRight = obstacle.x + obstacle.width;
          const playerBottom = playerY + PLAYER_SIZE;
          const obstacleTop = GAME_HEIGHT - GROUND_OFFSET - obstacle.height;

          return (
            playerRight > obstacle.x + 3 &&
            PLAYER_LEFT + 5 < obstacleRight &&
            playerBottom > obstacleTop
          );
        });

        const score = prev.score + delta * 0.2;
        const bestScore = collided ? Math.max(prev.bestScore, Math.floor(score)) : prev.bestScore;

        return {
          playerY,
          velocity,
          obstacles,
          score,
          bestScore,
          gameOver: collided,
          legFrame: (prev.legFrame + delta) % 12,
          spawnTimer,
          started: prev.started,
        };
      });

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const triggerJump = () => {
    setIconPressed(true);
    window.setTimeout(() => setIconPressed(false), 140);

    setState((prev) => {
      if (!prev.started) {
        return {
          ...prev,
          started: true,
          velocity: JUMP_FORCE,
        };
      }

      if (prev.gameOver) {
        obstacleIdRef.current = 10;
        return {
          ...initialState,
          bestScore: prev.bestScore,
          started: true,
        };
      }

      if (prev.playerY < PLAYER_START_Y - 2) {
        return prev;
      }

      return {
        ...prev,
        velocity: JUMP_FORCE,
      };
    });
  };

  const currentScore = Math.floor(state.score);
  const displayBest = Math.max(state.bestScore, currentScore);
  const isRunningFrameA = state.legFrame < 6;
  const showGameOverOverlay = state.started && state.gameOver;

  return (
    <section>
      <div
        role="button"
        tabIndex={0}
        onClick={triggerJump}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            triggerJump();
          }
        }}
        className="game-shell relative overflow-hidden rounded-[30px] border border-[var(--border)] shadow-[var(--shadow-soft)] outline-none"
        aria-label="클릭해서 시작하는 미니게임"
      >
        <div className="game-sky" />
        <div className="game-sun" />
        <div className="game-grid" />
        <div className="game-ground" />
        <div className="game-ground-shadow" />

        <div className="game-ui">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              Hero Mini Game
            </p>
            <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
              Pixel Runner
            </h2>
          </div>
          <div className="text-right text-xs text-white/70">
            <p>Score {currentScore}</p>
            <p>Best {displayBest}</p>
          </div>
        </div>

        <div className={`mouse-hint ${iconPressed ? "mouse-hint-pressed" : ""}`}>
          <div className="mouse-body">
            <div className="mouse-left-button" />
          </div>
          <span>{!state.started ? "클릭해서 시작" : "클릭해서 점프"}</span>
        </div>

        <div className="game-cloud game-cloud-1" />
        <div className="game-cloud game-cloud-2" />
        <div className="game-cloud game-cloud-3" />

        <div
          className={`pixel-character ${!state.started ? "pixel-character-idle" : ""}`}
          style={{ left: PLAYER_LEFT, top: state.playerY }}
        >
          <div className="pixel-ear pixel-ear-left" />
          <div className="pixel-ear pixel-ear-right" />
          <div className="pixel-body">
            <div className="pixel-eye pixel-eye-left" />
            <div className="pixel-eye pixel-eye-right" />
            <div className="pixel-cheek pixel-cheek-left" />
            <div className="pixel-cheek pixel-cheek-right" />
            <div
              className={`pixel-leg pixel-leg-left ${
                isRunningFrameA ? "pixel-leg-down" : "pixel-leg-up"
              }`}
            />
            <div
              className={`pixel-leg pixel-leg-right ${
                isRunningFrameA ? "pixel-leg-up" : "pixel-leg-down"
              }`}
            />
          </div>
        </div>

        {state.obstacles.map((obstacle) => (
          <div
            key={obstacle.id}
            className={`pixel-obstacle ${!state.started ? "pixel-obstacle-idle" : ""}`}
            style={{
              left: obstacle.x,
              top: GAME_HEIGHT - GROUND_OFFSET - obstacle.height,
              width: obstacle.width,
              height: obstacle.height,
            }}
          >
            <div className="pixel-obstacle-inner" />
          </div>
        ))}

        {showGameOverOverlay ? (
          <div className="game-overlay">
            <p className="text-sm uppercase tracking-[0.18em] text-[var(--accent-strong)]">
              Game Over
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">클릭해서 다시 시작</h3>
            <p className="mt-3 text-sm text-white/70">
              점수 {currentScore}점 · 클릭 한 번으로 다시 시작됩니다.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

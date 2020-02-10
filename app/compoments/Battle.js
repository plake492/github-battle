import React from "react";
import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle
} from "react-icons/Fa";
import PropTypes from "prop-types";
import Results from "./Results";
import { ThemeConsumer } from "../contexts/theme";

function Instructions() {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="instructions-container">
          <h1 className="center-text header-lg">Instructions</h1>
          <ol className="container-sm grid center-text battle-instructions">
            <li>
              <h3 className="header-sm">Enter two Github users</h3>
              <FaUserFriends
                className={`bg-${theme}`}
                color="rgb(255, 191, 116)"
                size={140}
              />
            </li>
            <li>
              <h3 className="header-sm">Battle</h3>
              <FaFighterJet
                className={`bg-${theme}`}
                color="#727272"
                size={140}
              />
            </li>
            <li>
              <h3 className="header-sm">See the winners</h3>
              <FaTrophy
                className={`bg-${theme}`}
                color="rgb(255, 215, 0)"
                size={140}
              />
            </li>
          </ol>
        </div>
      )}
    </ThemeConsumer>
  );
}

//? ======================================================================================================== //
//? ======================================================================================================== //

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.state.username);
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <form className="colum-player" onSubmit={this.handleSubmit}>
            <label htmlFor="username" className="player-label">
              {this.props.label}
            </label>
            <div className="row player-inputs">
              <input
                type="text"
                id="username"
                className={`input-${theme}`}
                placeholder="github username"
                autoComplete="off"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <button
                className={`btn ${theme === "dark" ? "light-btn" : "dark-btn"}`}
                type="submit"
                disabled={!this.state.username}
              >
                submit
              </button>
            </div>
          </form>
        )}
      </ThemeConsumer>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

//? ======================================================================================================== //
//? ======================================================================================================== //

function PlayerPreivew({ username, onReset, label }) {
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <div className="column-player">
          <h3 className="player-label">{label}</h3>
          <div className={`row bg-${theme}`}>
            <img
              className="avatar-small"
              src={`https://github.com/${username}.png?size=200`}
              atl={`Avatar for ${username}`}
            ></img>
            <a href={`https://github.com/${username}`} className="link">
              {username}
            </a>
          </div>
          <button className="btn-clear flex-center" onClick={onReset}>
            <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
          </button>
        </div>
      )}
    </ThemeConsumer>
  );
}

PlayerPreivew.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

//? ======================================================================================================== //
//? ======================================================================================================== //

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOne: null,
      playerTwo: null,
      battle: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handelReset = this.handelReset.bind(this);
  }
  handleSubmit(id, player) {
    this.setState({
      [id]: player
    });
  }
  handelReset(id) {
    this.setState({
      [id]: null
    });
  }

  render() {
    const { playerOne, playerTwo, battle } = this.state;

    if (battle === true) {
      return (
        <Results
          playerOne={playerOne}
          playerTwo={playerTwo}
          onReset={() =>
            this.setState({
              playerOne: null,
              playerTwo: null,
              battle: false
            })
          }
        />
      );
    }

    return (
      <React.Fragment>
        <Instructions />
        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null ? (
              <PlayerInput
                label="Player One"
                onSubmit={player => this.handleSubmit("playerOne", player)}
              />
            ) : (
              <PlayerPreivew
                username={playerOne}
                label="Player One"
                onReset={() => this.handelReset("playerOne")}
              />
            )}

            {playerTwo === null ? (
              <PlayerInput
                label="Player Two"
                onSubmit={player => this.handleSubmit("playerTwo", player)}
              />
            ) : (
              <PlayerPreivew
                username={playerTwo}
                label="Player Two"
                onReset={() => this.handelReset("playerTwo")}
              />
            )}
          </div>
          {playerOne && playerTwo && (
            <button
              className="btn dark-btn btn-space"
              onClick={() => this.setState({ battle: true })}
            >
              Battle
            </button>
          )}
        </div>
      </React.Fragment>
    );
  }
}

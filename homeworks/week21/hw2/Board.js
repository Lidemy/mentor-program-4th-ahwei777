/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-unresolved */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { size } from './setting';

const stoneRows = Array.from({ length: size });
const stoneColumns = Array.from({ length: size });
const squareRows = Array.from({ length: size - 1 });
const squareColumns = Array.from({ length: size - 1 });

const Stone = ({
  handleClickPlacing, X, Y, stone,
}) => {
  let color = '';
  if (stone) {
    color = stone === 'B'
      ? 'radial-gradient(5px 5px at 5px 5px,#fff,#333)'
      : 'radial-gradient(5px 5px at 5px 5px,#fff,#e2e2e2)';
  }
  return (
    <div
      className="stone"
      onClick={() => {
        handleClickPlacing(X, Y);
      }}
      style={{
        background: color,
        boxShadow: stone !== null ? '2px 2px 4px rgba(0,0,0,0.3)' : '',
      }}
    />
  );
};

// 背景不需 re-render
const MemoSquaresBackgroundWrapper = memo(() => (
  <div className="squares-background-wrapper">
    {squareColumns.map((el, indexX) => (
      <div key={indexX} className="squares-columns">
        {squareRows.map((EL, indexY) => (
          <div key={indexY} className="square-background" />
        ))}
      </div>
    ))}
  </div>
));

const Board = ({ handleClickPlacing, board }) => (
  <div className="stones-wrapper">
    {stoneColumns.map((EL, indexX) => (
      <div key={indexX} className="stone-columns">
        {stoneRows.map((el, indexY) => (
          <Stone
            key={indexY}
            X={indexX}
            Y={indexY}
            handleClickPlacing={handleClickPlacing}
            stone={board[indexY][indexX]}
          />
        ))}
      </div>
    ))}
    <MemoSquaresBackgroundWrapper />
  </div>
);

export default Board;

Stone.propTypes = {
  handleClickPlacing: PropTypes.func,
  X: PropTypes.number,
  Y: PropTypes.number,
  stone: PropTypes.string,
};

Board.propTypes = {
  handleClickPlacing: PropTypes.func,
  board: PropTypes.object,
};

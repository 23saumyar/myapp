import React, { memo, useState, useEffect } from 'react';
import styled from 'styled-components';


import { HIDDEN_CELL_HIDE, HIDDEN_CELL_SHOW } from '../game.reducer';
import { Cell } from './Cell';
import { WRONG_GUESSED_CELL, CORRECT_GUESSED_CELL } from '../game.utils';

const FieldView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 20px 0;
    opacity: ${({ animationState }) => animationState};
    transform: scale(${({ animationState }) => animationState});
    transition: opacity .2s ease, transform .3s ease;
`;

export const Field = memo(function Field ({
    fieldSize = 0,
    cellCount = 0,
    space = 0,
    field = [],
    hiddenCells = [],
    level = 0,
    showHidden = false,
    dispatch,
    updateLevel,
    visible,
}) {
    const cellSize = fieldSize / cellCount - space;

    const { gameField, onCellClick } = useGameField(field, hiddenCells, updateLevel);
   
    useEffect(
        () => {
            dispatch({ type: HIDDEN_CELL_SHOW })
            setTimeout(() => dispatch({ type: HIDDEN_CELL_HIDE }), 1500);
        },
        [level]
    );

    return (
        <FieldView
            animationState={visible ? 1 : 0}
            onClick={!showHidden ? onCellClick : null}>
            {
                gameField.map((cellValue, i) => (
                    <Cell
                        size={cellSize}
                        space={space}
                        key={i}
                        id={i}
                        value={cellValue}
                        forceShowHidden={showHidden} />
                ))
            }
        </FieldView>
    );
});

function useGameField(field, hiddenCells, updateLevel) {
    const [gameField, setField] = useState(field);
    const [gameHiddenCells, setHidden] = useState(hiddenCells);

    function onCellClick({ target }) {
        const id = Number(target.id);

        if (hiddenCells.includes(id)) {
            const updatedField = gameField.map((e, i) => i === id ? CORRECT_GUESSED_CELL : e);
            const updatedHidden = gameHiddenCells.filter(e => e !== id);

            setField(updatedField);
            setHidden(updatedHidden);

            return !updatedHidden.length && setTimeout(updateLevel, 1000);
        }

        const updatedField = gameField.map((e, i) => i === id ? WRONG_GUESSED_CELL : e);
        setField(updatedField);

        return setTimeout(updateLevel, 1000, true);
    }

    return { gameField, onCellClick };
}


// This component is responding for displaying game field, cells, and user interactions with cells.
// Line 34: cellSize is counted by dividing field size on cell count minus space between cells, so that all the cells fit the field size.
// Line 36: create new state and cell click handler to track user actions and guessed cells.
// onCellClick — handler extracts cell id from event (id is representation of cell’s index in field array). Then it checks if this id is 
    //from array with hidden cells, if so it updates field and hidden cells and if all cells were guessed updates the level. If user made a mistake it resets the level.
// Line 38-44: on every level change dispatches action to show hidden cells and then action to hide them with 1500 ms delay.
// Line 65–89: useGameField hook creates two states: 1 to display current game field with guessed cells and 2 to track guessed cells.


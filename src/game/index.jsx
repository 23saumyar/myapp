import React, { memo, useReducer, useMemo, useEffect } from 'react';

import { Field } from './components/GameField';
import { GameFieldView, GameView, SwitchView } from './components/Styled';
import {
    GameReducer, initialState, NEW_LEVEL,
    FIELD_HIDE, FIELD_SHOW, RESET_LEVEL,
} from './game.reducer';
import { generateGameField } from './game.utils';
import Switch from 'rc-switch';

import 'rc-switch/assets/index.css';

function Game ({ toggleTheme }) {
    const [{ level, showHidden, showField, levelConfig }, dispatch] = useReducer(
        GameReducer, initialState
    );

    const { cellCount, memoryCount } = levelConfig;

    const { field, hiddenCells } = useMemo(
        () => generateGameField(cellCount, memoryCount),
        [levelConfig]
    );

    useEffect(
        () => setTimeout(dispatch, 500, { type: FIELD_SHOW }),
        [levelConfig],
    );

    function updateLevel(shouldReset) {
        dispatch({ type: FIELD_HIDE });
        setTimeout(dispatch, 500, { type: shouldReset ? RESET_LEVEL : NEW_LEVEL, level: level + 1 });
    }

    return (
        <GameView>
            <GameFieldView {...levelConfig}>
                <SwitchView>
                    <div>Level: {level}</div>
                    <div>
                        Theme mode: <Switch onClick={toggleTheme} />
                    </div>
                </SwitchView>
                <Field
                    {...levelConfig}
                    levelConfig={levelConfig}
                    visible={showField}
                    key={field}
                    level={level}
                    field={field}
                    hiddenCells={hiddenCells}
                    dispatch={dispatch}
                    showHidden={showHidden}
                    updateLevel={updateLevel}
                />
            </GameFieldView>
        </GameView>
    );
}

export default memo(Game);



// Here we have Game core component. Let’s go through it and see what it’s doing.
// Line 15–17: here we use useReducer hook instead of Redux. It accepts reducer, initial state and returns us current state and dispatch function.
// Line 21–24: here we use useMemo hook to memoize current game field state, so if user will change theme and this component will be rerendered, it will use memoized field, but if level will change, it will create a new one.
// Line 26–29: useEffect hook is alternative to componentDidMount and componentDidUpdate. This hook will be triggered every time level change, to display game field if it’s hidden.
// Line 31–34: we’re declaring function to update current level. Firstly it triggers FIELD_HIDE event and then NEW_LEVEL event with 500ms delay.
// Line 62: we’re using memo helper to make our functional component like classPureComponent.
// The rest of code shouldn’t be confusing.
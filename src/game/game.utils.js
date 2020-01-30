export function generateGameField(cellCount, memoryCount) {
    const cellsIndexes = [...Array(cellCount * cellCount)]
        .map((_, i) => i);
    const field = [...cellsIndexes].fill(1);
    const hiddenCells = [];

    for (let i = 0; i < memoryCount; i++) {
        const rNum = Math.floor(Math.random() * cellsIndexes.length);
        const toChange = cellsIndexes.splice(rNum, 1).pop();

        hiddenCells.push(toChange);
        field[toChange] = 2;
    }

    return {
        field, hiddenCells,
    };
}

export const WRONG_GUESSED_CELL = 0;
export const CORRECT_GUESSED_CELL = 3;
export const CELL = 1;
export const HIDDEN_CELL = 2;





// This hook is used to generate game field, which is represented as array of integers. For example game field 3x3 will look like:
// [1, 1, 2, 1, 2, 1, 1, 1, 2]
// Where 1 is representation of simple untouched cell and 2 is representation of untouched hidden cell, which user will have to memorize and guess, 3 will be for touched cells which were guessed and 0 for touched and incorrectly guessed cell.
// cellsIndexes— is auxiliary array from which we will get random cell;
// field — is actual game field;
// hiddenCells — is array of hidden cell indexes;
// Then in loop from line 7 we’re generating random indexes, deleting them from auxiliary array, pushing them to hiddenCells array and update game field value to 2.
// So at the end, we have fieldarray which represents game field and array of cell indexes which user will have to memorize.

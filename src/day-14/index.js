const changeSelectedRecipePosition = (oldPosition, state) => {
    const lengthOfState = state.length;
    const newPosition = state[oldPosition] + 1 + oldPosition;

    return newPosition < lengthOfState ? newPosition : (newPosition) % lengthOfState;
};

const findBestRecipe = count => {
    let state = [3, 7];
    let elf1 = 0;
    let elf2 = 1;

    while (true) {
        let recipe = state[elf1] + state[elf2];

        if (recipe >= 10) {
            state.push(Math.floor(recipe / 10));
        }

        state.push(recipe % 10);

        if (state.length === count + 10) return state.join('').slice(count, count + 10);

        elf1 = changeSelectedRecipePosition(elf1, state);
        elf2 = changeSelectedRecipePosition(elf2, state);
    }
};

const isInState = (state, input) => {
    if (state.length < input.length || state[state.length - 1].toString() !== input[input.length - 1]) return;

    let result = "";
    for (let j = 1; j <= input.length; j++) {
        result = state[state.length - j].toString() + result;
    }

    if (result === input) return true;
};

const findCountOfRecipes = input => {
    let prepareInput = String(input)
    let state = [3, 7];
    let elf1 = 0;
    let elf2 = 1;

    while (true) {
        let recipe = state[elf1] + state[elf2];

        if (recipe >= 10) {
            state.push(Math.floor(recipe / 10));
            if (isInState(state, prepareInput)) return state.length - prepareInput.length;
        }

        state.push(recipe % 10);
        if (isInState(state, prepareInput)) return state.length - prepareInput.length;

        elf1 = changeSelectedRecipePosition(elf1, state);
        elf2 = changeSelectedRecipePosition(elf2, state);
    }
};

module.exports = {
    findBestRecipe: findBestRecipe.bind(this, 704321),
    findCountOfRecipes: findCountOfRecipes.bind(this, 704321),
};



// Config file for babel from https://jestjs.io/docs/tutorial-react
// ESLint incorrectly states that 'module' is undefined in this context
/* eslint-disable no-undef */
module.exports = {
    presets: [
        "@babel/preset-env",
        ["@babel/preset-react", {
            "runtime": "automatic"
        }]
    ]
}
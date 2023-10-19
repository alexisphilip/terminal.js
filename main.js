/**
 * Terminal.js example.
 */

// TODO: CSS: add it automatically in constructor
// TODO: CSS: overwrite it
// TODO: set terminal name? so errors output are: -[NAME]: command not found
// TODO: add a `data` attribute which custom programs can use to store custom attributes, data, etc...
// TODO: `writeHTML` method, or use already existing `write` method?
// TODO: global methods: add these: setTemplate, setTheme, setPrompt? (instance + static)
// TODO: help default method, lists all functions
// TODO: default programs: clear, ls, cd
// TODO: default programs: allow overwrite? (clear, ls, cd)
// TODO: when parsing "words string", remove single & double quotes
// TODO: change objects passed to functions
// TODO: program: wait for user input, exit program with Ctrl+C

// Selects the terminal's parent, where it will be appended.
const container = document.querySelector("#myTerminal");

// Instantiates the terminal.
const myTerminal = new Terminal(container);

// Customizes the prompt.
myTerminal.setPrompt("alexis@philip: ");

// ###############
// CUSTOM PROGRAMS
// ###############

/**
 * Writes in the terminal.
 */
myTerminal.addProgram("ping", (terminal) => {
    terminal.write("pong");
});

/**
 * Executes commands in the terminal, without echoing the commands.
 */
myTerminal.addProgram("tables", (terminal, args, argsObject) => {
    const array = [
        ["Philip", 150, true],
        ["Standbridge", 150, true],
        ["Foret", 150, false],
    ];
    terminal.writeTable(array);
    const object = [
        {name: "Philip", value: 150, bool: true},
        {name: "Standbridge", value: 150, bool: true},
        {name: "Foret", value: 150, bool: false},
    ];
    terminal.writeTable(object);
});

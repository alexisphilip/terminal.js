/**
 * Terminal.js example.
 */

// TODO: global parameters: template, prefix
// TODO: help default method, lists all functions
// TODO: array/table function
// TODO: set clear command to default?
// TODO: refactor code (make it more clear, ordered, less repetitive)
// TODO: when parsing "words string", remove single & double quotes
// TODO: change objects passed to functions
// TODO: docs: overwrite default programs
// TODO: program: wait for user input, exit program with Ctrl+C

const container = document.querySelector("#myTerminal");

const myTerminal = new Terminal(container);

/**
 * Clear program.
 */
Terminal.addFunction("clear", (terminal) => {
    terminal.clear();
});

/**
 * Writes in the terminal.
 */
myTerminal.addFunction("ping", (terminal) => {
    terminal.write("pong");
});

/**
 * Executes commands in the terminal, without echoing the commands.
 */
myTerminal.addFunction("tables", (terminal, args, argsObject) => {
    // terminal.echo = false;
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

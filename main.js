/**
 * Terminal.js example.
 */

// TODO: set clear method to default?
// TODO: refactor code (make it more clear, ordered, less repetitive)
// TODO: when parsing "words string", remove single & double quotes
// TODO: change objects passed to functions
// TODO: docs: overwrite default programs

/**
 * Clear program.
 */
Terminal.addFunction("clear", (terminal, args) => {
    terminal.clear();
});

const container = document.querySelector("#myTerminal");

const myTerminal = new Terminal(container);

/**
 * Writes in the terminal.
 */
myTerminal.addFunction("ping", (terminal) => {
    terminal.write("pong");
});

/**
 * Executes commands in the terminal, without echoing the commands.
 */
myTerminal.addFunction("test", (terminal, args, argsObject) => {
    terminal.echo = false;
    console.log(args);
    console.log(argsObject);
});

myTerminal.exec("test -y -u -n no");
// myTerminal.exec("test -y yes -n no");

// /**
//  * Arguments management.
//  */
// myTerminal.addFunction("copy", (terminal, args) => {
//     console.log(args);
//     if (args[1] == "-f" && !!args[2] && args[3] == "-m" && !!args[4]) {
//         terminal.write(`File is: ${args[2]} and module is: ${args[4]}`);
//     } else {
//         terminal.write(`copy: usage: -f filename -m modulename`);
//     }
// });

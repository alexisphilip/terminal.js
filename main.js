/**
 * Terminal.js example.
 */

const container = document.querySelector("#myTerminal");

const myTerminal = new Terminal(container);

myTerminal.addFunction("ping", (terminal, args) => {
    terminal.write("pong");
});

myTerminal.addFunction("copy", (terminal, args) => {
    console.log(args);
    if (args[1] == "-f" && !!args[2] && args[3] == "-m" && !!args[4]) {
        terminal.write(`File is: ${args[2]} and module is: ${args[4]}`);
    } else {
        terminal.write(`copy: usage: -f filename -m modulename`);
    }
});

# terminal.js

JS integration of an HTML & CSS terminal with built-in functions.

## Usage

Instantiate the terminal.

```javascript
const container = document.querySelector("#myTerminal");
const myTerminal = new Terminal();
```

### Basic methods

```javascript
// Writes in the terminal.
myTerminal.write("Hello world!");

// Writes a table in the terminal.
myTerminal.writeTable([["val1", "val2"], ["val3", "val4"]]); // Array in array (table without header)
myTerminal.writeTable([{col1: "val1", col2: "val2"}, {col1: "val3", col2: "val4"}]); // Object in array (table with header)

// Executes a bash command.
myTerminal.exec("myCommand -arg1 val1");

// Clears the terminal.
myTerminal.clear();
```

### Add a script (JS function)

> `Terminal` methods can be used through the `terminal` parameter.

**Local** script (for the current terminal instance).

```javascript
myTerminal.addFunction("ping", (terminal) => {
    terminal.write("pong");
});
```

**Global** script (for all terminals).

```javascript
Terminal.addFunction("ping", (terminal) => {
    terminal.write("pong");
});
```

### Script arguments

You can get script arguments as an `Array`, just like in BASH.

```bash
myScript -p val1 -m val2 val3
```

```javascript
Terminal.addFunction("myScript", (terminal, args) => {
    // args = ["-p", "val1", "-m", "val2", "val3"]
});
```

You can get script arguments as an `Object`.

```bash
myScript -p val1 -m val2 val3
```

```javascript
Terminal.addFunction("myScript", (terminal, args, argsObject) => {
    // argsObject = {"-p": "val1", "-m": "val2"}
});
```

### Custom style

TODO

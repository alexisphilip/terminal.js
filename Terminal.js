/**
 * Terminal
 */
class Terminal {
    // static terminals;
    static programs = {};
    programs = {};

    // Elements
    inputEl;
    container;

    prefix = "user@host:~#";
    echo = true;

    constructor(container) {
        this.container = container;
        this.container.querySelector(".terminal-prefix").innerHTML = this.prefix;
        this.inputEl = this.container.querySelector(".terminal-input");
        this.container.addEventListener("click", (e) => {
            this.inputEl.focus();
        });

        let commands = [],
            commandPosition = -1;

        this.inputEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const command = e.currentTarget.value.trim();
                e.currentTarget.value = "";
                if (command !== "") {
                    commands.unshift(command);
                }
                commandPosition = -1;
                // Executes the command.
                this.#bashParse(command, "input");
            } else if (e.key === "ArrowUp") {
                if (commands[commandPosition + 1]) {
                    commandPosition++;
                    e.currentTarget.value = ""; // Allows the cursor to be set at the end of the input' value.
                    e.currentTarget.value = commands[commandPosition];
                }
            } else if (e.key === "ArrowDown") {
                if (commands[commandPosition - 1]) {
                    commandPosition--;
                    e.currentTarget.value = ""; // Allows the cursor to be set at the end of the input' value.
                    e.currentTarget.value = commands[commandPosition];
                } else {
                    e.currentTarget.value = "";
                }
            }
        });

        setTimeout(() => {
            // this.#bashParse(`myProgram -key1 "yes 'yes' yes \"yes\"" -m arg2 --key2 oui non -key3 'yes "yes" yes \'yes\''`);
            // this.#bashParse(`copy -f oui -m non`);
        }, 50);

        // for (let i = 0; i < 100; i++) {
        //     this.write("hi");
        // }
    }

    static setTemplate() {
        
    }

    /**
     * Registers a program (JS function) globally (for all terminal's instances).
     * @param {string} programName The program's name.
     * @param {function} programFunction The program's JS function to execute when requested.
     */
    static addFunction(programName, programFunction) {
        Terminal.programs[programName] = programFunction;
    }

    /**
     * Registers a program (JS function) locally (only for the current terminal's instance).
     * @param {string} programName The program's name.
     * @param {function} programFunction The program's JS function to execute when requested.
     */
    addFunction(programName, programFunction) {
        this.programs[programName] = programFunction;
    }

    /**
     * Executes a command string.
     * @param {string} command Command string to execute.
     */
    exec(command) {
        // First step is to parse the command string.
        this.#bashParse(command, "script");
    }

    /**
     * Outputs text in the terminal.
     * @param {string} string Text to output in the terminal.
     * @param {boolean} appendPrefix Sets the user and host output text prefix.
     */
    write(string, appendPrefix = false) {
        
        const bashEntryEl = document.createElement("div");
        bashEntryEl.classList.add("terminal-entry");
        
        if (appendPrefix) {
            const prefixEl = document.createElement("span");
            prefixEl.classList.add("terminal-prefix");
            prefixEl.innerText = this.prefix + " ";
            bashEntryEl.appendChild(prefixEl);
        }
        
        const commandEl = document.createElement("span");
        commandEl.classList.add("terminal-command");
        commandEl.innerText = string;
        bashEntryEl.appendChild(commandEl);

        this.container.querySelector(".terminal-entries").appendChild(bashEntryEl)
    }

    /**
     * Clears all outputs in the terminal.
     */
    clear() {
        this.container.querySelector(".terminal-entries").innerHTML = "";
    }

    /**
     * Parses a command string.
     * - splits the string
     * - interprets the command name
     * - interprets the command arguments
     * @param {string} command Command string to parse.
     * @param {string} context Execution's context:
     * - input: the command was executed from the user's input.
     * - script: the command was executed from a script.
     */
    #bashParse(command, context) {

        command = command.trim();

        if (this.echo) {
            this.write(command, context === "input");
        }

        // If the command is an empty string, there's no need to interpret it.
        if (command === "") {
            return;
        }

        let words,
            program,
            regex,
            args = [null],
            argsObject = [];

        /**
         * Splits the command string by spaces except when it's surrounded by single/double quotes.
         * Regex: selects words separated by spaces which aren't between single/double quotes.
         * 
         * @example
         * IN:  git commit -m "My 'commit' message"
         * OUT: ["git", "commit", "-m", "\"My 'commit' message\""]
         */
        regex = /\s(?=(?:(?:[^"]*"){2})*[^"]*$)(?=(?:(?:[^']*'){2})*[^']*$)/g;
        words = command.split(regex);

        // Removes the first word, which is the program's name.
        program = words.shift();

        // For each words in the command string.
        for (let i = 0; i < words.length; i++) {

            const word = words[i],
                  nextWord = words[i + 1];

            // If empty string, skip.
            if (word == "") {
                break;
            }

            /**
             * If the current word is a argument's key (ex: `-p` or `--page`).
             * Regex: contains 1 or 2 `-` at the start of the string and is not followed by `-`.
             */
            regex = /^-{1,2}(?!-)/;
            if (regex.test(word)) {
                argsObject[word] = null;
                args.push(word);
                // Checks if the next word is a argument's key.
                if (regex.test(nextWord)) {
                    // If it is, we'll exit the loop.
                    break;
                } // If it's not a argument's key.
                else {
                    // Sets that word as the argument's value.
                    argsObject[word] = nextWord;
                    args.push(nextWord);
                    // Then we'll skip that next word in the current loop.
                    i++;
                }
            } // If it's not an argument's key, it's a word.
            else {
                argsObject[word] = null;
                args.push(word);
            }
        }

        // console.log(args);
        // console.log(argsObject);

        this.#bashLookupAndExec(program, args, context);
    }

    /**
     * Looks up for the program to execute, then executes it.
     * @param {string} program Program's name to execute.
     * @param {array} args Command's arguments.
     * @param {string} context Execution's context:
     * - input: the command was executed from the user's input.
     * - script: the command was executed from a script.
     */
    #bashLookupAndExec(program, args, context) {

        // Looks up the program is global programs.
        if (program in Terminal.programs) {
            Terminal.programs[program](this, args);
        } // Looks up the program is local programs.
        else if (program in this.programs) {
            this.programs[program](this, args);
        } else {
            this.write(`-bash: ${program}: command not found`);
        }

        // For the "input" context only (the "script" context cannot reset the `echo` variable).
        if (context === "input") {
            // Once a program is done executing, its @echo variable is reset
            // to true since commands needs to be outputted in the terminal.
            this.echo = true;
        }
    }
}

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

    constructor(container) {
        this.container = container;
        this.container.querySelector(".terminal-input-prefix").innerHTML = this.prefix;
        this.inputEl = this.container.querySelector(".terminal-input");
        this.container.addEventListener("click", (e) => {
            this.inputEl.focus();
        });

        this.inputEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const command = e.currentTarget.value;
                e.currentTarget.value = "";
                this.write(this.prefix + " " + command);
                this.#bashParse(command);
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

    #bashParse(command) {

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

        console.log(args);
        console.log(argsObject);

        this.#bashLookupAndExec(program, args);
    }

    #bashLookupAndExec(program, args) {
        if (program in Terminal.programs) {
            Terminal.programs[program](this, args);
        }
        if (program in this.programs) {
            this.programs[program](this, args);
        }
    }

    static addFunction() {
        Terminal.programs[programName] = programFunction;
    }

    addFunction(programName, programFunction) {
        this.programs[programName] = programFunction;
    }

    write(string) {
        const bashEntryEl = document.createElement("div");
        bashEntryEl.classList.add("terminal-entry");
        bashEntryEl.innerHTML = string;
        this.container.querySelector(".terminal-entries").appendChild(bashEntryEl)
    }
}

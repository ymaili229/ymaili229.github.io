let input;

let output;

let cmdinfo;

var config = {
    cmdinfo: {
        help_help: 'Print this menu.',
        clear_help: 'Clear the terminal screen.',
        info_help: 'Display information about ---------------',
        reboot_help: 'Reboot the terminal.'
    },
    generaltext: {
        general_help: "Below there's a list of commands that you can use.",
        reboot: "Rebooting terminal in..."
    }
}

var main = (function() {
    const keyP = document.getElementById("cmdline");
    
    document.getElementById("prompt").textContent = `guest@terminal:~$ `;
    keyP.addEventListener("keydown", enterCheck);

    function enterCheck(e) {
        if (e.code === "Enter") {
            input = document.getElementById("cmdline");
            let command = input.value;
            commandHandler(command);
            e.preventDefault();
        }
    }

    var cmds = {
        HELP: { value: "help", help: config.cmdinfo.help_help },
        CLEAR: { value: "clear", help: config.cmdinfo.clear_help },
        INFO: { value: "info", help: config.cmdinfo.info_help },
        REBOOT: { value: "reboot", help: config.cmdinfo.reboot_help }
    };

    function commandHandler(command) {
        switch(command) {
            case "help":
                var result = config.generaltext.general_help + "\n\n";
                for (var cmd in cmds) {
                    result += cmds[cmd].value + " - " + cmds[cmd].help + "\n";
                }
                outputText(result);
                break;
            case "clear":
                document.getElementById("output").innerHTML = "";
                break;
            case "info":
                outputText("Command not implemented yet.");
                break;
            case "reboot":
                outputText(config.generaltext.reboot);
                sleep(700).then(() => {
                    outputText("3...", false);
                    sleep(700).then(() => {
                        outputText("2...", false);
                        sleep(700).then(() => {
                            outputText("1...", false);
                            sleep(400).then(() => {
                                location.reload();
                            })
                        })
                    })
                })
                break;
            default:
                outputText(command + ": command not found");
        }
        document.getElementById("cmdline").value = "";
    }

    function colorText(color, text){
        var span = document.createElement("span");
        span.style.color = color;
        span.textContent = text;
        return span;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function outputText(text, inp = true) {
        output = document.getElementById("output")

        if (inp == true) {
            output.append(colorText("#e09f14", "guest@terminal:~$"));
        }
        output.insertAdjacentText("beforeend", ` ${input.value}\n`);
        output.insertAdjacentText("beforeend", text);
        output.insertAdjacentElement("beforeend", document.createElement("br"));
    }
})

window.onload = main;
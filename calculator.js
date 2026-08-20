var display = document.getElementById("calculatorDisplay")
display.textContent = "0"
var displayState = "type"
var buttons = document.getElementsByClassName("calculatorButton")
var clearButton = document.getElementById("calculatorClearButton")

clearButton.addEventListener("click", function() {
    display.textContent = "0"
})

function writeDigit(digit) {
    if (displayState == "show") {
        display.textContent = digit
    } else {
        if (display.textContent == "0") {
            display.textContent = digit
        } else {
            display.textContent = display.textContent + digit
        }
    }
    displayState = "type"
}

function writeSymbol(symbol) {
    let operatiorMentioned = false
    for (const op of ["+", "-", "×", "÷"]) {
        console.log(op)
        if (display.textContent.includes(op)) {
            operatiorMentioned = true
        }
    }

    if (displayState != "show" && !operatiorMentioned) {
        if (["+", "-", "×", "÷"].includes(symbol) && !operatiorMentioned) {
            display.textContent = display.textContent + symbol
        }
    }
    displayState = "type"
}

for (const button of buttons) {
    button.addEventListener("click", function() {
        if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(button.textContent)) {
            writeDigit(button.textContent)
        } else if ([".", "+", "-", "×", "÷"].includes(button.textContent)) {
            writeSymbol(button.textContent)
        }
    })
}

const API_KEY = "Your openai api key" // Change this line to your API from https://platform.openai.com/account/api-keys;
const submitButton = document.getElementById("send");
const outputElement = document.getElementById("output")
const inputElement = document.getElementById("input")
const historyElement = document.querySelector(".history")
const newChatButton = document.getElementById("new-chat")

const changeInput = (text) => {
    const inputElement = document.getElementById("input")
    inputElement.value = text
}

async function getMessage() {
    console.log("getmessage")
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
    },
    body: JSON.stringify({
        "model": "gpt-3.5-turbo",
        'messages': [{role: 'user', content: inputElement.value}],
        max_tokens: 100
        })
    }
    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", options)
        const data = await response.json()
        console.log(data)
        outputElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content) {
            const pElement = document.createElement("p")
            pElement.textContent = inputElement.value
            pElement.addEventListener("click", () => changeInput(pElement.textContent) )
            historyElement.append(pElement)
            inputElement.value = ""
        }
    } catch (error) {
        console.log(error)
    }
}

submitButton.addEventListener("click", getMessage);

const clearInput = () => {
    inputElement.value = ""
}

inputElement.addEventListener("keypress", (event) => { 
    event.key === "Enter" ? getMessage() : null;
});

newChatButton.addEventListener("click", clearInput)
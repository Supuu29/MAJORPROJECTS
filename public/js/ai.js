const aiBtn = document.getElementById("aiBtn");
const aiBox = document.getElementById("aiBox");
const closeAI = document.getElementById("closeAI");
const sendAI = document.getElementById("sendAI");
const aiInput = document.getElementById("aiInput");
const aiMessages = document.getElementById("aiMessages");

aiBtn.addEventListener("click", () => {
    aiBox.style.display = "block";
});

closeAI.addEventListener("click", () => {
    aiBox.style.display = "none";
});

sendAI.addEventListener("click", async () => {
    const message = aiInput.value.trim();

    if (!message) return;

    aiMessages.innerHTML += `<p><b>You:</b> ${message}</p>`;
    aiMessages.innerHTML += `<p id="typing"> 🤖AI is typing...</p>`;

    aiInput.value = "";

    const response = await fetch("/ai/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    document.getElementById("typing").remove();
    console.log("API Response:", data);

    aiMessages.innerHTML += `<p><b>AI:</b> ${data.reply}</p>`;

    // aiMessages.innerHTML += `<p><b>AI:</b> ${JSON.stringify(data)}</p>`;
         aiMessages.innerHTML += `<p><b>AI:</b> ${data.reply || "I'm currently busy.Please try again few seconds later."}</p>`;


    aiMessages.scrollTop = aiMessages.scrollHeight;
});
window.onload = async (event) => {
  const response = await fetch("/shiritori", { method: "GET" });
  const previousWord = await response.text();
  const paragraph = document.querySelector("#previousWord");
  paragraph.innerHTML = `前の単語: ${previousWord}`;
}

document.querySelector("#nextWordSendButton").onclick = async (event) => {
  const nextWordInput = document.querySelector("#nextWordInput");
  const nextWordInputText = nextWordInput.value;

  const response = await fetch("/shiritori", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nextWord: nextWordInputText })
  });

  if (response.ok) {
    const previousWord = await response.text();
    const paragraph = document.querySelector("#previousWord");
    paragraph.innerHTML = `前の単語: ${previousWord}`;
    nextWordInput.value = "";
  } else {
    const errorData = await response.json();
    localStorage.setItem("wordHistory", JSON.stringify(errorData.wordHistory));
    localStorage.setItem("errorMessage", errorData.errorMessage);
    window.location.href = "result-singleplayer.html";
  }
}

document.querySelector("#nextWordInput").addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#nextWordSendButton").click();
  }
});

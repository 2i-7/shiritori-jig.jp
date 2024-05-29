let playerNames = JSON.parse(localStorage.getItem("playerNames"));
let currentPlayerIndex = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(playerNames);

window.onload = async (event) => {
  const response = await fetch("/shiritori", { method: "GET" });
  const previousWord = await response.text();
  const paragraph = document.querySelector("#previousWord");
  paragraph.innerHTML = `前の単語: ${previousWord}`;
  document.querySelector("#currentPlayer").innerHTML = `現在のプレイヤー: ${playerNames[currentPlayerIndex]}`;
}

document.querySelector("#nextWordSendButton").onclick = async (event) => {
  const nextWordInput = document.querySelector("#nextWordInput");
  const nextWordInputText = nextWordInput.value;

  const response = await fetch("/shiritori", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nextWord: nextWordInputText, playerName: playerNames[currentPlayerIndex] }) // 変更
  });

  if (response.ok) {
    const previousWord = await response.text();
    const paragraph = document.querySelector("#previousWord");
    paragraph.innerHTML = `前の単語: ${previousWord}`;
    nextWordInput.value = "";

    // 次のプレイヤーに交代
    currentPlayerIndex = (currentPlayerIndex + 1) % playerNames.length;
    document.querySelector("#currentPlayer").innerHTML = `現在のプレイヤー: ${playerNames[currentPlayerIndex]}`;
  } else {
    const errorResponse = await response.json();
    localStorage.setItem('lastPlayer', errorResponse.lastPlayer); // 追加
    localStorage.setItem('wordHistory', JSON.stringify(errorResponse.wordHistory)); // 追加
    localStorage.setItem('errorMessage', errorResponse.errorMessage); // 追加
    window.location.href = "result-multiplayer.html";
  }
}

document.querySelector("#nextWordInput").addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#nextWordSendButton").click();
  }
});

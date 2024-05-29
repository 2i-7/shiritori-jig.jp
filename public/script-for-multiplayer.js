// script-for-multiplayer.js

let playerNames = JSON.parse(localStorage.getItem("playerNames"));
let currentPlayerIndex = 0;
let playerIcons = {};
let playerIconsYes = {};

const availableIcons = [
  "image/boy1.png",
  "image/boy2.png",
  "image/girl1.png",
  "image/girl2.png"
];

function getYesVersion(iconPath) {
  return iconPath.replace(".png", "-yes.png");
}

// 各プレイヤーに一意のアイコンをランダムに割り当てる
function assignUniqueIcons(playerNames, icons) {
  const shuffledIcons = [...icons];
  shuffle(shuffledIcons);
  playerNames.forEach((player, index) => {
    const icon = shuffledIcons[index];
    playerIcons[player] = icon;
    playerIconsYes[player] = getYesVersion(icon);
  });
}

// 配列をシャッフル
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// アイコンを割り当てる
assignUniqueIcons(playerNames, availableIcons);

// プレイヤー名をシャッフル
shuffle(playerNames);

window.onload = async (event) => {
  const response = await fetch("/shiritori", { method: "GET" });
  const previousWord = await response.text();
  const paragraph = document.querySelector("#previousWord");
  paragraph.innerHTML = `前の単語: ${previousWord}`;
  document.querySelector("#currentPlayer").innerHTML = `現在のプレイヤー: ${playerNames[currentPlayerIndex]}`;

  // プレイヤーアイコンを設定
  document.querySelector("#playerIcon").src = playerIcons[playerNames[currentPlayerIndex]];
}

document.querySelector("#nextWordSendButton").onclick = async (event) => {
  const nextWordInput = document.querySelector("#nextWordInput");
  const nextWordInputText = nextWordInput.value;

  // プレイヤーアイコンを一時的に変更
  document.querySelector("#playerIcon").src = playerIconsYes[playerNames[currentPlayerIndex]];

  const response = await fetch("/shiritori", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nextWord: nextWordInputText, playerName: playerNames[currentPlayerIndex] })
  });

  if (response.ok) {
    const previousWord = await response.text();
    const paragraph = document.querySelector("#previousWord");
    paragraph.innerHTML = `前の単語: ${previousWord}`;
    nextWordInput.value = "";

    // 次のプレイヤーに交代
    setTimeout(() => {
      currentPlayerIndex = (currentPlayerIndex + 1) % playerNames.length;
      document.querySelector("#currentPlayer").innerHTML = `現在のプレイヤー: ${playerNames[currentPlayerIndex]}`;

      // プレイヤーアイコンを更新
      document.querySelector("#playerIcon").src = playerIcons[playerNames[currentPlayerIndex]];
    }, 1000); // 1秒待ってから次のプレイヤーに交代

  } else {
    const errorResponse = await response.json();
    localStorage.setItem('lastPlayer', errorResponse.lastPlayer);
    localStorage.setItem('wordHistory', JSON.stringify(errorResponse.wordHistory));
    localStorage.setItem('errorMessage', errorResponse.errorMessage);
    window.location.href = "result-multiplayer.html";
  }
}

document.querySelector("#nextWordInput").addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#nextWordSendButton").click();
  }
});

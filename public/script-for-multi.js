window.onload = () => {
    const playerCountSelect = document.getElementById("playerCount");
    const playerNamesDiv = document.getElementById("playerNames");
    const answerSection = document.getElementById("answerSection");
  
    let playerNames = [];
  
    playerCountSelect.addEventListener("change", () => {
      const count = parseInt(playerCountSelect.value);
      renderPlayerNameInputs(count);
    });
  
    function renderPlayerNameInputs(count) {
      playerNamesDiv.innerHTML = ""; // 以前の入力をクリア
      playerNames = [];
  
      for (let i = 0; i < count; i++) {
        const label = document.createElement("label");
        label.textContent = `プレイヤー${i + 1}の名前: `;
        const input = document.createElement("input");
        input.type = "text";
        input.name = `player${i + 1}`;
        input.required = true;
        playerNamesDiv.appendChild(label);
        playerNamesDiv.appendChild(input);
        playerNamesDiv.appendChild(document.createElement("br"));
        playerNames.push(input); // プレイヤーの名前を配列に追加
      }
    }
  
    const startGameButton = document.getElementById("startGameButton");
    startGameButton.addEventListener("click", () => {
      if (!playerNames.every(input => input.value.trim() !== "")) {
        alert("全てのプレイヤーの名前を入力してください");
        return;
      }
  
      startGame();
    });
  
    async function startGame() {
      answerSection.innerHTML = ""; // 以前の入力をクリア
  
      playerNames.forEach((input, index) => {
        const playerName = input.value.trim();
        const playerLabel = document.createElement("label");
        playerLabel.textContent = `${playerName}: `;
        const answerInput = document.createElement("input");
        answerInput.type = "text";
        answerInput.id = `player${index + 1}Answer`;
        answerInput.placeholder = "回答";
        answerInput.required = true;
        const lineBreak = document.createElement("br");
  
        answerSection.appendChild(playerLabel);
        answerSection.appendChild(answerInput);
        answerSection.appendChild(lineBreak);
      });
  
      // ゲーム開始処理をここに追加
    }
  };
  
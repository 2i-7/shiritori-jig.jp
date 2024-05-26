window.onload = () => {
    const playerCountSelect = document.getElementById("playerCount");
    const playerNamesDiv = document.getElementById("playerNames");
  
    playerCountSelect.addEventListener("change", () => {
      const count = parseInt(playerCountSelect.value);
      renderPlayerNameInputs(count);
    });
  
    function renderPlayerNameInputs(count) {
      playerNamesDiv.innerHTML = ""; // 以前の入力をクリア
  
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
      }
    }
  
    const startGameButton = document.getElementById("startGameButton");
    startGameButton.addEventListener("click", () => {
      const playerNames = [];
      for (let i = 0; i < playerCountSelect.value; i++) {
        const playerNameInput = document.querySelector(`input[name="player${i + 1}"]`);
        playerNames.push(playerNameInput.value);
      }
      console.log("プレイヤーの名前:", playerNames);
      // ゲームを開始するための処理をここに追加
    });
  };
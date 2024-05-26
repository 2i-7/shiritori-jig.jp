window.onload = async (event) => {
    const response = await fetch("/shiritori", { method: "GET" });
    const previousWord = await response.text();
    const paragraph = document.querySelector("#previousWord");
    paragraph.innerHTML = `前の単語: ${previousWord}`;
  };
  
  let wordHistory = []; // 入力された単語を記録する配列
  
  document.querySelector("#nextWordSendButton").onclick = async (event) => {
    await sendNextWord();
  };
  
  document.querySelector("#nextWordInput").onkeydown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // デフォルトのEnterキーの動作を防ぐ
      await sendNextWord();
    }
  };
  
  async function sendNextWord() {
    const nextWordInput = document.querySelector("#nextWordInput");
    const nextWordInputText = nextWordInput.value;
  
    if (nextWordInputText.trim() === "") {
      return; // 入力が空白の場合は無視する
    }
  
    const response = await fetch(
      "/shiritori",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nextWord: nextWordInputText })
      }
    );
  
    if (response.status === 400) {
      const errorResult = await response.json();
      alert(errorResult.error);
      return;
    }
  
    const result = await response.json();
  
    if (result.finished) {
      window.location.href = "/result"; // 結果ページにリダイレクト
    } else {
      const previousWord = result.previousWord;
      const paragraph = document.querySelector("#previousWord");
      paragraph.innerHTML = `前の単語: ${previousWord}`;
  
      wordHistory.push(nextWordInputText); // 入力された単語を配列に追加
      console.log(wordHistory); // 配列の内容をログに出力
  
      nextWordInput.value = ""; // 入力フィールドをクリア
    }
  }
  
  
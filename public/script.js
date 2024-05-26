window.onload = async (event) => {
    const response = await fetch("/shiritori", { method: "GET" });
    const previousWord = await response.text();
    const paragraph = document.querySelector("#previousWord");
    paragraph.innerHTML = `前の単語: ${previousWord}`;
  };
  
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
  
    const response = await fetch(
      "/shiritori",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nextWord: nextWordInputText })
      }
    );
  
    const previousWord = await response.text();
    const paragraph = document.querySelector("#previousWord");
    paragraph.innerHTML = `前の単語: ${previousWord}`;
    nextWordInput.value = "";
  }
  
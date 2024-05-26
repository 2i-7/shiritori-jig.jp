
window.onload = async(event) => {
    const response = await fetch("/shiritori", {method: "GET"});
    const previousWord = await response.text();
    const paragraph = document.querySelector("#previousWord");
    paragraph.innerHTML = `前の単語: ${previousWord}`;
  }
  
  document.querySelector("#newWordSendButton").onclick = async(event) => {
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
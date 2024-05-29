import { serveDir } from "https://deno.land/std@0.223.0/http/file_server.ts";

let previousWord = "しりとり";
let wordHistory = [previousWord];
let lastPlayer = "";
let errorMessage = "";

function clearWordHistory() {
  previousWord = "しりとり";
  wordHistory = [previousWord];
  lastPlayer = "";
  errorMessage = "";
}

Deno.serve(async (request) => {
  const pathname = new URL(request.url).pathname;

  if (request.method === "GET" && pathname === "/shiritori") {
    return new Response(previousWord);
  }

  if (request.method === "POST" && pathname === "/shiritori") {
    const requestJson = await request.json();
    const nextWord = requestJson["nextWord"];
    const playerName = requestJson["playerName"]; // 追加

    // 直前の単語の最後の文字が「ー」の場合、その前の文字を使用
    let lastChar = previousWord.slice(-1);
    if (lastChar === "ー" && previousWord.length > 1) {
      lastChar = previousWord.slice(-2, -1);
    }

    // 同じ単語が入力されたか「ん」で終わる単語が入力されたかをチェック
    if (wordHistory.includes(nextWord) || nextWord.slice(-1) === "ん") {
      wordHistory.push(nextWord);
      lastPlayer = playerName; // 追加
      errorMessage = nextWord.slice(-1) === "ん" ? "最後に「ん」が付きました。" : "同じ単語が入力されました。";
      return new Response(JSON.stringify({ wordHistory, errorMessage, lastPlayer }), { status: 400 }); // 変更
    }

    // 次の単語が直前の単語の最後の文字と一致するかをチェック
    if (lastChar === nextWord.slice(0, 1)) {
      wordHistory.push(nextWord);
      previousWord = nextWord;
      lastPlayer = playerName; // 追加
      return new Response(previousWord);
    } else {
      wordHistory.push(nextWord);
      lastPlayer = playerName; // 追加
      errorMessage = "単語の最初の文字が前の単語の最後の文字と一致しません。";
      return new Response(JSON.stringify({ wordHistory, errorMessage, lastPlayer }), { status: 400 }); // 変更
    }
  }

  if (request.method === "POST" && pathname === "/clearWordHistory") {
    clearWordHistory();
    return new Response("Word history cleared");
  }

  if (request.method === "GET" && pathname === "/wordHistory") {
    return new Response(JSON.stringify(wordHistory), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (request.method === "GET" && pathname === "/errorMessage") {
    return new Response(errorMessage);
  }

  return serveDir(request, {
    fsRoot: "./public",
    urlRoot: "",
    enableCors: true,
  });
});
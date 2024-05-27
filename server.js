import { serveDir } from "https://deno.land/std@0.223.0/http/file_server.ts";

let previousWord = "しりとり";
let wordHistory = [];
let errorMessage = "";

function clearWordHistory() {
  wordHistory = [];
  previousWord = "しりとり";
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

    if (wordHistory.includes(nextWord) || nextWord.slice(-1) === "ん") {
      wordHistory.push(nextWord);
      errorMessage = nextWord.slice(-1) === "ん" ? "最後に「ん」が付きました。" : "同じ単語が入力されました。";
      return new Response(null, { status: 400 });
    }

    if (previousWord.slice(-1) === nextWord.slice(0, 1)) {
      wordHistory.push(nextWord);
      previousWord = nextWord;
      return new Response(previousWord);
    } else {
      errorMessage = "単語の最初の文字が前の単語の最後の文字と一致しません。";
      return new Response(null, { status: 400 });
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

<<<<<<< HEAD
=======

>>>>>>> 6c34d79d145247a49367d6f05bc9b4365cb8fccf

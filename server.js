import { serve } from "https://deno.land/std@0.223.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.223.0/http/file_server.ts";

let previousWord = "しりとり";
let wordHistory = []; // 入力された単語を記録する配列

const handler = async (request) => {
    const { method, url } = request;
    const pathname = new URL(request.url).pathname;

    console.log(`pathname: ${pathname}`);

    if (method === "GET" && pathname === "/shiritori") {
        return new Response(previousWord);
    }

    if (method === "POST" && pathname === "/shiritori") {
        const requestJson = await request.json();
        const nextWord = requestJson.nextWord;

        // 終了条件のチェック
        if (wordHistory.includes(nextWord) || nextWord.slice(-1) === "ん") {
            wordHistory.push(nextWord); // 結果ページに表示するために追加
            const responseHeaders = new Headers({ "Content-Type": "application/json" });
            return new Response(JSON.stringify({ finished: true }), { headers: responseHeaders });
        }

        if (previousWord.slice(-1) === nextWord.charAt(0)) {
            previousWord = nextWord;
            wordHistory.push(nextWord);
            const responseHeaders = new Headers({ "Content-Type": "application/json" });
            return new Response(JSON.stringify({ previousWord }), { headers: responseHeaders });
        } else {
            const responseHeaders = new Headers({ "Content-Type": "application/json" });
            return new Response(JSON.stringify({ error: "ルールに違反しました" }), { headers: responseHeaders, status: 400 });
        }
    }

    if (method === "GET" && pathname === "/result") {
        const html = await Deno.readTextFile("./public/result.html");
        return new Response(html, { headers: { "Content-Type": "text/html" } });
    }

    if (method === "GET" && pathname === "/wordHistory") {
        return new Response(JSON.stringify(wordHistory), { headers: { "Content-Type": "application/json" } });
    }

    return serveDir(request, {
        fsRoot: "./public",
        urlRoot: "",
        enableCors: true,
    });
};

serve(handler, { port: 8000 });
console.log("Server running on http://localhost:8000/");

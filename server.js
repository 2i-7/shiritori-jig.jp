import { serveDir } from
"https://deno.land/std@0.223.0/http/file_server.ts";

let previousWord = "しりとり";
let wordList = [previousWord];

Deno.serve(async (request) => {
    const pathname = new URL(request.url).pathname;
    console.log(`pathname: ${pathname}`);

    if (request.method === "GET" && pathname === "/shiritori"){
        return new Response(previousWord);
    }

    if (request.method === "POST" && pathname === "/shiritori"){
        const requestJson = await request.json();
        const nextWord = requestJson["nextWord"];

        if(wordList.includes(nextWord)){
            return new Response(
                JSON.stringify({
                    "errorMessage": `「${nextWord}」は既に使用された単語です。別の単語を入力してください`,
                    "errorCode": "20002"
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                }
            );
        }

        if (previousWord.slice(-1) === nextWord.slice(0, 1)){
            if (nextWord.slice(-1) === "ん"){
                return new Response(
                    JSON.stringify({
                        "errorMessage":`「ん」が入力されてしまったので終了します。`,
                        "errorCode": "20001"
                    }),
                    {
                        status: 400,
                        headers: { "Content-Type": "application/json; charset=utf-8" },
                    } 
                );
            }
            previousWord = nextWord;
            wordList.push(nextWord);
        }
        else {
            return new Response(
                JSON.stringify({
                    "errorMessage":`「${previousWord.slice(-1)}」から始まる言葉を入力してください。`,
                    "errorCode": "10001"
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                }
            );
        }

        return new Response(previousWord);
    }
    return serveDir(
        request,
        {
            fsRoot:"./public",
            urlRoot: "",
            enableCors: true,
        }
    );
});
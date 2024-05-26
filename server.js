import { serveDir } from "https://deno.land/std@0.223.0/http/file_server.ts"

let previousWord = "しりとり";

Deno.serve(async (request) => {
    const pathname = new URL(request.url).pathname;
    console.log(`pathname:${pathname}`);

    //くれと言われた
    if(request.method === "GET" && pathname === "/shiritori"){
        return new Response(previousWord);
    }

    //やると言われた
    if(request.method === "POST" && pathname === "/shiritori"){
        const requestJson = await request.json();
        const nextWord = requestJson["nextWord"];

        if(previousWord.slice(-1) === nextWord.slice(0, 1)) {
        previousWord = nextWord;
        }

        return new Response(previousWord);
    }

    //./public以下のファイルは静的ファイルとして公開
    return serveDir(
        request,
        {
            fsRoot:"./public",
            urlRoot:"",
            enableCors: true,
        }
    );

});
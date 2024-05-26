import { serve } from "https://deno.land/std@0.223.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.223.0/http/file_server.ts";

let previousWord = "しりとり";

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

        if (previousWord.slice(-1) === nextWord.charAt(0)) {
            previousWord = nextWord;
        }

        return new Response(previousWord);
    }

    return serveDir(request, {
        fsRoot: "./public",
        urlRoot: "",
        enableCors: true,
    });
};

serve(handler, { port: 8000 });
console.log("Server running on http://localhost:8000/");
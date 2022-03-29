import { ApiConfig } from "./types";
import { SubmissionObject } from "./types";
import { QuestionObject } from "./types";
import { baseUrl } from "./types";
import fetch from 'node-fetch';

const endpoint = '/submit_records/';

// TODO: add async impl and return status code
export async function submitCode(o: SubmissionObject) {
    const fullUrl = baseUrl + endpoint;
    return await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Host': baseUrl,
            'Content-Type': 'application/json',
            'User-Agent': 'XOJ-Playground-Client/0.1',
            'Content-Length': o.code.length.toString()
        },
        body: JSON.stringify(o),
    });
}
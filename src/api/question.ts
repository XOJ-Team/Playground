import { ApiConfig } from "./types";
import { QuestionObject } from "./types";
import { baseUrl } from "./types";
import fetch from 'node-fetch';

const endpoint = '/question/';

// export async function getQuestion(id: string): Promise<QuestionObject> {
//     const fullUrl = baseUrl + endpoint + id;
//     const o: QuestionObject;
//     const res = await fetch(fullUrl, {
//         method: 'GET',
//         headers: {
//             'Host': baseUrl,
//             'User-Agent': 'XOJ-Playground-Client/0.1'
//         },
//     }).then(res => res.json());

//     return new QuestionObject{};
// }

// TODO: add async impl
export async function getQuestion(id: string) {
    const fullUrl = baseUrl + endpoint + id;
    let o: QuestionObject;
    const response = await fetch(fullUrl, {
        method: 'GET',
        headers: {
            'Host': baseUrl,
            'User-Agent': 'XOJ-Playground-Client/0.1'
        }
    });
    return response.json();
}

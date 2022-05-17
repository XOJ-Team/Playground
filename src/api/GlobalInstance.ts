import { JudgeServer } from "./Judge";
import { StateDict } from "./Common";

export const judgeServerInstance = new JudgeServer();

export let globalState: StateDict = {
    sessionId: '',
    questionId: '',
    lang: '',
    langId: -1,
    code: '',
    stdin: '',
    isLanguageSet: false
};
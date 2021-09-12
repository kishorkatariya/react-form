import { STORECOUNTRIES } from '../Actions/index'
import { ANS_INFO } from '../Actions/index'
export const initialState = {
    questions: [{ questionText: "Question", counter: 0, unique_id: "", questionType: "radio", options: [{ optionText: "Option 1" }], open: true, required: true }],
    questionType: "radio",
    doc_name: "Untitled form",
    doc_desc: "Add the description",
    doc_id: "",
    unique_id: "",
    answers: [{ unique_id: "", formName: "form_name", formURL: "answer_url", createdAt: 'created_at', reposenceCount: "response" }],
}

export const actionTypes = {
    SET_QUESTIONs: "SET_QUESTIONS",
    CHANGE_TYPE: "CHANGE_TYPE",
    SET_DOC_NAME: "SET_DOC_NAME",
    SET_DOC_DESC: "SET_DOC_DESC",
    SET_DOC_ID: "SET_DOC_ID"

}
let data = []
const empreducer = (state = data, action) => {
    switch (action.type) {
        case STORECOUNTRIES:
            return { ...state, questions: action.payload }

        case ANS_INFO:           

            let unique_id = action.payload.unique_id;

            let answers = [];
            if (state.answers) {
                answers = state.answers;
            }

            let hasAnswers = answers.find((ans) => {
                return (ans.unique_id == unique_id)
            })

            if (hasAnswers) {
                answers = answers.map((ans) => {
                    if (ans.unique_id == hasAnswers.unique_id) {
                        ans = action.payload
                    }
                    return ans;
                })
            } else {
                answers.push(action.payload)
            }

            return {
                ...state, answers: answers
            };
       
        default:
            return state;
    }
}

export default empreducer;
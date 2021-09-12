export const STORECOUNTRIES = 'store_countries';
export const StoreQuestions = (data) => ({
    type: STORECOUNTRIES,
    payload: data
})

export const ANS_INFO = 'answer_info';
export const setAnswers = data => ({ //
    type: ANS_INFO,
    payload: data,

})
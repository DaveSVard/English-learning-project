import { createSlice } from "@reduxjs/toolkit"
import { IAnswersHistory } from "../../type/type"
import { RootState } from "../../app/store";


if(!localStorage.answers || JSON.parse(localStorage.answers).length == 0) {
    localStorage.setItem("answers", JSON.stringify([]))
}

const initialState:{answers:IAnswersHistory[]} = {
    answers: localStorage.answers ? JSON.parse(localStorage.answers) : [],
}

export const answersSlice = createSlice({
    name: "answers",
    initialState,
    reducers: {
        addNewAnswersHistory: (state, action) => {
            state.answers.unshift(action.payload)
            localStorage.setItem("answers", JSON.stringify(state.answers))
        },
        addAnswer: (state, action) => {
            console.log(action);
            
            const { id, answer } = action.payload;
            const historyIndex = state.answers.findIndex(elm => elm.id === id);
            console.log(historyIndex);
            
            if (historyIndex !== -1) {
                const historyItem = state.answers[historyIndex];
                console.log(historyItem);
                
                historyItem.answers.unshift(answer);
                if (answer.result) {
                    historyItem.score += 1;
                } else {
                    historyItem.score -= 1;
                }
                const updatedAnswers = [...state.answers];
                updatedAnswers[historyIndex] = historyItem;
                state.answers = updatedAnswers;
                localStorage.setItem("answers", JSON.stringify(state.answers));
            }
        },
        clearAnswersHisory: (state) => {
            state.answers = []
            localStorage.setItem("answers", JSON.stringify(state.answers))
        },
        clearAnswersById: (state, action) => {
            state.answers = state.answers.filter(elm => elm.id != action.payload)
            localStorage.setItem("answers", JSON.stringify(state.answers))
        }
    }
})

export const { addNewAnswersHistory, addAnswer, clearAnswersById, clearAnswersHisory } = answersSlice.actions;
export const selectAnswers = (state: RootState) => state.answers;
export default answersSlice.reducer;
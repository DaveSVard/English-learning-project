import { createSlice } from "@reduxjs/toolkit"
import { IWord } from "../../type/type"
import { RootState } from "../../app/store";

if(!localStorage.words || JSON.parse(localStorage.words).length == 0) {
    localStorage.setItem("words", JSON.stringify([]))
}

if(!localStorage.word) {
    localStorage.setItem("word", JSON.stringify({}))
}

const initialState:{words:IWord[], word:IWord} = {
    words: localStorage.words ? JSON.parse(localStorage.words) : [],
    word: localStorage.word ? JSON.parse(localStorage.word) : {} as IWord,
}


export const wordsSlice = createSlice({
    name: "words",
    initialState,
    reducers: {
        addNewWord: (state, action) => {
            state.words.push(action.payload)
            localStorage.setItem("words", JSON.stringify(state.words))
        },
        deleteWord: (state, action) => {
            state.words = state.words.filter(elm => elm.id != action.payload)
            localStorage.setItem("words", JSON.stringify(state.words))
        },
        searchWord: (state, action) => {
            if(action.payload?.length) {
                state.words = JSON.parse(localStorage.words).filter((elm:IWord) => elm.english.includes(action.payload));
            } else {
                state.words = JSON.parse(localStorage.words)
            }
        },
        searchSingleWord: (state) => {
            const randomId:number = Math.floor(Math.random() * state.words.length)
            const foundWord = state.words.find((word, i) => i == randomId);
            if (foundWord) {
                state.word = foundWord;
            }       
        }
    }
})


export const { addNewWord, deleteWord, searchWord, searchSingleWord } = wordsSlice.actions;
export const selectWords = (state: RootState) => state.words;
export default wordsSlice.reducer;

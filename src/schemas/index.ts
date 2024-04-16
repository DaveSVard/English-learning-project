import * as Yup from "yup";


export const addWordSchema = Yup.object().shape({
    english: Yup.string().required("English is required!"),
    translate: Yup.string().required("Translate is required!"),
    sentences: Yup.array().of(Yup.string().required("Sentences is required!"))
})
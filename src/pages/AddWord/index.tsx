import React, { useState } from "react";
import "./addWord.scss"
import { Field, FieldArray, Formik } from "formik";
import { addWordSchema } from "../../schemas";
import { useAppDispatch } from "../../app/hooks";
import { addNewWord } from "../../features/words/wordsSlice";
import { AnimatedGif } from "../../components/AnimatedGif";


export const AddWord:React.FC = ():JSX.Element => {

    const dispatch = useAppDispatch()
    const [added, setAdded] = useState<boolean>(false)

    const addWord = async () => {
        await setTimeout(() => {
            setAdded(false)
        }, 2700)
        setAdded(true)                       
    }

    return(
        <div className="addWord">
            <div className="addWord__wrapper">
                <div className="addWord__title">
                    <h1>Add new word!</h1>
                </div>

                <div className="addWord__inner-wrapper">
                    <Formik initialValues={{english: "", translate: "", sentences: [""]}}
                        validationSchema={addWordSchema}
                        onSubmit={(values, { resetForm  }) => {
                            dispatch(addNewWord({...values, id: Date.now()}))
                            addWord()
                            resetForm()
                        }}
                        >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit} className="addWord__form">
                                <div className="addWord__item">
                                    <input  name="english"  value={values.english || ""}onChange={handleChange}/>
                                    <span className={values.english?"labelline span" : "labelline" }>
                                        {errors.english && touched.english ? errors.english : "Enter english"}
                                    </span>
                                </div>
                                <div className="addWord__item">
                                    <input  name="translate" value={values.translate || ""} onChange={handleChange}/>
                                    <span className={values.translate?"labelline span" : "labelline" }>
                                        {errors.translate && touched.translate ? errors.translate : "Enter translate"}
                                    </span>
                                </div>
                                <FieldArray
                                    name = "sentences"
                                    render={arrayHelpers  => {
                                        return(
                                            <div>
                                                {values.sentences && values.sentences.length > 0 ? (
                                                    values.sentences.map((elm, i) => {
                                                        return( 
                                                            <div key={i} className="addWord__form-flex">
                                                                <Field name={`sentences.${[i]}`}>
                                                                    {({
                                                                        field, 
                                                                        form: { touched, errors }, 
                                                                        meta,
                                                                    }:any) => (
                                                                        <div className="addWord__item">
                                                                            <textarea 
                                                                                {...field}
                                                                                name={`sentences.${[i]}`}
                                                                                onChange={handleChange}
                                                                            />
                                                                            <span className={values.sentences[i] ?"labelline span" : "labelline" }>
                                                                                {errors.sentences && errors.sentences[i] && touched.sentences && touched.sentences[i] ? errors.sentences[i] : "Enter sentence"}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </Field>
                                                                <button className="removeInput-btn form-btn" type="button" onClick={() => arrayHelpers.remove(i)}>
                                                                    <i className="fa-solid fa-xmark"></i>
                                                                </button>
                                                            </div>
                                                        )
                                                    })
                                                    ) : null}
                                                <button className="addInput-btn form-btn" type="button" onClick={() =>{
                                                    arrayHelpers.push("")
                                                }}>
                                                    <i className="fa-solid fa-plus"></i>
                                                </button>
                                            </div>
                                        )
                                    }}
                                />
                                <button type="submit" className="form-btn">Add!</button>
                            </form>
                        )}
                    </Formik>
                    <div className="animatedGif__box">
                        <div className="animatedGif__box-img">
                            {!added  ? <AnimatedGif src="/gif/thinkWordFix.gif" alt="Animated Gif"/> : <AnimatedGif src="/gif/butFix.gif" alt="Animated Gif"/>}
                        </div>
                        <div className="animated__box-content">
                            <p>Here you can add the words you want!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
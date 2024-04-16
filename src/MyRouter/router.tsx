import React from "react";
import { useRoutes } from "react-router";
import { Layout } from "../pages/Layout";
import { SeeWords } from "../pages/SeeWords";
import { AddWord } from "../pages/AddWord";
import { Settings } from "../pages/Settings";
import { Loading } from "../pages/Loading";
import { CheckYourself } from "../pages/CheckYourself";
import { AnswersHistory } from "../pages/AnswersHistory";

export const MyRouter:React.FC = () => {
    const routes = useRoutes([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {path: "/", element: <Loading/>},
                {path: "/seeWords", element: <SeeWords/>},
                {path: "/addWord", element: <AddWord/>},
                {path: "/checkYourself", element: <CheckYourself/>},
                {path: "/answersHistory", element: <AnswersHistory/>},
                {path: "/settings", element: <Settings/>},
            ]
        }
    ])
    
    return routes
}
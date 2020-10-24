import React, { useState } from "react";
import store from '../store';
import Email from "./components/Email";
import Layout from './components/StudentLayout';

const serverURL = "http://ugdev.cs.smu.ca:3385";

export default function ViewEmail() {
    
    const [id, setId] = useState("");
    const [JWT, setJWT] = useState("");
    const [userAuthored, setUserAuthored] = useState(true);

    const storeState = store.getState();
    if(storeState != undefined){
      setId(storeState.emailId);
      setJWT(storeState.userJWT);
      setUserAuthored(storeState.didAuthor);
    }
    //TODO: Persistance on page refresh? localStorage.setItem(id, JWT)? 

    return (
        <Layout>
            <Email
                id={id}
                token={JWT}
                userAuthor={userAuthored}
            />
        </Layout>
    );
}
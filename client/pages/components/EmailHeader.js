/** EmailHeaeder.js
 * Displays name and subject of email.
 * OnClick will redirect to ViewEmail with emailID
 * @author Nicholas Morash (A00378981)
 */

import React from "react";
import { useRouter } from "next/router";
import store from "../../store";
import axios from 'axios';

//URL for axios
const serverURL = "http://ugdev.cs.smu.ca:3385"

export default function EmailHeader(id, token, didAuthor) {
    const router = useRouter();

    function handleClick() {
        store.dispatch({
            type: "mailInfo",
            payload: {
                emailId: id,
                userJWT: token,
                didAuthor: didAuthor
            }
        })
        router.push("/ViewEmail")
    }

    function getName() {
        let name = "";
        if(didAuthor){
            name = res.data.to;
        }else{
            name = res.data.from;
        }
        return name;
    }

    function formatSubject() {
        const subject = res.data.subject;
        if(sub.length >= 20){
            short = subject.substring(0, 20);
        }else{
            short = suject;
        }
        return short;
    }

    //Gets email data from server 'https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints'
    async function getReq() {    
        try {
            const req = await axios.get(
                `${serverURL}/api/email/${id}`, 
                    {headers: { "x-auth-token": token }
                });
            return req;
        } catch (err) {
            const res = null
            console.log(err);
            router.back()
        }
    }

    const res = getReq();

    return(
        <div onClick={() => handleClick()}>
            <span>
                <p>{() => getName()}</p>
                <p>{() => formatSubject()}</p>
            </span>
        </div>
    )
}
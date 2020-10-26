/** EmailHeaeder.js
 * Displays name and subject of email.
 * OnClick will redirect to ViewEmail with emailID
 * @author Nicholas Morash (A00378981)
 */

import React from "react";
import { useRouter } from "next/router";
import axios from 'axios';

//URL for axios (change to ugdev on install)
const serverURL = "http://localhost:3385"

/**
 * This function displays a clickable header which links to the whole email.
 */
export default function EmailHeader(id, token, didAuthor) {
    const router = useRouter();
    
    //Sets id of email; to be viewed in localStorage
    function handleClick() {
        localStorage.setItem('emailID', id)
        router.push("/ViewEmail")
    }
    
    //Gets name of recipient/sender
    function getName() {
        let name = "";
        if(didAuthor){
            name = res.data.to;
        }else{
            name = res.data.from;
        }
        return name;
    }

    //formats subject to diplay only first 20 characters.
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

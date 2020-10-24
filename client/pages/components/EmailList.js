/** EmailHeader.js
 *  Creats a mailbox of clicable mail item headers.
 *  @author Nicholas Morash (A00378981)
 */

import React from 'react';
import axios from 'axios';
import EmailHeader from './EmailHeader';

//URL for axios 
const serverURL = "http://ugdev.cs.smu.ca:3385"

export default function EmailList(token, isSent) {
    //Sets route inbox or sent.
    let route = "inbox"
    if (isSent) { route = "sent"}

    //Gets mailbox mail items. 
    //https://github.com/just1ngray/CSCI3428/wiki/HTTP-Endpoints
    async function getReq() {
        const req = await axios.get(`${serverURL}/api/email/${route}`, {headers: { "x-auth-token": token }});
        return req;
    }
    const res = getReq();
    console.log(res);

    //Pulls email id's from mailbox data using EmailHeader.
    for (let i=0; i<res.length; i++) {
        return(
            <div>
            <EmailHeader 
                id={res.data[i].id}
                token={token}
                didAuthor={isSent}
            />
            </div>
        )
    }

}
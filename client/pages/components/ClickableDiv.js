import React, { Children } from 'react';
import { useRouter } from 'next/router';
import store from '../../store';
import emailData from '../emailData';

export default function ClickableDiv({children, id}) {
    
    const email = emailData[id]



    const router = useRouter();
    function handleDivClick(id) {
        
        store.dispatch({
            type: "setViewEmail",
                payload: {
                  _id: email._id,
                  name: email.from.name,
                  address: email.from.email,
                  toName: email.to.name,
                  toAddress: email.to.email,
                  subject: email.subject,
                  body: email.body
            }
        });
        store.dispatch({
          type: "currentID",
          payload: id
        });
        console.log(id, email)
        router.push("../ViewEmail");
    }
    return(
        <div onClick={() => handleDivClick(email.__v)}>
            {children}
        </div>
    );
}
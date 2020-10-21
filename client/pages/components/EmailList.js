import React from 'react';
import ClickableDiv from './ClickableDiv';
import EachEmailInfo from './EachMailInfo';
import emailData from '../emailData';

export default function EmailList() {
    for(let i=0; i<5; i++){
        const currentEmail = emailData[i];
        return(
            <ClickableDiv id={i}>
            <EachEmailInfo 
              key={currentEmail._id} 
              to={`${currentEmail.from.name} (${currentEmail.from.email})`} 
              subject={currentEmail.subject} 
            />
            </ClickableDiv>

        );
    }
}
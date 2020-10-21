import React from 'react';
import InputTextBox from './InputTextBox';

export default function BodySplitter(){
    const closing = "Kind Regards\n\t-(Your Name)"
   return(
       <div>
           <InputTextBox label="Greeting" rows="1" placeholder="Hello (Recipients Name), "/>
           <InputTextBox label="Message" rows="10" placeholder="This is where your message goes!"/>
           <InputTextBox label="Closing" rows="2" placeholder={closing}/>
       </div>
   );
}
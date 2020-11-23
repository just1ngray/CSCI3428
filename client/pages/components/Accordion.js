/**
 * 
 *Creates an accordion to hold FAQs

 @author Tiffany Conrad (A00414194)
 */
import React, {useState, useRef} from 'react';
import styles from "../../styles/accordion.module.css";

/**
 * Makes the accordion
 * @author Tiffany Conrad (A00414194)
 * @param props 
 */
export default function Accordion(props){
    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");

    const content = useRef(null);

    function toggleAccordion(){
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(setActive === "active" ? "0px" : `${content.current.scrollHeight}px`);
    }

    return(
        <div className = {styles.accordionSection}>
            <button className={`button is-info is-medium is-fullwidth ${setActive}`} onClick={toggleAccordion}>
                <p className={styles.accordionTitle}>{props.title}</p>
            </button>
        
        <div
        ref={content}
        style={{maxHeight: `${setHeight}`}}
        className={styles.accordionContent}
        >
        <div
            className={styles.accordionText}
            dangerouslySetInnerHTML={{__html: props.content}}
            />
            </div>
            </div>
    );
}
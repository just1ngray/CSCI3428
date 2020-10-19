import React from 'react';
import Layout from './components/StudentLayout';
import axios from 'axios';
import CustomButton from './components/CustomButton';


export default function StudentHome() {
    async function getData() {
        const userPromise = axios.get('/api/email/inbox');
        const userResponse = await userPromise;
        console.log(userResponse);
    }
    
    return(
        <Layout>
            <h1>Under Construction!</h1>
            <CustomButton
                label="GET"
                onClick={() => getData()}
                type="button"
                disabled={false}
          />
        </Layout>)
}

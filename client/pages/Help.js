import React from 'react';
import Layout from './components/StudentLayout';
import { useRouter } from 'next/router';
import CustomButton from './components/CustomButton';

export default function Help(){
    const router = useRouter();

    function handleBackClick() {
      router.back();
    }
    
    return(<Layout>
            <h1>Under Construction!</h1>
            
            <CustomButton
            label="Back"
            onClick={() => handleBackClick()}
            type="button"
            disabled={false}
          /></Layout>)
}
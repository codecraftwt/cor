import React, { useState } from 'react';
import LayoutComman from '../components/LayoutComman';
import OnBoardForm from '../components/OnBoardForm';

const CreatorOnboard = () => {
    return (
        <>
        <LayoutComman title={' COR onboarding process.'} form={<OnBoardForm/>}/>
        </>
    );
}

export default CreatorOnboard;

import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css'; 
import { Editor } from "primereact/editor";

const TextEditor = () => {
    return (
        <Editor  style={{ height: '610px' }} />
    );
};
export default TextEditor;

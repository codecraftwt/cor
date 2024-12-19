import React from 'react';
import 'react-quill/dist/quill.snow.css'; 
import { Editor } from 'primereact/editor';

const TextEditor = ({ value, onChange }) => {
    return (
        <Editor 
            value={value}
            onTextChange={(e) => onChange(e.htmlValue)}
            style={{ height: '610px' }} 
        />
    );
};

export default TextEditor;

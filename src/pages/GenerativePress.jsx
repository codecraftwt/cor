import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextEditor  from '../components/TextEditor';
import GenerativeAndBlogLayout from '../components/GenerativeAndBlogLayout';

const formFields = [
    {
        controlId: "pressType",
        label: "What type of press release are you writing?",
        type: "textarea",
        placeholder: "e.g., product announcement, event, collaboration, fundraise, quarterly results, etc.",
    },
    {
        controlId: "spokesperson",
        label: "Who is the spokesperson(s) in the release?",
        type: "chips",
        placeholder: "Add a tag",
    },
    {
        controlId: "releaseReason",
        label: "Tell us more about why you are writing this release?",
        type: "textarea",
        placeholder: "Summarize in a few sentences or a paragraph.",
    },
    {
        controlId: "factsNotes",
        label: "Add any facts, notes, & quotes in the release",
        type: "textarea",
        placeholder: "Other details",
    },
    {
        controlId: "companyDescription",
        label: "Add your company description",
        type: "textarea",
        placeholder: "Other details",
    },
];

const GenerativePress = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        spokesperson: [],
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <GenerativeAndBlogLayout
            title="Generative Press Release"
            description="Provide COR with your press release details, and we’ll deliver an exceptional, professionally crafted release."
            formFields={formFields}
            formData={formData}
            handleInputChange={handleInputChange}
            generateButtonText="Generate Press Release"
            editor={<TextEditor />} 
        />
    );
};

export default GenerativePress;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextEditor from '../components/TextEditor';
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
    const [editorData, setEditorData] = useState('');

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        const payload = {
            press_release_type: formData.pressType,
            press_release_company: formData.companyDescription,
            spokes_mens: formData.spokesperson,
            press_release_facts: formData.factsNotes,
            press_release_content: formData.releaseReason,
        };

        try {
            const authData = JSON.parse(localStorage.getItem("authData"));
            const token = authData?.token;
            if (token) {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/generate-and-save-draft-press-release`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    console.log('Press release generated successfully:', response.data);
                    // Update the editor data with the response content_as_html
                    setEditorData(response.data.content_as_html);
                } else {
                    console.error('Failed to generate press release:', response.statusText);
                    // Optionally, display an error message
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
            // Optionally, display an error message
        }
    };

    return (
        <GenerativeAndBlogLayout
            title="Generative Press Release"
            description="Provide COR with your press release details, and we’ll deliver an exceptional, professionally crafted release."
            formFields={formFields}
            formData={formData}
            handleInputChange={handleInputChange}
            generateButtonText="Generate Press Release"
            editor={<TextEditor value={editorData} onChange={setEditorData} />}
            onGenerate={handleSubmit} // Pass the submit handler to the layout
        />
    );
};

export default GenerativePress;

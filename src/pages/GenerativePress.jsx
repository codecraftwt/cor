import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TextEditor from '../components/TextEditor';
import GenerativeAndBlogLayout from '../components/GenerativeAndBlogLayout';
import { useToast } from '../utils/ToastContext';
import { CircularProgress } from '@mui/material';

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
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { showToast } = useToast();

    useEffect(() => {
        if (id) {
            featchPressData()
            // Fetch data based on the id
            // const response = await axios.get(`http://161.35.79.99/api/blogs/${id}`);
            // console.log(response, 'response');

        }
    }, []);

    const featchPressData = async () => {
        try {
            const authData = JSON.parse(localStorage.getItem("authData"));
            const token = authData?.token;
            //   http://161.35.79.99/api/press-releases/019406ba-b64b-ed18-e7e8-30537c5a4526
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/press-releases/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response, 'response');

            setEditorData(response.data.press_release.content_as_html);
        } catch (error) {
            console.log(error);

        }
    }

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
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const handleSaveAndDocumenet = async () => {
        console.log(editorData, 'editorData');
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            setLoading(true);
            const payload = {
                content: editorData,
                status: 0
            };
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update-press-release/${id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response, 'response');
            showToast('Press release updated successfully!', 'success');
            navigate('/drafts');
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }

    }


    return (
        <>
            <GenerativeAndBlogLayout
                title="Generative Press Release"
                description="Provide COR with your press release details, and we’ll deliver an exceptional, professionally crafted release."
                formFields={formFields}
                formData={formData}
                handleInputChange={handleInputChange}
                generateButtonText="Generate Press Release"
                editor={<TextEditor value={editorData} onChange={setEditorData} />}
                onGenerate={handleSubmit} // Pass the submit handler to the layout
                handleSaveToDraft={handleSaveAndDocumenet}
            />
            {loading && (
            <div style={{ display: "flex", position: 'absolute', justifyContent: "center", height: "100vh", alignItems: "center", width: "99%", top: "0" }}>
                <CircularProgress />
            </div>
            )}
        </>
    );
};

export default GenerativePress;

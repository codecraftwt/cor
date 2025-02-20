import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import TextEditor from '../components/TextEditor';
import GenerativeAndBlogLayout from '../components/GenerativeAndBlogLayout';
import { useToast } from '../utils/ToastContext';
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

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

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');


    const [loading, setLoading] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [allData, setAllData] = useState([]);
    const [pressData, setPressData] = useState({});
    const [generalAccessStatus, setGeneralAccessStatus] = useState('0');

    useEffect(() => {
        setTimeout(() => {
            setContentVisible(true); // Show content after delay
        }, 500); // Delay in milliseconds

        if (id) {
            featchPressData();
        }
    }, [id]);

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

            setEditorData(response.data.press_release.content_as_html);
            setAllData(response.data.press_release);
            setPressData(response.data.press_release)
            console.log( String(response.data.press_release.status),' String(response.data.press_release.status)');
            
            setGeneralAccessStatus( String(response.data.press_release.status));
        } catch (error) {
            console.error(error);
        }
    }

    const [formData, setFormData] = useState({
        spokesperson: [],
    });
    const [content, setConetent] = useState('');
    const [title, setTitle] = useState('');
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
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/press-releases/generate-press-release`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.status === 200) {
                    showToast('Press release generated successfully!', 'success');
                    // Update the editor data with the response content_as_html
                    setAllData(response.data);
                    setEditorData(response.data.content_as_html);
                    setConetent(response.data.content);
                    setTitle(response.data.title);
                    setGeneralAccessStatus(response.data.status);

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
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            setLoading(true);
            if (id) {
                const payload = {
                    content: editorData,
                    status: 0,
                    is_public: false
                };
                const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update-press-release/${id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                showToast('Press release updated successfully!', 'success');
                navigate('/drafts');
            } else {
                const payload = {
                    press_release_type: formData.pressType,
                    press_release_company: formData.companyDescription,
                    spokes_mens: formData.spokesperson,
                    press_release_facts: formData.factsNotes,
                    press_release_content: formData.releaseReason,
                    content_as_html: editorData,
                    content: content,
                    title: title,
                    status: 0,
                    is_public: false
                };
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/press-releases/`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                showToast('Press release updated successfully!', 'success');
                navigate('/drafts');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }
    const handleSavePublish = async () => {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            if (id) {
                const payload = {
                    content: editorData,
                    status: 1,
                    is_public: true
                };
                const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update-press-release/${id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                showToast('Press release updated successfully!', 'success');
                navigate('/press-release');
            } else {
                const payload = {
                    press_release_type: formData.pressType,
                    press_release_company: formData.companyDescription,
                    spokes_mens: formData.spokesperson,
                    press_release_facts: formData.factsNotes,
                    press_release_content: formData.releaseReason,
                    content_as_html: editorData,
                    content: content,
                    title: title,
                    status: 1,
                    is_public: true
                };
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/press-releases/`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                showToast('Press release updated successfully!', 'success');
                navigate('/press-release');
            }
        } catch (error) {
            console.error(error);
        }

    };
    const handleSavePublishwithDonBtn = async () => {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            if (id) {
                const payload = {
                    content: editorData,
                    status: 1,
                    is_public: true
                };
                const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update-press-release/${id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                // setPressData(response.data.press_release)
                setPressData(response.data)
                showToast('Press release updated successfully!', 'success');
                // navigate('/press-release');
            } else {
                const payload = {
                    press_release_type: formData.pressType,
                    press_release_company: formData.companyDescription,
                    spokes_mens: formData.spokesperson,
                    press_release_facts: formData.factsNotes,
                    press_release_content: formData.releaseReason,
                    content_as_html: editorData,
                    content: content,
                    title: title,
                    status: 1,
                    is_public: true
                };
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/press-releases/`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setPressData(response.data.press_release)
                showToast('Press release updated successfully!', 'success');
                // navigate('/drafts');
            }
        } catch (error) {
            console.error(error);
        }

    };
    const generateCopyLink = () => {
        if (id) {
            // const link = `http://localhost:5173/pressShare?id=${id}`;
            const link = `https://appstage.thecor.ai/pressShare?id=${pressData.id}`;
            // Copy the link to the clipboard
            navigator.clipboard
                .writeText(link)
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Link Copied!",
                        text: "The Press link has been copied to your clipboard.",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to Copy!",
                        text: "An error occurred while copying the link.",
                        footer: err.message,
                    });
                });
        } else {
            // const link = `http://localhost:5173/pressShare?id=${id}`;
            const link = `https://appstage.thecor.ai/pressShare?id=${pressData.content_as_html}`;
            // Copy the link to the clipboard
            navigator.clipboard
                .writeText(link)
                .then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Link Copied!",
                        text: "The Press link has been copied to your clipboard.",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                })
                .catch((err) => {
                    Swal.fire({
                        icon: "error",
                        title: "Failed to Copy!",
                        text: "An error occurred while copying the link.",
                        footer: err.message,
                    });
                });
        }
    }

    const handalgeneralAccess = async (status) => {
        console.log(status, 'status');
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        try {
            if (id) {
                const payload = {
                    content: editorData,
                    status: Number(status),
                    is_public: Number(status)==1?true:false

                };
                const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/update-press-release/${id}`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log(response.data, 'response.data');
                
                showToast('Press release updated successfully!', 'success');
                // navigate('/press-release');
            } else {
                const payload = {
                    press_release_type: formData.pressType,
                    press_release_company: formData.companyDescription,
                    spokes_mens: formData.spokesperson,
                    press_release_facts: formData.factsNotes,
                    press_release_content: formData.releaseReason,
                    content_as_html: editorData,
                    content: content,
                    title: title,
                    status: Number(status),
                    is_public: Number(status)==1?true:false

                };
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/press-releases/`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                showToast('Press release updated successfully!', 'success');
                navigate('/press-release');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={contentVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                <GenerativeAndBlogLayout
                    title="Generative Press Release"
                    description="Provide COR with your press release details, and we’ll deliver an exceptional, professionally crafted release."
                    formFields={formFields}
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handlePublish={handleSavePublish}
                    generateButtonText="Generate Press Release"
                    editor={<TextEditor value={editorData} onChange={setEditorData} />}
                    onGenerate={handleSubmit} // Pass the submit handler to the layout
                    handleSaveToDraft={handleSaveAndDocumenet}
                    allData={allData}
                    editorData={editorData}
                    generateCopyLink={generateCopyLink}
                    generalAccessStatus={generalAccessStatus}
                    handalgeneralAccess={handalgeneralAccess}
                    doneBtn={handleSavePublishwithDonBtn}
                    isPublic={pressData?.is_public}
                />
            </motion.div>
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        display: "flex",
                        position: "absolute",
                        justifyContent: "center",
                        height: "100vh",
                        alignItems: "center",
                        width: "99%",
                        top: "0",
                    }}
                >
                    <CircularProgress />
                </motion.div>
            )}
        </>
    );
};

export default GenerativePress;

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GenerativeAndBlogLayout from '../components/GenerativeAndBlogLayout';
import TextEditor from '../components/TextEditor';
import axios from 'axios';
import { use } from 'react';
import { useToast } from '../utils/ToastContext';
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const formFields = [
  {
    controlId: "pressType",
    label: "What is the blog about?",
    type: "textarea",
    placeholder: "e.g., How AI is Transforming Small Businesses or just 'AI in Business'",
  },
  {
    controlId: "spokesperson",
    label: "What are the main ideas or points you want included?",
    type: "chips",
    placeholder: "e.g., “AI benefits, challenges, and case studies”",
  },
  {
    controlId: "releaseReason",
    label: "Who is this blog for?",
    type: "textarea",
    placeholder: "e.g., “Small business owners, entrepreneurs, general readers”",
  },
  {
    controlId: "factsNotes",
    label: "What’s the goal of the blog?",
    type: "textarea",
    placeholder: "e.g., “Educate readers, promote a service, boost website traffic”",
  },
  {
    controlId: "companyDescription",
    label: "How long should the blog be, and what tone should it have?",
    type: "textarea",
    placeholder: "e.g., “800 words, professional and engaging”",
  },
  {
    controlId: "companyDescription2",
    label: "What keywords or phrases should the blog focus on?",
    type: "chips",
    placeholder: "e.g., “renewable energy,” “green technologies,” “sustainable power”",
  },
];

const BlogPost = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id'); // Extract the id parameter

  const navigate = useNavigate();
  // const { id } = useParams();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [allData, setAllData] = useState([]);
  const [blogData, setBlogData] = useState({});
  const [generalAccessStatus, setGeneralAccessStatus] = useState('0');
  

  useEffect(() => {
    setTimeout(() => {
      setContentVisible(true); // Show content after delay
    }, 500);
    if (id) {
      featchBlogData()
    }
  }, []);

  const featchBlogData = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllData(response.data.blog);
      setBlogData(response.data.blog);
      setEditorData(response.data.blog.content_as_html);
      setGeneralAccessStatus( String(response.data.blog.status));

    } catch (error) {
      console.error(error);

    }
  }

  const [formData, setFormData] = useState({
    spokesperson: [],
  });
  const [editorData, setEditorData] = useState('');
  const [content, setConetent] = useState('');
  const [title, setTitle] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      blog_topic: formData.pressType,
      blog_length_and_tone: formData.companyDescription,
      main_points: formData.spokesperson,
      blog_goal: formData.factsNotes,
      target_audience: formData.releaseReason,
      keywords: formData.companyDescription2,
    };

    try {
      setLoading(true);

      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;
      if (token) {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blogs/generate-blog`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          // Update the editor data with the response content_as_html
          setEditorData(response.data.content_as_html);
          setConetent(response.data.content);
          setTitle(response.data.title);
          setAllData(response.data);
          setGeneralAccessStatus( String(response.data.status));

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

  const handleSave = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.token;
    if (id) {
      try {
        const payload = {
          content: editorData,
          status: 0,
          is_public: false
        };
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        showToast('Blog updated successfully!', 'success');
        navigate('/drafts');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const payload = {
          blog_topic: formData.pressType,
          blog_length_and_tone: formData.companyDescription,
          main_points: formData.spokesperson,
          blog_goal: formData.factsNotes,
          target_audience: formData.releaseReason,
          keywords: formData.companyDescription2,
          content_as_html: editorData,
          content: content,
          title: title,
          status: 0,
          is_public: false
        };
        // const payload = { 
        //   content: editorData,
        //   status:0
        // };
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blogs`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        showToast('Blog saved successfully!', 'success');
        navigate('/drafts');
      } catch (error) {
        console.error(error);
      }
    }

  };
  const handleSavePublish = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.token;
    
    // ====================
    if (id) {
      try {
        const payload = {
          content: editorData,
          status: 1,
          is_public: true
        };
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        showToast('Blog published successfully!', 'success');
        navigate('/blog');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const payload = {
          blog_topic: formData.pressType,
          blog_length_and_tone: formData.companyDescription,
          main_points: formData.spokesperson,
          blog_goal: formData.factsNotes,
          target_audience: formData.releaseReason,
          keywords: formData.companyDescription2,
          content_as_html: editorData,
          content: content,
          title: title,
          status: 1,
          is_public: true
        };
        // const payload = { 
        //   content: editorData,
        //   status:0
        // };
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blogs`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        showToast('Blog published successfully!', 'success');
        navigate('/blog');
      } catch (error) {
        console.error(error);
      }
    }

  };
  const handleSavePublishwithDoneBtn = async () => {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.token;
    
    if (id) {
      try {
        const payload = {
          content: editorData,
          status: 1,
          is_public: true
        };
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setBlogData(response.data.blog)
        showToast('Blog published successfully!', 'success');
        // navigate('/blog');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const payload = {
          blog_topic: formData.pressType,
          blog_length_and_tone: formData.companyDescription,
          main_points: formData.spokesperson,
          blog_goal: formData.factsNotes,
          target_audience: formData.releaseReason,
          keywords: formData.companyDescription2,
          content_as_html: editorData,
          content: content,
          title: title,
          status: 1,
          is_public: true
        };
        // const payload = { 
        //   content: editorData,
        //   status:0
        // };
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blogs`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        showToast('Blog published successfully!', 'success');
        setBlogData(response.data.blog)

        // navigate('/blog');
      } catch (error) {
        console.error(error);
      }
    }

  };
  const generateCopyLink = () => {

    if(id){
      const link = `https://appstage.thecor.ai/blogShare?id=${blogData.id}`;
      // Copy the link to the clipboard
      navigator.clipboard
        .writeText(link)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Link Copied!",
            text: "The blog link has been copied to your clipboard.",
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
    }else{
      const link = `https://appstage.thecor.ai/blogShare?id=${blogData.id}`;
      // Copy the link to the clipboard
      navigator.clipboard
        .writeText(link)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Link Copied!",
            text: "The blog link has been copied to your clipboard.",
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
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.token;
    
    if (id) {
      try {
        const payload = {
          content: editorData,
          status: Number(status),
          is_public: Number(status)==1?true:false
        };
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setBlogData(response.data.blog)
        showToast('Blog published successfully!', 'success');
        // navigate('/blog');
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const payload = {
          blog_topic: formData.pressType,
          blog_length_and_tone: formData.companyDescription,
          main_points: formData.spokesperson,
          blog_goal: formData.factsNotes,
          target_audience: formData.releaseReason,
          keywords: formData.companyDescription2,
          content_as_html: editorData,
          content: content,
          title: title,
          status: Number(status),
          is_public: Number(status)==1?true:false

        };
        // const payload = { 
        //   content: editorData,
        //   status:0
        // };
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/blogs`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        showToast('Blog published successfully!', 'success');
        setBlogData(response.data.blog)

        // navigate('/blog');
      } catch (error) {
        console.error(error);
      }
    }
}

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={contentVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <GenerativeAndBlogLayout
          title="Generative Blog Posts"
          description="Provide COR with your press release details, and we’ll deliver an exceptional, professionally crafted release."
          formFields={formFields}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSaveToDraft={handleSave}
          handlePublish={handleSavePublish}
          generateButtonText="Generate Blog Post"
          editor={<TextEditor value={editorData} onChange={setEditorData} />}
          onGenerate={handleSubmit}
          allData={allData}
          editorData={editorData}
          id={id}
          generateCopyLink={generateCopyLink}
          doneBtn={handleSavePublishwithDoneBtn}
          isPublic={blogData?.is_public}
          generalAccessStatus={generalAccessStatus}
          handalgeneralAccess={handalgeneralAccess}
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

export default BlogPost;

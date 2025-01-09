import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GenerativeAndBlogLayout from '../components/GenerativeAndBlogLayout';
import TextEditor from '../components/TextEditor';
import axios from 'axios';
import { use } from 'react';
import { useToast } from '../utils/ToastContext';
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

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
  const navigate = useNavigate();
  const { id } = useParams();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [allData, setAllData] = useState([]);
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
      console.log(response.data.blog,'response.data.blog');
      setAllData(response.data.blog);
      setEditorData(response.data.blog.content_as_html);
    } catch (error) {
      console.log(error);

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
    console.log(payload, 'payload');

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
          console.log('blog generated successfully:', response.data);
          // Update the editor data with the response content_as_html
          setEditorData(response.data.content_as_html);
          setConetent(response.data.content);
          setTitle(response.data.title);
          setAllData(response.data);

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
    console.log(editorData, 'editorData');
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.token;
    if (id) {
      try {
        const payload = {
          content: editorData,
          status: 0
        };
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(response, 'response');
        showToast('Blog updated successfully!', 'success');
        navigate('/blog');
      } catch (error) {
        console.log(error);
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
          status: 0
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
        console.log(response, 'response');
        showToast('Blog saved successfully!', 'success');
        navigate('/blog');
      } catch (error) {
        console.log(error);
      }
    }

  };
  const handleSavePublish = async () => {
    console.log(editorData, 'editorData');
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData?.token;
    // try {
    //   const payload = {
    //     content: editorData,
    //     status: 1
    //   };
    //   const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, payload, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   });
    //   console.log(response, 'response');
    //   showToast('Blog updated successfully!', 'success');
    //   navigate('/blog');
    // } catch (error) {
    //   console.log(error);
    // }

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
        console.log(response, 'response');
        showToast('Blog published successfully!', 'success');
        navigate('/blog');
      } catch (error) {
        console.log(error);
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
        console.log(response, 'response');
        showToast('Blog published successfully!', 'success');
        navigate('/blog');
      } catch (error) {
        console.log(error);
      }
    }

  };


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

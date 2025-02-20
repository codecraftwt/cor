import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BlogsharePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id'); // Extract the id parameter
  
  const [editorData, setEditorData] = useState('');

  const featchBlogData = async () => {
    try {
      const authData = JSON.parse(localStorage.getItem("authData"));
      const token = authData?.token;
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/blogs/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
    //   setAllData(response.data.blog);
      setEditorData(response.data.blog.content_as_html);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
      if (id) {
        featchBlogData()
      }
    }, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div style={{ maxWidth: '800px', margin: '20px', width: '100%' }}>
      <div dangerouslySetInnerHTML={{ __html: editorData }} />
    </div>
  </div>
  );
};

export default BlogsharePage;

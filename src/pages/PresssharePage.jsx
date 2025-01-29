import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PresssharePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id'); // Extract the id parameter
  const [editorData, setEditorData] = useState('');

  const featchBlogData = async () => {
    try {
        const authData = JSON.parse(localStorage.getItem("authData"));
        const token = authData?.token;
        //   http://161.35.79.99/api/press-releases/019406ba-b64b-ed18-e7e8-30537c5a4526
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/press-releases/${id}`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        });
        // console.log(response, 'response');

        setEditorData(response.data.press_release.content_as_html);
        // setAllData(response.data.press_release);
    } catch (error) {
      console.log(error);

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

export default PresssharePage;

// src/pages/BlogPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenerativeAndBlogLayout from '../components/GenerativeAndBlogLayout';
import TextEditor from '../components/TextEditor';

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
    type: "textarea",
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
    type: "textarea",
    placeholder: "e.g., “renewable energy,” “green technologies,” “sustainable power”",
  },
];

const BlogPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    spokesperson: [],
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <GenerativeAndBlogLayout
      title="Generative Blog Posts"
      description="Provide COR with your press release details, and we’ll deliver an exceptional, professionally crafted release."
      formFields={formFields}
      formData={formData}
      handleInputChange={handleInputChange}
      generateButtonText="Generate Blog Post"
      editor={<TextEditor />} 
    />
  );
};

export default BlogPage;

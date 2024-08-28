import React, { useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import './App.css';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  const [projects,setProjects] = useState();
  const [formData, setFormData] = useState({
    name: '',
    thumbnail: '',
    liveProjectUrl : '',
    about: '',
    techStack: [],
    type: 'web',
    visualLinks: []
  });

  const [newTechStack, setNewTechStack] = useState('');
  const [newVisualLink, setNewVisualLink] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNewTechStackChange = (e) => {
    setNewTechStack(e.target.value);
  };

  const handleAddTechStack = () => {
    if (newTechStack.trim() !== '') {
      setFormData(prevState => ({
        ...prevState,
        techStack: [...prevState.techStack, newTechStack.trim()]
      }));
      setNewTechStack('');
    }
  };

  const handleRemoveTechStack = (index) => {
    const newTechStack = formData.techStack.filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      techStack: newTechStack
    }));
  };

  const handleNewVisualLinkChange = (e) => {
    setNewVisualLink(e.target.value);
  };

  const handleAddVisualLink = () => {
    if (newVisualLink.trim() !== '') {
      setFormData(prevState => ({
        ...prevState,
        visualLinks: [...prevState.visualLinks, newVisualLink.trim()]
      }));
      setNewVisualLink('');
    }
  };

  const handleRemoveLink = (index) => {
    const newVisualLinks = formData.visualLinks.filter((_, i) => i !== index);
    setFormData(prevState => ({
      ...prevState,
      visualLinks: newVisualLinks
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'projects'), formData);
      console.log('Document written with ID: ', docRef.id);
      toast.success('Project added successfully!');
    } catch (e) {
      console.error('Error adding document: ', e);
      toast.error('Failed to add project. Please try again.');
    } finally {
      setFormData({
        name: '',
        thumbnail: '',
        liveProjectUrl : '',
        about: '',
        techStack: [],
        type: 'web',
        visualLinks: []
      })
      setNewVisualLink('');
      setNewTechStack('');
    }
  };


  useEffect(() => {
    async function fetchProjects() {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProjects(projectList);
        
      } catch (e) {
        console.error('Error fetching documents: ', e);
      }
    }

    fetchProjects();
    
  }, []);


  return (
    <div className='container'>
      <ToastContainer />
          <h1>Add a New Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Live Project URL:</label>
          <input
            type="text"
            name="liveProjectUrl"
            value={formData.liveProjectUrl}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Project Thumbnail URL:</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>About the Project:</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tech Stack:</label>
          <div className="visual-link-input">
            <input
              type="text"
              value={newTechStack}
              onChange={handleNewTechStackChange}
              placeholder="Add tech stack"
            />
            {newTechStack.trim() !== '' && (
              <button
                type="button"
                onClick={handleAddTechStack}
                className="add-button"
              >
                Add
              </button>
            )}
          </div>
          {formData.techStack.length > 0 && (
  <ul className="tech-stack-list">
    {formData.techStack.map((tech, index) => (
      <li key={index} className="tech-stack-item">
        {tech}
        <button
          type="button"
          onClick={() => handleRemoveTechStack(index)}
          className="remove-button"
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
)}

        </div>
        <div>
          <label>Visual Image Links:</label>
          <div className="visual-link-input">
            <input
              type="text"
              value={newVisualLink}
              onChange={handleNewVisualLinkChange}
              placeholder="Add visual link"
            />
            {newVisualLink.trim() !== '' && (
              <button
                type="button"
                onClick={handleAddVisualLink}
                className="add-button"
              >
                Add
              </button>
            )}
          </div>
          {formData.visualLinks.length > 0 && (
  <ul className="visual-link-list">
    {formData.visualLinks.map((link, index) => (
      <li key={index} className="visual-link-item">
        {link}
        <button
          type="button"
          onClick={() => handleRemoveLink(index)}
          className="remove-button"
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
)}

        </div>
        <button type="submit" >Add Project</button>
      </form>
    </div>
  );
}

export default App

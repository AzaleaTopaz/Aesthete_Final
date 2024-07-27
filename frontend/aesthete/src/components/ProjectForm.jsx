import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProjectForm() {
    const { id } = useParams(); // Get the project ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        start_date: '',
        end_date: '',
        inspiration: '',
        description: ''
    });
    const [username, setUsername] = useState('')

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/projects/${id}/`);
                setFormData(response.data);

                const userResponse = await axios.get(`http://localhost:8000/users/${response.data.user}/`);
                setUsername(userResponse.data.username);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        fetchProject();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/projects/${id}/`, formData);
            navigate(`/username/${username}`); // Redirect back to projects list after update
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <div className='ProjectForm'>
            <h2>Edit Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Start Date:
                    <input
                        type='date'
                        name='start_date'
                        value={formData.start_date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type='date'
                        name='end_date'
                        value={formData.end_date}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Inspiration URL:
                    <input
                        type='url'
                        name='inspiration'
                        value={formData.inspiration}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        name='description'
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type='submit'>Update Project</button>
                <button type='button' onClick={() => navigate('/projects')}>Cancel</button>
            </form>
        </div>
    );
}

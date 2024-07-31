import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bulma/css/bulma.min.css'; 

export default function ProjectForm({ user }) {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        start_date: '',
        end_date: '',
        inspiration: '',
        description: ''
    });
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/projects/${user.id}/`);
                setFormData(response.data);
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
            navigate(`/username/${user.username}`);
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/projects/${id}`);
            navigate(`/username/${user.username}`);
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    return (
        <div className='container'>
            <h2 className='title'>Edit Project</h2>
            <form onSubmit={handleSubmit} className='box'>
                <div className='field'>
                    <label className='label'>Name</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Start Date</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='date'
                            name='start_date'
                            value={formData.start_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>End Date</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='date'
                            name='end_date'
                            value={formData.end_date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Inspiration URL</label>
                    <div className='control'>
                        <input
                            className='input'
                            type='url'
                            name='inspiration'
                            value={formData.inspiration}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className='field'>
                    <label className='label'>Description</label>
                    <div className='control'>
                        <textarea
                            className='textarea'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className='field is-grouped'>
                    <div className='control'>
                        <button className='button is-link' type='submit'>Update Project</button>
                    </div>
                    <div className='control'>
                        <button className='button is-light' type='button' onClick={() => navigate(`/username/${username}`)}>Cancel</button>
                    </div>
                    <div className='control'>
                        <button className='button is-danger' type='button' onClick={handleDelete}>
                            Delete Project
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

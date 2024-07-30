import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CreateProjectForm() {
    const { username } = useParams();
    // const [username, setUsername] = useState('');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [inspiration, setInspiration] = useState('');
    const [description, setDescription] = useState('');

    const initialProjectFormState = {
        name: '',
        start_date: '',
        end_date: '',
        inspiration: '',
        description: '',
        username

    }

    useEffect(() => {
        const renderData = async () => {
        try {
            const projectsResponse = await axios.get(`http://localhost:8000/projects/${username}`)
            setProjects(projectsResponse.data);
            console.log(projectsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error); 
         } finally {
                    setLoading(false)

            }
        }
        renderData();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            let submissionSuccessful = false;

            if (name && startDate && endDate && inspiration && description) {
                const newProject = {
                    name,
                    start_date: startDate,
                    end_date: endDate,
                    inspiration,
                    description,
                };
                await axios.post(`http://localhost:8000/projects/${username}`, newProject)
                submissionSuccessful = true
            }
        } catch(error){
            console.error('Error creating project:', error)
            alert('Failed to submit data.')
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div className='CreateProjectForm'>
            <h1>Create New Project</h1>
            <Form onSubmit={handleSubmit}>
        <Form.Group controlId='projectName formcontrol'>
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Project Name" />
        </Form.Group>

        <Form.Group controlId='projectStart formcontrol'>
            <Form.Label>Start Date:</Form.Label>
            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
        </Form.Group>

        <Form.Group controlId='projectName forcontrol'>
            <Form.Label>End Date:</Form.Label>
            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
        </Form.Group>

        <Form.Group controlId='projectInspo formcontrol'>
            <Form.Label>Inspiration:</Form.Label>
            <Form.Control type="url" value={inspiration} onChange={(e) => setInspiration(e.target.value)} placeholder="Inspiration Url" />
        </Form.Group>

        <Form.Group controlId='projectDescription formcontrol'>
            <Form.Label>Description:</Form.Label>
            <Form.Control type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        </Form.Group>

        {/* <Form.Group controlId='projectUser formcontrol'>
            <Form.Label>Username:</Form.Label>
            <Form.Control type="textarea" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        </Form.Group> */}
        <button className='createbutton' type='submit'>Create Project</button>
            </Form>
        

            
</div>)
}








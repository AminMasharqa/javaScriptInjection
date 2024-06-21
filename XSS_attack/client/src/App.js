import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [comment, setComment] = useState('');
    const [displayComment, setDisplayComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('/submit', { userInput: comment });
        setDisplayComment(response.data.userInput);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/data');
            setDisplayComment(response.data.userInput);
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Submit a Comment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea 
                        className="form-control" 
                        id="comment" 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        rows="3">
                    </textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mt-4">
                <h3>Your Comment:</h3>
                <p dangerouslySetInnerHTML={{ __html: displayComment }}></p>
            </div>
        </div>
    );
}

export default App;

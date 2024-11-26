import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobApplicationList = () => {
    const [jobApplications, setJobApplications] = useState([]);

    useEffect(() => {
        const fetchJobApplications = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axios.get('http://localhost:5000/api/applications', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setJobApplications(data);
            } catch (error) {
                console.error('Error fetching job applications:', error);
                // Optionally, handle the error with a user-friendly message
            }
        };

        fetchJobApplications();
    }, []);

    return (
        <div>
            <h2>My Applications</h2>
            {jobApplications.length === 0 ? (
                <p>No job applications found.</p>
            ) : (
                <ul>
                    {jobApplications.map((application) => (
                        <li key={application._id}>
                            <strong>{application.companyName}</strong> - {application.jobTitle}
                            <br />
                            <span>Deadline: {new Date(application.deadline).toDateString()}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default JobApplicationList;

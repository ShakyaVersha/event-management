import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../../utils/apiService';
import { toast } from 'react-toastify';


const View = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await apiService.get(`http://localhost:5000/api/events/${id}`);
                setEvent(res.data);
            } catch (error) {
                console.error("Failed to load event:", error);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) return <p>Loading...</p>;

    const handleButTiket = () => {
        
        toast.success("Buy ticket successfully ");
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    const handleBack = () => {
        navigate(-1); 
    };
    

    return (
        <div className="view-container">
            <div className="error-sign">
                
                <span className="error-message"onClick={handleBack} >Go Back</span>
            </div>
            <h2>{event.eventName}</h2>
            <div className="event-details">
                <img src={`http://localhost:5000${event.photo}`} alt={event.eventName} />
                <div>₹{event.price}</div>
                <p>{event.description}</p>
                <div className="date">
                    <span>{new Date(event.endDate).toLocaleDateString()}</span>
                    <span>09:30 - 10:30</span> 
                </div>
                <button onClick={handleButTiket}>Get Ticket</button>
            </div>
        </div>
    );
};

export default View;

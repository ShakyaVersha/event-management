import React, { useEffect, useState } from 'react';
import apiService from '../../utils/apiService';
import {  useNavigate } from 'react-router-dom';



const UserEvents = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await apiService.get('http://localhost:5000/api/events');
                setItems(response.data);
            } catch (error) {
                console.log("Failed to fetch events:", error);
            }
        };

        fetchEvents();
    }, []);

    const handleViewClick = (id) => {
        navigate(`/view/${id}`); 
      };

   
    return (
        <div className="card">
            {items.map((item, index) => (
                <div className="card-items" key={index}>
                    <img
                        src={item.photo ? `http://localhost:5000${item.photo}` : "./src/assets/placeholder.jpg"}
                        alt={item.eventName}
                        className="img-card"
                    />
                    <h1>{item.eventName}</h1>
                    
                    
                    <div className="button-group">
                        
                        <button className="delete-btn" onClick={() => handleViewClick(item._id)}>View</button>
                    </div>
                </div>
            ))}

           
        </div>
    );
};

export default UserEvents;

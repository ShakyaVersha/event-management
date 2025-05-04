import React, { useEffect, useState } from 'react';
import apiService from '../../../utils/apiService';
import CreateEvent from './CreateEvent'; 
import { toast } from 'react-toastify';

const AdminEvents = () => {
    const [items, setItems] = useState([]);
    const [editingEvent, setEditingEvent] = useState(null); 
    const[showEvent,setShowEvent]=useState(false);

    console.log("adimEvenst")

    const fetchEvents = async () => {
        try {
            const response = await apiService.get('http://localhost:5000/api/events');
            setItems(response.data);
        } catch (error) {
            console.log("Failed to fetch events:", error);
        }
    };

    useEffect(() => {
        
        fetchEvents();
    }, []);

    const handleEditClick = (event) => {
        setEditingEvent(event); 
        setShowEvent(true)
    };

    const handleCloseModal = () => {
        setEditingEvent(null); 
        setShowEvent(false)
    };

    // Delete event function
    const deleteEvent = async (eventId) => {
        try {
            // Send DELETE request to the backend
            const response = await apiService.delete(`http://localhost:5000/api/events/${eventId}`);
            console.log("Event deleted:", response.data);

            // Remove deleted event from the UI by filtering it out
           fetchEvents();
           toast.success("deleted")
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    return (
        <>
        <button className='log-btn' onClick={() => setShowEvent(true)}>Create Event</button>
        <div className="card">

            {items.map((item, index) => (
                <div className="card-items" key={index}>
                    <img
                        src={item.photo ? `http://localhost:5000${item.photo}` : "./src/assets/placeholder.jpg"}
                        alt={item.eventName}
                        className="img-card"
                    />
                    <h1>{item.eventName}</h1>
                    <p className="price">${item.price}</p>
                    <p>{item.description}</p>
                    <div className="button-group">
                        <button className="edit-btn" onClick={() => handleEditClick(item)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteEvent(item._id)}>Delete</button>
                    </div>
                </div>
            ))}

            
            {showEvent && <CreateEvent refresh={fetchEvents} event={editingEvent} onClose={handleCloseModal} />}
        </div>
        </>
    );
};

export default AdminEvents;

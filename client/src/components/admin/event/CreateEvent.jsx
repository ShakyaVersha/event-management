import React, { useState, useEffect } from 'react';

import apiService from '../../../utils/apiService';
import { toast } from 'react-toastify';

const CreateEvent = ({ event, onClose,refresh }) => {
  
  
  const role = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    photo: null,
    eventName: '',
    price: '',
    description: '',
    endDate: '',
    totalTicketCount: '',
    soldCount: ''
  });


  useEffect(() => {

    if (event) {
      setFormData({
        photo: null,
        eventName: event.eventName || '',
        price: event.price || '',
        description: event.description || '',
        endDate: event.endDate ? event.endDate.split('T')[0] : '',
        totalTicketCount: event.totalTicketCount || '',
        soldCount: event.soldCount || '',
      });
    }
  }, [event]);

  if (role === "user") {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>Access Denied</h2>
          <p>You do not have permission to create or edit events.</p>
        </div>
      </div>
    );
  }



  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      setFormData(prev => ({
        ...prev,
        photo: files[0] // File object
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("photo", formData.photo);
    data.append("eventName", formData.eventName);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("endDate", formData.endDate);
    data.append("totalTicketCount", formData.totalTicketCount);
    data.append("soldCount", formData.soldCount);

    try {
      let response;
      if (event) {

        response = await apiService.put(`http://localhost:5000/api/events/${event._id}`, data);
        toast.success("Event updated successfully!");

        

        
      } else {

        response = await apiService.post('http://localhost:5000/api/events', data);
        toast.success("event created succesfully")
      
      }
      
      refresh();

      console.log("Event response:", response.data);
      setFormData({
        photo: null,
        eventName: '',
        price: '',
        description: '',
        endDate: '',
        totalTicketCount: '',
        soldCount: ''
      });
      onClose();
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error("Internal server error")
        console.log(error)
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{event ? 'Edit Event' : 'Create New Event'}</h2>
        <form onSubmit={handleSubmit} className="modal-form" >
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            
          />
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={formData.eventName || ''}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price || ''}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description || ''}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="endDate"
            value={formData.endDate || ''}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="totalTicketCount"
            placeholder="Total Ticket Count"
            value={formData.totalTicketCount}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="soldCount"
            placeholder="Sold Count"
            value={formData.soldCount || ''}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            {event ? 'Update Event' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;

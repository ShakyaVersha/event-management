const event = require("../Model/eventSchema")

const createEvent = async (req, res) => {
  try {
    const body = req.body;
    
    const photopath = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await event.create({
      photo: photopath,
      eventName: body.eventName,
      price: body.price,
      description: body.description,
      endDate: body.endDate,
      totalTicketCount: body.totalTicketCount,
      soldCount: body.soldCount,


    })
    return res.status(200).json({ message: "success..." });

  } catch (error) {
  }

}
const fetchEvents = async (req, res) => {

  try {
    const events = await event.find();
    res.status(200).json(events)

  } catch (error) {
    console.log("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }

}

const fetchEventswithid = async (req, res) => {
  try {
    const eventId = req.params.id;

    const eventData = await event.findById(eventId);
    console.log(eventData);

    if (!eventData) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(eventData);
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find and delete the event by its ID
    const deletedEvent = await event.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ message: "Failed to delete event" });
  }



}

const updateEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const body = req.body;
    const photopath = req.file ? `/uploads/${req.file.filename}` : null;


    const updatedData = {
      eventName: body.eventName,
      price: body.price,
      description: body.description,
      endDate: body.endDate,
      totalTicketCount: body.totalTicketCount,
      soldCount: body.soldCount,
    };

    if (photopath) {
      updatedData.photo = photopath;
    }

    const result = await event.findByIdAndUpdate(eventId, updatedData, { new: true });

    if (!result) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event updated successfully', updatedEvent: result });

  } catch (error) {
    console.log("Error updating event:", error);
    res.status(500).json({ message: "Failed to update event" });
  }

}

module.exports = {
  createEvent,
  fetchEvents,
  deleteEvent,
  updateEvent,
  fetchEventswithid


}
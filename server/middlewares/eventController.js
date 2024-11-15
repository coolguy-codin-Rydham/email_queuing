import EventModel from "../models/event.js";



export const CreateEventController = async (req, res) => {
    console.log(req.body); // Check what you're receiving here
    const { name, description, date, venue,mode,  creator } = req.body;
    const eventDate = new Date(date);
    console.log(eventDate);
    const eventDetails = { name, description,mode,  date: eventDate, venue, creator };
    console.log(eventDetails);

    try {
        const { response, error } = await createEventController(eventDetails);
        if (response) {
            res.status(201).json({
                message: "Event created successfully",
                // event: response,
                status: "Created",
            });
        } else {
            res.status(501).json({
                message: "Failed to create event",
                status: "Not Created",
                error: error.message || "Unknown error",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error processing the event creation",
            error: err.message,
            status: "Error",
        });
    }
};



//Create Mail function returns a 
const createEventController = async (eventDetails) => {
    const { name, description, date, venue,mode,  creator } = eventDetails;
    try {
        const event = await EventModel.create({
            name,
            description,
            date,
            venue,
            creator,
            mode
        });
        return { response : event }
    } catch (err) {
        return { response : null, error: err };
    }
};

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


export const GetAllEvents = async (req, res) => {
    try {
        const data = await getAllEvents();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
};

export const GetEventByEventId = async(req, res)=>{
    const eventId = req.params.id;

    console.log(req.params)

    try{
        const event = await getEventById(eventId);
        res.status(200).json({
            event:event
        })
    }catch(e){
        res.status(500).json({error:e})
    }
}

const getEventById = async(eventId) => {
    try{
        const event = await EventModel.findOne({"_id":eventId});
        return event;
    }catch(e){
        throw e
    }
}
    


const getAllEvents = async () => {
    try {
        const data = await EventModel.find();
        return data; 
    } catch (error) {
        throw error; 
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

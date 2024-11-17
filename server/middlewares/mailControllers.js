


import { emailQueue } from "../index.js";
import { transporter } from "../utils/mailer.js";

const emailText = "Hello World";

// Asynchronous SendEmail function
export const SendEmail = async (email) => {
    try {
        await sendMail(email); // Wait for the sendMail promise to resolve
        console.log("Email Success");
    } catch (err) {
        console.error("Email failed:", err);
    }
};


export const EmailSendController = (req, res) => {
    const {email} = req.body;

    const {error} = emailSendController(email);
    
    if(error){
        return res.status(500).json({
            status:"Error Sending Email",
            err:error
        })
    }

    res.status(200).json({
        email: email,
        status:"Success"
    })
}


// sendMail function returns a promise
const sendMail = (email) => {
    return new Promise((resolve, reject) => {
        let mailOptions = {
            from: process.env.NODE_EMAIL,
            to: email,
            subject: "Here is email",
            text: emailText,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                reject(err); // Reject if there's an error
            } else {
                resolve(info); // Resolve with the info if successful
            }
        });
    });
};

const emailSendController = (email)=>{
    try{
        emailQueue.push(email);
        console.log(emailQueue);
        return {error:null}
    }catch(err){
        console.error("Error while adding email to queue:", err);
        return {error:err}
    }
}
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import { validationResult, check } from 'express-validator';
import DOMPurify from 'dompurify';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
app.use(express.json());
app.use(cors());

// Validation rules
const validateQuotation = [
    check('firstName', 'First Name is required').not().isEmpty(),
    check('lastName', 'Last Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number').isMobilePhone(),
    check('product', 'Product field is required').not().isEmpty(),
    check('quantity', 'Quantity must be a number').not().isEmpty(),
    check('artwork', 'Artwork field is required').not().isEmpty()
];

// Serverless function to send a quotation email
export default async function sendQuotation(req, res) {

    // Apply validation checks here
    await Promise.all(validateQuotation.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        firstName,
        lastName,
        phone,
        email,
        product,
        quantity,
        artwork
    } = req.body;

    // Creating a new Date object and formatting it
    const now = new Date();
    const dateString = now.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).replace(/ /g, '/');
    const timeString = now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    const dateTimeString = `${dateString} ${timeString}`;

    const emailList = ['abdulla@printingtalks.ae', 'mohamed@printingtalks.ae', 'mariam@printingtalks.ae', 'abed@printingtalks.ae', 'saleh.lootah2@gmail.com']

    const message = {
        to: 'saleh.lootah2@gmail.com',
        from: 'dev@printingtalks.ae',
        subject: '🚨 New Quotation Request 🚨',
        text: `Date and Time: ${dateTimeString}\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\nProduct: ${product}\nQuantity: ${quantity}\nArtwork: ${artwork}`,
    };

    try {
        await sgMail.send(message);
        console.log(`Successfully Sent Email`);
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
}
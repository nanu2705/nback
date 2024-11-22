import mongoose from 'mongoose';

const newsLetterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
});

const NewsLetter = mongoose.model('NewsLetter', newsLetterSchema);

export default NewsLetter;

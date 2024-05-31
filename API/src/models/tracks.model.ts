import mongoose from 'mongoose'
import validator from 'validator';
const soundtrackSchema = new mongoose.Schema({
    title:{
        type: String,
        minLenght: 5,
        maxLength: 20,
        required: true
    },
    genre:{
        type: String,
        minLenght: 5,
        maxLength: 20,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    url:{
        type: String,
        required: true,
        validate: {
            validator: (value:string) => validator.isURL(value),
            message: 'Invalid URL'
        }
    },
    likes:{
        type: Number,
        min: 0
    },
    image:{
        type: String,
        required: true,
        validate: {
            validator: (value:string) => validator.isURL(value),
            message: 'Invalid URL'
        }
    },
    releaseAt:{
        type: Date,
        default: Date.now()
    }
})
soundtrackSchema.set("toJSON", {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    },
});

const soundtrack = mongoose.model("Soundtrack", soundtrackSchema);

export default soundtrack;
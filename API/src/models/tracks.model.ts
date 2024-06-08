import mongoose, { Schema } from 'mongoose'
import validator from 'validator';
import genrerModel from './genrer.model';

const genrerSubSchema = new  Schema({
	name: String,
	id: {type: mongoose.Schema.Types.ObjectId, ref: genrerModel}
}, {'_id': false}); 

const soundtrackSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genrer:{type: genrerSubSchema},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
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
    likes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    image:{
        type: String,
        required: true,
        validate: {
            validator: (value:string) => validator.isURL(value),
            message: 'Invalid URL'
        }
    },
    releaseDate:{
        type: Date,
        default: Date.now()
    },
    album:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "albums",
        required: false
    },
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
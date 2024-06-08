import mongoose from 'mongoose'

const genrerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    soundTracks:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Soundtrack' }],
    image:{
        type: String
    }
})
genrerSchema.set("toJSON", {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    },
});
const genrerModel = mongoose.model("Genrer", genrerSchema);

export default genrerModel;
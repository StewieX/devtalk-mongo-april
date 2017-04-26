/**
 * Created by Steven Gentens on 4/26/2017.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        minlength: [3, 'Title should contain at least 3 characters.']
    },
    organisation: {
        type: String,
        enum: ['Foreach', 'Karel de Grote Hogeschool']
    },
    collaborators: [{
            type: Schema.Object,
            ref: 'Collaborator'
        }]
}, {timestamps: true}, {minimize: true});

ProjectSchema.set('validateBeforeSave', true);

module.exports = mongoose.model('Project', ProjectSchema);
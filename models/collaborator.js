/**
 * Created by Steven Gentens on 4/26/2017.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CollaboratorSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number
}, {timestamps: true}, {minimize: true});

CollaboratorSchema.pre('remove', function (next) {
    let collaboratorId = this._id;
    this.model('Project').find({collaborators: {$in: [collaboratorId]}})
        .then(projects => removeCollaboratorFromProjects(collaboratorId, projects, next))
        .catch(err => console.log(err));
});

function removeCollaboratorFromProjects(collaboratorId, projects, next) {
    projects.forEach(
        project => {
            project.collaborators.remove(collaboratorId);
            project.save()
        }
    );
    next();
}

module.exports = mongoose.model('Collaborator', CollaboratorSchema);
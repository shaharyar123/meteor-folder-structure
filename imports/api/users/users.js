// definition of the Accounts collection

import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class UsersCollection extends Mongo.Collection {}

export const Users = new UsersCollection('users');

// Deny all client-side updates since we will be using methods to manage this collection
Users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; }
});

Users.schema = new SimpleSchema({
    email: {
        type: String,
        label: 'email of user'
    },
    password: {
        type: String,
        label: 'password of user'
    },
    createdAt: {
        type: Date,
        label: "Created At User",
        denyUpdate: true,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();
            }
        }
    },
    updatedAt: {
        type: Date,
        label: "Updated At account",
        autoValue: function() {
            if (this.isUpdate) {
                return new Date();
            }
        },
        denyInsert: true,
        optional: true
    }
});

Users.attachSchema(Users.schema);

// This represents the keys from Lists objects that should be published
// to the client. If we add secret properties to List objects, don't list
// them here to keep them private to the server.

import { Accounts } from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor'
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';




export const SignUpMtehod = new ValidatedMethod({
    name: 'signUp',
    validate: new SimpleSchema({
        'user': {
            type: Object
        },
        'user.email': {
            type: String
        },
        'user.password': {
            type: String,
        },
    }).validator(),
    run({ user }) {
        return Accounts.createUser(user);
    }
});

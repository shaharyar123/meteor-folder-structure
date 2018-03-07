import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';

import './main.html';


Template.hello.events({
  'click button'(event, instance) {
    console.log('create' );
    // increment the counter when button is clicked
    //instance.counter.set(instance.counter.get() + 1);
    let user = {
      email : 'testing@testing.com',
      password  : 'test'
    };
   Meteor.call('signUpEmail', {user : user}, (err, res)=>{
      console.log('res ',res);
      console.log('err ',err);
    })
  }
});
Template.login.events({
  'click button'(event, instance) {
    let user = {
      email : 'testing@testing.com',
      password  : 'test'
    };

   Meteor.loginWithPassword(user.email, user.password, (err)=>{
       if(err) console.log('err ',err);
       console.log('Success : ', Meteor.userId());
    })
  }
});

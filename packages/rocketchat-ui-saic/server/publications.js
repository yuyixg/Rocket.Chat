import { HTTP } from 'meteor/http';
Meteor.methods({
  'posts/test': function (a) {
    console.log(a);
    check(a, Number);
    var posts = RocketChat.models.Task.find().fetch();
    return posts;
  }
});

Meteor.publish('posts', function () {
  RocketChat.models.Task.insert({
    title: '1222222222222222222211111111111111Int1roducing Telescope1',
    url: 'http://1sachagreif.com/introducing-telescope11/'
  });
  return RocketChat.models.Task.find();
});

Meteor.methods(
  {
    'issueInsert': function (Attributes) {
      console.log(Attributes);
    
    },
    'issueUpdate': function (Attributes) {
      console.log(Attributes);

    },
    'issueDelete': function (id) {
     
    },
    'issuefindOne': function (id) {
      console.log(id);

    }
  }
);
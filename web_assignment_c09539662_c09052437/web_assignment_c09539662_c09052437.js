/*if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to web_assignment_c09539662_c09052437.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
*/

// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
  Template.web_assignment_c09539662_c09052437.questions = function () {
    return Questions.find({}, {sort: {score: -1, q: 1}});
  };

  Template.web_assignment_c09539662_c09052437.selected_q = function () {
    var question = Questions.findOne(Session.get("selected_q"));
    return question && question.q;
  };

  Template.question.selected = function () {
    return Session.equals("selected_q", this._id) ? "selected" : '';
  };

  Template.web_assignment_c09539662_c09052437.events({
    'click Button.inc': function () {
      Questions.update(Session.get("selected_q"), {$inc: {score: 1}});
    }
	});
	Template.web_assignment_c09539662_c09052437.events({
	'click Button.dec': function () {
      Questions.update(Session.get("selected_q"), {$inc: {score: -1}});
    }
  });

  Template.question.events({
    'click': function () {
      Session.set("selected_q", this._id);
    }
  });
  /*
  Template.login({
  function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();*/
}

	

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Questions.find().count() === 0) {
      var qs = ["Alri?",
                   "Story?",
                   "spa",
                   "yeah"];
      for (var i = 0; i < qs.length; i++)
        Questions.insert({q: qs[i], score: Math.floor(Random.fraction()*10)*5});
    }
  });
}





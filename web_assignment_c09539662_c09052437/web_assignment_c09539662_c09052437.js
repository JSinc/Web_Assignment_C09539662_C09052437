// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
	
	Template.web_assignment_c09539662_c09052437.questions = function () {
		return Questions.find({}, {sort: {score: -1, q: 1, desc: 1}});
	};
	
	Template.web_assignment_c09539662_c09052437.selected_q = function () {
		var question = Questions.findOne(Session.get("selected_q"));
		return question && question.q ;
	};
	
	Template.web_assignment_c09539662_c09052437.selected_desc = function () {
		var question = Questions.findOne(Session.get("selected_q"));
		return question && question.desc ;
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
	
	Template.web_assignment_c09539662_c09052437.events({
		'click Button.add': function () {
			var newQ = document.getElementById("newQ").value; 
			var newD = document.getElementById("newD").value;
			if (newQ.length < 80){
				Questions.insert({q: newQ, desc: newD, score: 0});
			}
			else
			{
				window.alert("Question title is too long");
			}
		}
	});
	
	Template.web_assignment_c09539662_c09052437.events({
		'click Button.del': function () { 
			Questions.remove(Session.get("selected_q"));
		}
	});
	
	Template.question.events({
		'click': function () {
	 		 Session.set("selected_q", this._id);
		}
	});

}

if (Meteor.isServer) {
	Meteor.startup(function () {

		//Remove configuration entry
		Accounts.loginServiceConfiguration.remove({
			service: "google"
		});

		if (Questions.find().count() === 0) {
			var qs = ["Alri?","Story?","spa","yeah"];
			var ds = [
						"Description goes here",
						"Description goes here",
						"Description goes here",
						"Description goes here"
					];
		
			for (var i = 0; i < qs.length; i++) {
				Questions.insert({q: qs[i], desc:ds[i], score: Math.floor(Random.fraction()*10)*5});
			}
		}
	});
}
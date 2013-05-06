// Rich Web Assignment - DT 228/4
// Jody Sinclair - C09539662 & Keith Hagan - C09052437
// Application for students to ask questions in class and vote them up
// or down allowing the lecturer to view the most requested question.
// Users can only vote up and down 5 times each and must sign in before
// viewing or accessing content.

Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
	
	var votedUp = 0;
	var votedDown = 0;
	
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
			if (votedUp < 5)
			{
		  		Questions.update(Session.get("selected_q"), {$inc: {score: 1}});
				votedUp++;
			}
			else
			{
				window.alert("You may only vote up 5 times per session");
			}
		}
	});
	Template.web_assignment_c09539662_c09052437.events({
		'click Button.dec': function () {
			if (votedDown < 5)
			{
		  		Questions.update(Session.get("selected_q"), {$inc: {score: -1}});
				votedDown++;
			}
			else
			{
				window.alert("You may only vote down 5 times per session");
			}
		}
	});
	
	Template.web_assignment_c09539662_c09052437.events({
		'click span.add': function () {
			var newQ = document.getElementById("newQ").value; 
			var newD = document.getElementById("newD").value;
			if (newQ.length < 80){
				Questions.insert({q: newQ, desc: newD, score: 0});
				document.getElementById("newQ").value = '';
				document.getElementById("newD").value = '';
			}
			else
			{
				window.alert("Question title is too long");
			}
		}
	});
	
	Template.web_assignment_c09539662_c09052437.events({
		'click span.del': function () { 
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
		Accounts.loginServiceConfiguration.insert({
			service: "google",
			clientId: "783577748341-0ral1ci40fmrdn87u23lubvcbok0j0de.apps.googleusercontent.com",
			secret: "IffJHL8WyoITbO_5lz9yT2Kr"
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
// Rich Web Assignment - DT 228/4
// Jody Sinclair - C09539662 & Keith Hagan - C09052437
// Application for students to ask questions in class and vote them up
// or down allowing the lecturer to view the most requested question.
// Users can only vote up and down 5 times each and must sign in before
// viewing or accessing content.

//Collection for the questions
Questions = new Meteor.Collection("questions");

if (Meteor.isClient) {
	
	var votedUp = 0; //variable to tracl how many times user has voted up
	var votedDown = 0; //variable to track how many times user has voted up
	
	//Template to get the all questions
	Template.web_assignment_c09539662_c09052437.questions = function () {
		return Questions.find({}, {sort: {score: -1, q: 1, desc: 1}});
	};
	
	//Template to select an indiviqual question's title
	Template.web_assignment_c09539662_c09052437.selected_q = function () {
		var question = Questions.findOne(Session.get("selected_q"));
		return question && question.q ;
	};
	
	//Template to select an indiviqual question's description
	Template.web_assignment_c09539662_c09052437.selected_desc = function () {
		var question = Questions.findOne(Session.get("selected_q"));
		return question && question.desc ;
	};
	
	//Template that returns the selected question
	Template.question.selected = function () {
		return Session.equals("selected_q", this._id) ? "selected" : '';
	};
	
	//Template that applies the vote up functionality to the vote up button
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
	
	//Template that applies the vote down functionality to the vote up button
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
	
	//Template that handles the insertion of a new question into the application
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
	
	//Template that handles the deletion of a question from the application
	Template.web_assignment_c09539662_c09052437.events({
		'click span.del': function () { 
			Questions.remove(Session.get("selected_q"));
		}
	});
	
	//Template that handles selecting a question
	Template.question.events({
		'click': function () {
	 		 Session.set("selected_q", this._id);
		}
	});

}

if (Meteor.isServer) {
	Meteor.startup(function () {

		//Remove configuration entry if it's been set before
		Accounts.loginServiceConfiguration.remove({
			service: "google"
		});
		//Set confguration
		Accounts.loginServiceConfiguration.insert({
			service: "google",
			clientId: "783577748341-0ral1ci40fmrdn87u23lubvcbok0j0de.apps.googleusercontent.com",
			secret: "IffJHL8WyoITbO_5lz9yT2Kr"
		});

		//If there's no questions entered on initial load, then set up some sample q's
		if (Questions.find().count() === 0) {
			var qs = ["Sample Title","Sample Title 2"];
			var ds = [
						"This is a sample description of a question. Here is where the question goes.",
						"This is a sample description of a question. Here is where the question goes.",
					];
		
			for (var i = 0; i < qs.length; i++) {
				Questions.insert({q: qs[i], desc:ds[i], score: Math.floor(Random.fraction()*10)*5});
			}
		}
	});
}
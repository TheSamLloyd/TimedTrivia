//questions array set up as follows:
//[[question text], [correct answer, incorrect answer 1, incorrect answer 2, incorrect answer 3]]
var oQuestions=
	[
	["What band was formed by the surviving members of Joy Division after the death of lead singer Ian Curtis?",
		["New Order","Psychedelic Furs","A Flock of Seagulls","The Smiths"]],
	["What 1984 album was released alongside a feature film of the same name, starring the artist?",
		["Purple Rain","Private Dancer","Make it Big","Like A Virgin"]],
	["What instrument plays the iconic hook in Wham!'s \"Careless Whisper?\"",
		["Saxophone","Guitar","Violin","Flute"]],
	["Belinda Carlisle, known for her solo single 'Heaven is a Place on Earth', rose to fame as the lead singer of what band?",
		["The Go-Gos","Blondie","The B-52s","Tears for Fears"]],
	['REM teamed up with what fellow Athens, GA band for their song "Shiny Happy People"?',
		["The B-52s","Men Without Hats","Duran Duran","Prince & The Revolution"]],
	["What Talking Heads song alleges that \"this ain't no party / this ain't no disco / this ain't no foolin' around\"?",
		["Life During Wartime","Burning Down The House","Psycho Killer","Found a Job (Stop Making Sense)"]],
	["In \"Cloudbusting\", Kate Bush hides what object in a garden?",
		["A yo-yo","A knife","A letter","A necklace"]],
	["Mark Mothersbaugh fronted which band, known for their iconic headgear?",
		["Devo","Pantera","The Cars","REM"]],
	["The band Depeche Mode took its name from a french phrase meaning what?",
		["Rapid Fashion","First Kiss","Alternate Path","Death Wish"]],
	["\"Heart of Glass\", arguably the band's most successful single, appeared on what Blondie album?",
		["Parallel Lines","Autoamerican","Eat To The Beat","The Hounds of Love"]]
	];
//function to decide what order the answers appear in
//source at https://stackoverflow.com/a/37580979/8994008
function permute(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  var index=Math.floor(Math.random()*result.length)
  return result[index];
}
var questions=permute(oQuestions);
var score=[]
var correct;
var qIndex=0;
function start(){
	//find elements with the 'start' class and hide them from the page
	$(".start-true").hide();
	$(".start-false").show();
	//put the first question up and start the timer
	dispQuestion(qIndex);
}
function results(){
	//remove "quiz" elements
 	$(".buttons, ol, #timer-text").hide();
 	//get total score
	var total=0;
	for (var i=0;i<questions.length;i++){
		total+=score[i];
	}
	$("#question-text").text("Your score was "+total+" out of "+questions.length+".")
	//show an appropriate message
	$("#status-text").removeClass("alert-success alert-danger").addClass("alert-primary").text(grade(total));
	//show them which questions they got right and which they got wrong
	var qList = $("<ol>");
	for (var i=0;i<questions.length;i++){
		if (score[i]){
			qList.append($("<li>").html("<i class=\"far fa-check-circle display-5 correct\"></i>"))
		}
		else{
			qList.append($("<li>").html("<i class=\"far fa-times-circle display-5 incorrect\"></i>"))
		}
	}
	$("#question-list").append(qList);
	score=[];
	qIndex=0;
	$("#start-button").text("PLAY AGAIN").show();
}
function dispQuestion(qIndex){
	//function that handles most of the displaying questions
	if(qIndex<questions.length){
		$("li").removeClass("correct incorrect");
		$("#status-text").text("").removeClass("alert-success alert-danger");
		var docQuestion=$("#question-text");
		var docAnswers=$(".answer");
		var question=questions[qIndex][0];
		var answers=questions[qIndex][1];
		var order = permute([0,1,2,3])
		correct = order.indexOf(0);
		docQuestion.text(qIndex+1+": "+question);
		for (var i=0;i<answers.length;i++){
			$(docAnswers[i]).text(answers[order[i]]);
		}
		timer();
	}
	//detects if you've answered all questions
	else results();
}
$(".answerbutton").click(function(){
	//click listener for answer selection
	var selection=$(this).attr("answer");
	if (correct==selection){
		//a good thing happens
		$("#status-text").text("Correct!").addClass("alert-success")
		$("ol li:eq("+correct+")").addClass("correct");
		score.push(1);
		nextQ();
	}
	else{
		//a bad thing happens
		wrong(selection);
		nextQ();
	}
})
function timer(){
	//basic countdown functionality. sometimes gets finicky if you click thru too fast.
	var time=10;
	$("#timer").text(time);
	countdown=setInterval(function(){
		if (time>1){
			$("#timer").text(--time)
		}
		else{
			$("#timer").text(--time)
			clearInterval(countdown)
			wrong(4);
			nextQ();
		}
	},1000);
}
function wrong(selection){
	//highlights correct answer vs. your selection
	$("ol li:eq("+correct+")").addClass("correct");
	$("ol li:eq("+selection+")").addClass("incorrect");
	//tells you which one was right
	$("#status-text").addClass("alert-danger").text("Sorry! \n The answer was "+$("[answer="+correct+"]").text()+".");
	score.push(0);
}
//this function needed to be split out because i needed to be able 
//to call it from both the timeout and the answer selection functions
function nextQ(){
	clearInterval(countdown);
	var k = setTimeout(function(){
		dispQuestion(++qIndex);
	}, 1500);
}
function grade(tScore){
	//determine the score as a percentage and decide on an appropriate message.
	var max=questions.length;
	var response;
	var perc=Math.floor(100*tScore/max);
	if (perc==100){
		response = "Wow! You really know your stuff! Didn't I see you on MTV?"
	}
	else if (perc>=80){
		response = "Nice job! Get out the synthesizer and play yourself a victory tune!"
	}
	else if (perc>=50){
		response = "Alright! You're pretty clever, and with a little practice you may be a champion!"
	}
	else if (perc >=30){
		response = "Nice try! I bet you can try again and do even better."
	}
	else if (perc>0){
		response = "Statistically, you would have done better by guessing."
	}
	else {
		response = "You literally managed to get them all wrong. How did you do that?"
	}
	return response;

}
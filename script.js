var questions=
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
	console.log("you did bad!")
}
function dispQuestion(qIndex){
	if(qIndex<questions.length){
	console.log(score)
		$("#status-text").text("");
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
	else results();
}
function clear(){}
$(".answerbutton").click(function(){
	var selection=$(this).attr("answer");
	if (correct==selection){
		//a good thing happens
		$("#status-text").text("Correct!")
		score.push(1);
		nextQ();
	}
	else{
		//a bad thing happens
		wrong();
		nextQ();
	}
})
function timer(){
	var time=10;
	$("#timer").text(time);
	countdown=setInterval(function(){
		if (time>1){
			$("#timer").text(--time)
		}
		else{
			$("#timer").text(--time)
			wrong();
			nextQ();
		}
	},1000);
}
function wrong(){
	$("#status-text").text("Sorry! \n The answer was "+$("[answer="+correct+"]").text()+".");
	score.push(0);
}
function nextQ(){
	clearInterval(countdown);
	var k = setTimeout(function(){
		dispQuestion(++qIndex);
	}, 1500);
}
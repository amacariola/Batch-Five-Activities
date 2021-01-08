/***************************************************/
/*       Avion School Coding Activity no.3         */
/*    Creating a console Quiz program in JS        */
/*       Code by: Ace Macariola (Batch V)          */
/*     Github: https://github.com/amacariola       */
/***************************************************/

const questionnaires = [];
const choices = ["Cascading Style Sheet","Cascading Side Sheet"];
                ["<div>","<script>"];
                ["World Web Wide","World Wide Web"];
                ["http://","https://"];
                ["<img>","<div>"];
                ["Makes the website responsive","tags the image"];
                ["<a>","<br>"];
                ["<a href = your js file>","<script=your js file>"];
                ["<body>","<head>"];
                ["<span>","<body>"];
const answers = ['A','B','B','B','A','A','B','B','B','B'];

questionnaires[0] = "What does CSS stands for?";
questionnaires[1] = "Which one is a script tag?";
questionnaires[2] = "What does WWW stands for?";
questionnaires[3] = "Which is more secure?";
questionnaires[4] = "Whats the correct way to tag an image on an HTML page?";
questionnaires[5] = "What does <meta name = viewport content = width=device-width> do?";
questionnaires[6] = "Which is a break tag?";
questionnaires[7] = "How can you insert a Javascript file on a HTML file?";
questionnaires[8] = "This defines the head of the webpage";
questionnaires[9] = "This defines the body of the webpage";


/*************************************************/
/*        MAIN PROGRAM STARTS HERE               */
/*************************************************/

const numtoAlpha = (num) =>{
    if(num < 1 || num > 26 || typeof num !== 'number') {
        return -1;
    }
    const level = 64;
    return String.fromCharCode(num + level);
}

function Quiz() {
    this.questionnaires = questionnaires;
    this.choices = choices;
    this.Canswer = answers;
    this.UserAnswer = null;
    this.Rquestion = null;
    console.log('Enter Answer:');
    this.randomizer = function() {
        let random = this.questionnaires.length;
        return Math.floor(Math.random() * Math.floor(random));
    }
    this.RandomQuestion = function() {
        this.Rquestion = randomizer();
        let index;
        console.log(this.Rquestion + 1 + '.'+this.questionnaires[this.Rquestion]);
        for (index in this.choices[this.Rquestion]) {
            console.log(numtoAlpha(parseInt(index) + 1) + '.' + this.choices[this.Rquestion][index]);
        }
        this.UserAnswer = prompt('Enter the right answer');
        this.checkAns();
    }
    this.checkAns = function() {
        console.log('Your Answer:',this.UserAnswer.toUpperCase());
        if(this.UserAnswer.toUpperCase() === this.Canswer[this.Rquestion]) {
            console.log('Answer is correct');
            console.log('Press Enter to generate another question');
        }
        else {
            console.log('Answer is wrong!');
        }
        if(this.Canswer[this.Rquestion] === "A") {
            console.log('The correct answer is:' + this.Canswer[this.Rquestion] + this.choices[this.Rquestion][0]);
        }
        else if(this.Canswer[this.Rquestion] === "B") {
            console.log('The correct answer is:' + this.Canswer[this.Rquestion] + this.choices[this.Rquestion][1]);
        }
        console.log('Press Enter to continue');
    }
    this.RandomQuestion();
}

/*
rules
the game has 2 players , playing in rounds
each turns a player roll a dice as many times as he wish each result get assed to his score card
but if the player rolls a 1 , all his rounds score gets lost after that its the next plkayers turn
the player can choose to hold  which means that value will store in his score after that second player play the game 
winner is choose by reaching 100 points.*/

var scores, roundScore ,activePlayer,gamePlaying;
init();//function call


//event and eventlistener
document.querySelector(".btn-roll").addEventListener('click',function(){//this is for the rolling dice button
	if(gamePlaying)
		{
			//1.random number generation
			var dice=Math.floor(Math.random()*6)+1;
			//display the result
			var diceDom = document.querySelector('.dice');
			diceDom.style.display = 'block';//changing css property
			diceDom.src = 'images/dice-' + dice +'.png';//changing the image depends on the random number
			//update the round score if the rolles number was NOT a 1
			if (dice  > 1)//or dice!==1
			{
				//add score
				roundScore += dice;//or roundScore = roundScore+ dice;
				document.querySelector("#current-" + activePlayer).textContent = roundScore;
			}
			else
			{
			//next player:if dice =1 occures then change the player
		
			nextPlayer();//accessing the function function call
			}
		}
	
});

document.querySelector('.btn-hold').addEventListener('click',function(){//this is for the hold button
	if(gamePlaying)
	{
		//add current score to the global score
		scores[activePlayer] += roundScore;
	
		//update the ui
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	
	
		//check if player won the game
		if(scores[activePlayer] >= 100)
		{
			document.querySelector('#name-' +activePlayer).textContent = "Winner!";
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' +activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' +activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		}
		else
		{
			//next player
			nextPlayer();//accessing the function function call
		}
	}
});

//DRY principle: Don't Repeat Yourself
function nextPlayer(){
	if(activePlayer === 0)
			{
				activePlayer = 1;
				roundScore= 0;
				document.getElementById('current-0').textContent = 0;
				//this lines for the assigning and removing the css property to(from) the active class
				//type 1
				//document.querySelector('.player-1-panel').classList.add('active');
				//document.querySelector('.player-0-panel').classList.remove('active');
				//type 2 toggle function
				document.querySelector('.player-1-panel').classList.toggle('active');
				document.querySelector('.player-0-panel').classList.toggle('active');
				//when switch the player dice will dissappear
				
				//document.querySelector('.dice').style.display = 'none';
				
			}
		else
			{
			
				activePlayer = 0;
				roundScore = 0;
				document.getElementById('current-1').textContent = 0;

				//this lines for the assigning and removing the css property to(from) the active class
				//document.querySelector('.player-0-panel').classList.add('active');
				//document.querySelector('.player-1-panel').classList.remove('active');
				//type 2 toggle function
				document.querySelector('.player-0-panel').classList.toggle('active');
				document.querySelector('.player-1-panel').classList.toggle('active');

				//document.querySelector('.dice').style.display = 'none';
			}
}
 document.querySelector('.btn-new').addEventListener('click',init);//this is for the new button

//init function
function init()
{
	scores =[0,0];//score for each player and set 0 in beginning
	roundScore = 0;
	activePlayer=0;//which player is playying the game 0 is 1st player and 1 is for second player
	gamePlaying = true;

	document.querySelector('.dice').style.display='none';
	//for starting of the game everything is 0
	//here we are using getElementById for selecting content from html and textContent for changing the content
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';	
	document.getElementById('name-1').textContent = 'Player 2';	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}
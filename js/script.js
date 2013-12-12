$(document).ready(function(){

	var game={
		level: 1,
		turn: 0,
		active: false,
		handler: false,
		difficulty: 1,
		score: 0,
		shape: '.shape',
		genSequence: [],
		plaSequence: [],
		
		init: function(){
			if(this.handler === false){
				this.initPadHandler();
				this.handler=true;
			}
			this.resetGame();
	
		},

		initPadHandler: function(){

			that=this;

			$('.pad').on('mouseup',function(){

				if(that.active===true){

					var pad=parseInt($(this).attr('class').substr(9),10);
						
					that.flash($(this),1,300);

					that.playSound(pad);
					that.logPlayerSequence(pad);

				}
			});

			this.handlers=true;

		},

		resetGame: function(){

			this.genSequence.length=0;
			this.plaSequence.length=0;
			this.pos=0;
			this.turn=0;
			this.active=true;

			this.randomizePad(this.level);

			this.displaySequence();

		},

		flash: function(element, times, speed){

			var that = this;

			if(times > 0){
				element.stop().animate({opacity: '1'}, {
					duration: 50,
					complete: function(){
					element.stop().animate({opacity: '0.6'}, 200);
					}
				});

			}

			if (times > 0) {
				setTimeout(function () {
					that.flash(element, times, speed);
				}, speed);
				times -= 1;
			}
		},

		playSound: function(clip){

			var sound= $('.sound'+clip)[0];
			sound.currentTime=0;
			sound.play();


		},

		randomizePad: function(passes){

			for(i=0;i<passes;i++){
				
				this.genSequence.push(Math.floor(Math.random() * 4) + 1);
			}
		},

		logPlayerSequence: function(pad){

			this.plaSequence.push(pad);
			this.checkSequence(pad);
			
		
		},

		checkSequence: function(pad){

			that=this;

			if(pad !== this.genSequence[this.turn]){
					
					this.inccorectSequence();

				}else{
					this.keepScore();
					this.turn++;

				}

			if(this.turn === this.genSequence.length){
				
				this.level++;
				this.displayLevel();
				this.active=false;
				setTimeout(function(){
					that.resetGame();
				},1000);
			}
		},

		displaySequence: function(){
			
			var that=this;

			$.each(this.genSequence, function(index, val) {
				setTimeout(function(){
					that.flash($(that.shape+val),1,300);

					that.playSound(val);

				},500*index*that.difficulty);
			});
		},

		displayLevel: function(){
			
			$('.level h2').text('Level: '+this.level);

		},

		displayScore: function(){
			$('.score h2').text('Score: '+this.score);
		},

		keepScore: function(){
			
			var multiplier=0;

			switch(this.difficulty)
			{
				case '2':
					multiplier=1;
					break;
				
				case '1':
					multiplier=2;
					break;

				case '0.5':
					multiplier = 3;
					break;

				case '0.3':
					multiplier = 4;
					break;
			}

			this.score += (1 * multiplier);

			this.displayScore();
		},

		inccorectSequence: function(){

			this.level=1;
			this.score=0;
			this.active=false;
			this.displayLevel();
			this.displayScore();

			this.flash($(this.shape+this.genSequence[this.turn]),6,300);
			$('.start').show();
			$('.difficulty').show();

			

		}

	};

	$('.start').on('mouseup', function(){
		$(this).hide();
		game.difficulty = $('input[name=difficulty]:checked').val();
		$('.difficulty').hide();
		game.init();


	});

	
});


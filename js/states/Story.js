var Merge = Merge || {};

Merge.StoryState = {
    create: function ()
    {
        //Background
        this.background = this.add.sprite(0, 0, 'storyBackground');
        //Start button
        this.start = this.add.button(700, 520, 'start', function()
        {
            //If initial background transition to first instruction
            if(this.background.key === 'storyBackground')
            {
                this.background.loadTexture('instructions');
                this.start.loadTexture('continue');
            }
            //If first instruction transition to second instruction
            else if(this.background.key === 'instructions')
            {
                this.background.loadTexture('instructions2');
                this.start.loadTexture('yes');
            }
            //If second instruction transition to game
            else
            {
                //Add game background below this background
                this.ocean = this.add.sprite(0, 640, 'background');
                //Move this background up
                this.add.tween(this.background).to({y: -640}, 3500, "Linear", true);
                //Move the game screen to top
                this.lastTween = this.add.tween(this.ocean).to({y: 0}, 3500, "Linear", true);
                //Bubble effect
                let delay = 0;
                for (var i = 0; i < 40; i++)
                {
                    var sprite = this.add.sprite(-100 + (this.world.randomX), 700, 'bubble');
                    sprite.scale.set(this.rnd.realInRange(0.1, 0.6));
                    var speed = this.rnd.between(2000, 4000);
                    this.add.tween(sprite).to({ y: -600 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);
                    delay += 50;
                }
                //Once screen is set comtinue to game
                this.lastTween.onComplete.add(function()
                {
                    this.game.state.start('Game');
                }, this);
            }
        }, this);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
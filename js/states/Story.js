var Merge = Merge || {};

Merge.StoryState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'storyBackground');
        this.start = this.add.button(700, 520, 'start', function()
        {
            if(this.background.key === 'storyBackground')
            {
                this.background.loadTexture('instructions');
                this.start.loadTexture('continue');
            }
            else if(this.background.key === 'instructions')
            {
                this.background.loadTexture('instructions2');
                this.start.loadTexture('yes');
            }
            else
            {
                this.ocean = this.add.sprite(0, 640, 'background');
                this.add.tween(this.background).to({y: -640}, 6000, "Linear", true);
                this.lastTween = this.add.tween(this.ocean).to({y: 0}, 6000, "Linear", true);
                let delay = 0;
                for (var i = 0; i < 40; i++)
                {
                    var sprite = this.add.sprite(-100 + (this.world.randomX), 700, 'bubble');

                    sprite.scale.set(this.rnd.realInRange(0.1, 0.6));

                    var speed = this.rnd.between(6000, 8000);

                    this.add.tween(sprite).to({ y: -600 }, speed, Phaser.Easing.Sinusoidal.InOut, true, delay, 1000, false);

                    delay += 50;
                }
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
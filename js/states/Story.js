var Merge = Merge || {};

Merge.StoryState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'storyBackground');
        this.start = this.add.button(630, 520, 'start', function()
        {
            if(this.background.key === 'storyBackground')
            {
                this.background.loadTexture('instructions');
            }
            else
            {
                this.ocean = this.add.sprite(0, 640, 'background');
                this.add.tween(this.background).to({y: -640}, 2000, "Linear", true);
                this.lastTween = this.add.tween(this.ocean).to({y: 0}, 2000, "Linear", true);
                this.lastTween.onComplete.add(function()
                {
                    this.game.state.start('Game');
                }, this);
            }
        }, this);
        this.start.scale.setTo(0.7, 0.7);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
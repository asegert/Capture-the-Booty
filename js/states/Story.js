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
                this.game.state.start('Game');
            }
        }, this);
        this.start.scale.setTo(0.7, 0.7);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
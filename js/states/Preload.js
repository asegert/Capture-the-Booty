var Merge = Merge || {};

Merge.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        this.load.image('background', 'assets/images/background_merge.png');
        this.load.image('storyBackground', 'assets/images/main.png');
        this.load.image('instructions', 'assets/images/instructions.png');
        this.load.image('instructions2', 'assets/images/instructions2.png');
        this.load.image('endBackground', 'assets/images/end.png');
        this.load.image('start', 'assets/images/start.png');
        this.load.image('inventoryItem', 'assets/images/inventoryItem.png');
        
        this.load.image('coinG', 'assets/images/coinG.png');
        this.load.image('coinS', 'assets/images/coinS.png');       
        this.load.image('coinStackG', 'assets/images/coinStackG.png');
        this.load.image('coinStackS', 'assets/images/coinStackS.png');       
        this.load.image('gold', 'assets/images/gold.png');
        this.load.image('chest', 'assets/images/chest.png');      
        this.load.image('amethyst', 'assets/images/amethyst.png');
        this.load.image('citrine', 'assets/images/citrine.png');
        this.load.image('emerald', 'assets/images/emerald.png');
        this.load.image('garnet', 'assets/images/garnet.png');
        this.load.image('onyx', 'assets/images/onyx.png');
        this.load.image('ruby', 'assets/images/ruby.png');
        this.load.image('sapphire', 'assets/images/sapphire.png');
        this.load.image('topaz', 'assets/images/topaz.png');      
        this.load.image('diamond', 'assets/images/diamond.png');
        
        this.load.image('coinGLarge', 'assets/images/coinGLarge.png');
        this.load.image('coinSLarge', 'assets/images/coinSLarge.png');       
        this.load.image('coinStackGLarge', 'assets/images/coinStackGLarge.png');
        this.load.image('coinStackSLarge', 'assets/images/coinStackSLarge.png');       
        this.load.image('goldLarge', 'assets/images/goldLarge.png');
        this.load.image('chestLarge', 'assets/images/chestLarge.png');      
        this.load.image('amethystLarge', 'assets/images/amethystLarge.png');
        this.load.image('citrineLarge', 'assets/images/citrineLarge.png');
        this.load.image('emeraldLarge', 'assets/images/emeraldLarge.png');
        this.load.image('garnetLarge', 'assets/images/garnetLarge.png');
        this.load.image('onyxLarge', 'assets/images/onyxLarge.png');
        this.load.image('rubyLarge', 'assets/images/rubyLarge.png');
        this.load.image('sapphireLarge', 'assets/images/sapphireLarge.png');
        this.load.image('topazLarge', 'assets/images/topazLarge.png');      
        this.load.image('diamondLarge', 'assets/images/diamondLarge.png');
        
        this.load.image('board', 'assets/images/board.png');
        
        this.load.text('mergeData', 'assets/data/mergeData.json');
    },
    create: function ()
    {
        this.state.start('Story');
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
var Merge = Merge || {};

Merge.PreloadState = {
    preload: function ()
    {
        var preloadBG = this.add.sprite((this.world.width - 580) * 0.5, (this.world.height + 150) * 0.5, 'loading-background');
        var preloadProgress = this.add.sprite((this.world.width - 540) * 0.5, (this.world.height + 170) * 0.5, 'loading-progress');
        this.load.setPreloadSprite(preloadProgress);

        //Scenes
        this.load.image('background', 'assets/images/scenes/background_merge.png');
        this.load.image('storyBackground', 'assets/images/scenes/main.png');
        this.load.image('instructions', 'assets/images/scenes/instructions.png');
        this.load.image('instructions2', 'assets/images/scenes/instructions2.png');
        this.load.image('endBackground', 'assets/images/scenes/end.png');
        this.load.image('hintInfo', 'assets/images/scenes/hint.png');
        this.load.image('board', 'assets/images/scenes/board.png');
        //Buttons
        this.load.image('start', 'assets/images/buttons/startButton.png');
        this.load.image('yes', 'assets/images/buttons/yesButton.png');
        this.load.image('hint', 'assets/images/buttons/hintButton.png');
        this.load.image('continue', 'assets/images/buttons/continueButton.png');
        //Gems
        this.load.image('coinG', 'assets/images/treasures/coinG.png');
        this.load.image('coinS', 'assets/images/treasures/coinS.png');       
        this.load.image('coinStackG', 'assets/images/treasures/coinStackG.png');
        this.load.image('coinStackS', 'assets/images/treasures/coinStackS.png');       
        this.load.image('gold', 'assets/images/treasures/gold.png');
        this.load.image('chest', 'assets/images/treasures/chest.png');      
        this.load.image('amethyst', 'assets/images/treasures/amethyst.png');
        this.load.image('citrine', 'assets/images/treasures/citrine.png');
        this.load.image('emerald', 'assets/images/treasures/emerald.png');
        this.load.image('garnet', 'assets/images/treasures/garnet.png');
        this.load.image('onyx', 'assets/images/treasures/onyx.png');
        this.load.image('ruby', 'assets/images/treasures/ruby.png');
        this.load.image('sapphire', 'assets/images/treasures/sapphire.png');
        this.load.image('topaz', 'assets/images/treasures/topaz.png');      
        this.load.image('diamond', 'assets/images/treasures/diamond.png');
        //Large Version
        this.load.image('coinGLarge', 'assets/images/treasures/coinGLarge.png');
        this.load.image('coinSLarge', 'assets/images/treasures/coinSLarge.png');       
        this.load.image('coinStackGLarge', 'assets/images/treasures/coinStackGLarge.png');
        this.load.image('coinStackSLarge', 'assets/images/treasures/coinStackSLarge.png');       
        this.load.image('goldLarge', 'assets/images/treasures/goldLarge.png');
        this.load.image('chestLarge', 'assets/images/treasures/chestLarge.png');      
        this.load.image('amethystLarge', 'assets/images/treasures/amethystLarge.png');
        this.load.image('citrineLarge', 'assets/images/treasures/citrineLarge.png');
        this.load.image('emeraldLarge', 'assets/images/treasures/emeraldLarge.png');
        this.load.image('garnetLarge', 'assets/images/treasures/garnetLarge.png');
        this.load.image('onyxLarge', 'assets/images/treasures/onyxLarge.png');
        this.load.image('rubyLarge', 'assets/images/treasures/rubyLarge.png');
        this.load.image('sapphireLarge', 'assets/images/treasures/sapphireLarge.png');
        this.load.image('topazLarge', 'assets/images/treasures/topazLarge.png');      
        this.load.image('diamondLarge', 'assets/images/treasures/diamondLarge.png');
        //Other
        this.load.image('inventoryItem', 'assets/images/inventoryItem.png');
        this.load.image('bubble', 'assets/images/bubble.png');
        this.load.image('gemPile', 'assets/images/gem_pile.png');
        this.load.image('coupon', 'assets/images/Merge_coupon.jpg');
        
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
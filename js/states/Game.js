var Merge = Merge || {};

Merge.GameState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'background');
        this.board = [
                        ['coinG', 'topaz', 'citrine', 'coinS', 'emerald'], 
                        ['gold', 'emerald', 'coinS', 'onyx', 'topaz'], 
                        ['coinStackG', 'amethyst', 'chest', 'ruby', 'chest'], 
                        ['garnet', 'chest', 'sapphire', 'coinStackS', 'garnet'],
                        ['citrine', 'amethyst', 'ruby', 'onyx', 'sapphire']
                     ];
        this.myItems = ['coinG', 'coinG', 'coinS', 'coinStackG', 'coinStackS', 'chest', 'chest', 'gold'];
         //coinG, coinS, coinStackG, coinStackS, chest, gold, citrine, topaz, ruby, sapphire, emerald, amethyst, garnet, onyx, diamond
        this.itemQuantity = [2, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.enlarged = ['coinGLarge', 'coinSLarge', 'coinStackGLarge', 'coinStackSLarge', 'chestLarge', 'goldLarge', 'citrineLarge', 'topazLarge', 'rubyLarge', 'sapphireLarge', 'emeraldLarge', 'amethystLarge', 'garnetLarge', 'onyxLarge', 'diamondLarge'];
        this.names = ['Gold Coin', 'SilverCoin', 'Stack of Gold Coins', 'Stack of SilverCoins', 'Treasure Chest', 'Gold Bar', 'Citrine', 'Topaz Gem', 'Ruby', 'Sapphire', 'Emerald', 'Amethyst', 'Garnet', 'Onyx Gem', 'Diamond'];//articles??
        
        this.board = this.createItems(this.board);
        this.myItems = this.createItems(this.myItems);
        this.createBoard(this.board);
        this.displayInventory(this.myItems);
        console.log(this.myItems);
        this.add.button(500, 400, 'onyx', function()
        {
            console.log(this.checkOver());
            this.endRound(this.getHighest());
        }, this);
    },
    createItems(array)
    {
        let retArray = new Array();
        
        for(let i=0, len=array.length; i<len; i++)
        {
            //If it is a 2D array
            if(Array.isArray(array[i]))
            {
                retArray[i] = new Array();
                for(let j=0, len2=array[i].length; j<len2; j++)
                {
                    let Item = new Merge.Item(this);
                    retArray[i][j] = Item.init(array[i][j]);
                }
            }
            else
            {
                let Item = new Merge.Item(this);
                retArray[i] = Item.init(array[i]);
            }
        }
        return retArray;
    },
    createBoard(board)
    {
        for(let i=0, len1=board.length; i<len1; i++)
        {
            for(let j=0, len2=board[i].length; j<len2; j++)
            {
                board[i][j].setSprite(35 * i, 35 * j, board[i][j].texture);
            }
        }
    },
    displayInventory(items)
    {
        for(let i=0, len=items.length; i<len; i++)
        {
            items[i].setSprite(500, 35 * i, items[i].texture);
        }
    },
    addToInventory(newItem)
    {
        if(typeof(newItem) === 'string')
        {
            let Item = new Merge.Item(this);
            this.myItems[this.myItems.length] = Item.init(newItem);
            this.myItems[this.myItems.length-1].made = true;
        }
        else
        {
            this.myItems[this.myItems.length] = newItem;
        }
        this.displayInventory(this.myItems);
    },
    removeBoardItem(item)
    {
        for(let i=0, len1 = this.board.length; i<len1; i++)
        {
            for(let j=0, len2 = this.board[i].length; j<len2; j++)
            {
                if(this.board[i][j] === item)
                {
                    this.board[i][j].sprite.destroy();
                    this.board[i][j] = undefined;
                }
            }
        }
    },
    checkOver()
    {    
        for(let i=0, len=this.itemQuantity.length; i<len; i++)
        {
            if(this.itemQuantity[i] > 1)
            {
                return false;
            }
        }
        return true;
    },
    getHighest()
    {
        let topIndex = -1;
        for(let i=0, len=this.myItems.length; i<len; i++)
        {
            if(this.myItems[i].index > topIndex && this.myItems[i].made)
            {
                topIndex = this.myItems[i].index;
            }
        }
        console.log(topIndex);
        return topIndex;
    },
    endRound(index)
    {
        emitter = this.add.emitter(960, -100, 2000);
        emitter.makeParticles(this.enlarged, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        emitter.scale.setTo(0.5, 0.5);
        emitter.width = 960;
        emitter.start(true, 5000, null, 200);
        
        this.time.events.add(Phaser.Timer.SECOND * 5, function()
        {
            this.tempText=this.add.text(0, 0, `You won a ${this.names[index]}`);
            //if diamond end???
            this.tempSprite = this.add.sprite(this.world.centerX, this.world.centerY, this.enlarged[index]);
            this.add.tween(this.tempSprite.scale).to({x: 0.35, y: 0.35}, 2000, "Linear", true);
            this.add.tween(this.tempSprite).to({x: 500, y: 0}, 2000, "Linear", true);
        }, this);
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
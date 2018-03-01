var Merge = Merge || {};

Merge.GameState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'background');
        this.board = [
                        ['coinG', 'topaz', 'citrine', 'coinS'], 
                        ['gold', 'emerald', 'coinS', 'onyx'], 
                        ['coinStackG', 'amethyst', 'diamond', 'ruby'], 
                        ['garnet', 'chest', 'sapphire', 'coinStackS']
                     ];
        this.myItems = ['coinG', 'coinG', 'coinS', 'coinStackG', 'coinStackS', 'chest', 'chest', 'gold'];
         //coinG, coinS, coinStackG, coinStackS, chest, gold, citrine, topaz, ruby, sapphire, emerald, amethyst, garnet, onyx, diamond
        this.itemQuantity = [2, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        
        this.board = this.createItems(this.board);
        this.myItems = this.createItems(this.myItems);
        this.createBoard(this.board);
        this.displayInventory(this.myItems);
        console.log(this.myItems);
        this.add.button(500, 400, 'onyx', function()
        {
            console.log(this.checkOver());
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
        let Item = new Merge.Item(this);
        this.myItems[this.myItems.length] = Item.init(newItem);
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
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
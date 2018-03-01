var Merge = Merge || {};

Merge.GameState = {
    create: function ()
    {
        this.board = [
                        ['coinG', 'topaz', 'citrine', 'coinS'], 
                        ['gold', 'onyx', 'coinS', 'onyx'], 
                        ['coinStackG', 'chest', 'diamond', 'topaz'], 
                        ['garnet', 'chest', 'sapphire', 'coinStackS']
                     ];
        this.myItems = ['coinG', 'coinS', 'coinG'];
        
        this.board = this.createItems(this.board);
        this.myItems = this.createItems(this.myItems);
        this.createBoard(this.board);
        this.displayInventory(this.myItems);
        console.log(this.myItems);
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
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
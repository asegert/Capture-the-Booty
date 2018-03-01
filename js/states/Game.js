var GameName = GameName || {};

GameName.GameState = {
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
    },
    createItems(array)
    {
        for(let i=0, len=array.length; i<len; i++)
        {
            //If it is a 2D array
            if(Array.isArray(array[i]))
            {
                for(let j=0, len2=array[i].length; j<len2; j++)
                {
                    let Item = new Merge.Item(this);
                    array[i][j] = Item.init(array[i][j]);
                }
            }
            else
            {
                let Item = new Merge.Item(this);
                array[i] = Item.init(array[i]);
            }
        }
        return array;
    },
    createBoard(board)
    {
        for(let i=0, len1=board.length; i<len1; i++)
        {
            for(let j=0, len2=board[i].length; j<len2; j++)
            {
                board[i][j] = board[i][j].setSprite(35 * i, 35 * j, board[i][j].texture);
            }
        }
        return board;
    },
    update: function ()
    {
        
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
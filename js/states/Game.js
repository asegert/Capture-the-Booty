var Merge = Merge || {};

Merge.GameState = {
    create: function ()
    {
        this.background = this.add.sprite(0, 0, 'background');
        this.boardBack = this.add.sprite(150, 100, 'board');
        this.boardBack.alpha = 0.4;
        this.allData = JSON.parse(this.game.cache.getText('mergeData'));
        this.board = this.allData.Rounds[0].Board;
        this.myItems = this.allData.Rounds[0].Inventory;
        this.addSpace = true;
        
        this.board = this.createItems(this.board, false);
        this.myItems = this.createItems(this.myItems, true);
        this.createBoard(this.board);
        this.displayInventory(this.myItems);
        console.log(this.myItems);
        this.add.button(750, 400, 'onyx', function()
        {
            console.log(this.checkOver());
            this.endRound(this.getHighest());
        }, this);
    },
    createItems(array, updateQuantity)
    {
        console.log(updateQuantity);
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
                    retArray[i][j] = Item.init(this.allData.Items[array[i][j]]);
                    if(updateQuantity)
                    {
                        retArray[i][j].updateQuantity();
                    }
                }
            }
            else
            {
                let Item = new Merge.Item(this);
                retArray[i] = Item.init(this.allData.Items[array[i]]);
                if(updateQuantity)
                {
                    retArray[i].updateQuantity();
                }
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
                board[i][j].setSprite((35 * i)+200, (35 * j)+150, board[i][j].texture, false);
            }
        }
    },
    displayInventory(items)
    {
        for(let i=0, len=items.length; i<len; i++)
        {
            items[i].setSprite(750, 35 * i, items[i].texture, true);
        }
    },
    addToInventory(newItem, made)
    {
        if(made)
        {
            let Item = new Merge.Item(this);
            this.myItems[this.myItems.length] = Item.init(newItem);
            this.myItems[this.myItems.length-1].made = true;
        }
        else
        {
            this.myItems[this.myItems.length] = newItem;
        }
        this.addSpace = false;
        if(this.myItems.length < this.allData.Rounds[0].InventoryMax)
        {
            this.addSpace = true;
        }
            
        this.allData.Items[this.myItems[this.myItems.length-1].index].quantity++;
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
        for(let i=0, len=this.allData.Items.length; i<len; i++)
        {
            if(this.allData.Items[i].quantity > 1)
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
        let emitArray = new Array();
        for(let i=0, len = this.allData.Items.length; i<len; i++)
        {
            emitArray[emitArray.length] = this.allData.Items[i].enlarged;
        }
        emitter = this.add.emitter(960, -100, 2000);
        emitter.makeParticles(emitArray, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        emitter.scale.setTo(0.5, 0.5);
        emitter.width = 960;
        emitter.start(true, 5000, null, 200);
        
        this.time.events.add(Phaser.Timer.SECOND * 5, function()
        {
            this.tempText=this.add.text(0, 0, `You won a ${this.allData.Items[index].name}`);
            //if diamond end???
            this.tempSprite = this.add.sprite(this.world.centerX, this.world.centerY, this.allData.Items[index].enlarged);
            this.add.tween(this.tempSprite.scale).to({x: 0.35, y: 0.35}, 2000, "Linear", true);
            this.add.tween(this.tempSprite).to({x: 750, y: 0}, 2000, "Linear", true);
        }, this);
    },
    inventoryCheck()
    {
        for(let i=0, len=this.allData.Items.length; i<len; i++)
        {
            if(this.allData.Items[i].quantity > 2 && i != this.allData.Items.length-1)
            {
                let max = 3;
                for(let j=0, len2=this.myItems.length; j<len2; j++)
                {
                    if(this.myItems[j].index == i && max==3)
                    {
                        max--;
                        this.addToInventory(this.myItems[j].next, true);
                        this.allData.Items[i].quantity--;
                        this.myItems[j].sprite.destroy();
                        this.myItems.splice(j, 1);
                        j--;
                    }
                    else if(this.myItems[j].index == i && max>0)
                    {
                        max--;
                        this.allData.Items[i].quantity--;
                        this.myItems[j].sprite.destroy();
                        this.myItems.splice(j, 1);
                        j--;
                        len2--;
                    }
                }
            }
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
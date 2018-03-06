var Merge = Merge || {};

Merge.GameState = {
    create: function ()
    {        
        this.background = this.add.sprite(0, 0, 'background');
        this.boardBack = this.add.sprite(150, 100, 'board');
        this.boardBack.alpha = 0.4;
        this.allData = JSON.parse(this.game.cache.getText('mergeData'));
        this.currentRound = 0;
        this.totalRounds = this.allData.Rounds.length;
        this.board = this.allData.Rounds[this.currentRound].Board;
        this.myItems = this.allData.Rounds[this.currentRound].Inventory;
        this.addSpace = true;
        this.ending = false;
        this.inventoryObjects = this.add.group();
        
        this.board = this.createItems(this.board, false);
        this.myItems = this.createItems(this.myItems, true);
        this.createBoard(this.board);
        this.createInventory();
        this.displayInventory(this.myItems);
        let himt = this.add.button(0, 0, 'hint', function()
        {
            this.hintMap = this.add.sprite(80, 50, 'hintInfo');
            this.continue = this.add.button(670, 440, 'continue', function()
            {
                this.hintMap.destroy();
                this.continue.destroy();
            }, this);
        }, this);
        himt.scale.setTo(0.5, 0.5);
        this.add.button(750, 400, 'onyx', function()
        {
            this.endRound(this.getHighest());
        }, this);
    },
    createItems(array, updateQuantity)
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
    createInventory()
    {
        for(let i=0, len=this.allData.Rounds[this.currentRound].InventoryMax; i<len; i++)
        {
            this.inventoryObjects.add(this.add.sprite(780, 80 * i, 'inventoryItem'));
        }
    },
    displayInventory(items)
    {
        for(let i=0, len=items.length; i<len; i++)
        {
            items[i].setSprite(800, (80 * i) + 30, items[i].texture, true);
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
        if(this.myItems.length < this.allData.Rounds[this.currentRound].InventoryMax)
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
            //Checks that an item was made
            if(index > 0)
            {
                //Checks which items were created and places them into an array
                let madeItems = new Array();
                for(let i=0, len=this.myItems.length; i<len; i++)
                {
                    if(this.myItems[i].made)
                    {
                        madeItems[madeItems.length] = this.myItems[i];
                    }
                }
                console.log(madeItems);
                //Any items in inventory and created by the player are now 'won'
                let text="";
                let gems = this.add.group();
                for(let i=0, len=madeItems.length; i<len; i++)
                {
                    if(i===len-1)
                    {
                        text+=" and";
                    }
                    if(i!=0)
                    {
                        text+=", ";
                    }
                    text+=` ${madeItems[i].getName(true)}`;
                    if(1%2===0)
                    {
                        gems.add(this.add.sprite(this.world.centerX + 50 + (50 * i), this.world.centerY, madeItems[i].enlarged));
                    }
                    else
                    {
                        gems.add(this.add.sprite(this.world.centerX + 50 - (50 * i), this.world.centerY, madeItems[i].enlarged));
                    }
                }
                let pileSprite = this.add.sprite(this.world.centerX, this.world.centerY + 10, 'gemPile');
                pileSprite.anchor.setTo(0.5, 0.5);
                this.world.bringToTop(gems);
                
                this.tempText=this.add.text(0, 0, `You won ${text}`);
                this.tempText.scale.setTo(0.5, 0.5);
                this.textTween = this.add.tween(this.tempText.scale).to({x: 1, y: 1}, 2000, "Linear", true);
                this.textTween.onComplete.add(function()
                {
                    pileSprite.destroy();
                    gems.destroy();
                    for(let i=0, len = this.myItems.length; i<len; i++)
                    {
                        this.myItems[i].sprite.destroy();
                        this.myItems.splice(i, i+1);
                        i--;
                        len--;
                    }
                    for(let i=0, len = this.allData.Items.length; i<len; i++)
                    {
                        this.allData.Items[i].quantity = 0;
                    }
                    this.addSpace = true;
                    this.currentRound++;
                    //Checks that the item made was not a diamond
                    if(index < this.allData.Items.length-1)
                    {
                        this.tempSprite = this.add.sprite(this.world.centerX, this.world.centerY, this.allData.Items[index].enlarged);
                        this.add.tween(this.tempSprite.scale).to({x: 0.35, y: 0.35}, 2000, "Linear", true);
                        let lastTween = this.add.tween(this.tempSprite).to({x: 800, y: 30}, 2000, "Linear", true);
                        lastTween.onComplete.add(function()
                        {
                            if(this.currentRound >= this.totalRounds)
                            {
                                this.goToEnd();
                            }
                            else
                            {
                                this.nextRound(index);
                            }
                        }, this);
                    }
                    else
                    {
                        if(this.currentRound >= this.totalRounds)
                        {
                            this.goToEnd();
                        }
                        else
                        {
                            this.nextRound(0);
                        }
                    }
                }, this);
            }
            else 
            {
                for(let i=0, len = this.myItems.length; i<len; i++)
                {
                    this.myItems[i].sprite.destroy();
                    this.myItems.splice(i, i+1);
                    i--;
                    len--;
                }
                for(let i=0, len = this.allData.Items.length; i<len; i++)
                {
                    this.allData.Items[i].quantity = 0;
                }
                this.addSpace = true;
                this.currentRound++;
                if(this.currentRound >= this.totalRounds)
                {
                    this.goToEnd();
                }
                else
                {
                    this.nextRound(0);
                }
            }
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
    nextRound(newInvItem)
    {
        if(this.tempText != undefined)
        {
            this.tempText.destroy();
        }
        this.ending = false;
        for(let i=0, len1 = this.board.length; i<len1; i++)
        {
            for(let j=0, len2=this.board[i].length; j<len2; j++)
            {
                if(this.board[i][j]!=undefined)
                {
                    this.board[i][j].sprite.destroy();
                    this.board[i][j] = null;
                }
            }
        }
        
        this.board = this.createItems(this.allData.Rounds[this.currentRound].Board, false);
        this.myItems = this.createItems([newInvItem], true);
        this.createBoard(this.board);
        this.createInventory();
        this.displayInventory(this.myItems);
        this.inventoryObjects.forEach(function(obj)
        {
            obj.destroy();
        }, this);
        this.inventoryObjects.removeAll();
        this.createInventory();
    },
    goToEnd()
    {
        this.end = this.add.sprite(0, -640, 'endBackground');
        this.add.tween(this.background).to({y: 640}, 2000, "Linear", true);
        this.lastTween = this.add.tween(this.end).to({y: 0}, 2000, "Linear", true);
        this.lastTween.onComplete.add(function()
        {
            this.game.state.start('End');
        }, this);
    },
    update: function ()
    {
        if(!this.ending && !this.addSpace)
        {
            this.ending = true;
            this.inventoryCheck();
            if(this.myItems.length === this.allData.Rounds[this.currentRound].InventoryMax)
            {
                this.endRound(this.getHighest());
            }
        }
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
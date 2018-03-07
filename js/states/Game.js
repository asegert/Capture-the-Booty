var Merge = Merge || {};

Merge.GameState = {
    create: function ()
    {        
        //Background
        this.background = this.add.sprite(0, 0, 'background');
        //Pirate flag board
        this.boardBack = this.add.sprite(150, 100, 'board');
        this.boardBack.alpha = 0.4;
        //Data from JSON
        this.allData = JSON.parse(this.game.cache.getText('mergeData'));
        //Stores current round and max rounds
        this.currentRound = 0;
        this.totalRounds = this.allData.Rounds.length;
        //Stores the board array
        this.board = this.allData.Rounds[this.currentRound].Board;
        //Stores the inventory items
        this.myItems = this.allData.Rounds[this.currentRound].Inventory;
        //If there is more space to add to in the inventory
        this.addSpace = true;
        //If the game is auto ending
        this.ending = false;
        //Stores the inventory chests
        this.inventoryObjects = this.add.group();
        //Create the items for the board
        this.board = this.createItems(this.board, false);
        //Create the items for the inventory
        this.myItems = this.createItems(this.myItems, true);
        //Set up the board
        this.createBoard(this.board);
        //Create the inventory
        this.createInventory();
        //Display the inventory
        this.displayInventory(this.myItems);
        let hint = this.add.button(0, 0, 'hint', function()
        {
            Merge.Music.volume = 0.6;
            let laugh = this.add.audio('pirateLaugh');
            laugh.play();
            laugh.onStop.add(function()
            {
                Merge.Music.volume = 1;
            }, this);
            //Display the hint panel and a button to close it
            this.hintMap = this.add.sprite(80, 50, 'hintInfo');
            this.continue = this.add.button(670, 440, 'continue', function()
            {
                this.hintMap.destroy();
                this.continue.destroy();
            }, this);
        }, this);
        //Ends the game
        this.add.button(600, 500, 'endRound', function()
        {
            this.endRound(this.getHighest());
        }, this);
    },
    createItems(array, updateQuantity)
    {
        //Return Array
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
                    //If the quantity needs updated -> if it is an inventory item
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
        //Return the array of items
        return retArray;
    },
    createBoard(board)
    {
        //Create the sprites for the board
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
        //Create the chest sprites for the inventory
        for(let i=0, len=this.allData.Rounds[this.currentRound].InventoryMax; i<len; i++)
        {
            this.inventoryObjects.add(this.add.sprite(780, 80 * i, 'inventoryItem'));
        }
    },
    displayInventory(items)
    {
        //Create the sprites for the inventory items
        for(let i=0, len=items.length; i<len; i++)
        {
            items[i].setSprite(800, (80 * i) + 30, items[i].texture, true);
        }
    },
    addToInventory(newItem, made)
    {
        //If the item was create through a player combining items
        if(made)
        {
            //Create a new item
            let Item = new Merge.Item(this);
            //Add it to the inventory
            this.myItems[this.myItems.length] = Item.init(newItem);
            //Set made to true
            this.myItems[this.myItems.length-1].made = true;
        }
        else
        {
            //If it does not make a new item simply add the item to the inventory
            this.myItems[this.myItems.length] = newItem;
        }
        //It is not possible to add more unless space still exists in the inventory
        this.addSpace = false;
        if(this.myItems.length < this.allData.Rounds[this.currentRound].InventoryMax)
        {
            this.addSpace = true;
        }
        //Update the inventory quantity   
        this.allData.Items[this.myItems[this.myItems.length-1].index].quantity++;
        //Display the inventory with the new item
        this.displayInventory(this.myItems);
    },
    removeBoardItem(item)
    {
        //Find the item and remove the sprite and the data from the board
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
        //If there are no items in the inventory that can be combined to free up space return true
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
        //Find the highest item index in the inventory
        let topIndex = -1;
        for(let i=0, len=this.myItems.length; i<len; i++)
        {
            if(this.myItems[i].index > topIndex && this.myItems[i].made)
            {
                topIndex = this.myItems[i].index;
            }
        }
        return topIndex;
    },
    endRound(index)
    {
        //index == the highest index in the inventory
        let emitArray = new Array();
        //Create an emitter using the large images for all the treasures
        for(let i=0, len = this.allData.Items.length; i<len; i++)
        {
            emitArray[emitArray.length] = this.allData.Items[i].enlarged;
        }
        emitter = this.add.emitter(960, -100, 2000);
        emitter.makeParticles(emitArray, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        emitter.scale.setTo(0.5, 0.5);
        emitter.width = 960;
        emitter.start(true, 5000, null, 200);
        //Clear the board
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
        //Once emitter completes
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
                //Any items in inventory and created by the player are now 'won'
                let text="";
                let gems = this.add.group();
                for(let i=0, len=madeItems.length; i<len; i++)
                {
                    if(i===len-1 && i!=0)
                    {
                        text+=" and";
                    }
                    if(i!=0)
                    {
                        text+=",";
                    }
                    text+=` ${madeItems[i].getName(true)}`;
                    //Seperate the gems that are even/odd to make it look more evenly spaced
                    if(1%2===0)
                    {
                        gems.add(this.add.sprite(this.world.centerX + 50 + (50 * i), this.world.centerY, madeItems[i].enlarged));
                    }
                    else
                    {
                        gems.add(this.add.sprite(this.world.centerX + 50 - (50 * i), this.world.centerY, madeItems[i].enlarged));
                    }
                }
                //Show the gems
                let pileSprite = this.add.sprite(this.world.centerX, this.world.centerY + 10, 'gemPile');
                pileSprite.anchor.setTo(0.5, 0.5);
                this.world.bringToTop(gems);
                //Tween to show the text of the treasures that were won
                this.tempText=this.add.text(this.world.centerX, this.world.centerY, `You won${text}`, {fill: '#FF0000', font: '50px'});
                this.tempText.scale.setTo(0.5, 0.5);
                this.tempText.anchor.setTo(0.5, 0.5);
                this.textTween = this.add.tween(this.tempText.scale).to({x: 1, y: 1}, 2000, "Linear", true);
                this.textTween.onComplete.add(function()
                {
                    //Destroy the gem images
                    pileSprite.destroy();
                    gems.destroy();
                    //Clear the inventory
                    for(let i=0, len = this.myItems.length; i<len; i++)
                    {
                        this.myItems[i].sprite.destroy();
                        this.myItems.splice(i, i+1);
                        i--;
                        len--;
                    }
                    //Clear the item quantities
                    for(let i=0, len = this.allData.Items.length; i<len; i++)
                    {
                        this.allData.Items[i].quantity = 0;
                    }
                    //There is now space to fill
                    this.addSpace = true;
                    //The next round is beginning
                    this.currentRound++;
                    //Checks that the item made was not a diamond
                    if(index < this.allData.Items.length-1)
                    {
                        //If an item is to be added to the inventory for the next round add it via this tween
                        //Takes the largest treasure created
                        this.tempSprite = this.add.sprite(this.world.centerX, this.world.centerY, this.allData.Items[index].enlarged);
                        this.add.tween(this.tempSprite.scale).to({x: 0.35, y: 0.35}, 2000, "Linear", true);
                        let lastTween = this.add.tween(this.tempSprite).to({x: 800, y: 30}, 2000, "Linear", true);
                        lastTween.onComplete.add(function()
                        {
                            //If there are no more rounds end the game, otherwise start the next round
                            if(this.currentRound >= this.totalRounds)
                            {
                                this.goToEnd();
                            }
                            else
                            {
                                //Remove the temporary inventory image
                                this.tempSprite.destroy();
                                //Index is the next item to add to the inventory
                                this.nextRound(index);
                            }
                        }, this);
                    }
                    //If a diamond was made
                    else
                    {
                        if(this.currentRound >= this.totalRounds)
                        {
                            this.goToEnd();
                        }
                        else
                        {
                            //There is no item to add to inventory so add the lowest option
                            this.nextRound(0);
                        }
                    }
                }, this);
            }
            //If no items were created by the player
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
        //If the inventory has 3 of the same item the three will be removed and replaced with the upgraded item
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
        //NewInvItem is the inventory item that the round will start with
        //If there is a temporary text it will be removed
        if(this.tempText != undefined)
        {
            this.tempText.destroy();
        }
        //We are no longer in the process of ending
        this.ending = false;
        //Inititalize the new board
        this.board = this.createItems(this.allData.Rounds[this.currentRound].Board, false);
        //Initialize the new inventory
        this.myItems = this.createItems([newInvItem], true);
        //Create the new board
        this.createBoard(this.board);
        //Create the new Inventory
        this.createInventory();
        //Display the inventory
        this.displayInventory(this.myItems);
        //Remove the old chests and display the new ones
        this.inventoryObjects.forEach(function(obj)
        {
            obj.destroy();
        }, this);
        this.inventoryObjects.removeAll();
        this.createInventory();
    },
    goToEnd()
    {
        //Add the ending background above the current one
        this.end = this.add.sprite(0, -640, 'endBackground');
        this.add.tween(this.background).to({y: 640}, 5000, "Linear", true);
        this.lastTween = this.add.tween(this.end).to({y: 0}, 5000, "Linear", true);
        Merge.Music.volume = 0.6;
        let surf = this.add.audio('surfacing');
        surf.play();
        surf.onStop.add(function()
        {
            Merge.Music.volume = 1;
        }, this);
        //Bubble effect
        let delay = 0;
        for(var i = 0; i < 10; i++)
        {
            var sprite = this.add.sprite(-100 + (this.world.randomX), 0, 'bubble');
            sprite.scale.set(this.rnd.realInRange(0.1, 0.6));
            var speed = this.rnd.between(500, 1000);
            this.floatTween(sprite, speed);
        }
        this.lastTween.onComplete.add(function()
        {
            this.game.state.start('End');
        }, this);
    },
    floatTween(sprite, speed)
    {
        //Bubble effect, is a function for individual descent
        var delay = 0;
        let floatTween = this.add.tween(sprite).to({ y: 600 }, speed, Phaser.Easing.Sinusoidal.InOut);
            floatTween.onComplete.add(function()
            {
                delay += 1;
                sprite.y=(delay*130);
                floatTween.start();
            }, this);
            floatTween.start();
    },
    update()
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
//Sets up items
var Merge = Merge || {};


Merge.Item = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Merge.Item.prototype.init = function(texture)
     {
         this.texture = texture;
         this.next = this.getNext(texture);
         this.sprite = null;
         this.index = this.getIndex(texture);
         this.nextIndex = this.getIndex(this.next);
         this.made = false;
         return this;
     };
    Merge.Item.prototype.getNext = function(texture)
    {
        let nextArray = ['coinG', 'coinS', 'coinStackG', 'coinStackS', 'chest', 'gold', 'citrine', 'topaz', 'ruby', 'sapphire', 'emerald', 'amethyst', 'garnet', 'onyx', 'diamond'];
        
        for(let i = 0, len = nextArray.length; i<len; i++)
        {
            if(nextArray[i]===texture)
            {
                return nextArray[i+1];
            }
        }
    };
    Merge.Item.prototype.getIndex = function(texture)
    {
        let indexArray = ['coinG', 'coinS', 'coinStackG', 'coinStackS', 'chest', 'gold', 'citrine', 'topaz', 'ruby', 'sapphire', 'emerald', 'amethyst', 'garnet', 'onyx', 'diamond'];
        
        for(let i = 0, len = indexArray.length; i<len; i++)
        {
            if(indexArray[i]===texture)
            {
                return i;
            }
        }
    };
    Merge.Item.prototype.setSprite = function(x, y, texture)
    {
        if(this.sprite != null)
        {
            this.sprite.destroy();
        }
        this.sprite = this.state.add.sprite(x, y, texture);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(function()
        {
            console.log(this.checkMerge(this.state.myItems));
        }, this);
    };
    Merge.Item.prototype.checkMerge = function(myItems)
    {
        let myItemCount = 0;
        
        for(let i=0, len=myItems.length; i<len; i++)
        {
            if(myItems[i].texture === this.texture)
            {
                myItemCount++;
            }
        }
        
        if(myItemCount > 1)
        {
            this.executeMerge(myItems);
            return true;
        }
        else
        {
            this.state.addToInventory(this);
            return false;
        }
    };
    Merge.Item.prototype.executeMerge = function(myItems)
    {
        let myItemCount = 2;
        
        for(let i=0, len=myItems.length; i<len; i++)
        {
            if(myItems[i].texture === this.texture && myItemCount>0)
            {
                this.state.itemQuantity[this.index]--;
                myItemCount--;
                myItems[i].sprite.destroy();
                myItems.splice(i, 1);
                i--;
                len--;
            }
        }
        this.state.itemQuantity[this.nextIndex]++;
        this.state.addToInventory(this.next);
        this.state.removeBoardItem(this);
    };
}
//Sets up items
var Merge = Merge || {};


Merge.Item = function(state) {
     //Intalizes state side data locally
     this.state = state;
     this.game = state.game; 
     
     Merge.Item.prototype.init = function(data)
     {
         this.texture = data.texture;
         this.next = this.state.allData.Items[data.nextIndex];
         this.sprite = null;
         this.index = data.index;
         this.nextIndex = data.nextIndex;
         this.made = false;
         return this;
     };
    Merge.Item.prototype.setSprite = function(x, y, texture, noInput)
    {
        if(this.sprite != null)
        {
            this.sprite.destroy();
        }
        this.sprite = this.state.add.sprite(x, y, texture);
        this.sprite.inputEnabled = !noInput;
        this.sprite.events.onInputDown.add(function()
        {
            if(this.state.addSpace)
            {
                console.log(this.checkMerge(this.state.myItems));
            }
            else
            {
                console.log("Inventory Full");
            }
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
            this.state.addToInventory(this, false);
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
                this.state.allData.Items[this.index].quantity--;
                myItemCount--;
                myItems[i].sprite.destroy();
                myItems.splice(i, 1);
                i--;
                len--;
            }
        }
        this.state.addToInventory(this.next, true);
        this.state.removeBoardItem(this);
        this.state.inventoryCheck();
    };
    Merge.Item.prototype.updateQuantity = function()
    {
        this.state.allData.Items[this.index].quantity++;
    };
    Merge.Item.prototype.getQuantity = function()
    {
        return this.state.allData.Items[this.index].quantity;
    };
    Merge.Item.prototype.getName = function(addArticle)
    {
        if(addArticle)
        {
            return `${this.state.allData.Items[this.index].article}${this.state.allData.Items[this.index].name}`;
        }
        else
        {
            return `${this.state.allData.Items[this.index].name}`;
        }
    };
}
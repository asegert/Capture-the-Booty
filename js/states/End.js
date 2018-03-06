var Merge = Merge || {};

Merge.EndState = {
    create: function ()
    {
        //Background
        this.add.sprite(0, 0, 'endBackground');
        //Coupon
        this.coupon = this.add.sprite(200, 300, 'coupon');
        this.coupon.alpha = 0;
        //Diamond Edges
        this.diamond1 = this.add.sprite(150, 300, 'diamondLarge');
        this.diamond1.rotation = -0.5;
        this.diamond1.alpha = 0;
        this.diamond2 = this.add.sprite(750, 250, 'diamondLarge');
        this.diamond2.rotation = 0.5;
        this.diamond2.alpha = 0;
        //Fade in Tweens
        this.add.tween(this.coupon).to({alpha: 1}, 5000, "Linear", true);
        this.add.tween(this.diamond1).to({alpha: 1}, 5000, "Linear", true);
        this.add.tween(this.diamond2).to({alpha: 1}, 5000, "Linear", true);
    }
};
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
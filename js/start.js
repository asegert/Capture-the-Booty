var Merge = Merge || {};//replace with game name variable

if(Phaser.Device.ie) //Checks that internet explorer is being used
{
    if(Phaser.Device.ieVersion < 10) //Check for old version
    {
        var error = document.createElement("DIV");
        error.setAttribute("id", "ieError");
        document.body.appendChild(error);
        document.getElementById("ieError").innerHTML = "Please upgrade your Browser <br><br> <a href = 'https://www.microsoft.com/en-ca/download/internet-explorer.aspx'>Internet Explorer</a><br><a href='https://www.google.com/chrome/browser/desktop/index.html'>Chrome</a><br><a href='https://www.mozilla.org/en-US/firefox/new/'>Firefox</a>";
    }
    else
    {
        run(); 
    }
}
else
{
    run();
}

function run()
{
    Merge.game = new Phaser.Game(960, 640, Phaser.AUTO);

    Merge.game.state.add('Cache', Merge.CacheState);
    Merge.game.state.add('Boot', Merge.BootState); 
    Merge.game.state.add('Preload', Merge.PreloadState); 
    Merge.game.state.add('Game', Merge.GameState);
    Merge.game.state.add('Story', Merge.StoryState);
    Merge.game.state.add('End', Merge.EndState);

    Merge.game.state.start('Cache');
}
/*Copyright (C) Wayside Co. - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written and maintained by Wayside Co <info@waysideco.ca>, 2018*/
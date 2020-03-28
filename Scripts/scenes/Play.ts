module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _ocean?: objects.Ocean;
        private _plane?: objects.Plane;
        private _island?: objects.Island;

        private _clouds: Array<objects.Cloud>;

        private _scoreBoard: managers.ScoreBoard;

        private _bullet: objects.Bullet;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
            this._ocean = new objects.Ocean();
            this._plane = new objects.Plane();
            this._island = new objects.Island();
            
            // create the cloud array
            this._clouds = new Array<objects.Cloud>(); // empty container

            // instantiating CLOUD_NUM clouds
            for (let index = 0; index < config.Game.CLOUD_NUM; index++) {
                this._clouds.push(new objects.Cloud());
            }
            
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;

            this._bullet = new objects.Bullet();
            this._bullet.position = new objects.Vector2(320, 240);
            this._bullet.isActive = true;

             this.Main();
        }        
        
        public Update(): void 
        {
           this._ocean.Update();

           this._plane.Update();

           this._bullet.Update();

           this._island.Update();

           managers.Collision.AABBCheck(this._plane, this._island);

           this._clouds.forEach(cloud => {
               cloud.Update();
               managers.Collision.squaredRadiusCheck(this._plane, cloud);
           });
        }
        
        public Main(): void 
        {
            this.addChild(this._ocean);

            this.addChild(this._island);

            this.addChild(this._plane);

            this.addChild(this._bullet);

            for (const cloud of this._clouds) {
                this.addChild(cloud);
            }

            this.addChild(this._scoreBoard.LivesLabel);

            this.addChild(this._scoreBoard.ScoreLabel);
        }

        public Clean(): void{
            this._plane.engineSound.stop();
            this.removeAllChildren();
        }

        
    }
}
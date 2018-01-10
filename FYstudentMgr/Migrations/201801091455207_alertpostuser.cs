namespace FYstudentMgr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class alertpostuser : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.PostUser", "PosterID", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.PostUser", "PosterID", c => c.Int(nullable: false));
        }
    }
}

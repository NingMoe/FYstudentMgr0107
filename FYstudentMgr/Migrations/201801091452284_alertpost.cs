namespace FYstudentMgr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class alertpost : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Post", "CreaterId", "dbo.PostUser");
            DropIndex("dbo.Post", new[] { "CreaterId" });
            AlterColumn("dbo.Post", "CreaterId", c => c.Int());
            CreateIndex("dbo.Post", "CreaterId");
            AddForeignKey("dbo.Post", "CreaterId", "dbo.PostUser", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Post", "CreaterId", "dbo.PostUser");
            DropIndex("dbo.Post", new[] { "CreaterId" });
            AlterColumn("dbo.Post", "CreaterId", c => c.Int(nullable: false));
            CreateIndex("dbo.Post", "CreaterId");
            AddForeignKey("dbo.Post", "CreaterId", "dbo.PostUser", "Id", cascadeDelete: true);
        }
    }
}

namespace FYstudentMgr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addColumnOfStudent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Student", "Nation", c => c.Int(nullable: false));
            AddColumn("dbo.Student", "Schedule", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Student", "Schedule");
            DropColumn("dbo.Student", "Nation");
        }
    }
}

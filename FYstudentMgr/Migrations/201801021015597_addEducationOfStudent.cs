namespace FYstudentMgr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addEducationOfStudent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Student", "Education", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Student", "Education");
        }
    }
}

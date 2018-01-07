namespace FYstudentMgr.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class create : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CampusCoupon",
                c => new
                    {
                        CampusCouponID = c.Int(nullable: false, identity: true),
                        CouponID = c.Int(nullable: false),
                        CampusID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CampusCouponID);
            
            CreateTable(
                "dbo.Campus",
                c => new
                    {
                        CampusID = c.Int(nullable: false, identity: true),
                        CampusName = c.String(),
                        CampusAddress = c.String(),
                        WorkerID = c.Int(nullable: false),
                        CampusState = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.CampusID)
                .ForeignKey("dbo.Worker", t => t.WorkerID, cascadeDelete: true)
                .Index(t => t.WorkerID);
            
            CreateTable(
                "dbo.Coupon",
                c => new
                    {
                        CouponID = c.Int(nullable: false, identity: true),
                        CouponName = c.String(),
                        Vlaue = c.Double(nullable: false),
                        Rule = c.String(),
                        OverDate = c.DateTime(nullable: false),
                        State = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.CouponID);
            
            CreateTable(
                "dbo.Worker",
                c => new
                    {
                        WorkerID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        MobilePhoneNO = c.String(),
                        IsUploaImg = c.Boolean(nullable: false),
                        Img = c.String(),
                        ParentID = c.Int(),
                    })
                .PrimaryKey(t => t.WorkerID);
            
            CreateTable(
                "dbo.Class",
                c => new
                    {
                        ClassID = c.Int(nullable: false, identity: true),
                        ClassName = c.String(),
                        ProductID = c.Int(nullable: false),
                        TeacherID = c.Int(nullable: false),
                        ChargerID = c.Int(nullable: false),
                        OverDate = c.DateTime(nullable: false),
                        Arrange = c.String(),
                        IsLock = c.Boolean(nullable: false),
                        ClassState = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ClassID)
                .ForeignKey("dbo.Worker", t => t.ChargerID)
                .ForeignKey("dbo.Product", t => t.ProductID, cascadeDelete: true)
                .ForeignKey("dbo.Worker", t => t.TeacherID)
                .Index(t => t.ProductID)
                .Index(t => t.TeacherID)
                .Index(t => t.ChargerID);
            
            CreateTable(
                "dbo.Product",
                c => new
                    {
                        ProductID = c.Int(nullable: false, identity: true),
                        ProductName = c.String(),
                        ProductState = c.Boolean(nullable: false),
                        OverDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        Price = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.ProductID);
            
            CreateTable(
                "dbo.Enrollment",
                c => new
                    {
                        EnrollmentID = c.Int(nullable: false, identity: true),
                        ClassID = c.Int(nullable: false),
                        StudentID = c.Int(nullable: false),
                        EnrollDate = c.DateTime(nullable: false),
                        EnrollmentState = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.EnrollmentID)
                .ForeignKey("dbo.Class", t => t.ClassID, cascadeDelete: true)
                .ForeignKey("dbo.Student", t => t.StudentID)
                .Index(t => t.ClassID)
                .Index(t => t.StudentID);
            
            CreateTable(
                "dbo.Student",
                c => new
                    {
                        StudentID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        IdCardNO = c.String(),
                        Grade = c.String(),
                        Major = c.Int(nullable: false),
                        SchoolID = c.Int(nullable: false),
                        WorkerID = c.Int(nullable: false),
                        QQ = c.String(),
                        ClassName = c.String(),
                        MobilePhoneNO = c.String(),
                        Province = c.String(),
                        City = c.String(),
                        District = c.String(),
                        WorkPlace = c.String(),
                        IsUploaImg = c.Boolean(nullable: false),
                        Img = c.String(),
                        IsUploaCard = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.StudentID)
                .ForeignKey("dbo.Worker", t => t.WorkerID, cascadeDelete: true)
                .ForeignKey("dbo.School", t => t.SchoolID)
                .Index(t => t.SchoolID)
                .Index(t => t.WorkerID);
            
            CreateTable(
                "dbo.UserDiploma",
                c => new
                    {
                        UserDiplomaID = c.Int(nullable: false, identity: true),
                        StudentID = c.Int(nullable: false),
                        DiplomaID = c.Int(nullable: false),
                        CreateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.UserDiplomaID)
                .ForeignKey("dbo.Diploma", t => t.DiplomaID)
                .ForeignKey("dbo.Student", t => t.StudentID)
                .Index(t => t.StudentID)
                .Index(t => t.DiplomaID);
            
            CreateTable(
                "dbo.Diploma",
                c => new
                    {
                        DiplomaID = c.Int(nullable: false, identity: true),
                        DiplomaName = c.String(),
                        DiplomaState = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.DiplomaID);
            
            CreateTable(
                "dbo.School",
                c => new
                    {
                        SchoolID = c.Int(nullable: false, identity: true),
                        SchoolName = c.String(),
                        CampusID = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.SchoolID)
                .ForeignKey("dbo.Campus", t => t.CampusID)
                .Index(t => t.CampusID);
            
            CreateTable(
                "dbo.Order",
                c => new
                    {
                        OrderID = c.Int(nullable: false, identity: true),
                        OrderNO = c.String(),
                        StudentID = c.Int(nullable: false),
                        WorkerID = c.Int(nullable: false),
                        ProductID = c.Int(),
                        OrderDate = c.DateTime(nullable: false),
                        ReceiptID = c.Int(),
                        CouponID = c.Int(),
                        ActualPay = c.Double(nullable: false),
                        State = c.Int(nullable: false),
                        PayDate = c.DateTime(nullable: false),
                        TradeNO = c.String(),
                        Channel = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.OrderID)
                .ForeignKey("dbo.Receipt", t => t.ReceiptID)
                .ForeignKey("dbo.Coupon", t => t.CouponID)
                .ForeignKey("dbo.Product", t => t.ProductID)
                .ForeignKey("dbo.Worker", t => t.WorkerID)
                .ForeignKey("dbo.Student", t => t.StudentID)
                .Index(t => t.StudentID)
                .Index(t => t.WorkerID)
                .Index(t => t.ProductID)
                .Index(t => t.ReceiptID)
                .Index(t => t.CouponID);
            
            CreateTable(
                "dbo.Compensation",
                c => new
                    {
                        CompensationID = c.Int(nullable: false, identity: true),
                        OrderID = c.Int(nullable: false),
                        ReceiptID = c.Int(),
                        Value = c.Double(nullable: false),
                        FeeType = c.Int(nullable: false),
                        CreateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.CompensationID)
                .ForeignKey("dbo.Order", t => t.OrderID, cascadeDelete: true)
                .ForeignKey("dbo.Receipt", t => t.ReceiptID)
                .Index(t => t.OrderID)
                .Index(t => t.ReceiptID);
            
            CreateTable(
                "dbo.Receipt",
                c => new
                    {
                        ReceiptID = c.Int(nullable: false, identity: true),
                        CreateTime = c.DateTime(nullable: false),
                        State = c.Boolean(nullable: false),
                        ConfirmTime = c.DateTime(nullable: false),
                        ConfirmUserID = c.Int(nullable: false),
                        Worker_WorkerID = c.Int(),
                    })
                .PrimaryKey(t => t.ReceiptID)
                .ForeignKey("dbo.Worker", t => t.Worker_WorkerID)
                .Index(t => t.Worker_WorkerID);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.SmsRecord",
                c => new
                    {
                        SmsRecordID = c.Int(nullable: false, identity: true),
                        UserID = c.Int(nullable: false),
                        Cate = c.Int(nullable: false),
                        SendTime = c.DateTime(nullable: false),
                        Number = c.String(),
                    })
                .PrimaryKey(t => t.SmsRecordID)
                .ForeignKey("dbo.AspNetUsers", t => t.UserID, cascadeDelete: true)
                .Index(t => t.UserID);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        InfoID = c.Int(nullable: false),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.CouponCampus",
                c => new
                    {
                        Coupon_CouponID = c.Int(nullable: false),
                        Campus_CampusID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Coupon_CouponID, t.Campus_CampusID })
                .ForeignKey("dbo.Coupon", t => t.Coupon_CouponID, cascadeDelete: true)
                .ForeignKey("dbo.Campus", t => t.Campus_CampusID, cascadeDelete: true)
                .Index(t => t.Coupon_CouponID)
                .Index(t => t.Campus_CampusID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SmsRecord", "UserID", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Campus", "WorkerID", "dbo.Worker");
            DropForeignKey("dbo.Order", "StudentID", "dbo.Student");
            DropForeignKey("dbo.Order", "WorkerID", "dbo.Worker");
            DropForeignKey("dbo.Order", "ProductID", "dbo.Product");
            DropForeignKey("dbo.Order", "CouponID", "dbo.Coupon");
            DropForeignKey("dbo.Order", "ReceiptID", "dbo.Receipt");
            DropForeignKey("dbo.Receipt", "Worker_WorkerID", "dbo.Worker");
            DropForeignKey("dbo.Compensation", "ReceiptID", "dbo.Receipt");
            DropForeignKey("dbo.Compensation", "OrderID", "dbo.Order");
            DropForeignKey("dbo.Class", "TeacherID", "dbo.Worker");
            DropForeignKey("dbo.Student", "SchoolID", "dbo.School");
            DropForeignKey("dbo.School", "CampusID", "dbo.Campus");
            DropForeignKey("dbo.Student", "WorkerID", "dbo.Worker");
            DropForeignKey("dbo.Enrollment", "StudentID", "dbo.Student");
            DropForeignKey("dbo.UserDiploma", "StudentID", "dbo.Student");
            DropForeignKey("dbo.UserDiploma", "DiplomaID", "dbo.Diploma");
            DropForeignKey("dbo.Enrollment", "ClassID", "dbo.Class");
            DropForeignKey("dbo.Class", "ProductID", "dbo.Product");
            DropForeignKey("dbo.Class", "ChargerID", "dbo.Worker");
            DropForeignKey("dbo.CouponCampus", "Campus_CampusID", "dbo.Campus");
            DropForeignKey("dbo.CouponCampus", "Coupon_CouponID", "dbo.Coupon");
            DropIndex("dbo.CouponCampus", new[] { "Campus_CampusID" });
            DropIndex("dbo.CouponCampus", new[] { "Coupon_CouponID" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.SmsRecord", new[] { "UserID" });
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.Receipt", new[] { "Worker_WorkerID" });
            DropIndex("dbo.Compensation", new[] { "ReceiptID" });
            DropIndex("dbo.Compensation", new[] { "OrderID" });
            DropIndex("dbo.Order", new[] { "CouponID" });
            DropIndex("dbo.Order", new[] { "ReceiptID" });
            DropIndex("dbo.Order", new[] { "ProductID" });
            DropIndex("dbo.Order", new[] { "WorkerID" });
            DropIndex("dbo.Order", new[] { "StudentID" });
            DropIndex("dbo.School", new[] { "CampusID" });
            DropIndex("dbo.UserDiploma", new[] { "DiplomaID" });
            DropIndex("dbo.UserDiploma", new[] { "StudentID" });
            DropIndex("dbo.Student", new[] { "WorkerID" });
            DropIndex("dbo.Student", new[] { "SchoolID" });
            DropIndex("dbo.Enrollment", new[] { "StudentID" });
            DropIndex("dbo.Enrollment", new[] { "ClassID" });
            DropIndex("dbo.Class", new[] { "ChargerID" });
            DropIndex("dbo.Class", new[] { "TeacherID" });
            DropIndex("dbo.Class", new[] { "ProductID" });
            DropIndex("dbo.Campus", new[] { "WorkerID" });
            DropTable("dbo.CouponCampus");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.SmsRecord");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.Receipt");
            DropTable("dbo.Compensation");
            DropTable("dbo.Order");
            DropTable("dbo.School");
            DropTable("dbo.Diploma");
            DropTable("dbo.UserDiploma");
            DropTable("dbo.Student");
            DropTable("dbo.Enrollment");
            DropTable("dbo.Product");
            DropTable("dbo.Class");
            DropTable("dbo.Worker");
            DropTable("dbo.Coupon");
            DropTable("dbo.Campus");
            DropTable("dbo.CampusCoupon");
        }
    }
}

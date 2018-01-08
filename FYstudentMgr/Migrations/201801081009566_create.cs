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
                        Id = c.Int(nullable: false, identity: true),
                        CouponID = c.Int(nullable: false),
                        CampusID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Campus", t => t.CampusID)
                .ForeignKey("dbo.Coupon", t => t.CouponID)
                .Index(t => t.CouponID)
                .Index(t => t.CampusID);
            
            CreateTable(
                "dbo.Campus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CampusName = c.String(),
                        CampusAddress = c.String(),
                        ChargerID = c.Int(),
                        AccounterId = c.Int(),
                        DistrictID = c.Int(nullable: false),
                        CampusState = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Post", t => t.AccounterId)
                .ForeignKey("dbo.Post", t => t.ChargerID)
                .ForeignKey("dbo.District", t => t.DistrictID)
                .Index(t => t.ChargerID)
                .Index(t => t.AccounterId)
                .Index(t => t.DistrictID);
            
            CreateTable(
                "dbo.Post",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoleId = c.Int(nullable: false),
                        PostName = c.String(),
                        UserId = c.Int(),
                        SupperId = c.Int(),
                        CreaterId = c.Int(nullable: false),
                        State = c.Boolean(nullable: false),
                        CreateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.RoleId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        Label = c.String(),
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
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsUploaImg = c.Boolean(nullable: false),
                        Name = c.String(),
                        Img = c.String(),
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
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
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
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.District",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DistrictName = c.String(),
                        DistrictAddress = c.String(),
                        ManagerId = c.Int(),
                        AccounterId = c.Int(),
                        DistrictState = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Post", t => t.AccounterId)
                .ForeignKey("dbo.Post", t => t.ManagerId)
                .Index(t => t.ManagerId)
                .Index(t => t.AccounterId);
            
            CreateTable(
                "dbo.Spot",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SpotName = c.String(),
                        SpotAddress = c.String(),
                        PostId = c.Int(nullable: false),
                        SpotState = c.Boolean(nullable: false),
                        CampusID = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Campus", t => t.CampusID)
                .ForeignKey("dbo.Post", t => t.PostId)
                .Index(t => t.PostId)
                .Index(t => t.CampusID);
            
            CreateTable(
                "dbo.Coupon",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CouponName = c.String(),
                        Vlaue = c.Double(nullable: false),
                        Rule = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        OverDate = c.DateTime(nullable: false),
                        State = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Category",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(),
                        State = c.Boolean(nullable: false),
                        Sort = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Product",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CategoryId = c.Int(nullable: false),
                        ProductName = c.String(),
                        State = c.Boolean(nullable: false),
                        OverDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        Price = c.Double(nullable: false),
                        IsDiscountForOld = c.Boolean(nullable: false),
                        DiscountValue = c.Double(),
                        AccordIdList = c.String(),
                        Sort = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Category", t => t.CategoryId)
                .Index(t => t.CategoryId);
            
            CreateTable(
                "dbo.Class",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassName = c.String(),
                        ProductID = c.Int(nullable: false),
                        ChargerID = c.Int(nullable: false),
                        CampusId = c.Int(nullable: false),
                        OverDate = c.DateTime(nullable: false),
                        Arrange = c.String(),
                        IsLock = c.Boolean(nullable: false),
                        ClassState = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Campus", t => t.CampusId)
                .ForeignKey("dbo.Post", t => t.ChargerID)
                .ForeignKey("dbo.Product", t => t.ProductID)
                .Index(t => t.ProductID)
                .Index(t => t.ChargerID)
                .Index(t => t.CampusId);
            
            CreateTable(
                "dbo.Enrollment",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassID = c.Int(nullable: false),
                        StudentID = c.Int(nullable: false),
                        EnrollDate = c.DateTime(nullable: false),
                        EnrollmentState = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Class", t => t.ClassID)
                .ForeignKey("dbo.Student", t => t.StudentID)
                .Index(t => t.ClassID)
                .Index(t => t.StudentID);
            
            CreateTable(
                "dbo.Student",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        IdCardNO = c.String(),
                        Grade = c.String(),
                        Nation = c.Int(nullable: false),
                        Education = c.Int(nullable: false),
                        Major = c.Int(nullable: false),
                        SchoolID = c.Int(nullable: false),
                        SignerId = c.Int(nullable: false),
                        QQ = c.String(),
                        ClassName = c.String(),
                        MobilePhoneNO = c.String(),
                        Province = c.String(),
                        City = c.String(),
                        District = c.String(),
                        Schedule = c.String(),
                        WorkPlace = c.String(),
                        IsUploaImg = c.Boolean(nullable: false),
                        CardPath = c.String(),
                        IsUploaCard = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.School", t => t.SchoolID)
                .ForeignKey("dbo.PostUser", t => t.SignerId)
                .Index(t => t.SchoolID)
                .Index(t => t.SignerId);
            
            CreateTable(
                "dbo.StudentDiploma",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StudentID = c.Int(nullable: false),
                        DiplomaID = c.Int(nullable: false),
                        CreateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Diploma", t => t.DiplomaID)
                .ForeignKey("dbo.Student", t => t.StudentID)
                .Index(t => t.StudentID)
                .Index(t => t.DiplomaID);
            
            CreateTable(
                "dbo.Diploma",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DiplomaName = c.String(),
                        DiplomaState = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Order",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderNO = c.String(),
                        StudentID = c.Int(nullable: false),
                        PostUserId = c.Int(nullable: false),
                        OrderDate = c.DateTime(nullable: false),
                        ReceiptID = c.Int(),
                        ActualPay = c.Double(nullable: false),
                        State = c.Int(nullable: false),
                        PayDate = c.DateTime(nullable: false),
                        TradeNO = c.String(),
                        Channel = c.Int(nullable: false),
                        IsDebt = c.Boolean(nullable: false),
                        Debt = c.Double(nullable: false),
                        Remark = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Receipt", t => t.ReceiptID)
                .ForeignKey("dbo.PostUser", t => t.PostUserId)
                .ForeignKey("dbo.Student", t => t.StudentID)
                .Index(t => t.StudentID)
                .Index(t => t.PostUserId)
                .Index(t => t.ReceiptID);
            
            CreateTable(
                "dbo.Compensation",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderID = c.Int(nullable: false),
                        ReceiptID = c.Int(),
                        Value = c.Double(nullable: false),
                        FeeType = c.Int(nullable: false),
                        CreateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Order", t => t.OrderID)
                .ForeignKey("dbo.Receipt", t => t.ReceiptID)
                .Index(t => t.OrderID)
                .Index(t => t.ReceiptID);
            
            CreateTable(
                "dbo.Receipt",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CreateTime = c.DateTime(nullable: false),
                        State = c.Boolean(nullable: false),
                        ConfirmTime = c.DateTime(nullable: false),
                        ConfirmerID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PostUser", t => t.ConfirmerID)
                .Index(t => t.ConfirmerID);
            
            CreateTable(
                "dbo.PostUser",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PostId = c.Int(nullable: false),
                        WorkerId = c.Int(nullable: false),
                        PostDate = c.DateTime(nullable: false),
                        OffDate = c.DateTime(),
                        PosterID = c.Int(nullable: false),
                        OfferID = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Post", t => t.OfferID)
                .ForeignKey("dbo.Post", t => t.PostId)
                .ForeignKey("dbo.Post", t => t.PosterID)
                .ForeignKey("dbo.AspNetUsers", t => t.WorkerId)
                .Index(t => t.PostId)
                .Index(t => t.WorkerId)
                .Index(t => t.PosterID)
                .Index(t => t.OfferID);
            
            CreateTable(
                "dbo.School",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SchoolName = c.String(),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.ClassTeacher",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassId = c.Int(nullable: false),
                        PostId = c.Int(nullable: false),
                        Course = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Class", t => t.ClassId)
                .ForeignKey("dbo.Post", t => t.PostId)
                .Index(t => t.ClassId)
                .Index(t => t.PostId);
            
            CreateTable(
                "dbo.CouponProduct",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CouponId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.OrderDetail",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                        CouponID = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Coupon", t => t.CouponID)
                .Index(t => t.CouponID);
            
            CreateTable(
                "dbo.Service",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ServiceName = c.String(),
                        State = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
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
                .ForeignKey("dbo.AspNetUsers", t => t.UserID)
                .Index(t => t.UserID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SmsRecord", "UserID", "dbo.AspNetUsers");
            DropForeignKey("dbo.OrderDetail", "CouponID", "dbo.Coupon");
            DropForeignKey("dbo.Product", "CategoryId", "dbo.Category");
            DropForeignKey("dbo.ClassTeacher", "PostId", "dbo.Post");
            DropForeignKey("dbo.ClassTeacher", "ClassId", "dbo.Class");
            DropForeignKey("dbo.Class", "ProductID", "dbo.Product");
            DropForeignKey("dbo.Student", "SignerId", "dbo.PostUser");
            DropForeignKey("dbo.Student", "SchoolID", "dbo.School");
            DropForeignKey("dbo.Order", "StudentID", "dbo.Student");
            DropForeignKey("dbo.Order", "PostUserId", "dbo.PostUser");
            DropForeignKey("dbo.Order", "ReceiptID", "dbo.Receipt");
            DropForeignKey("dbo.Receipt", "ConfirmerID", "dbo.PostUser");
            DropForeignKey("dbo.PostUser", "WorkerId", "dbo.AspNetUsers");
            DropForeignKey("dbo.PostUser", "PosterID", "dbo.Post");
            DropForeignKey("dbo.PostUser", "PostId", "dbo.Post");
            DropForeignKey("dbo.PostUser", "OfferID", "dbo.Post");
            DropForeignKey("dbo.Compensation", "ReceiptID", "dbo.Receipt");
            DropForeignKey("dbo.Compensation", "OrderID", "dbo.Order");
            DropForeignKey("dbo.Enrollment", "StudentID", "dbo.Student");
            DropForeignKey("dbo.StudentDiploma", "StudentID", "dbo.Student");
            DropForeignKey("dbo.StudentDiploma", "DiplomaID", "dbo.Diploma");
            DropForeignKey("dbo.Enrollment", "ClassID", "dbo.Class");
            DropForeignKey("dbo.Class", "ChargerID", "dbo.Post");
            DropForeignKey("dbo.Class", "CampusId", "dbo.Campus");
            DropForeignKey("dbo.CampusCoupon", "CouponID", "dbo.Coupon");
            DropForeignKey("dbo.Spot", "PostId", "dbo.Post");
            DropForeignKey("dbo.Spot", "CampusID", "dbo.Campus");
            DropForeignKey("dbo.District", "ManagerId", "dbo.Post");
            DropForeignKey("dbo.Campus", "DistrictID", "dbo.District");
            DropForeignKey("dbo.District", "AccounterId", "dbo.Post");
            DropForeignKey("dbo.CampusCoupon", "CampusID", "dbo.Campus");
            DropForeignKey("dbo.Campus", "ChargerID", "dbo.Post");
            DropForeignKey("dbo.Campus", "AccounterId", "dbo.Post");
            DropForeignKey("dbo.Post", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Post", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropIndex("dbo.SmsRecord", new[] { "UserID" });
            DropIndex("dbo.OrderDetail", new[] { "CouponID" });
            DropIndex("dbo.ClassTeacher", new[] { "PostId" });
            DropIndex("dbo.ClassTeacher", new[] { "ClassId" });
            DropIndex("dbo.PostUser", new[] { "OfferID" });
            DropIndex("dbo.PostUser", new[] { "PosterID" });
            DropIndex("dbo.PostUser", new[] { "WorkerId" });
            DropIndex("dbo.PostUser", new[] { "PostId" });
            DropIndex("dbo.Receipt", new[] { "ConfirmerID" });
            DropIndex("dbo.Compensation", new[] { "ReceiptID" });
            DropIndex("dbo.Compensation", new[] { "OrderID" });
            DropIndex("dbo.Order", new[] { "ReceiptID" });
            DropIndex("dbo.Order", new[] { "PostUserId" });
            DropIndex("dbo.Order", new[] { "StudentID" });
            DropIndex("dbo.StudentDiploma", new[] { "DiplomaID" });
            DropIndex("dbo.StudentDiploma", new[] { "StudentID" });
            DropIndex("dbo.Student", new[] { "SignerId" });
            DropIndex("dbo.Student", new[] { "SchoolID" });
            DropIndex("dbo.Enrollment", new[] { "StudentID" });
            DropIndex("dbo.Enrollment", new[] { "ClassID" });
            DropIndex("dbo.Class", new[] { "CampusId" });
            DropIndex("dbo.Class", new[] { "ChargerID" });
            DropIndex("dbo.Class", new[] { "ProductID" });
            DropIndex("dbo.Product", new[] { "CategoryId" });
            DropIndex("dbo.Spot", new[] { "CampusID" });
            DropIndex("dbo.Spot", new[] { "PostId" });
            DropIndex("dbo.District", new[] { "AccounterId" });
            DropIndex("dbo.District", new[] { "ManagerId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.Post", new[] { "UserId" });
            DropIndex("dbo.Post", new[] { "RoleId" });
            DropIndex("dbo.Campus", new[] { "DistrictID" });
            DropIndex("dbo.Campus", new[] { "AccounterId" });
            DropIndex("dbo.Campus", new[] { "ChargerID" });
            DropIndex("dbo.CampusCoupon", new[] { "CampusID" });
            DropIndex("dbo.CampusCoupon", new[] { "CouponID" });
            DropTable("dbo.SmsRecord");
            DropTable("dbo.Service");
            DropTable("dbo.OrderDetail");
            DropTable("dbo.CouponProduct");
            DropTable("dbo.ClassTeacher");
            DropTable("dbo.School");
            DropTable("dbo.PostUser");
            DropTable("dbo.Receipt");
            DropTable("dbo.Compensation");
            DropTable("dbo.Order");
            DropTable("dbo.Diploma");
            DropTable("dbo.StudentDiploma");
            DropTable("dbo.Student");
            DropTable("dbo.Enrollment");
            DropTable("dbo.Class");
            DropTable("dbo.Product");
            DropTable("dbo.Category");
            DropTable("dbo.Coupon");
            DropTable("dbo.Spot");
            DropTable("dbo.District");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.Post");
            DropTable("dbo.Campus");
            DropTable("dbo.CampusCoupon");
        }
    }
}

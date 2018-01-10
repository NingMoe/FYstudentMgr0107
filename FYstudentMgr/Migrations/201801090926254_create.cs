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
                        DistrictID = c.Int(nullable: false),
                        CampusState = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.District", t => t.DistrictID)
                .Index(t => t.DistrictID);
            
            CreateTable(
                "dbo.District",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DistrictName = c.String(),
                        DistrictAddress = c.String(),
                        DistrictState = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Post",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RoleId = c.Int(nullable: false),
                        PostName = c.String(),
                        UserId = c.Int(),
                        CreaterId = c.Int(nullable: false),
                        SupperId = c.Int(),
                        State = c.Boolean(nullable: false),
                        CreateTime = c.DateTime(nullable: false),
                        DistrictId = c.Int(nullable: false),
                        CampusId = c.Int(),
                        SpotId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Campus", t => t.CampusId)
                .ForeignKey("dbo.PostUser", t => t.CreaterId)
                .ForeignKey("dbo.District", t => t.DistrictId)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId)
                .ForeignKey("dbo.Spot", t => t.SpotId)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.RoleId)
                .Index(t => t.UserId)
                .Index(t => t.CreaterId)
                .Index(t => t.DistrictId)
                .Index(t => t.CampusId)
                .Index(t => t.SpotId);
            
            CreateTable(
                "dbo.PostUser",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PostId = c.Int(nullable: false),
                        UserId = c.Int(nullable: false),
                        IsOnDuty = c.Boolean(nullable: false),
                        PostDate = c.DateTime(nullable: false),
                        OffDate = c.DateTime(),
                        PosterID = c.Int(nullable: false),
                        OfferID = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Post", t => t.PostId)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .Index(t => t.PostId)
                .Index(t => t.UserId);
            
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
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.Int(nullable: false),
                        RoleId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId)
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
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
                "dbo.Spot",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SpotName = c.String(),
                        SpotAddress = c.String(),
                        SpotState = c.Boolean(nullable: false),
                        CampusID = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Campus", t => t.CampusID)
                .Index(t => t.CampusID);
            
            CreateTable(
                "dbo.Order",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        OrderNO = c.String(),
                        StudentID = c.Int(nullable: false),
                        PostUserId = c.Int(nullable: false),
                        SpotId = c.Int(nullable: false),
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
                .ForeignKey("dbo.Spot", t => t.SpotId)
                .ForeignKey("dbo.Student", t => t.StudentID)
                .Index(t => t.StudentID)
                .Index(t => t.PostUserId)
                .Index(t => t.SpotId)
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
                        SignDate = c.DateTime(nullable: false),
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
                .ForeignKey("dbo.PostUser", t => t.ChargerID)
                .ForeignKey("dbo.Product", t => t.ProductID)
                .Index(t => t.ProductID)
                .Index(t => t.ChargerID)
                .Index(t => t.CampusId);
            
            CreateTable(
                "dbo.Product",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SubjectId = c.Int(nullable: false),
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
                .ForeignKey("dbo.Subject", t => t.SubjectId)
                .Index(t => t.SubjectId);
            
            CreateTable(
                "dbo.CouponProduct",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CouponId = c.Int(nullable: false),
                        ProductId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Coupon", t => t.CouponId)
                .ForeignKey("dbo.Product", t => t.ProductId)
                .Index(t => t.CouponId)
                .Index(t => t.ProductId);
            
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
                "dbo.ProductService",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ProductId = c.Int(nullable: false),
                        ServiceId = c.Int(nullable: false),
                        Sort = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Product", t => t.ProductId)
                .ForeignKey("dbo.Service", t => t.ServiceId)
                .Index(t => t.ProductId)
                .Index(t => t.ServiceId);
            
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
                "dbo.Subject",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CategoryId = c.Int(nullable: false),
                        State = c.Boolean(nullable: false),
                        Sort = c.Int(nullable: false),
                        CreateTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Category", t => t.CategoryId)
                .Index(t => t.CategoryId);
            
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
                "dbo.ClassTeacher",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassId = c.Int(nullable: false),
                        TeacherId = c.Int(nullable: false),
                        Course = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Class", t => t.ClassId)
                .ForeignKey("dbo.PostUser", t => t.TeacherId)
                .Index(t => t.ClassId)
                .Index(t => t.TeacherId);
            
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
                .ForeignKey("dbo.Product", t => t.ProductId)
                .Index(t => t.ProductId)
                .Index(t => t.CouponID);
            
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
            DropForeignKey("dbo.OrderDetail", "ProductId", "dbo.Product");
            DropForeignKey("dbo.OrderDetail", "CouponID", "dbo.Coupon");
            DropForeignKey("dbo.Post", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Post", "SpotId", "dbo.Spot");
            DropForeignKey("dbo.Student", "SignerId", "dbo.PostUser");
            DropForeignKey("dbo.Student", "SchoolID", "dbo.School");
            DropForeignKey("dbo.Order", "StudentID", "dbo.Student");
            DropForeignKey("dbo.Enrollment", "StudentID", "dbo.Student");
            DropForeignKey("dbo.ClassTeacher", "TeacherId", "dbo.PostUser");
            DropForeignKey("dbo.ClassTeacher", "ClassId", "dbo.Class");
            DropForeignKey("dbo.Product", "SubjectId", "dbo.Subject");
            DropForeignKey("dbo.Subject", "CategoryId", "dbo.Category");
            DropForeignKey("dbo.ProductService", "ServiceId", "dbo.Service");
            DropForeignKey("dbo.ProductService", "ProductId", "dbo.Product");
            DropForeignKey("dbo.CouponProduct", "ProductId", "dbo.Product");
            DropForeignKey("dbo.CouponProduct", "CouponId", "dbo.Coupon");
            DropForeignKey("dbo.CampusCoupon", "CouponID", "dbo.Coupon");
            DropForeignKey("dbo.Class", "ProductID", "dbo.Product");
            DropForeignKey("dbo.Enrollment", "ClassID", "dbo.Class");
            DropForeignKey("dbo.Class", "ChargerID", "dbo.PostUser");
            DropForeignKey("dbo.Class", "CampusId", "dbo.Campus");
            DropForeignKey("dbo.StudentDiploma", "StudentID", "dbo.Student");
            DropForeignKey("dbo.StudentDiploma", "DiplomaID", "dbo.Diploma");
            DropForeignKey("dbo.Order", "SpotId", "dbo.Spot");
            DropForeignKey("dbo.Order", "PostUserId", "dbo.PostUser");
            DropForeignKey("dbo.Order", "ReceiptID", "dbo.Receipt");
            DropForeignKey("dbo.Receipt", "ConfirmerID", "dbo.PostUser");
            DropForeignKey("dbo.Compensation", "ReceiptID", "dbo.Receipt");
            DropForeignKey("dbo.Compensation", "OrderID", "dbo.Order");
            DropForeignKey("dbo.Spot", "CampusID", "dbo.Campus");
            DropForeignKey("dbo.Post", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropForeignKey("dbo.Post", "DistrictId", "dbo.District");
            DropForeignKey("dbo.Post", "CreaterId", "dbo.PostUser");
            DropForeignKey("dbo.PostUser", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.PostUser", "PostId", "dbo.Post");
            DropForeignKey("dbo.Post", "CampusId", "dbo.Campus");
            DropForeignKey("dbo.Campus", "DistrictID", "dbo.District");
            DropForeignKey("dbo.CampusCoupon", "CampusID", "dbo.Campus");
            DropIndex("dbo.SmsRecord", new[] { "UserID" });
            DropIndex("dbo.OrderDetail", new[] { "CouponID" });
            DropIndex("dbo.OrderDetail", new[] { "ProductId" });
            DropIndex("dbo.ClassTeacher", new[] { "TeacherId" });
            DropIndex("dbo.ClassTeacher", new[] { "ClassId" });
            DropIndex("dbo.Subject", new[] { "CategoryId" });
            DropIndex("dbo.ProductService", new[] { "ServiceId" });
            DropIndex("dbo.ProductService", new[] { "ProductId" });
            DropIndex("dbo.CouponProduct", new[] { "ProductId" });
            DropIndex("dbo.CouponProduct", new[] { "CouponId" });
            DropIndex("dbo.Product", new[] { "SubjectId" });
            DropIndex("dbo.Class", new[] { "CampusId" });
            DropIndex("dbo.Class", new[] { "ChargerID" });
            DropIndex("dbo.Class", new[] { "ProductID" });
            DropIndex("dbo.Enrollment", new[] { "StudentID" });
            DropIndex("dbo.Enrollment", new[] { "ClassID" });
            DropIndex("dbo.StudentDiploma", new[] { "DiplomaID" });
            DropIndex("dbo.StudentDiploma", new[] { "StudentID" });
            DropIndex("dbo.Student", new[] { "SignerId" });
            DropIndex("dbo.Student", new[] { "SchoolID" });
            DropIndex("dbo.Receipt", new[] { "ConfirmerID" });
            DropIndex("dbo.Compensation", new[] { "ReceiptID" });
            DropIndex("dbo.Compensation", new[] { "OrderID" });
            DropIndex("dbo.Order", new[] { "ReceiptID" });
            DropIndex("dbo.Order", new[] { "SpotId" });
            DropIndex("dbo.Order", new[] { "PostUserId" });
            DropIndex("dbo.Order", new[] { "StudentID" });
            DropIndex("dbo.Spot", new[] { "CampusID" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.PostUser", new[] { "UserId" });
            DropIndex("dbo.PostUser", new[] { "PostId" });
            DropIndex("dbo.Post", new[] { "SpotId" });
            DropIndex("dbo.Post", new[] { "CampusId" });
            DropIndex("dbo.Post", new[] { "DistrictId" });
            DropIndex("dbo.Post", new[] { "CreaterId" });
            DropIndex("dbo.Post", new[] { "UserId" });
            DropIndex("dbo.Post", new[] { "RoleId" });
            DropIndex("dbo.Campus", new[] { "DistrictID" });
            DropIndex("dbo.CampusCoupon", new[] { "CampusID" });
            DropIndex("dbo.CampusCoupon", new[] { "CouponID" });
            DropTable("dbo.SmsRecord");
            DropTable("dbo.OrderDetail");
            DropTable("dbo.School");
            DropTable("dbo.ClassTeacher");
            DropTable("dbo.Category");
            DropTable("dbo.Subject");
            DropTable("dbo.Service");
            DropTable("dbo.ProductService");
            DropTable("dbo.Coupon");
            DropTable("dbo.CouponProduct");
            DropTable("dbo.Product");
            DropTable("dbo.Class");
            DropTable("dbo.Enrollment");
            DropTable("dbo.Diploma");
            DropTable("dbo.StudentDiploma");
            DropTable("dbo.Student");
            DropTable("dbo.Receipt");
            DropTable("dbo.Compensation");
            DropTable("dbo.Order");
            DropTable("dbo.Spot");
            DropTable("dbo.AspNetRoles");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.PostUser");
            DropTable("dbo.Post");
            DropTable("dbo.District");
            DropTable("dbo.Campus");
            DropTable("dbo.CampusCoupon");
        }
    }
}

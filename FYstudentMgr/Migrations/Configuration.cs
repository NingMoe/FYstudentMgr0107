namespace FYstudentMgr.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using FYstudentMgr.Models;
    //using FYstudentMgr.Models.Teachers;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;


    internal sealed class Configuration : DbMigrationsConfiguration<FYstudentMgr.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(FYstudentMgr.Models.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //



            var diploms = new List<Diploma> {
                new Diploma{ DiplomaName="会计初级职称资格证", DiplomaState=true, CreateDate=DateTime.Parse("2017-09-12")},
                new Diploma{ DiplomaName="计算机二级Office", DiplomaState=true, CreateDate=DateTime.Parse("2017-09-13")},
                new Diploma{ DiplomaName="计算机二级C语言", DiplomaState=true, CreateDate=DateTime.Parse("2017-09-14")},
                new Diploma{ DiplomaName="17继续教育", DiplomaState=true, CreateDate=DateTime.Parse("2017-09-15")}
            };
            diploms.ForEach(s => context.Diplomas.AddOrUpdate(p => p.DiplomaName, s));
            context.SaveChanges();


            //var teachers = new List<Worker> {
            //    new Worker{ Name="范芬", MobilePhoneNO="15307000257"},
            //    new Worker{ Name="小汇演", MobilePhoneNO="15307000257", ParentID=1},
            //    new Worker{ Name="陈文君", MobilePhoneNO="15307000257",ParentID=2},
            //    new Worker{ Name="彭玉亮", MobilePhoneNO="15307000257"}

            //};
            //teachers.ForEach(s => context.Workers.AddOrUpdate(p => p.Name, s));
            //context.SaveChanges();


            var categorys = new List<Category> {
                new Category{ CategoryName ="计算机等级考试", State=true,  Sort=1 },
                new Category{ CategoryName ="会计金融", State=true,  Sort=2},


            };
            categorys.ForEach(s => context.Categorys.AddOrUpdate(p => p.CategoryName, s));
            context.SaveChanges();

            var subjects = new List<Subject> {
                new Subject{ Name ="初级培训班", State=true, CategoryId=2, Sort=1 , CreateTime=DateTime.Now},
                new Subject{ Name ="计算机二级培训", State=true, CategoryId=1, Sort=2,CreateTime=DateTime.Now},
                new Subject{ Name ="会计继续教育", State=true, CategoryId=2, Sort=3,CreateTime=DateTime.Now}


            };
            subjects.ForEach(s => context.Subjects.AddOrUpdate(p => p.Name, s));
            context.SaveChanges();

            var courses = new List<Product> {
                new Product{ProductName="初级会计名师班", State=true, CreateDate=DateTime.Parse("2017-09-20"),OverDate=DateTime.Parse("2018-03-20"),Price=1280,  SubjectId=1,  IsDiscountForOld=false, Sort=1},
                new Product{ProductName="计算机二级Office精讲班",State=true, CreateDate=DateTime.Parse("2017-09-20"),OverDate=DateTime.Parse("2018-03-20"),Price=480,SubjectId=2,  IsDiscountForOld=false, Sort=1},
                new Product{ProductName="18年继续教育", State=true, CreateDate=DateTime.Parse("2017-09-20"),OverDate=DateTime.Parse("2018-03-20"),Price=120,SubjectId=3,  IsDiscountForOld=true, Sort=1, DiscountValue=10, AccordIdList="1,"}

            };
            courses.ForEach(s => context.Products.AddOrUpdate(p => p.ProductName, s));
            context.SaveChanges();

            //var coupons = new List<Coupon> { 
            //    new Coupon{ CouponName="计算机学院课程折上立减30元",  OverDate=DateTime.Parse("2017-06-30"), Rule="适用平台：PC、触屏、App <br>1. 每单限用一张，一次性使用，不找零。<br>2. 不可与其它优惠券叠加使用。<br>3. 本券不能与其它优惠活动同享，不可用于预售课程。<br>4. 如报班时未使用本券，则视作自动放弃。<br>5. 本券不可退换，超过有效时间将无法使用。<br>6. 本优惠券与账户绑定，不可转让。", Type=CouponType.折上减, Vlaue=30, State=true},
            //    new Coupon{ CouponName="计算机学院课程折上立减60元", OverDate=DateTime.Parse("2017-06-30"), Rule="适用平台：PC、触屏、App <br>1. 每单限用一张，一次性使用，不找零。<br>2. 不可与其它优惠券叠加使用。<br>3. 本券不能与其它优惠活动同享，不可用于预售课程。<br>4. 如报班时未使用本券，则视作自动放弃。<br>5. 本券不可退换，超过有效时间将无法使用。<br>6. 本优惠券与账户绑定，不可转让。", Type=CouponType.折上减, Vlaue=60, State=true},

            //    new Coupon{ CouponName="会计学院课程折上立减60元", OverDate=DateTime.Parse("2017-06-30"), Rule="适用平台：PC、触屏、App <br>1. 每单限用一张，一次性使用，不找零。<br>2. 不可与其它优惠券叠加使用。<br>3. 本券不能与其它优惠活动同享，不可用于预售课程。<br>4. 如报班时未使用本券，则视作自动放弃。<br>5. 本券不可退换，超过有效时间将无法使用。<br>6. 本优惠券与账户绑定，不可转让。", Type=CouponType.折上减, Vlaue=60, State=true},
            //    new Coupon{ CouponName="会计学院课程折上立减50元",  OverDate=DateTime.Parse("2017-06-30"), Rule="适用平台：PC、触屏、App <br>1. 每单限用一张，一次性使用，不找零。<br>2. 不可与其它优惠券叠加使用。<br>3. 本券不能与其它优惠活动同享，不可用于预售课程。<br>4. 如报班时未使用本券，则视作自动放弃。<br>5. 本券不可退换，超过有效时间将无法使用。<br>6. 本优惠券与账户绑定，不可转让。", Type=CouponType.折上减, Vlaue=50, State=true},
            //    new Coupon{ CouponName="会计学院课程折上立减108元", OverDate=DateTime.Parse("2017-06-22"), Rule="适用平台：PC、触屏、App <br>1. 每单限用一张，一次性使用，不找零。<br>2. 不可与其它优惠券叠加使用。<br>3. 本券不能与其它优惠活动同享，不可用于预售课程。<br>4. 如报班时未使用本券，则视作自动放弃。<br>5. 本券不可退换，超过有效时间将无法使用。<br>6. 本优惠券与账户绑定，不可转让。", Type=CouponType.折上减, Vlaue=108, State=true}

            //};
            //coupons.ForEach(s => context.Coupons.Add(s));
            //context.SaveChanges();

          


            //var qusBanks = new List<QusBank> { 
            //    new QusBank{ProductID=1,BankName="二级C语言笔试真题题库", BankDescription="该题库包含历年考试笔试部分所有真题"},
            //    new QusBank{ProductID=2,BankName="二级Office笔试真题题库", BankDescription="该题库包含历年考试笔试部分所有真题"}
            //};
            //qusBanks.ForEach(s => context.QusBanks.Add(s));
            //context.SaveChanges();

            //var chapters = new List<Chapter> { 
            //    new Chapter{ ChapterName="数据类型及其运算", Sort=1, QusBankID=1},
            //    new Chapter{ ChapterName="输入与输出", Sort=2,  QusBankID=1},
            //    new Chapter{ ChapterName="选择结构", Sort=3,  QusBankID=1}

            //};
            //chapters.ForEach(s => context.Chapters.Add(s));
            //context.SaveChanges();

            //var qus = new List<Question> { 
            //    new Question{ ChapterID=1, Sort=1,   Category=QuestionCategory.单选题, QuestionBody="以下不是整型常量的是", TextAnalysis="这是题目解析"},
            //    new Question{ ChapterID=1, Sort=2, Category=QuestionCategory.单选题,  QuestionBody="以下不是实型常量的是", TextAnalysis="这是题目解析"},
            //    new Question{ ChapterID=2, Sort=1, Category=QuestionCategory.单选题,  QuestionBody="在C语言中，语句结束的标志是？ ______ 。", TextAnalysis="C语言中语句结束的标志是分号。"},
            //    new Question{ ChapterID=2,Sort=2,Category=QuestionCategory.单选题,  QuestionBody="全国计算机等级考试无纸化“通过”的条件是 ______ 。", TextAnalysis="通过条件是：只需总分高于60分即可。"},
            //     new Question{ ChapterID=3,Sort=1,Category=QuestionCategory.单选题,  QuestionBody="若变量x、y已正确定义并赋值，以下符合C语言语法的表达式是", TextAnalysis="赋值运算符“=”的左边必须是变量"},
            //    new Question{  ChapterID=3,Sort=2,Category=QuestionCategory.单选题,  QuestionBody="以下定义语句中正确的是", TextAnalysis="变量必须先定义，后使用"}



            //};
            //qus.ForEach(s => context.Questions.Add(s));
            //context.SaveChanges();


            //var qusoptions = new List<QusOption> { 
            //    new QusOption{  QuestionID=1, Content="12", IsCorrect=false},
            //    new QusOption{ QuestionID=1, Content="011", IsCorrect=false},
            //    new QusOption{ QuestionID=1, Content="0x12", IsCorrect=false},
            //    new QusOption{ QuestionID=1, Content="018", IsCorrect=true},
            //    new QusOption{ QuestionID=2, Content="12.1", IsCorrect=false},
            //    new QusOption{ QuestionID=2, Content="12e2", IsCorrect=false},
            //    new QusOption{ QuestionID=2, Content="12e0.2", IsCorrect=true},
            //    new QusOption{ QuestionID=2, Content="12.0", IsCorrect=false},
            //    new QusOption{ QuestionID=3, Content="分号“;”", IsCorrect=true},
            //    new QusOption{ QuestionID=3, Content="换行（回车）", IsCorrect=false},
            //    new QusOption{ QuestionID=4, Content="只需总分高于60分即可", IsCorrect=true},
            //    new QusOption{ QuestionID=4, Content="总分高于60分，同时操作题高于36分", IsCorrect=false},
            //    new QusOption{ QuestionID=5, Content="++x,y=x--", IsCorrect=true},
            //    new QusOption{ QuestionID=5, Content="x+1=y", IsCorrect=false},
            //    new QusOption{ QuestionID=5, Content="x=x+10=x+y", IsCorrect=false},
            //    new QusOption{ QuestionID=5, Content="double(x)/10", IsCorrect=false},
            //    new QusOption{ QuestionID=6, Content="char  A=65+1,b='b';", IsCorrect=true},
            //    new QusOption{ QuestionID=6, Content="int  a=b=0;", IsCorrect=false},
            //    new QusOption{ QuestionID=6, Content="float  a=1,*b=&a,*c=&b;", IsCorrect=false},
            //    new QusOption{ QuestionID=6, Content="double  a=0.0; b=1.1;", IsCorrect=false}

            //};
            //qusoptions.ForEach(s => context.QusOptions.Add(s));
            //context.SaveChanges();




            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Admin" , Label="管理员", Description="负责对系统基础数据进行维护以及系统运行维护"};

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Student"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Student",Label = "学生", Description = "在本系统登记的有学习意向的学生" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Teacher"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Teacher", Label = "教师", Description = "负责教学工作" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Seller"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Seller", Label = "课程顾问", Description = "负责招生工作的一线业务人员" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Manager"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Manager", Label = "大区经理", Description = "主管一个区域的总经理" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == " SchoolMaster"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "SchoolMaster", Label = "校长", Description = "主管一个校区的所有工作" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "SpotCharger"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "SpotCharger", Label = "服务点负责人", Description = "主管一个服务点的所有工作" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Accounter"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Accounter", Label = "会计", Description = "主管一个部门的所有财务工作" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "ClassCharger"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "ClassCharger", Label = "班主任", Description = "主管一个班级的排课考勤工作" };

                manager.Create(role);
            }




            if (!context.Users.Any(u => u.UserName == "qinyuankun"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "qinyuankun", Email = "327179615@qq.com", Name="秦元坤", Img=new Guid().ToString()};

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Admin");
            }
            if (!context.Users.Any(u => u.UserName == "fangyaobing"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "fangyaobing", Email = "fangyaobing@qq.com",Name="方姚兵", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Manager");
            }
            if (!context.Users.Any(u => u.UserName == "xiaohuiyan"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "xiaohuiyan", Email = "xiaohuiyan@qq.com", Name = "肖辉燕", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "SchoolMaster");
                manager.AddToRole(user.Id, "SpotCharger");
            }
            if (!context.Users.Any(u => u.UserName == "fanfen"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "fanfen", Email = "fanfen@qq.com", Name = "樊芬", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "SpotCharger");
            }

            if (!context.Users.Any(u => u.UserName == "chenwenjun"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "chenwenjun", Email = "chenwenjun@qq.com", Name = "陈文君", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "SchoolMaster");
                manager.AddToRole(user.Id, "SpotCharger");
            }

            if (!context.Users.Any(u => u.UserName == "huangjia"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "huangjia", Email = "huangjia@qq.com", Name = "黄佳", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
            }

            if (!context.Users.Any(u => u.UserName == "zengchunling"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "zengchunling", Email = "zengchunling@qq.com", Name = "曾春龄", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
            }
            if (!context.Users.Any(u => u.UserName == "wangsirui"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "wangsirui", Email = "wangsirui@qq.com", Name = "王思睿", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Accounter");
            }

            if (!context.Users.Any(u => u.UserName == "zhonghuali"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "zhonghuali", Email = "zhonghuali@qq.com", Name = "钟华丽", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Accounter");
            }

            if (!context.Users.Any(u => u.UserName == "zoushu"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "zoushu", Email = "zoushu@qq.com", Name = "邹树", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
            }

            if (!context.Users.Any(u => u.UserName == "daidi"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "daidi", Email = "daidi@qq.com", Name = "代娣", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
                manager.AddToRole(user.Id, "ClassCharger");
            }
            if (!context.Users.Any(u => u.UserName == "wangguilian"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "wangguilian", Email = "wangguilian@qq.com", Name = "王桂莲", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
                manager.AddToRole(user.Id, "ClassCharger");
            }
            var districts = new List<District> {
                new District{ DistrictName="南昌区", DistrictAddress="南昌市枫林大街970号" ,  CreateDate=DateTime.Now, DistrictState=true}



            };
            districts.ForEach(s => context.Districts.AddOrUpdate(p => p.DistrictName, s));
            context.SaveChanges();

            var campuses = new List<Campus> {
                new Campus{  DistrictID=1, CampusName="昌北校区", CreateDate=DateTime.Now, CampusAddress="枫林大街", CampusState=true},
                new Campus{  DistrictID=1, CampusName="南工校区",  CreateDate=DateTime.Now, CampusAddress="南昌工学院", CampusState=true}


            };
            campuses.ForEach(s => context.Campuses.AddOrUpdate(p => p.CampusName, s));
            context.SaveChanges();

            var spots = new List<Spot> {
                new Spot{  CampusID=1, SpotName="世纪新宸服务点", CreateDate=DateTime.Now, SpotState=true,SpotAddress="枫林大街世纪新宸中心"},
                new Spot{  CampusID=1, SpotName="蛟桥服务点",  CreateDate=DateTime.Now, SpotState=true,SpotAddress="江西财经大学创孵中心106"},
                new Spot{  CampusID=2, SpotName="南工服务点",  CreateDate=DateTime.Now, SpotState=true,SpotAddress="南昌工学院老商业街"},


            };
            spots.ForEach(s => context.Spots.AddOrUpdate(p => p.SpotName, s));
            context.SaveChanges();
            var posts1 = new List<Post> {
                new Post{  RoleId=1, UserId=1, CreateTime=DateTime.Now, PostName="01号管理员", State=true,DistrictId=1},
          
            };
            foreach (Post e in posts1)
            {
                var enrollmentInDataBase = context.Posts.Where(
                      s => s.RoleId == e.RoleId && s.UserId== e.UserId).SingleOrDefault();
                if (enrollmentInDataBase == null)
                {
                    context.Posts.Add(e);
                }
            }
            context.SaveChanges();

            var postUsers1 = new List<PostUser> {
                new PostUser{  PostId=1, UserId=1,PostDate=DateTime.Now},
                
            };
            foreach (PostUser e in postUsers1)
            {
                var enrollmentInDataBase = context.PostUsers.Where(
                      s => s.PostId == e.PostId && s.UserId == e.UserId).SingleOrDefault();
                if (enrollmentInDataBase == null)
                {
                    context.PostUsers.Add(e);
                }
            }
            context.SaveChanges();

            var posts2= new List<Post> {
                new Post{  RoleId=5, UserId=2, CreaterId=1, CreateTime=DateTime.Now, PostName="01大区经理", State=true,DistrictId=1,},

            };
            foreach (Post e in posts2)
            {
                var enrollmentInDataBase = context.Posts.Where(
                      s => s.RoleId == e.RoleId && s.UserId == e.UserId).SingleOrDefault();
                if (enrollmentInDataBase == null)
                {
                    context.Posts.Add(e);
                }
            }
            context.SaveChanges();

            var postUsers12 = new List<PostUser> {
               new PostUser{  PostId=2, UserId=2,PostDate=DateTime.Now, PosterID=1},

            };
            foreach (PostUser e in postUsers12)
            {
                var enrollmentInDataBase = context.PostUsers.Where(
                      s => s.PostId == e.PostId && s.UserId == e.UserId).SingleOrDefault();
                if (enrollmentInDataBase == null)
                {
                    context.PostUsers.Add(e);
                }
            }
            context.SaveChanges();


            var posts3 = new List<Post> {
                new Post{  RoleId=6, UserId=3, CreaterId=2, CreateTime=DateTime.Now, PostName="01校区校长", State=true,DistrictId=1,CampusId=1,SupperId=2},
                new Post{  RoleId=7, UserId=3, CreaterId=2, CreateTime=DateTime.Now, PostName="01服务点负责人", State=true,DistrictId=1,CampusId=1,SpotId=1,SupperId=3},
                new Post{  RoleId=6, UserId=5, CreaterId=2, CreateTime=DateTime.Now, PostName="02校区校长", State=true,DistrictId=1,CampusId=2,SupperId=2},
                new Post{  RoleId=7, UserId=5, CreaterId=2, CreateTime=DateTime.Now, PostName="03服务点负责人", State=true,DistrictId=1,CampusId=2,SpotId=3,SupperId=5},
                new Post{  RoleId=7, UserId=4, CreaterId=2, CreateTime=DateTime.Now, PostName="02服务点负责人", State=true,DistrictId=1,CampusId=1,SpotId=2,SupperId=3},
                new Post{  RoleId=8, UserId=8, CreaterId=2, CreateTime=DateTime.Now, PostName="01号会计", State=true,DistrictId=1,CampusId=1,SupperId=2},
                new Post{  RoleId=8, UserId=9, CreaterId=2, CreateTime=DateTime.Now, PostName="02号会计", State=true,DistrictId=1,CampusId=1,SupperId=2},
                new Post{  RoleId=4, UserId=6, CreaterId=2, CreateTime=DateTime.Now, PostName="01课程顾问", State=true,DistrictId=1,CampusId=1,SpotId=1,SupperId=4},
                new Post{  RoleId=4, UserId=7, CreaterId=2, CreateTime=DateTime.Now, PostName="02课程顾问", State=true,DistrictId=1,CampusId=1,SpotId=1,SupperId=4},
                new Post{  RoleId=4, UserId=10, CreaterId=2, CreateTime=DateTime.Now, PostName="03课程顾问", State=true,DistrictId=1,CampusId=1,SpotId=2,SupperId=7},
                new Post{  RoleId=4, UserId=11, CreaterId=2, CreateTime=DateTime.Now, PostName="04课程顾问", State=true,DistrictId=1,CampusId=1,SpotId=2,SupperId=7},
                new Post{  RoleId=4, UserId=12, CreaterId=2, CreateTime=DateTime.Now, PostName="05课程顾问", State=true,DistrictId=1,CampusId=2,SpotId=3,SupperId=6},
                new Post{  RoleId=9, UserId=11, CreaterId=2, CreateTime=DateTime.Now, PostName="01班主任", State=true,DistrictId=1,CampusId=1,SupperId=3},
                new Post{  RoleId=9, UserId=12, CreaterId=2, CreateTime=DateTime.Now, PostName="02班主任", State=true,DistrictId=1,CampusId=2,SupperId=5}
            };
            foreach (Post e in posts3)
            {
                var enrollmentInDataBase = context.Posts.Where(
                      s => s.RoleId == e.RoleId && s.UserId == e.UserId).SingleOrDefault();
                if (enrollmentInDataBase == null)
                {
                    context.Posts.Add(e);
                }
            }
            context.SaveChanges();

            var postUsers3 = new List<PostUser> {
                
                new PostUser{  PostId=3, UserId=3,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=4, UserId=3,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=5, UserId=5,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=6, UserId=5,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=7, UserId=4,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=8, UserId=8,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=9, UserId=9,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=10, UserId=6,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=11, UserId=7,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=12, UserId=10,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=13, UserId=11,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=14, UserId=12,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=15, UserId=11,PostDate=DateTime.Now, PosterID=2},
                new PostUser{  PostId=16, UserId=12,PostDate=DateTime.Now, PosterID=2}
            };
            foreach (PostUser e in postUsers3)
            {
                var enrollmentInDataBase = context.PostUsers.Where(
                      s => s.PostId == e.PostId && s.UserId == e.UserId).SingleOrDefault();
                if (enrollmentInDataBase == null)
                {
                    context.PostUsers.Add(e);
                }
            }
            context.SaveChanges();

           


            var schools = new List<School> {
                new School{ SchoolName="财大麦庐",  CreateDate=DateTime.Parse("2017-09-18")},
                new School{ SchoolName="东华理工大学", CreateDate=DateTime.Parse("2017-09-19")},
                new School{ SchoolName="财大蛟桥校区",  CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="农商学院",  CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="南昌工学院",  CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="江西科技师范理工学院", CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="江西师大科技学院",  CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="财大现经管",  CreateDate=DateTime.Parse("2017-09-20")}
            };
            schools.ForEach(s => context.Schools.AddOrUpdate(p => p.SchoolName, s));
            context.SaveChanges();

            var classes = new List<Class> {
                 new Class{  ClassName="初级会计精讲1班", IsLock=false, CampusId=1, ProductID=1,  ChargerID=15, ClassState=ClassState.已开课, OverDate=DateTime.Parse("2018-05-20") },
                new Class{  ClassName="计算机二级Office精讲1班", IsLock=false, CampusId=1,ProductID=2, ChargerID=16, ClassState=ClassState.已开课, OverDate=DateTime.Parse("2018-05-20") }

            };
            classes.ForEach(s => context.Classes.AddOrUpdate(p => p.ClassName, s));
            context.SaveChanges();


            var students = new List<Student>
            {

                new Student{Name="聂圣林",IdCardNO="362331199801150056",SchoolID=1, Major=Major.经济类, QQ="123456789", SignerId=10,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15555555555", ClassName="会计4班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="谢欣桦",IdCardNO="441202199810160522",SchoolID=1, Major=Major.经济类, QQ="123456789",SignerId=10,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="18508227704", ClassName="会计3班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="张千千",IdCardNO="362329199612063023",SchoolID=1, Major=Major.经济类, QQ="123456789",SignerId=10,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="13667095949", ClassName="会计3班", Grade="2017",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="刘婧",IdCardNO="360301199806280028",SchoolID=1, Major=Major.经济类, QQ="123456789",SignerId=10,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="13918058861", ClassName="会计2班", Grade="2017",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="谢卓",IdCardNO="430124199711271024",SchoolID=1, Major=Major.经济类, QQ="123456789",SignerId=11,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15083873962", ClassName="会计4班", Grade="2017",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="刘倩柔",IdCardNO="360422199910173844",SchoolID=3, Major=Major.经济类, QQ="123456789",SignerId=11,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797686018", ClassName="会计1班", Grade="2015",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="陶淑敏",IdCardNO="320829199803310849",SchoolID=3, Major=Major.经济类, QQ="123456789",SignerId=11,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279109644", ClassName="会计4班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="刘峻池",IdCardNO="320382199906290021",SchoolID=3, Major=Major.经济类, QQ="123456789",SignerId=11,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="13667089964", ClassName="会计4班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="李霜",IdCardNO="441523199805236084",SchoolID=3, Major=Major.经济类, QQ="123456789",SignerId=12,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="152779172679", ClassName="会计4班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="胡思毅",IdCardNO="36068119970923081X",SchoolID=3, Major=Major.经济类, QQ="123456789",SignerId=12,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15879142964", ClassName="会计4班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="邱文玥",IdCardNO="220322199902063227",SchoolID=3, Major=Major.经济类, QQ="123456789",SignerId=12,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279172651", ClassName="会计4班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="杨川",IdCardNO="522631199706027945",SchoolID=4, Major=Major.管理类, QQ="123456789",SignerId=12,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279109976", ClassName="工管1班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="吕萌",IdCardNO="362401199809111526",SchoolID=4, Major=Major.管理类, QQ="123456789",SignerId=12,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="18702600671", ClassName="工管1班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="陈剑寅",IdCardNO="362202199806070031",SchoolID=4, Major=Major.经济类, QQ="123456789",SignerId=12,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279107597", ClassName="会计4班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="廖美君",IdCardNO="362203199711287349",SchoolID=4, Major=Major.经济类, QQ="123456789",SignerId=12,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15070832022", ClassName="会计4班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="袁旭",IdCardNO="360782199608070038",SchoolID=5, Major=Major.经济类, QQ="123456789",SignerId=13,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279173631", ClassName="会计4班", Grade="2015",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="孙大越",IdCardNO="320829199906060109",SchoolID=5, Major=Major.经济类, QQ="123456789",SignerId=13,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="17770062410", ClassName="会计4班", Grade="2015",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="张琳",IdCardNO="622826199806033326",SchoolID=5, Major=Major.经济类, QQ="123456789",SignerId=13,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="13970865983", ClassName="会计4班", Grade="2015",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="王晓慧",IdCardNO="371327199710061222",SchoolID=5, Major=Major.经济类, QQ="123456789",SignerId=13,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="13097333305", ClassName="会计4班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="吴金霞",IdCardNO="36068119971216362X",SchoolID=5, Major=Major.经济类, QQ="123456789",SignerId=13,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="18166036979", ClassName="会计4班", Grade="2017",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="凌晶",IdCardNO="360681199711242326",SchoolID=6, Major=Major.教育类, QQ="123456789",SignerId=13,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797937949", ClassName="英语2班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="陈凡",IdCardNO="360681199602253136",SchoolID=6, Major=Major.教育类, QQ="123456789",SignerId=13,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="18166036975", ClassName="英语2班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="晏贞",IdCardNO="360681199511233662",SchoolID=6, Major=Major.教育类, QQ="123456789",SignerId=14,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="18270516233", ClassName="英语2班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="吕祎凡",IdCardNO="360681199712189531",SchoolID=6, Major=Major.教育类, QQ="123456789",SignerId=14,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="17770808783", ClassName="英语2班", Grade="2016",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="吕娇娇",IdCardNO="360681199607092322",SchoolID=7, Major=Major.经济类, QQ="123456789",SignerId=14,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797938468", ClassName="会计4班", Grade="2017",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="成佳祺",IdCardNO="360681199609104521",SchoolID=7, Major=Major.经济类, QQ="123456789",SignerId=14,Education=Education.本科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797687220", ClassName="会计2班", Grade="2017",Nation=Nation.汉族,Schedule="000101010101001001010"},
               new Student{Name="邹燕萍",IdCardNO="360681199511242223",SchoolID=8, Major=Major.经济类, QQ="123456789",SignerId=14,Education=Education.专科,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797659779", ClassName="会计4班", Grade="2017",Nation=Nation.汉族,Schedule="000101010101001001010"},

            };

            students.ForEach(s => context.Students.AddOrUpdate(p => p.IdCardNO, s));
            context.SaveChanges();

            var enrollments = new List<Enrollment>{
                 new Enrollment{ StudentID = 1,
                 ClassID =1,  EnrollDate=DateTime.Parse("2017-02-22"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID = 1,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-02-23"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID = 2,
                 ClassID = 1, EnrollDate=DateTime.Parse("2017-02-24"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =2,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-02-25"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =3,
                 ClassID = 1, EnrollDate=DateTime.Parse("2017-02-26"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =3,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-02-27"),
                 EnrollmentState=EnrollmentState.缴费 },
                new Enrollment{ StudentID =4,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-02-28"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =4,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-01"),
                 EnrollmentState=EnrollmentState.缴费 },
                 new Enrollment{ StudentID =5,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-02"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID = 5,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-03"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID = 6,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-04"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID = 6,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-05"),
                 EnrollmentState=EnrollmentState.缴费 },
                new Enrollment{ StudentID = 7,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-06"),
                 EnrollmentState=EnrollmentState.缴费 },
                new Enrollment{ StudentID =7,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-07"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =8,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-08"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =9,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-09"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =10,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-10"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =11,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-11"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =12,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-12"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =13,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-13"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =14,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-14"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =15,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-15"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =16,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-16"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =17,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-17"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =18,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-18"),
                 EnrollmentState=EnrollmentState.缴费},
                new Enrollment{ StudentID =19,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-19"),
                 EnrollmentState=EnrollmentState.缴费}
            };
            foreach (Enrollment e in enrollments)
            {
                var enrollmentInDataBase = context.Enrollments.Where(
                      s => s.StudentID == e.StudentID && s.Class.Id == e.ClassID).SingleOrDefault();
                if (enrollmentInDataBase == null)
                {
                    context.Enrollments.Add(e);
                }
            }
            context.SaveChanges();



            var userDiploms = new List<StudentDiploma>
            {
                new StudentDiploma{ DiplomaID=1, StudentID=1,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=2,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=3,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=4,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=5,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=6,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=7,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=8,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=9,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=10,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=11,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=12,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=13,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=14,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=15,CreateTime=DateTime.Parse("2017-03-18")},
                new StudentDiploma{ DiplomaID=1, StudentID=16,CreateTime=DateTime.Parse("2017-03-18")}

            };
            foreach (StudentDiploma e in userDiploms)
            {
                var enrollmentInDataBase = context.StudentDiplomas.Where(
                      s => s.StudentID == e.StudentID && s.DiplomaID == e.DiplomaID).SingleOrDefault();
                if (enrollmentInDataBase == null)
                {
                    context.StudentDiplomas.Add(e);
                }
            }
            context.SaveChanges();

            //var units = new List<Unit> { 
            //    new Unit{ SectionID=1, UnitName="数据类型及其运算", Sort=1},
            //    new Unit{ SectionID=1, UnitName="输入和输出",Sort=2},
            //    new Unit{ SectionID=1, UnitName="选择结构",Sort=3},
            //    new Unit{ SectionID=1, UnitName="循环结构",Sort=4},
            //    new Unit{ SectionID=1, UnitName="数组",Sort=5},
            //    new Unit{ SectionID=1, UnitName="函数",Sort=6},
            //    new Unit{ SectionID=1, UnitName="宏定义和预处理",Sort=7},
            //    new Unit{ SectionID=1, UnitName="指针",Sort=8},
            //    new Unit{ SectionID=1, UnitName="文件操作",Sort=9},
            //    new Unit{ SectionID=2, UnitName="真题一",Sort=1},
            //    new Unit{ SectionID=2, UnitName="真题二",Sort=2},
            //    new Unit{ SectionID=2, UnitName="真题三",Sort=3},
            //    new Unit{ SectionID=2, UnitName="真题四",Sort=4},
            //    new Unit{ SectionID=2, UnitName="真题五",Sort=5},
            //    new Unit{ SectionID=3, UnitName="算法",Sort=1},
            //    new Unit{ SectionID=3, UnitName="软件设计",Sort=2},
            //    new Unit{ SectionID=3, UnitName="数据库设计",Sort=3},                
            //    new Unit{ SectionID=4, UnitName="Word基本操作",Sort=1},
            //    new Unit{ SectionID=4, UnitName="Execl基本操作",Sort=2},
            //    new Unit{ SectionID=4, UnitName="PPt基本操作",Sort=3},
            //    new Unit{ SectionID=5, UnitName="计算机基础知识",Sort=1},
            //    new Unit{ SectionID=5, UnitName="硬件和软件",Sort=2},
            //    new Unit{ SectionID=5, UnitName="网络",Sort=3},
            //    new Unit{ SectionID=6, UnitName="真题一",Sort=1},
            //    new Unit{ SectionID=6, UnitName="真题二",Sort=2},
            //    new Unit{ SectionID=6, UnitName="真题三",Sort=3},
            //    new Unit{ SectionID=6, UnitName="真题四",Sort=4},
            //    new Unit{ SectionID=6, UnitName="真题五",Sort=5},
            //    new Unit{ SectionID=7, UnitName="算法",Sort=1},
            //    new Unit{ SectionID=7, UnitName="软件设计",Sort=2},
            //    new Unit{ SectionID=7, UnitName="数据库设计",Sort=3},        
            //    new Unit{ SectionID=8, UnitName="算法",Sort=1},
            //    new Unit{ SectionID=8, UnitName="软件设计",Sort=2},
            //    new Unit{ SectionID=8, UnitName="数据库设计",Sort=3}

            //};
            //units.ForEach(s => context.Units.Add(s));
            //context.SaveChanges();

            //var lessons = new List<Lesson> { 
            //    new Lesson{  UnitID=1, LessonName="整型常量", CreateTime=DateTime.Parse("2017-02-08"), LessonType=LessonType.视频,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=1, LessonName="实型常量",LessonType=LessonType.视频,Sort=2,IsTrial=true},
            //    new Lesson{  UnitID=2, LessonName="%d格式输出",LessonType=LessonType.视频,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=2, LessonName="%f格式输出",LessonType=LessonType.视频,Sort=2,IsTrial=true},
            //    new Lesson{  UnitID=3, LessonName="if结构",LessonType=LessonType.视频,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=3, LessonName="switch结构",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=4, LessonName="while循环",LessonType=LessonType.视频,Sort=1},
            //    new Lesson{  UnitID=4, LessonName="for循环",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=5, LessonName="一维数组",LessonType=LessonType.视频,Sort=1},
            //    new Lesson{  UnitID=5, LessonName="二维数组",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=6, LessonName="函数定义",LessonType=LessonType.视频,Sort=1},
            //    new Lesson{  UnitID=6, LessonName="函数调用",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=7, LessonName="#define命令",LessonType=LessonType.视频,Sort=1},
            //    new Lesson{  UnitID=7, LessonName="带参数的宏",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=8, LessonName="指针的含义",LessonType=LessonType.视频,Sort=1},
            //    new Lesson{  UnitID=8, LessonName="一维数组的指针",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=9, LessonName="文件类型",LessonType=LessonType.视频,Sort=1},
            //    new Lesson{  UnitID=9, LessonName="文件读写",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=18, LessonName="段落格式",LessonType=LessonType.视频,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=18, LessonName="样式设置",LessonType=LessonType.视频,Sort=2,IsTrial=true},
            //    new Lesson{  UnitID=19, LessonName="数据导入",LessonType=LessonType.视频,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=19, LessonName="常用函数",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=20, LessonName="幻灯片格式",LessonType=LessonType.视频,Sort=1},
            //    new Lesson{  UnitID=20, LessonName="动画设置",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=13, LessonName="算法的概念",LessonType=LessonType.视频,Sort=1},
            //    new Lesson{  UnitID=13, LessonName="算法的特性",LessonType=LessonType.视频,Sort=2},
            //    new Lesson{  UnitID=15, LessonName="软件周期",LessonType=LessonType.视频,Sort=1},
            //    new Lesson{  UnitID=15, LessonName="软件设计工具",LessonType=LessonType.视频,Sort=2}


            //};
            //lessons.ForEach(s => context.Lessons.Add(s));
            //context.SaveChanges();

            ////var exercises = new List<Exercise> { 
            ////    new Exercise{ LessonID=1, QuestionID=1},
            ////    new Exercise{ LessonID=1, QuestionID=2},
            ////    new Exercise{ LessonID=2, QuestionID=3},
            ////    new Exercise{ LessonID=2, QuestionID=4},
            ////    new Exercise{ LessonID=3, QuestionID=5},
            ////    new Exercise{ LessonID=3, QuestionID=6}

            ////};
            ////exercises.ForEach(s => context.Exercises.Add(s));
            ////context.SaveChanges();
            //var questions = new List<Exercise> { 
            //    new Exercise{ LessonID=1, Sort=1,  Category=ExerciseCategory.单选题, ExerciseBody="以下不是整型常量的是", TextAnalysis="这是题目解析"},
            //    new Exercise{ LessonID=1, Sort=2, Category=ExerciseCategory.单选题,  ExerciseBody="以下不是实型常量的是", TextAnalysis="这是题目解析"},
            //    new Exercise{ LessonID=2, Sort=1, Category=ExerciseCategory.单选题,  ExerciseBody="在C语言中，语句结束的标志是？ ______ 。", TextAnalysis="C语言中语句结束的标志是分号。"},
            //    new Exercise{ LessonID=2,Sort=2,Category=ExerciseCategory.单选题,  ExerciseBody="全国计算机等级考试无纸化“通过”的条件是 ______ 。", TextAnalysis="通过条件是：只需总分高于60分即可。"},
            //     new Exercise{ LessonID=3,Sort=1,Category=ExerciseCategory.单选题,  ExerciseBody="若变量x、y已正确定义并赋值，以下符合C语言语法的表达式是", TextAnalysis="赋值运算符“=”的左边必须是变量"},
            //    new Exercise{  LessonID=3,Sort=2,Category=ExerciseCategory.单选题,  ExerciseBody="以下定义语句中正确的是", TextAnalysis="变量必须先定义，后使用"}



            //};
            //questions.ForEach(s => context.Exercises.Add(s));
            //context.SaveChanges();

            //var options = new List<Option> { 
            //    new Option{ ExerciseID=1, Content="12", IsCorrect=false},
            //    new Option{ ExerciseID=1, Content="011", IsCorrect=false},
            //    new Option{ ExerciseID=1, Content="0x12", IsCorrect=false},
            //    new Option{ ExerciseID=1, Content="018", IsCorrect=true},
            //    new Option{ ExerciseID=2, Content="12.1", IsCorrect=false},
            //    new Option{ ExerciseID=2, Content="12e2", IsCorrect=false},
            //    new Option{ ExerciseID=2, Content="12e0.2", IsCorrect=true},
            //    new Option{ ExerciseID=2, Content="12.0", IsCorrect=false},
            //    new Option{ ExerciseID=3, Content="分号“;”", IsCorrect=true},
            //    new Option{ ExerciseID=3, Content="换行（回车）", IsCorrect=false},
            //    new Option{ ExerciseID=4, Content="只需总分高于60分即可", IsCorrect=true},
            //    new Option{ ExerciseID=4, Content="总分高于60分，同时操作题高于36分", IsCorrect=false},
            //    new Option{ ExerciseID=5, Content="++x,y=x--", IsCorrect=true},
            //    new Option{ ExerciseID=5, Content="x+1=y", IsCorrect=false},
            //    new Option{ ExerciseID=5, Content="x=x+10=x+y", IsCorrect=false},
            //    new Option{ ExerciseID=5, Content="double(x)/10", IsCorrect=false},
            //    new Option{ ExerciseID=6, Content="char  A=65+1,b='b';", IsCorrect=true},
            //    new Option{ ExerciseID=6, Content="int  a=b=0;", IsCorrect=false},
            //    new Option{ ExerciseID=6, Content="float  a=1,*b=&a,*c=&b;", IsCorrect=false},
            //    new Option{ ExerciseID=6, Content="double  a=0.0; b=1.1;", IsCorrect=false}

            //};
            //options.ForEach(s => context.Options.Add(s));
            //context.SaveChanges();
            //var logs = new List<ActiveLog> { 
            //    new ActiveLog{  ActiveType=ActiveType.Ask, Point=10, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Ask, Point=10, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Ask, Point=10, UserID=4},
            //    new ActiveLog{  ActiveType=ActiveType.Ask, Point=10, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Ask, Point=10, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Answer, Point=1, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Answer, Point=1, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Answer, Point=1, UserID=4},
            //    new ActiveLog{  ActiveType=ActiveType.Answer, Point=1, UserID=5},
            //    new ActiveLog{  ActiveType=ActiveType.Answer, Point=1, UserID=5},
            //    new ActiveLog{  ActiveType=ActiveType.Answer, Point=1, UserID=5},
            //    new ActiveLog{  ActiveType=ActiveType.Answer, Point=1, UserID=5},
            //    new ActiveLog{  ActiveType=ActiveType.Answer, Point=1, UserID=5},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=2, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=3, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=6, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=7, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=8, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=2, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=3, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=6, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=7, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Play, Point=8, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Release, Point=1, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Release, Point=1, UserID=2},
            //    new ActiveLog{  ActiveType=ActiveType.Release, Point=1, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Release, Point=1, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Release, Point=1, UserID=3},
            //    new ActiveLog{  ActiveType=ActiveType.Release, Point=1, UserID=4},
            //    new ActiveLog{  ActiveType=ActiveType.Release, Point=1, UserID=4},
            //    new ActiveLog{  ActiveType=ActiveType.Release, Point=1, UserID=4}, 
            //    new ActiveLog{  ActiveType=ActiveType.Release, Point=1, UserID=4} 
            //};
            //logs.ForEach(s => context.ActiveLogs.Add(s));
            //context.SaveChanges();

            //var category1s = new List<Category1> { 
            //   new Category1{ SubjectID=5,Catetory_1Name="VIP答疑", OrderIndex=1},
            //   new Category1{ SubjectID=5,Catetory_1Name="班级活动", OrderIndex=2},
            //   new Category1{ SubjectID=5,Catetory_1Name="考试资讯", OrderIndex=3},
            //   new Category1{ SubjectID=5,Catetory_1Name="备考干货", OrderIndex=4},
            //   new Category1{ SubjectID=2,Catetory_1Name="VIP答疑", OrderIndex=1},
            //   new Category1{ SubjectID=2,Catetory_1Name="班级活动", OrderIndex=2},
            //   new Category1{ SubjectID=2,Catetory_1Name="考试资讯", OrderIndex=3},
            //   new Category1{ SubjectID=2,Catetory_1Name="备考干货", OrderIndex=4}
            //};
            //category1s.ForEach(s => context.Category1s.Add(s));
            //context.SaveChanges();


            //var category2s = new List<Category2> { 
            //   new Category2{ Category1ID=1,Catetory_2Name="Office",OrderIndex=1},
            //   new Category2{ Category1ID=1,Catetory_2Name="C语言",OrderIndex=2},
            //   new Category2{ Category1ID=2,Catetory_2Name="公告",OrderIndex=1},
            //   new Category2{ Category1ID=2,Catetory_2Name="活动",OrderIndex=2},
            //   new Category2{ Category1ID=3,Catetory_2Name="通知",OrderIndex=1},
            //   new Category2{ Category1ID=4,Catetory_2Name="Office",OrderIndex=1},
            //   new Category2{ Category1ID=4,Catetory_2Name="C语言",OrderIndex=2}
            //};
            //category2s.ForEach(s => context.Category2s.Add(s));
            //context.SaveChanges();

            //var replys = new List<Reply> { 
            //    new Reply{ UserID=3, ReplyID=1,RootID=1, ReplyType=ReplyType.Discuss, Level=1, Content="这是回复内容",  ToUserID=2 , ActiveLogID=6},
            //    new Reply{ UserID=2, ReplyID=1, RootID=1,ReplyType=ReplyType.Discuss,Level=2, Content="这是回复内容", ToUserID=3 , ActiveLogID=7 },
            //    new Reply{ UserID=4, ReplyID=2, RootID=1,ReplyType=ReplyType.Discuss,Level=3, Content="这是回复内容", ToUserID=2  , ActiveLogID=8},
            //    new Reply{ UserID=5, ReplyID=1, RootID=1,ReplyType=ReplyType.Discuss,Level=1, Content="这是回复内容", ToUserID=2 , ActiveLogID=9 },
            //    new Reply{ UserID=5, ReplyID=2,RootID=2, ReplyType=ReplyType.Discuss,Level=1, Content="这是回复内容", ToUserID=3  , ActiveLogID=10}, 
            //    new Reply{ UserID=5, ReplyID=3,RootID=3, ReplyType=ReplyType.Discuss,Level=1, Content="这是回复内容", ToUserID=4 , ActiveLogID=11}, 
            //    new Reply{ UserID=5, ReplyID=4,RootID=4, ReplyType=ReplyType.Discuss,Level=1, Content="这是回复内容", ToUserID=2 , ActiveLogID=12 }, 
            //    new Reply{ UserID=5, ReplyID=5,RootID=5, ReplyType=ReplyType.Discuss,Level=1, Content="这是回复内容", ToUserID=3  , ActiveLogID=13}
            //};
            //replys.ForEach(s => context.Replys.Add(s));
            //context.SaveChanges();


            //var discusses = new List<Discuss> { 
            //    new Discuss{ LessonID=1,ExerciseID=1,ClassID=2, ProductID=1, Category2ID=2, Title="这是标题", UserID=2, Content="这是discuss的内容" , ReplyTimes=4, LatestReplyID=4,ActiveLogID=1 },
            //    new Discuss{ LessonID=1,ExerciseID=1, ClassID=2,ProductID=1,Category2ID=2,  Title="这是标题", UserID=3, Content="这是discuss的内容" , ReplyTimes=1, LatestReplyID=5,ActiveLogID=2  },
            //    new Discuss{ LessonID=1,ExerciseID=2,ClassID=2,ProductID=1,Category2ID=2,  Title="这是标题", UserID=4, Content="这是discuss的内容" , ReplyTimes=1, LatestReplyID=6,ActiveLogID=3 },
            //    new Discuss{ LessonID=2,Category2ID=2,ClassID=2,ProductID=1, Title="这是标题", UserID=2, Content="这是discuss的内容" , ReplyTimes=1, LatestReplyID=7,ActiveLogID=4  },
            //    new Discuss{ LessonID=2,Category2ID=2, ClassID=2,ProductID=1,Title="这是标题", UserID=3, Content="这是discuss的内容" , ReplyTimes=1, LatestReplyID=8 ,ActiveLogID=5 }


            //};
            //discusses.ForEach(s => context.Discusss.Add(s));
            //context.SaveChanges();


            //var notes = new List<Note> { 
            //    new Note{  LessonID=1, UserID=1,  Content="这是第一课官方笔记的内容" },
            //    new Note{  LessonID=2, UserID=1,  Content="这是第二课官方笔记的内容" },
            //    new Note{  LessonID=3, UserID=1,  Content="这是第三课官方笔记的内容" },
            //    new Note{  LessonID=4, UserID=1,  Content="这是第四课官方笔记的内容" },
            //    new Note{  LessonID=5, UserID=1,  Content="这是第五课官方笔记的内容" },
            //    new Note{  LessonID=1, UserID=2,  Content="这是笔记的内容" },
            //    new Note{  LessonID=1, UserID=3,  Content="这是笔记的内容" },
            //    new Note{  LessonID=1, UserID=4,  Content="这是笔记的内容" },
            //    new Note{  LessonID=2, UserID=2,  Content="这是笔记的内容" },
            //    new Note{  LessonID=2, UserID=3,  Content="这是笔记的内容" }


            //};
            //notes.ForEach(s => context.Notes.Add(s));
            //context.SaveChanges();


            //var articles = new List<Article> { 
            //    new Article{UserID=2, Category2ID=6, ActiveLogID=24, Content="这是资讯的内容", Title="这是标题"},
            //    new Article{UserID=2, Category2ID=6,ActiveLogID=25,  Content="这是资讯的内容", Title="这是标题"},
            //    new Article{UserID=3, Category2ID=6, ActiveLogID=26, Content="这是资讯的内容", Title="这是标题"},
            //    new Article{UserID=3, Category2ID=6, ActiveLogID=27, Content="这是资讯的内容", Title="这是标题"},
            //    new Article{UserID=3, Category2ID=6,ActiveLogID=28,  Content="这是资讯的内容", Title="这是标题"},
            //    new Article{UserID=4, Category2ID=7, ActiveLogID=29, Content="这是资讯的内容", Title="这是标题"},
            //    new Article{UserID=4, Category2ID=7,ActiveLogID=30,  Content="这是资讯的内容", Title="这是标题"},
            //    new Article{UserID=4, Category2ID=7, ActiveLogID=31, Content="这是资讯的内容", Title="这是标题"},
            //    new Article{UserID=4, Category2ID=7,ActiveLogID=32,  Content="这是资讯的内容", Title="这是标题"}                                         
            //};
            //articles.ForEach(s => context.Articles.Add(s));
            //context.SaveChanges();

            //var comments = new List<Comment> { 
            //    new Comment{  UserID=2, TopicID=1, TopicType=TopicType.Lesson, Content="这是评论的内容" },
            //    new Comment{  UserID=2, TopicID=2, TopicType=TopicType.Lesson, Content="这是评论的内容" },
            //    new Comment{  UserID=3, TopicID=1, TopicType=TopicType.Lesson, Content="这是评论的内容" },
            //    new Comment{  UserID=3, TopicID=2, TopicType=TopicType.Lesson, Content="这是评论的内容" },
            //    new Comment{  UserID=4, TopicID=1, TopicType=TopicType.Lesson, Content="这是评论的内容" },
            //    new Comment{  UserID=4, TopicID=2, TopicType=TopicType.Lesson, Content="这是评论的内容" },
            //    new Comment{  UserID=2, TopicID=1, TopicType=TopicType.Article, Content="这是评论的内容" },
            //    new Comment{  UserID=2, TopicID=2, TopicType=TopicType.Article, Content="这是评论的内容" },
            //    new Comment{  UserID=3, TopicID=1, TopicType=TopicType.Article, Content="这是评论的内容" }                                             
            //};
            //comments.ForEach(s => context.Comments.Add(s));
            //context.SaveChanges();




            //var records = new List<StudyRecord> { 
            //    new StudyRecord{ UserID=2, LessonID=1,ClassID=2, RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-11") ,ActiveLogID=14},
            //    new StudyRecord{ UserID=2, LessonID=2,ClassID=2,  RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-12") ,ActiveLogID=15},
            //    new StudyRecord{ UserID=2, LessonID=3,ClassID=2,  RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-13"),ActiveLogID=16 },
            //    new StudyRecord{ UserID=2, LessonID=4,ClassID=2,  RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-14"),ActiveLogID=17 },
            //    new StudyRecord{ UserID=2, LessonID=5,ClassID=2,  RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-15") ,ActiveLogID=18},
            //    new StudyRecord{ UserID=3, LessonID=1,ClassID=2,  RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-16"),ActiveLogID=19 },
            //    new StudyRecord{ UserID=3, LessonID=2,ClassID=2,  RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-17"),ActiveLogID=20 },
            //    new StudyRecord{ UserID=3, LessonID=3,ClassID=2,  RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-18") ,ActiveLogID=21},
            //    new StudyRecord{ UserID=3, LessonID=4,ClassID=2,  RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-19"),ActiveLogID=22 },
            //    new StudyRecord{ UserID=3, LessonID=5, ClassID=2, RecordState=RecordState.已完成, FinishDate=DateTime.Parse("2016-09-20") ,ActiveLogID=23}

            //};
            //records.ForEach(s => context.StudyRecords.Add(s));
            //context.SaveChanges();

            //var erecords = new List<ExerciseRecord> { 
            //    new ExerciseRecord{ UserID=2, ClassID=2, ExerciseID=1, MyAnswer="2", IsCorrect=false, Collected=true, Note="备注"},
            //    new ExerciseRecord{ UserID=2,ClassID=2, ExerciseID=2, MyAnswer="7", IsCorrect=true, Collected=false, Note="备注"},
            //    new ExerciseRecord{ UserID=2,ClassID=2, ExerciseID=3, MyAnswer="10", IsCorrect=false, Collected=true, Note="备注"},
            //    new ExerciseRecord{ UserID=2,ClassID=2, ExerciseID=4, MyAnswer="12", IsCorrect=false, Collected=true, Note="备注"},
            //    new ExerciseRecord{ UserID=3,ClassID=2, ExerciseID=1, MyAnswer="2", IsCorrect=false, Collected=true, Note="备注"},
            //    new ExerciseRecord{ UserID=3,ClassID=2, ExerciseID=2, MyAnswer="7", IsCorrect=true, Collected=false, Note="备注"},
            //    new ExerciseRecord{ UserID=3,ClassID=2, ExerciseID=3, MyAnswer="10", IsCorrect=false, Collected=true, Note="备注"},
            //    new ExerciseRecord{ UserID=3,ClassID=2, ExerciseID=4, MyAnswer="12", IsCorrect=false, Collected=true, Note="备注"}
            //};
            //erecords.ForEach(s => context.ExerciseRecords.Add(s));
            //context.SaveChanges();


            // var receive = new List<UserCoupon> { 
            //    new UserCoupon{ CouponID=1, UserID=2, ReceiveDate=DateTime.Parse("2017-06-18"),},
            //    new UserCoupon{ CouponID=2, UserID=2, ReceiveDate=DateTime.Parse("2017-06-18"),},
            //    new UserCoupon{ CouponID=3, UserID=2, ReceiveDate=DateTime.Parse("2017-06-18"),},
            //    new UserCoupon{ CouponID=4, UserID=2, ReceiveDate=DateTime.Parse("2017-06-18"),},
            //    new UserCoupon{ CouponID=5, UserID=2, ReceiveDate=DateTime.Parse("2017-06-18"),}

            //};
            // receive.ForEach(s => context.UserCoupons.Add(s));
            //context.SaveChanges();
        }
    }
}

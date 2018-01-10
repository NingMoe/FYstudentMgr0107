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
                new Diploma{ DiplomaName="��Ƴ���ְ���ʸ�֤", DiplomaState=true, CreateDate=DateTime.Parse("2017-09-12")},
                new Diploma{ DiplomaName="���������Office", DiplomaState=true, CreateDate=DateTime.Parse("2017-09-13")},
                new Diploma{ DiplomaName="���������C����", DiplomaState=true, CreateDate=DateTime.Parse("2017-09-14")},
                new Diploma{ DiplomaName="17��������", DiplomaState=true, CreateDate=DateTime.Parse("2017-09-15")}
            };
            diploms.ForEach(s => context.Diplomas.AddOrUpdate(p => p.DiplomaName, s));
            context.SaveChanges();


            //var teachers = new List<Worker> {
            //    new Worker{ Name="����", MobilePhoneNO="15307000257"},
            //    new Worker{ Name="С����", MobilePhoneNO="15307000257", ParentID=1},
            //    new Worker{ Name="���ľ�", MobilePhoneNO="15307000257",ParentID=2},
            //    new Worker{ Name="������", MobilePhoneNO="15307000257"}

            //};
            //teachers.ForEach(s => context.Workers.AddOrUpdate(p => p.Name, s));
            //context.SaveChanges();


            var categorys = new List<Category> {
                new Category{ CategoryName ="������ȼ�����", State=true,  Sort=1 },
                new Category{ CategoryName ="��ƽ���", State=true,  Sort=2},


            };
            categorys.ForEach(s => context.Categorys.AddOrUpdate(p => p.CategoryName, s));
            context.SaveChanges();

            var subjects = new List<Subject> {
                new Subject{ Name ="������ѵ��", State=true, CategoryId=2, Sort=1 , CreateTime=DateTime.Now},
                new Subject{ Name ="�����������ѵ", State=true, CategoryId=1, Sort=2,CreateTime=DateTime.Now},
                new Subject{ Name ="��Ƽ�������", State=true, CategoryId=2, Sort=3,CreateTime=DateTime.Now}


            };
            subjects.ForEach(s => context.Subjects.AddOrUpdate(p => p.Name, s));
            context.SaveChanges();

            var courses = new List<Product> {
                new Product{ProductName="���������ʦ��", State=true, CreateDate=DateTime.Parse("2017-09-20"),OverDate=DateTime.Parse("2018-03-20"),Price=1280,  SubjectId=1,  IsDiscountForOld=false, Sort=1},
                new Product{ProductName="���������Office������",State=true, CreateDate=DateTime.Parse("2017-09-20"),OverDate=DateTime.Parse("2018-03-20"),Price=480,SubjectId=2,  IsDiscountForOld=false, Sort=1},
                new Product{ProductName="18���������", State=true, CreateDate=DateTime.Parse("2017-09-20"),OverDate=DateTime.Parse("2018-03-20"),Price=120,SubjectId=3,  IsDiscountForOld=true, Sort=1, DiscountValue=10, AccordIdList="1,"}

            };
            courses.ForEach(s => context.Products.AddOrUpdate(p => p.ProductName, s));
            context.SaveChanges();

            //var coupons = new List<Coupon> { 
            //    new Coupon{ CouponName="�����ѧԺ�γ���������30Ԫ",  OverDate=DateTime.Parse("2017-06-30"), Rule="����ƽ̨��PC��������App <br>1. ÿ������һ�ţ�һ����ʹ�ã������㡣<br>2. �����������Ż�ȯ����ʹ�á�<br>3. ��ȯ�����������Żݻͬ����������Ԥ�ۿγ̡�<br>4. �籨��ʱδʹ�ñ�ȯ���������Զ�������<br>5. ��ȯ�����˻���������Чʱ�佫�޷�ʹ�á�<br>6. ���Ż�ȯ���˻��󶨣�����ת�á�", Type=CouponType.���ϼ�, Vlaue=30, State=true},
            //    new Coupon{ CouponName="�����ѧԺ�γ���������60Ԫ", OverDate=DateTime.Parse("2017-06-30"), Rule="����ƽ̨��PC��������App <br>1. ÿ������һ�ţ�һ����ʹ�ã������㡣<br>2. �����������Ż�ȯ����ʹ�á�<br>3. ��ȯ�����������Żݻͬ����������Ԥ�ۿγ̡�<br>4. �籨��ʱδʹ�ñ�ȯ���������Զ�������<br>5. ��ȯ�����˻���������Чʱ�佫�޷�ʹ�á�<br>6. ���Ż�ȯ���˻��󶨣�����ת�á�", Type=CouponType.���ϼ�, Vlaue=60, State=true},

            //    new Coupon{ CouponName="���ѧԺ�γ���������60Ԫ", OverDate=DateTime.Parse("2017-06-30"), Rule="����ƽ̨��PC��������App <br>1. ÿ������һ�ţ�һ����ʹ�ã������㡣<br>2. �����������Ż�ȯ����ʹ�á�<br>3. ��ȯ�����������Żݻͬ����������Ԥ�ۿγ̡�<br>4. �籨��ʱδʹ�ñ�ȯ���������Զ�������<br>5. ��ȯ�����˻���������Чʱ�佫�޷�ʹ�á�<br>6. ���Ż�ȯ���˻��󶨣�����ת�á�", Type=CouponType.���ϼ�, Vlaue=60, State=true},
            //    new Coupon{ CouponName="���ѧԺ�γ���������50Ԫ",  OverDate=DateTime.Parse("2017-06-30"), Rule="����ƽ̨��PC��������App <br>1. ÿ������һ�ţ�һ����ʹ�ã������㡣<br>2. �����������Ż�ȯ����ʹ�á�<br>3. ��ȯ�����������Żݻͬ����������Ԥ�ۿγ̡�<br>4. �籨��ʱδʹ�ñ�ȯ���������Զ�������<br>5. ��ȯ�����˻���������Чʱ�佫�޷�ʹ�á�<br>6. ���Ż�ȯ���˻��󶨣�����ת�á�", Type=CouponType.���ϼ�, Vlaue=50, State=true},
            //    new Coupon{ CouponName="���ѧԺ�γ���������108Ԫ", OverDate=DateTime.Parse("2017-06-22"), Rule="����ƽ̨��PC��������App <br>1. ÿ������һ�ţ�һ����ʹ�ã������㡣<br>2. �����������Ż�ȯ����ʹ�á�<br>3. ��ȯ�����������Żݻͬ����������Ԥ�ۿγ̡�<br>4. �籨��ʱδʹ�ñ�ȯ���������Զ�������<br>5. ��ȯ�����˻���������Чʱ�佫�޷�ʹ�á�<br>6. ���Ż�ȯ���˻��󶨣�����ת�á�", Type=CouponType.���ϼ�, Vlaue=108, State=true}

            //};
            //coupons.ForEach(s => context.Coupons.Add(s));
            //context.SaveChanges();

          


            //var qusBanks = new List<QusBank> { 
            //    new QusBank{ProductID=1,BankName="����C���Ա����������", BankDescription="�����������꿼�Ա��Բ�����������"},
            //    new QusBank{ProductID=2,BankName="����Office�����������", BankDescription="�����������꿼�Ա��Բ�����������"}
            //};
            //qusBanks.ForEach(s => context.QusBanks.Add(s));
            //context.SaveChanges();

            //var chapters = new List<Chapter> { 
            //    new Chapter{ ChapterName="�������ͼ�������", Sort=1, QusBankID=1},
            //    new Chapter{ ChapterName="���������", Sort=2,  QusBankID=1},
            //    new Chapter{ ChapterName="ѡ��ṹ", Sort=3,  QusBankID=1}

            //};
            //chapters.ForEach(s => context.Chapters.Add(s));
            //context.SaveChanges();

            //var qus = new List<Question> { 
            //    new Question{ ChapterID=1, Sort=1,   Category=QuestionCategory.��ѡ��, QuestionBody="���²������ͳ�������", TextAnalysis="������Ŀ����"},
            //    new Question{ ChapterID=1, Sort=2, Category=QuestionCategory.��ѡ��,  QuestionBody="���²���ʵ�ͳ�������", TextAnalysis="������Ŀ����"},
            //    new Question{ ChapterID=2, Sort=1, Category=QuestionCategory.��ѡ��,  QuestionBody="��C�����У��������ı�־�ǣ� ______ ��", TextAnalysis="C�������������ı�־�Ƿֺš�"},
            //    new Question{ ChapterID=2,Sort=2,Category=QuestionCategory.��ѡ��,  QuestionBody="ȫ��������ȼ�������ֽ����ͨ������������ ______ ��", TextAnalysis="ͨ�������ǣ�ֻ���ָܷ���60�ּ��ɡ�"},
            //     new Question{ ChapterID=3,Sort=1,Category=QuestionCategory.��ѡ��,  QuestionBody="������x��y����ȷ���岢��ֵ�����·���C�����﷨�ı��ʽ��", TextAnalysis="��ֵ�������=������߱����Ǳ���"},
            //    new Question{  ChapterID=3,Sort=2,Category=QuestionCategory.��ѡ��,  QuestionBody="���¶����������ȷ����", TextAnalysis="���������ȶ��壬��ʹ��"}



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
            //    new QusOption{ QuestionID=3, Content="�ֺš�;��", IsCorrect=true},
            //    new QusOption{ QuestionID=3, Content="���У��س���", IsCorrect=false},
            //    new QusOption{ QuestionID=4, Content="ֻ���ָܷ���60�ּ���", IsCorrect=true},
            //    new QusOption{ QuestionID=4, Content="�ָܷ���60�֣�ͬʱ���������36��", IsCorrect=false},
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
                var role = new ApplicationRole { Name = "Admin" , Label="����Ա", Description="�����ϵͳ�������ݽ���ά���Լ�ϵͳ����ά��"};

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Student"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Student",Label = "ѧ��", Description = "�ڱ�ϵͳ�Ǽǵ���ѧϰ�����ѧ��" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Teacher"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Teacher", Label = "��ʦ", Description = "�����ѧ����" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Seller"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Seller", Label = "�γ̹���", Description = "��������������һ��ҵ����Ա" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Manager"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Manager", Label = "��������", Description = "����һ��������ܾ���" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == " SchoolMaster"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "SchoolMaster", Label = "У��", Description = "����һ��У�������й���" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "SpotCharger"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "SpotCharger", Label = "����㸺����", Description = "����һ�����������й���" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "Accounter"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "Accounter", Label = "���", Description = "����һ�����ŵ����в�����" };

                manager.Create(role);
            }
            if (!context.Roles.Any(r => r.Name == "ClassCharger"))
            {
                var store = new ApplicationRoleStore(context);
                var manager = new ApplicationRoleManager(store);
                var role = new ApplicationRole { Name = "ClassCharger", Label = "������", Description = "����һ���༶���ſο��ڹ���" };

                manager.Create(role);
            }




            if (!context.Users.Any(u => u.UserName == "qinyuankun"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "qinyuankun", Email = "327179615@qq.com", Name="��Ԫ��", Img=new Guid().ToString()};

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Admin");
            }
            if (!context.Users.Any(u => u.UserName == "fangyaobing"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "fangyaobing", Email = "fangyaobing@qq.com",Name="��Ҧ��", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Manager");
            }
            if (!context.Users.Any(u => u.UserName == "xiaohuiyan"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "xiaohuiyan", Email = "xiaohuiyan@qq.com", Name = "Ф����", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "SchoolMaster");
                manager.AddToRole(user.Id, "SpotCharger");
            }
            if (!context.Users.Any(u => u.UserName == "fanfen"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "fanfen", Email = "fanfen@qq.com", Name = "����", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "SpotCharger");
            }

            if (!context.Users.Any(u => u.UserName == "chenwenjun"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "chenwenjun", Email = "chenwenjun@qq.com", Name = "���ľ�", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "SchoolMaster");
                manager.AddToRole(user.Id, "SpotCharger");
            }

            if (!context.Users.Any(u => u.UserName == "huangjia"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "huangjia", Email = "huangjia@qq.com", Name = "�Ƽ�", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
            }

            if (!context.Users.Any(u => u.UserName == "zengchunling"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "zengchunling", Email = "zengchunling@qq.com", Name = "������", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
            }
            if (!context.Users.Any(u => u.UserName == "wangsirui"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "wangsirui", Email = "wangsirui@qq.com", Name = "��˼�", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Accounter");
            }

            if (!context.Users.Any(u => u.UserName == "zhonghuali"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "zhonghuali", Email = "zhonghuali@qq.com", Name = "�ӻ���", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Accounter");
            }

            if (!context.Users.Any(u => u.UserName == "zoushu"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "zoushu", Email = "zoushu@qq.com", Name = "����", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
            }

            if (!context.Users.Any(u => u.UserName == "daidi"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "daidi", Email = "daidi@qq.com", Name = "���", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
                manager.AddToRole(user.Id, "ClassCharger");
            }
            if (!context.Users.Any(u => u.UserName == "wangguilian"))
            {
                var store = new ApplicationUserStore(context);
                var manager = new ApplicationUserManager(store);
                var user = new ApplicationUser { UserName = "wangguilian", Email = "wangguilian@qq.com", Name = "������", Img = new Guid().ToString() };

                manager.Create(user, "111aaa");
                manager.AddToRole(user.Id, "Seller");
                manager.AddToRole(user.Id, "ClassCharger");
            }
            var districts = new List<District> {
                new District{ DistrictName="�ϲ���", DistrictAddress="�ϲ��з��ִ��970��" ,  CreateDate=DateTime.Now, DistrictState=true}



            };
            districts.ForEach(s => context.Districts.AddOrUpdate(p => p.DistrictName, s));
            context.SaveChanges();

            var campuses = new List<Campus> {
                new Campus{  DistrictID=1, CampusName="����У��", CreateDate=DateTime.Now, CampusAddress="���ִ��", CampusState=true},
                new Campus{  DistrictID=1, CampusName="�Ϲ�У��",  CreateDate=DateTime.Now, CampusAddress="�ϲ���ѧԺ", CampusState=true}


            };
            campuses.ForEach(s => context.Campuses.AddOrUpdate(p => p.CampusName, s));
            context.SaveChanges();

            var spots = new List<Spot> {
                new Spot{  CampusID=1, SpotName="������巷����", CreateDate=DateTime.Now, SpotState=true,SpotAddress="���ִ�������������"},
                new Spot{  CampusID=1, SpotName="���ŷ����",  CreateDate=DateTime.Now, SpotState=true,SpotAddress="�����ƾ���ѧ��������106"},
                new Spot{  CampusID=2, SpotName="�Ϲ������",  CreateDate=DateTime.Now, SpotState=true,SpotAddress="�ϲ���ѧԺ����ҵ��"},


            };
            spots.ForEach(s => context.Spots.AddOrUpdate(p => p.SpotName, s));
            context.SaveChanges();
            var posts1 = new List<Post> {
                new Post{  RoleId=1, UserId=1, CreateTime=DateTime.Now, PostName="01�Ź���Ա", State=true,DistrictId=1},
          
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
                new Post{  RoleId=5, UserId=2, CreaterId=1, CreateTime=DateTime.Now, PostName="01��������", State=true,DistrictId=1,},

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
                new Post{  RoleId=6, UserId=3, CreaterId=2, CreateTime=DateTime.Now, PostName="01У��У��", State=true,DistrictId=1,CampusId=1,SupperId=2},
                new Post{  RoleId=7, UserId=3, CreaterId=2, CreateTime=DateTime.Now, PostName="01����㸺����", State=true,DistrictId=1,CampusId=1,SpotId=1,SupperId=3},
                new Post{  RoleId=6, UserId=5, CreaterId=2, CreateTime=DateTime.Now, PostName="02У��У��", State=true,DistrictId=1,CampusId=2,SupperId=2},
                new Post{  RoleId=7, UserId=5, CreaterId=2, CreateTime=DateTime.Now, PostName="03����㸺����", State=true,DistrictId=1,CampusId=2,SpotId=3,SupperId=5},
                new Post{  RoleId=7, UserId=4, CreaterId=2, CreateTime=DateTime.Now, PostName="02����㸺����", State=true,DistrictId=1,CampusId=1,SpotId=2,SupperId=3},
                new Post{  RoleId=8, UserId=8, CreaterId=2, CreateTime=DateTime.Now, PostName="01�Ż��", State=true,DistrictId=1,CampusId=1,SupperId=2},
                new Post{  RoleId=8, UserId=9, CreaterId=2, CreateTime=DateTime.Now, PostName="02�Ż��", State=true,DistrictId=1,CampusId=1,SupperId=2},
                new Post{  RoleId=4, UserId=6, CreaterId=2, CreateTime=DateTime.Now, PostName="01�γ̹���", State=true,DistrictId=1,CampusId=1,SpotId=1,SupperId=4},
                new Post{  RoleId=4, UserId=7, CreaterId=2, CreateTime=DateTime.Now, PostName="02�γ̹���", State=true,DistrictId=1,CampusId=1,SpotId=1,SupperId=4},
                new Post{  RoleId=4, UserId=10, CreaterId=2, CreateTime=DateTime.Now, PostName="03�γ̹���", State=true,DistrictId=1,CampusId=1,SpotId=2,SupperId=7},
                new Post{  RoleId=4, UserId=11, CreaterId=2, CreateTime=DateTime.Now, PostName="04�γ̹���", State=true,DistrictId=1,CampusId=1,SpotId=2,SupperId=7},
                new Post{  RoleId=4, UserId=12, CreaterId=2, CreateTime=DateTime.Now, PostName="05�γ̹���", State=true,DistrictId=1,CampusId=2,SpotId=3,SupperId=6},
                new Post{  RoleId=9, UserId=11, CreaterId=2, CreateTime=DateTime.Now, PostName="01������", State=true,DistrictId=1,CampusId=1,SupperId=3},
                new Post{  RoleId=9, UserId=12, CreaterId=2, CreateTime=DateTime.Now, PostName="02������", State=true,DistrictId=1,CampusId=2,SupperId=5}
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
                new School{ SchoolName="�ƴ���®",  CreateDate=DateTime.Parse("2017-09-18")},
                new School{ SchoolName="��������ѧ", CreateDate=DateTime.Parse("2017-09-19")},
                new School{ SchoolName="�ƴ�����У��",  CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="ũ��ѧԺ",  CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="�ϲ���ѧԺ",  CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="�����Ƽ�ʦ����ѧԺ", CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="����ʦ��Ƽ�ѧԺ",  CreateDate=DateTime.Parse("2017-09-20")},
                new School{ SchoolName="�ƴ��־���",  CreateDate=DateTime.Parse("2017-09-20")}
            };
            schools.ForEach(s => context.Schools.AddOrUpdate(p => p.SchoolName, s));
            context.SaveChanges();

            var classes = new List<Class> {
                 new Class{  ClassName="������ƾ���1��", IsLock=false, CampusId=1, ProductID=1,  ChargerID=15, ClassState=ClassState.�ѿ���, OverDate=DateTime.Parse("2018-05-20") },
                new Class{  ClassName="���������Office����1��", IsLock=false, CampusId=1,ProductID=2, ChargerID=16, ClassState=ClassState.�ѿ���, OverDate=DateTime.Parse("2018-05-20") }

            };
            classes.ForEach(s => context.Classes.AddOrUpdate(p => p.ClassName, s));
            context.SaveChanges();


            var students = new List<Student>
            {

                new Student{Name="��ʥ��",IdCardNO="362331199801150056",SchoolID=1, Major=Major.������, QQ="123456789", SignerId=10,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="15555555555", ClassName="���4��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="л����",IdCardNO="441202199810160522",SchoolID=1, Major=Major.������, QQ="123456789",SignerId=10,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="18508227704", ClassName="���3��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="��ǧǧ",IdCardNO="362329199612063023",SchoolID=1, Major=Major.������, QQ="123456789",SignerId=10,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="13667095949", ClassName="���3��", Grade="2017",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="���",IdCardNO="360301199806280028",SchoolID=1, Major=Major.������, QQ="123456789",SignerId=10,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="13918058861", ClassName="���2��", Grade="2017",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="л׿",IdCardNO="430124199711271024",SchoolID=1, Major=Major.������, QQ="123456789",SignerId=11,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="15083873962", ClassName="���4��", Grade="2017",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="��ٻ��",IdCardNO="360422199910173844",SchoolID=3, Major=Major.������, QQ="123456789",SignerId=11,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797686018", ClassName="���1��", Grade="2015",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="������",IdCardNO="320829199803310849",SchoolID=3, Major=Major.������, QQ="123456789",SignerId=11,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279109644", ClassName="���4��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="������",IdCardNO="320382199906290021",SchoolID=3, Major=Major.������, QQ="123456789",SignerId=11,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="13667089964", ClassName="���4��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="��˪",IdCardNO="441523199805236084",SchoolID=3, Major=Major.������, QQ="123456789",SignerId=12,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="152779172679", ClassName="���4��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="��˼��",IdCardNO="36068119970923081X",SchoolID=3, Major=Major.������, QQ="123456789",SignerId=12,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="15879142964", ClassName="���4��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="���īh",IdCardNO="220322199902063227",SchoolID=3, Major=Major.������, QQ="123456789",SignerId=12,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279172651", ClassName="���4��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="�",IdCardNO="522631199706027945",SchoolID=4, Major=Major.������, QQ="123456789",SignerId=12,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279109976", ClassName="����1��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="����",IdCardNO="362401199809111526",SchoolID=4, Major=Major.������, QQ="123456789",SignerId=12,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="18702600671", ClassName="����1��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="�½���",IdCardNO="362202199806070031",SchoolID=4, Major=Major.������, QQ="123456789",SignerId=12,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279107597", ClassName="���4��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="������",IdCardNO="362203199711287349",SchoolID=4, Major=Major.������, QQ="123456789",SignerId=12,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="15070832022", ClassName="���4��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="Ԭ��",IdCardNO="360782199608070038",SchoolID=5, Major=Major.������, QQ="123456789",SignerId=13,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="15279173631", ClassName="���4��", Grade="2015",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="���Խ",IdCardNO="320829199906060109",SchoolID=5, Major=Major.������, QQ="123456789",SignerId=13,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="17770062410", ClassName="���4��", Grade="2015",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="����",IdCardNO="622826199806033326",SchoolID=5, Major=Major.������, QQ="123456789",SignerId=13,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="13970865983", ClassName="���4��", Grade="2015",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="������",IdCardNO="371327199710061222",SchoolID=5, Major=Major.������, QQ="123456789",SignerId=13,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="13097333305", ClassName="���4��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="���ϼ",IdCardNO="36068119971216362X",SchoolID=5, Major=Major.������, QQ="123456789",SignerId=13,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="18166036979", ClassName="���4��", Grade="2017",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="�辧",IdCardNO="360681199711242326",SchoolID=6, Major=Major.������, QQ="123456789",SignerId=13,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797937949", ClassName="Ӣ��2��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="�·�",IdCardNO="360681199602253136",SchoolID=6, Major=Major.������, QQ="123456789",SignerId=13,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="18166036975", ClassName="Ӣ��2��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="����",IdCardNO="360681199511233662",SchoolID=6, Major=Major.������, QQ="123456789",SignerId=14,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="18270516233", ClassName="Ӣ��2��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="���t��",IdCardNO="360681199712189531",SchoolID=6, Major=Major.������, QQ="123456789",SignerId=14,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="17770808783", ClassName="Ӣ��2��", Grade="2016",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="������",IdCardNO="360681199607092322",SchoolID=7, Major=Major.������, QQ="123456789",SignerId=14,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797938468", ClassName="���4��", Grade="2017",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="�ɼ���",IdCardNO="360681199609104521",SchoolID=7, Major=Major.������, QQ="123456789",SignerId=14,Education=Education.����,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797687220", ClassName="���2��", Grade="2017",Nation=Nation.����,Schedule="000101010101001001010"},
               new Student{Name="����Ƽ",IdCardNO="360681199511242223",SchoolID=8, Major=Major.������, QQ="123456789",SignerId=14,Education=Education.ר��,SignDate=DateTime.Now,
                    MobilePhoneNO ="15797659779", ClassName="���4��", Grade="2017",Nation=Nation.����,Schedule="000101010101001001010"},

            };

            students.ForEach(s => context.Students.AddOrUpdate(p => p.IdCardNO, s));
            context.SaveChanges();

            var enrollments = new List<Enrollment>{
                 new Enrollment{ StudentID = 1,
                 ClassID =1,  EnrollDate=DateTime.Parse("2017-02-22"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID = 1,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-02-23"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID = 2,
                 ClassID = 1, EnrollDate=DateTime.Parse("2017-02-24"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =2,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-02-25"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =3,
                 ClassID = 1, EnrollDate=DateTime.Parse("2017-02-26"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =3,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-02-27"),
                 EnrollmentState=EnrollmentState.�ɷ� },
                new Enrollment{ StudentID =4,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-02-28"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =4,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-01"),
                 EnrollmentState=EnrollmentState.�ɷ� },
                 new Enrollment{ StudentID =5,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-02"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID = 5,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-03"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID = 6,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-04"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID = 6,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-05"),
                 EnrollmentState=EnrollmentState.�ɷ� },
                new Enrollment{ StudentID = 7,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-06"),
                 EnrollmentState=EnrollmentState.�ɷ� },
                new Enrollment{ StudentID =7,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-07"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =8,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-08"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =9,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-09"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =10,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-10"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =11,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-11"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =12,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-12"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =13,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-13"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =14,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-14"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =15,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-15"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =16,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-16"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =17,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-17"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =18,
                 ClassID =1, EnrollDate=DateTime.Parse("2017-03-18"),
                 EnrollmentState=EnrollmentState.�ɷ�},
                new Enrollment{ StudentID =19,
                 ClassID =2, EnrollDate=DateTime.Parse("2017-03-19"),
                 EnrollmentState=EnrollmentState.�ɷ�}
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
            //    new Unit{ SectionID=1, UnitName="�������ͼ�������", Sort=1},
            //    new Unit{ SectionID=1, UnitName="��������",Sort=2},
            //    new Unit{ SectionID=1, UnitName="ѡ��ṹ",Sort=3},
            //    new Unit{ SectionID=1, UnitName="ѭ���ṹ",Sort=4},
            //    new Unit{ SectionID=1, UnitName="����",Sort=5},
            //    new Unit{ SectionID=1, UnitName="����",Sort=6},
            //    new Unit{ SectionID=1, UnitName="�궨���Ԥ����",Sort=7},
            //    new Unit{ SectionID=1, UnitName="ָ��",Sort=8},
            //    new Unit{ SectionID=1, UnitName="�ļ�����",Sort=9},
            //    new Unit{ SectionID=2, UnitName="����һ",Sort=1},
            //    new Unit{ SectionID=2, UnitName="�����",Sort=2},
            //    new Unit{ SectionID=2, UnitName="������",Sort=3},
            //    new Unit{ SectionID=2, UnitName="������",Sort=4},
            //    new Unit{ SectionID=2, UnitName="������",Sort=5},
            //    new Unit{ SectionID=3, UnitName="�㷨",Sort=1},
            //    new Unit{ SectionID=3, UnitName="������",Sort=2},
            //    new Unit{ SectionID=3, UnitName="���ݿ����",Sort=3},                
            //    new Unit{ SectionID=4, UnitName="Word��������",Sort=1},
            //    new Unit{ SectionID=4, UnitName="Execl��������",Sort=2},
            //    new Unit{ SectionID=4, UnitName="PPt��������",Sort=3},
            //    new Unit{ SectionID=5, UnitName="���������֪ʶ",Sort=1},
            //    new Unit{ SectionID=5, UnitName="Ӳ�������",Sort=2},
            //    new Unit{ SectionID=5, UnitName="����",Sort=3},
            //    new Unit{ SectionID=6, UnitName="����һ",Sort=1},
            //    new Unit{ SectionID=6, UnitName="�����",Sort=2},
            //    new Unit{ SectionID=6, UnitName="������",Sort=3},
            //    new Unit{ SectionID=6, UnitName="������",Sort=4},
            //    new Unit{ SectionID=6, UnitName="������",Sort=5},
            //    new Unit{ SectionID=7, UnitName="�㷨",Sort=1},
            //    new Unit{ SectionID=7, UnitName="������",Sort=2},
            //    new Unit{ SectionID=7, UnitName="���ݿ����",Sort=3},        
            //    new Unit{ SectionID=8, UnitName="�㷨",Sort=1},
            //    new Unit{ SectionID=8, UnitName="������",Sort=2},
            //    new Unit{ SectionID=8, UnitName="���ݿ����",Sort=3}

            //};
            //units.ForEach(s => context.Units.Add(s));
            //context.SaveChanges();

            //var lessons = new List<Lesson> { 
            //    new Lesson{  UnitID=1, LessonName="���ͳ���", CreateTime=DateTime.Parse("2017-02-08"), LessonType=LessonType.��Ƶ,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=1, LessonName="ʵ�ͳ���",LessonType=LessonType.��Ƶ,Sort=2,IsTrial=true},
            //    new Lesson{  UnitID=2, LessonName="%d��ʽ���",LessonType=LessonType.��Ƶ,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=2, LessonName="%f��ʽ���",LessonType=LessonType.��Ƶ,Sort=2,IsTrial=true},
            //    new Lesson{  UnitID=3, LessonName="if�ṹ",LessonType=LessonType.��Ƶ,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=3, LessonName="switch�ṹ",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=4, LessonName="whileѭ��",LessonType=LessonType.��Ƶ,Sort=1},
            //    new Lesson{  UnitID=4, LessonName="forѭ��",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=5, LessonName="һά����",LessonType=LessonType.��Ƶ,Sort=1},
            //    new Lesson{  UnitID=5, LessonName="��ά����",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=6, LessonName="��������",LessonType=LessonType.��Ƶ,Sort=1},
            //    new Lesson{  UnitID=6, LessonName="��������",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=7, LessonName="#define����",LessonType=LessonType.��Ƶ,Sort=1},
            //    new Lesson{  UnitID=7, LessonName="�������ĺ�",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=8, LessonName="ָ��ĺ���",LessonType=LessonType.��Ƶ,Sort=1},
            //    new Lesson{  UnitID=8, LessonName="һά�����ָ��",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=9, LessonName="�ļ�����",LessonType=LessonType.��Ƶ,Sort=1},
            //    new Lesson{  UnitID=9, LessonName="�ļ���д",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=18, LessonName="�����ʽ",LessonType=LessonType.��Ƶ,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=18, LessonName="��ʽ����",LessonType=LessonType.��Ƶ,Sort=2,IsTrial=true},
            //    new Lesson{  UnitID=19, LessonName="���ݵ���",LessonType=LessonType.��Ƶ,Sort=1,IsTrial=true},
            //    new Lesson{  UnitID=19, LessonName="���ú���",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=20, LessonName="�õ�Ƭ��ʽ",LessonType=LessonType.��Ƶ,Sort=1},
            //    new Lesson{  UnitID=20, LessonName="��������",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=13, LessonName="�㷨�ĸ���",LessonType=LessonType.��Ƶ,Sort=1},
            //    new Lesson{  UnitID=13, LessonName="�㷨������",LessonType=LessonType.��Ƶ,Sort=2},
            //    new Lesson{  UnitID=15, LessonName="�������",LessonType=LessonType.��Ƶ,Sort=1},
            //    new Lesson{  UnitID=15, LessonName="�����ƹ���",LessonType=LessonType.��Ƶ,Sort=2}


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
            //    new Exercise{ LessonID=1, Sort=1,  Category=ExerciseCategory.��ѡ��, ExerciseBody="���²������ͳ�������", TextAnalysis="������Ŀ����"},
            //    new Exercise{ LessonID=1, Sort=2, Category=ExerciseCategory.��ѡ��,  ExerciseBody="���²���ʵ�ͳ�������", TextAnalysis="������Ŀ����"},
            //    new Exercise{ LessonID=2, Sort=1, Category=ExerciseCategory.��ѡ��,  ExerciseBody="��C�����У��������ı�־�ǣ� ______ ��", TextAnalysis="C�������������ı�־�Ƿֺš�"},
            //    new Exercise{ LessonID=2,Sort=2,Category=ExerciseCategory.��ѡ��,  ExerciseBody="ȫ��������ȼ�������ֽ����ͨ������������ ______ ��", TextAnalysis="ͨ�������ǣ�ֻ���ָܷ���60�ּ��ɡ�"},
            //     new Exercise{ LessonID=3,Sort=1,Category=ExerciseCategory.��ѡ��,  ExerciseBody="������x��y����ȷ���岢��ֵ�����·���C�����﷨�ı��ʽ��", TextAnalysis="��ֵ�������=������߱����Ǳ���"},
            //    new Exercise{  LessonID=3,Sort=2,Category=ExerciseCategory.��ѡ��,  ExerciseBody="���¶����������ȷ����", TextAnalysis="���������ȶ��壬��ʹ��"}



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
            //    new Option{ ExerciseID=3, Content="�ֺš�;��", IsCorrect=true},
            //    new Option{ ExerciseID=3, Content="���У��س���", IsCorrect=false},
            //    new Option{ ExerciseID=4, Content="ֻ���ָܷ���60�ּ���", IsCorrect=true},
            //    new Option{ ExerciseID=4, Content="�ָܷ���60�֣�ͬʱ���������36��", IsCorrect=false},
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
            //   new Category1{ SubjectID=5,Catetory_1Name="VIP����", OrderIndex=1},
            //   new Category1{ SubjectID=5,Catetory_1Name="�༶�", OrderIndex=2},
            //   new Category1{ SubjectID=5,Catetory_1Name="������Ѷ", OrderIndex=3},
            //   new Category1{ SubjectID=5,Catetory_1Name="�����ɻ�", OrderIndex=4},
            //   new Category1{ SubjectID=2,Catetory_1Name="VIP����", OrderIndex=1},
            //   new Category1{ SubjectID=2,Catetory_1Name="�༶�", OrderIndex=2},
            //   new Category1{ SubjectID=2,Catetory_1Name="������Ѷ", OrderIndex=3},
            //   new Category1{ SubjectID=2,Catetory_1Name="�����ɻ�", OrderIndex=4}
            //};
            //category1s.ForEach(s => context.Category1s.Add(s));
            //context.SaveChanges();


            //var category2s = new List<Category2> { 
            //   new Category2{ Category1ID=1,Catetory_2Name="Office",OrderIndex=1},
            //   new Category2{ Category1ID=1,Catetory_2Name="C����",OrderIndex=2},
            //   new Category2{ Category1ID=2,Catetory_2Name="����",OrderIndex=1},
            //   new Category2{ Category1ID=2,Catetory_2Name="�",OrderIndex=2},
            //   new Category2{ Category1ID=3,Catetory_2Name="֪ͨ",OrderIndex=1},
            //   new Category2{ Category1ID=4,Catetory_2Name="Office",OrderIndex=1},
            //   new Category2{ Category1ID=4,Catetory_2Name="C����",OrderIndex=2}
            //};
            //category2s.ForEach(s => context.Category2s.Add(s));
            //context.SaveChanges();

            //var replys = new List<Reply> { 
            //    new Reply{ UserID=3, ReplyID=1,RootID=1, ReplyType=ReplyType.Discuss, Level=1, Content="���ǻظ�����",  ToUserID=2 , ActiveLogID=6},
            //    new Reply{ UserID=2, ReplyID=1, RootID=1,ReplyType=ReplyType.Discuss,Level=2, Content="���ǻظ�����", ToUserID=3 , ActiveLogID=7 },
            //    new Reply{ UserID=4, ReplyID=2, RootID=1,ReplyType=ReplyType.Discuss,Level=3, Content="���ǻظ�����", ToUserID=2  , ActiveLogID=8},
            //    new Reply{ UserID=5, ReplyID=1, RootID=1,ReplyType=ReplyType.Discuss,Level=1, Content="���ǻظ�����", ToUserID=2 , ActiveLogID=9 },
            //    new Reply{ UserID=5, ReplyID=2,RootID=2, ReplyType=ReplyType.Discuss,Level=1, Content="���ǻظ�����", ToUserID=3  , ActiveLogID=10}, 
            //    new Reply{ UserID=5, ReplyID=3,RootID=3, ReplyType=ReplyType.Discuss,Level=1, Content="���ǻظ�����", ToUserID=4 , ActiveLogID=11}, 
            //    new Reply{ UserID=5, ReplyID=4,RootID=4, ReplyType=ReplyType.Discuss,Level=1, Content="���ǻظ�����", ToUserID=2 , ActiveLogID=12 }, 
            //    new Reply{ UserID=5, ReplyID=5,RootID=5, ReplyType=ReplyType.Discuss,Level=1, Content="���ǻظ�����", ToUserID=3  , ActiveLogID=13}
            //};
            //replys.ForEach(s => context.Replys.Add(s));
            //context.SaveChanges();


            //var discusses = new List<Discuss> { 
            //    new Discuss{ LessonID=1,ExerciseID=1,ClassID=2, ProductID=1, Category2ID=2, Title="���Ǳ���", UserID=2, Content="����discuss������" , ReplyTimes=4, LatestReplyID=4,ActiveLogID=1 },
            //    new Discuss{ LessonID=1,ExerciseID=1, ClassID=2,ProductID=1,Category2ID=2,  Title="���Ǳ���", UserID=3, Content="����discuss������" , ReplyTimes=1, LatestReplyID=5,ActiveLogID=2  },
            //    new Discuss{ LessonID=1,ExerciseID=2,ClassID=2,ProductID=1,Category2ID=2,  Title="���Ǳ���", UserID=4, Content="����discuss������" , ReplyTimes=1, LatestReplyID=6,ActiveLogID=3 },
            //    new Discuss{ LessonID=2,Category2ID=2,ClassID=2,ProductID=1, Title="���Ǳ���", UserID=2, Content="����discuss������" , ReplyTimes=1, LatestReplyID=7,ActiveLogID=4  },
            //    new Discuss{ LessonID=2,Category2ID=2, ClassID=2,ProductID=1,Title="���Ǳ���", UserID=3, Content="����discuss������" , ReplyTimes=1, LatestReplyID=8 ,ActiveLogID=5 }


            //};
            //discusses.ForEach(s => context.Discusss.Add(s));
            //context.SaveChanges();


            //var notes = new List<Note> { 
            //    new Note{  LessonID=1, UserID=1,  Content="���ǵ�һ�ιٷ��ʼǵ�����" },
            //    new Note{  LessonID=2, UserID=1,  Content="���ǵڶ��ιٷ��ʼǵ�����" },
            //    new Note{  LessonID=3, UserID=1,  Content="���ǵ����ιٷ��ʼǵ�����" },
            //    new Note{  LessonID=4, UserID=1,  Content="���ǵ��Ŀιٷ��ʼǵ�����" },
            //    new Note{  LessonID=5, UserID=1,  Content="���ǵ���ιٷ��ʼǵ�����" },
            //    new Note{  LessonID=1, UserID=2,  Content="���Ǳʼǵ�����" },
            //    new Note{  LessonID=1, UserID=3,  Content="���Ǳʼǵ�����" },
            //    new Note{  LessonID=1, UserID=4,  Content="���Ǳʼǵ�����" },
            //    new Note{  LessonID=2, UserID=2,  Content="���Ǳʼǵ�����" },
            //    new Note{  LessonID=2, UserID=3,  Content="���Ǳʼǵ�����" }


            //};
            //notes.ForEach(s => context.Notes.Add(s));
            //context.SaveChanges();


            //var articles = new List<Article> { 
            //    new Article{UserID=2, Category2ID=6, ActiveLogID=24, Content="������Ѷ������", Title="���Ǳ���"},
            //    new Article{UserID=2, Category2ID=6,ActiveLogID=25,  Content="������Ѷ������", Title="���Ǳ���"},
            //    new Article{UserID=3, Category2ID=6, ActiveLogID=26, Content="������Ѷ������", Title="���Ǳ���"},
            //    new Article{UserID=3, Category2ID=6, ActiveLogID=27, Content="������Ѷ������", Title="���Ǳ���"},
            //    new Article{UserID=3, Category2ID=6,ActiveLogID=28,  Content="������Ѷ������", Title="���Ǳ���"},
            //    new Article{UserID=4, Category2ID=7, ActiveLogID=29, Content="������Ѷ������", Title="���Ǳ���"},
            //    new Article{UserID=4, Category2ID=7,ActiveLogID=30,  Content="������Ѷ������", Title="���Ǳ���"},
            //    new Article{UserID=4, Category2ID=7, ActiveLogID=31, Content="������Ѷ������", Title="���Ǳ���"},
            //    new Article{UserID=4, Category2ID=7,ActiveLogID=32,  Content="������Ѷ������", Title="���Ǳ���"}                                         
            //};
            //articles.ForEach(s => context.Articles.Add(s));
            //context.SaveChanges();

            //var comments = new List<Comment> { 
            //    new Comment{  UserID=2, TopicID=1, TopicType=TopicType.Lesson, Content="�������۵�����" },
            //    new Comment{  UserID=2, TopicID=2, TopicType=TopicType.Lesson, Content="�������۵�����" },
            //    new Comment{  UserID=3, TopicID=1, TopicType=TopicType.Lesson, Content="�������۵�����" },
            //    new Comment{  UserID=3, TopicID=2, TopicType=TopicType.Lesson, Content="�������۵�����" },
            //    new Comment{  UserID=4, TopicID=1, TopicType=TopicType.Lesson, Content="�������۵�����" },
            //    new Comment{  UserID=4, TopicID=2, TopicType=TopicType.Lesson, Content="�������۵�����" },
            //    new Comment{  UserID=2, TopicID=1, TopicType=TopicType.Article, Content="�������۵�����" },
            //    new Comment{  UserID=2, TopicID=2, TopicType=TopicType.Article, Content="�������۵�����" },
            //    new Comment{  UserID=3, TopicID=1, TopicType=TopicType.Article, Content="�������۵�����" }                                             
            //};
            //comments.ForEach(s => context.Comments.Add(s));
            //context.SaveChanges();




            //var records = new List<StudyRecord> { 
            //    new StudyRecord{ UserID=2, LessonID=1,ClassID=2, RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-11") ,ActiveLogID=14},
            //    new StudyRecord{ UserID=2, LessonID=2,ClassID=2,  RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-12") ,ActiveLogID=15},
            //    new StudyRecord{ UserID=2, LessonID=3,ClassID=2,  RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-13"),ActiveLogID=16 },
            //    new StudyRecord{ UserID=2, LessonID=4,ClassID=2,  RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-14"),ActiveLogID=17 },
            //    new StudyRecord{ UserID=2, LessonID=5,ClassID=2,  RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-15") ,ActiveLogID=18},
            //    new StudyRecord{ UserID=3, LessonID=1,ClassID=2,  RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-16"),ActiveLogID=19 },
            //    new StudyRecord{ UserID=3, LessonID=2,ClassID=2,  RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-17"),ActiveLogID=20 },
            //    new StudyRecord{ UserID=3, LessonID=3,ClassID=2,  RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-18") ,ActiveLogID=21},
            //    new StudyRecord{ UserID=3, LessonID=4,ClassID=2,  RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-19"),ActiveLogID=22 },
            //    new StudyRecord{ UserID=3, LessonID=5, ClassID=2, RecordState=RecordState.�����, FinishDate=DateTime.Parse("2016-09-20") ,ActiveLogID=23}

            //};
            //records.ForEach(s => context.StudyRecords.Add(s));
            //context.SaveChanges();

            //var erecords = new List<ExerciseRecord> { 
            //    new ExerciseRecord{ UserID=2, ClassID=2, ExerciseID=1, MyAnswer="2", IsCorrect=false, Collected=true, Note="��ע"},
            //    new ExerciseRecord{ UserID=2,ClassID=2, ExerciseID=2, MyAnswer="7", IsCorrect=true, Collected=false, Note="��ע"},
            //    new ExerciseRecord{ UserID=2,ClassID=2, ExerciseID=3, MyAnswer="10", IsCorrect=false, Collected=true, Note="��ע"},
            //    new ExerciseRecord{ UserID=2,ClassID=2, ExerciseID=4, MyAnswer="12", IsCorrect=false, Collected=true, Note="��ע"},
            //    new ExerciseRecord{ UserID=3,ClassID=2, ExerciseID=1, MyAnswer="2", IsCorrect=false, Collected=true, Note="��ע"},
            //    new ExerciseRecord{ UserID=3,ClassID=2, ExerciseID=2, MyAnswer="7", IsCorrect=true, Collected=false, Note="��ע"},
            //    new ExerciseRecord{ UserID=3,ClassID=2, ExerciseID=3, MyAnswer="10", IsCorrect=false, Collected=true, Note="��ע"},
            //    new ExerciseRecord{ UserID=3,ClassID=2, ExerciseID=4, MyAnswer="12", IsCorrect=false, Collected=true, Note="��ע"}
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

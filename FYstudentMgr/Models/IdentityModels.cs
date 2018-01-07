using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
//using FYstudentMgr.Models.Teachers;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;
using FYstudentMgr.Models;
using FYstudentMgr.Models.Common;

namespace FYstudentMgr.Models
{
    public class ApplicationUserLogin : IdentityUserLogin<int> { }
    public class ApplicationUserClaim : IdentityUserClaim<int> { }
    public class ApplicationUserRole : IdentityUserRole<int> { }
    public class ApplicationRole : IdentityRole<int, ApplicationUserRole>, IRole<int>
    {
        public string Description { get; set; }

        public ApplicationRole() { }
        public ApplicationRole(string name)
            : this()
        {
            this.Name = name;
        }

        public ApplicationRole(string name, string description)
            : this(name)
        {
            this.Description = description;
        }
    }
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser<int, ApplicationUserLogin,  ApplicationUserRole, ApplicationUserClaim>, IUser<int>
    {
        public async Task<ClaimsIdentity>
            GenerateUserIdentityAsync(UserManager<ApplicationUser, int> manager)
        {
            var userIdentity = await manager
                .CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            return userIdentity;
        }

        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        //public int User_ID { get; set; }
        public int InfoID { get; set; }
       
    }

    public class ApplicationDbContext: IdentityDbContext<ApplicationUser, ApplicationRole, int, ApplicationUserLogin, ApplicationUserRole, ApplicationUserClaim>
    {
        public ApplicationDbContext()
            : base("ApplicationDbContext")
        {
            this.Configuration.LazyLoadingEnabled = false;
        }
        //public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Enrollment> Enrollments { get; set; }
        public DbSet<Product> Products { get; set; }
        //public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Class> Classes { get; set; }
        //public DbSet<ClassTime> ClassTimes { get; set; }
        //public DbSet<TimeNode> TimeNodes { get; set; }
        //public DbSet<Room> Rooms { get; set; }
        //public DbSet<Building> Buildings { get; set; }
        //public DbSet<Dormitory> Dormitorys { get; set; }
        //public DbSet<College> Colleges { get; set; }
        //public DbSet<C_Class> C_Classes { get; set; }
        public DbSet<School> Schools { get; set; }
        public DbSet<Campus> Campuses { get; set; }
        public DbSet<Spot> Spots { get; set; }
        //public DbSet<Grade> Grades { get; set; }
        public DbSet<Receipt> Receipts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Worker> Workers { get; set; }
        public DbSet<Diploma> Diplomas { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<CampusCoupon> CampusCoupons { get; set; }
        public DbSet<UserDiploma> UserDiplomas { get; set; }
        public DbSet<Compensation> Compensations { get; set; }
        public DbSet<SmsRecord> SmsRecords { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);//加上这一句不会出现EntityType 'IdentityUserLogin' has no key defined. Define the key for this EntityType.错误


            //modelBuilder.Entity<IdentityUserLogin>().HasKey<string>(l => l.UserId);
            //modelBuilder.Entity<IdentityRole>().HasKey<string>(r => r.Id);
            //modelBuilder.Entity<IdentityUserRole>().HasKey(r => new { r.RoleId, r.UserId });
            //modelBuilder.Entity<School>().HasMany(t => t.Colleges).WithRequired(p => p.School).WillCascadeOnDelete(false);
        }
        static ApplicationDbContext()
        {
            // Set the database intializer which is run once during application start
            // This seeds the database with admin user credentials and admin role
            Database.SetInitializer<ApplicationDbContext>(new ApplicationDbInitializer());
        }
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

    }


    public class ApplicationUserStore :
       UserStore<ApplicationUser, ApplicationRole, int,
       ApplicationUserLogin, ApplicationUserRole,
       ApplicationUserClaim>, IUserStore<ApplicationUser, int>,
       IDisposable
    {
        public ApplicationUserStore()
            : this(new IdentityDbContext())
        {
            base.DisposeContext = true;
        }

        public ApplicationUserStore(DbContext context)
            : base(context)
        {
        }
    }


    public class ApplicationRoleStore
        : RoleStore<ApplicationRole, int, ApplicationUserRole>,
        IQueryableRoleStore<ApplicationRole, int>,
        IRoleStore<ApplicationRole, int>, IDisposable
    {
        public ApplicationRoleStore()
            : base(new IdentityDbContext())
        {
            base.DisposeContext = true;
        }

        public ApplicationRoleStore(DbContext context)
            : base(context)
        {
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace FYstudentMgr.Models
{
    public enum ClassState
    {
        待开课, 已开课, 已结束
    }
    public class Class
    {
        public int Id { get; set; }
        public string ClassName { get; set; }//班级名称
        public int ProductID { get; set; }//班级所属产品
        public int ChargerID { get; set; }//班主任id
        public DateTime OverDate { get; set; }
        public string Arrange { get; set; }//班级课程安排
        public Boolean IsLock { get; set; }// 是否锁定
        public ClassState ClassState { get; set; }//班级状态 
        public virtual Product Product { get; set; }
        [ForeignKey("ChargerID")]
        public virtual ApplicationUser Charger { get; set; }
        public virtual ICollection<Enrollment> Enrollments { get; set; }
        public virtual ICollection<ApplicationUser> Teachers { get; set; }
    }
}
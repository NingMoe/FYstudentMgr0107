using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYstudentMgr.Models
{
    public class Receipt
    {
        public int Id { get; set; }
        public DateTime CreateTime { get; set; }
        public Boolean State { get; set; }
        public DateTime ConfirmTime { get; set; }
        public int ConfirmUserID { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Compensation> Compensations { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
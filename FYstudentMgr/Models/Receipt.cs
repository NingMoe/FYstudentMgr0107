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
        public int ConfirmerID { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Compensation> Compensations { get; set; }
        public virtual PostUser Confirmer { get; set; }
    }
}
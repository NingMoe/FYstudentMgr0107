using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYstudentMgr.Models
{
    public class Campus
    {
        public int Id { get; set; }
        public string CampusName { get; set; }//校区名称
        public string CampusAddress { get; set; }//校区地址
        public int? ChargerID { get; set; }//校区负责人岗位
        public int? AccounterId { get; set; }//校区财务岗位id
        public int DistrictID { get; set; }
        public bool CampusState { get; set; }
        public DateTime CreateDate { get; set; }
        public virtual Post Charger { get; set; }
        public virtual Post Accounter { get; set; }
        public virtual District District { get; set; }
        public virtual ICollection<CampusCoupon> Coupons { get; set; }
        public virtual ICollection<Spot> Spots { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace FYstudentMgr.Models
{
    public class Worker
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MobilePhoneNO { get; set; }
        public Boolean IsUploaImg { get; set; }
        public string Img { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
        public virtual ICollection<Receipt> Receipt { get; set; }

        
    }
}
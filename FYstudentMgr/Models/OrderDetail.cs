﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYstudentMgr.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int? CouponID { get; set; } //使用优惠id 
        public virtual Coupon Coupon { get; set; }
        public virtual Product Product { get; set; }
    }
}
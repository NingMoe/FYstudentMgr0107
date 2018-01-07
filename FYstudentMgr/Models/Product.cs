using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FYstudentMgr.Models
{
    public class Product
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }//所属类别编号
        public string ProductName { get; set; }//产品名称
        public bool State { get; set; }//产品状态
        public DateTime OverDate { get; set; }//产品下架时间
        public DateTime CreateDate { get; set; }//产品上架时间
        public double Price { get; set; }//产品价格
        public bool IsDiscountForOld { get; set; }//是否有老学员优惠
        public double? DiscountValue { get; set; }//优惠金额
        public string AccordIdList { get; set; }//判断老学员依据的产品编号
        public int Sort { get; set; }//产品排序序号
        public virtual ICollection<Class> Classes { get; set; }
    }
}
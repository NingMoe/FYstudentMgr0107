using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;  

namespace FYstudentMgr.Models
{
    public class UserDataModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Point { get; set; }
        public int XP{ get; set; }
        public int Rank { get; set; }
        public string RankName { get; set; }
        public bool isUpLoadImg { get; set; }
    }
    public class ExternalLoginConfirmationViewModel
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "用户名")]

        public string UserName { get; set; }
    }

    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    public class VerifyCodeViewModel
    {
        [Required]
        public string Provider { get; set; }

        [Required]
        [Display(Name = "Code")]
        public string Code { get; set; }
        public string ReturnUrl { get; set; }

        [Display(Name = "记住这个浏览器?")]
        public bool RememberBrowser { get; set; }

        public bool RememberMe { get; set; }
    }

    public class Auth
    {
        
        public ApplicationUser user { get; set; }

       
        public int? userId { get; set; }
        public string token { get; set; }

        public string text { get; set; }
        public bool isLogin { get; set; }
        public List<PostUser> PostUsers { get; set; }
       
    }

    public class ForgotViewModel
    {
        [Required]
        [Display(Name = "邮箱")]
        public string Email { get; set; }
    }

    public class LoginViewModel
    {
        [Required]
        [Display(Name = "用户名")]
        
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "密码")]
        public string Password { get; set; }

        [Display(Name = "记住我?")]
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        [Required(ErrorMessage = "请填写{0}")]     
        [Display(Name = "用户名")]
        [System.Web.Mvc.Remote("CheckUserName", "Account", ErrorMessage = "抱歉！该用户名已经存在")] 
        public string UserName { get; set; }

        //[Required(ErrorMessage = "请输入Email地址")]
        //[EmailAddress(ErrorMessage = "您输入的email地址格式不正确")]
        //[Display(Name = "邮箱")]
        //public string Email { get; set; }

        [Required(ErrorMessage = "请填写{0}")]
        [StringLength(100, ErrorMessage = "{0}请至少输入{2}个字符", MinimumLength = 6)]
        [DataType(DataType.Password) ]
        [Display(Name = "密码")]
        public string Password { get; set; }

         [Display(Name = "手机验证码")]
         [Required(ErrorMessage = "请填写{0}")]
        public string ValidCode { get; set; }

        [Required(ErrorMessage = "请填写{0}")]
        [DataType(DataType.Password)]
        [Display(Name = "确认密码")]
        [Compare("Password", ErrorMessage = "两次输入密码不一样")]
        public string ConfirmPassword { get; set; }
    }

    public class ResetPasswordViewModel
    {
        [Required(ErrorMessage = "请填写{0}")]
        [EmailAddress]
        [Display(Name = "邮箱")]
        public string Email { get; set; }

        [Required(ErrorMessage = "请填写{0}")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "密码")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "确认密码")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        public string Code { get; set; }
    }

    public class ForgotPasswordViewModel
    {
        [Required(ErrorMessage = "请填写{0}")]
        [EmailAddress]
        [Display(Name = "邮箱")]
        public string Email { get; set; }
    }
}

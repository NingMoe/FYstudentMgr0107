using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using FYstudentMgr.Models;
using FYstudentMgr.Common;
using System.Net.Mail;
using FYstudentMgr.Common.Sms;
using System.Web.Caching;
using System.Web.Helpers;
using FYstudentMgr.Common.Code;

namespace FYstudentMgr.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private ApplicationDbContext db = new ApplicationDbContext();
        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager )
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set 
            { 
                _signInManager = value; 
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        //private ApplicationDbContext db = new ApplicationDbContext();
        //
        // GET: /Account/Login
        //[AllowAnonymous]
        //public ActionResult Login()
        //{
        //    return RedirectToAction("Index", "Product");
           
        //}
        [AllowAnonymous]
        public JsonResult GetToken()
        {
            string cookieToken, formToken;
            AntiForgery.GetTokens(null, out cookieToken, out formToken);
            Auth auth = new Auth();
            auth.token = formToken;
            return Json(auth, JsonRequestBehavior.AllowGet);

        }


        // [AllowAnonymous]
        public async Task<JsonResult> userIndexInfo()
        {
            Auth auth = new Auth();
            if (!User.Identity.IsAuthenticated)
            {
                return null;
            }
            var user = await UserManager.FindByIdAsync(User.Identity.GetUserId<int>());
            if (user == null)
            {
                return null;
            }
            auth.user = user;
            auth.userId = User.Identity.GetUserId<int>();
            //UserDataModel data = new UserDataModel()
            //{
            //    ID = user.Id,
            //    Name = user.Student.Name ?? "匿名七天君",
            //    Point = user.Student.Point,
            //    Rank = (int)user.Student.Rank + 1,
            //    RankName = user.Student.Rank.ToString(),
            //    XP = user.Student.XP,
            //    isUpLoadImg = user.Student.IsUploaImg
            //};
            return Json(auth, JsonRequestBehavior.AllowGet);
        }


        /// <summary>
        /// 模态框ajax登录
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<JsonResult> LoginModal(LoginViewModel model,string Code)
        {
            Auth auth = new Auth();
            if (!ModelState.IsValid)
            {
                 auth.text= "用户名或密码错误";
                return Json(auth, JsonRequestBehavior.AllowGet);
            }
            if (Code != null) {
                if (SessionHelper.GetSession("verifycode") == null || Code.ToLower() != SessionHelper.GetSession("verifycode").ToString())
                {
                    auth.text = "验证码错误";
                    return Json(auth, JsonRequestBehavior.AllowGet);
                }
            }
            var result = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, shouldLockout: false);
            switch (result)
            {
                case SignInStatus.Success:
                    {
                        String code = Guid.NewGuid().ToString();
                        SessionHelper.Adds("User", new String[]{model.UserName,code},300);
                        HttpContext.Cache.Insert(model.UserName, code, null, Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(18000));
                        auth.text = "success";
                        auth.token = code;
                        auth.isLogin = true;
                        return Json(auth, JsonRequestBehavior.AllowGet);
                    }
                    

                case SignInStatus.LockedOut:
                    {
                        auth.text = "账户被锁定";
                        return Json(auth, JsonRequestBehavior.AllowGet);

                    }
                    
                case SignInStatus.RequiresVerification:
                    {
                        auth.text = "账户需要验证";
                        return Json(auth, JsonRequestBehavior.AllowGet);
                    }
                   
                case SignInStatus.Failure:
                default:
                    {
                        auth.text = "用户名或密码错误";
                        return Json(auth, JsonRequestBehavior.AllowGet);
                    }
            }
        }


        /// <summary>
        /// 注册功能
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<string> RegisterModal(RegisterViewModel model)
        {
            if (!VerifyPhoneCode(model.ValidCode))
            {
                return "code-error";
            }
            if (ModelState.IsValid)
            {
                try
                {                                      
                    var user = new ApplicationUser { UserName = model.UserName, PhoneNumber = model.UserName, PhoneNumberConfirmed = true };        
                    var result = await UserManager.CreateAsync(user, model.Password);

                    if (result.Succeeded)
                    {
                        UserManager.AddToRole(user.Id, "Worker");
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        DropSession("PhoneCode");
                        return "ok";
                    }
                    else
                    {
                        return "faild";
                    }

                }
                catch (Exception e)
                {
                    return e.Message;
                }
            }
            else
            {
                return ModelState.ToString();
            }
        }
        /// <summary>
        /// 注册时生成并发送手机验证码
        /// </summary>
        /// <param name="code"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        //[AllowAnonymous]
        //public async Task<string> SendPhoneCode(string code, string number)
        //{
        //    if (SessionHelper.GetSession("verifycode") == null || code.ToLower() != SessionHelper.GetSession("verifycode").ToString())
        //    {
        //        return "codeerror";
        //    }
        //    if(number==null){
        //        return "error";
        //    }

        //    var user = await UserManager.FindByPhoneNumberAsync(number);
        //    if (user != null)
        //    {
        //        return "found";
        //    }

        //    try
        //    {
        //        // Generate the token and send it
        //        var smscode = GenerateCode();
        //        if (UserManager.SmsService != null)
        //        {
        //            var message = new SmsMessage
        //            {
        //                Destination = number,
        //                Body = smscode,
        //                TemplateId = 30741
        //            };
        //            message.setRecord(1, number);
        //            db.SmsRecords.Add(message.Record);
        //            await db.SaveChangesAsync();
        //            await UserManager.SmsService.SendAsync(message);
        //            return "ok";  //return smscode;//
        //        }
        //        else
        //        {
        //            return "error";
        //        }
        //        //发送短信

        //    }
        //    catch (Exception e)
        //    {
        //        return e.Message;
        //    }
        //} 





        //
        //// POST: /Account/Login
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View(model);
        //    }

        //    // This doesn't count login failures towards account lockout
        //    // To enable password failures to trigger account lockout, change to shouldLockout: true
        //    var result = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, shouldLockout: false);

        //    switch (result)
        //    {
        //        case SignInStatus.Success:
        //                return RedirectToLocal(returnUrl);

        //        case SignInStatus.LockedOut:
        //            return View("用户被锁定");
        //        case SignInStatus.RequiresVerification:
        //            return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
        //        case SignInStatus.Failure:
        //        default:
        //            ModelState.AddModelError("", "用户名或密码错误");
        //            return View(model);
        //    }
        //}

        //
        //// GET: /Account/VerifyCode
        //[AllowAnonymous]
        //public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        //{
        //    // Require that the user has already logged in via username/password or external login
        //    if (!await SignInManager.HasBeenVerifiedAsync())
        //    {
        //        return View("Error");
        //    }
        //    return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        //}





        //
        // POST: /Account/VerifyCode
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View(model);
        //    }

        //    // The following code protects for brute force attacks against the two factor codes. 
        //    // If a user enters incorrect codes for a specified amount of time then the user account 
        //    // will be locked out for a specified amount of time. 
        //    // You can configure the account lockout settings in IdentityConfig
        //    var result = await SignInManager.TwoFactorSignInAsync(model.Provider, model.Code, isPersistent:  model.RememberMe, rememberBrowser: model.RememberBrowser);
        //    switch (result)
        //    {
        //        case SignInStatus.Success:
        //            return RedirectToLocal(model.ReturnUrl);
        //        case SignInStatus.LockedOut:
        //            return View("Lockout");
        //        case SignInStatus.Failure:
        //        default:
        //            ModelState.AddModelError("", "Invalid code.");
        //            return View(model);
        //    }
        //}

        //
        // GET: /Account/Register
        //[AllowAnonymous]
        //public ActionResult Register()
        //{
        //    return View();
        //}


      




        // GET: /Account/ConfirmEmail
        /// <summary>
        /// 用户修改密码邮箱确认
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(int userId, string code)
        {
            if (User.Identity.IsAuthenticated)
            {
                AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
                return RedirectToAction("ConfirmEmail", "Account", new { userId=userId,code=code });
            }
            if (userId < 0 || code == null)
            {
                return View("Error");
            }
            var result = await UserManager.ConfirmEmailAsync(userId, code);
            if (result.Succeeded)
            {
                try
                {
                    var resetcode = await UserManager.GeneratePasswordResetTokenAsync(userId);
                    ViewBag.Code = resetcode;
                    ViewBag.UserId = userId;
                    return View();
                }
                catch (Exception e)
                {
                    AddErrors(new IdentityResult(e.Message));
                }
                
            }
            return View("Error");
        }

        //
        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("PwdReset", "manage");
            }
            return View();
        }

        [AllowAnonymous]
        public ActionResult PwdResetMobile()
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("PwdResetMobile", "manage");
            }
            return View();
        }

        /// <summary>
        /// 忘记密码时发送短信验证码
        /// </summary>
        /// <param name="code"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        [AllowAnonymous]
        public async Task<string> VerifyCode(string code, string number)
        {
            if (SessionHelper.GetSession("verifycode") == null || code.ToLower() != SessionHelper.GetSession("verifycode").ToString())
            {
                return "codeerror";
            }
            
            if (number == null)
            {
                return "number-error";
            }
            else
            {
                var user = await UserManager.FindByPhoneNumberAsync(number);
                if (user == null)
                {
                    return "no-bind";
                }
                try
                {
                    // Generate the token and send it
                    var smscode = await UserManager.GenerateChangePhoneNumberTokenAsync(user.Id, number);
                    if (UserManager.SmsService != null)
                    {
                        var message = new SmsMessage
                        {
                            Destination = number,
                            Body = smscode,
                            TemplateId = 30772
                        };
                        message.setRecord(user.Id, number);
                        db.SmsRecords.Add(message.Record);
                        await db.SaveChangesAsync();
                        await UserManager.SmsService.SendAsync(message);
                        return "ok";  //return smscode;//
                    }
                    else
                    {
                        return "error";
                    }
                    //发送短信

                }
                catch (Exception e)
                {
                    return e.Message;
                }
               
            }
           
        } 
        //
        /// <summary>
        /// 忘记密码时验证手机短信验证码
        /// </summary>
        /// <param name="msgcode"></param>
        /// <param name="number"></param>
        /// <returns></returns>
        [AllowAnonymous]
        public async Task<string> ResetMobileStep1(string msgcode,string number)
        {
            if (number == null)
            {
                return "number-error";
            }
            var user = UserManager.FindByPhoneNumber(number);
            if (user == null)
            {
                return "notfound";
            }
            string phoneNumber = await UserManager.GetPhoneNumberAsync(user.Id);
            var result = await UserManager.VerifyChangePhoneNumberTokenAsync(user.Id, msgcode, phoneNumber); //验证手机验证码
            var code = await UserManager.GeneratePasswordResetTokenAsync(user.Id); //生成重置密码token
            if (result == true)
            {
                return "code" + code;
            }
            // If we got this far, something failed, redisplay form
            return "faild";// return "ok";
        }


        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [AllowAnonymous]
        public async Task<string> ResetMobileStep2(ResetPwdViewModel model,string number)
        {
            if (!ModelState.IsValid)
            {
                return "error";
            }
            if (number == null)
            {
                return "number-error";
            }
            var user = UserManager.FindByPhoneNumber(number);
            if (user == null)
            {
                return "notfound";
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.NewPassword);
            if (result.Succeeded)
            {
                return "ok";
            }
            // If we got this far, something failed, redisplay form
            return "error";
        }


        /// <summary>
        /// 忘记密码时验证邮箱重置密码
        /// </summary>
        /// <returns></returns>
        [AllowAnonymous]
        public ActionResult PwdResetEmail()
        {
            if (User.Identity.IsAuthenticated)
            {
             return   RedirectToAction("PwdResetEmail", "manage");
            }
            return View();
        }

        /// <summary>
        /// 忘记密码是发送验证邮件
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        [AllowAnonymous]
        public async Task<string> SendEmail(string code,string email)
        {
            if (code == null ||email==null) { return "valid"; }
            var user = await UserManager.FindByEmailAsync(email);
           
            if (SessionHelper.GetSession("verifycode") == null || code.ToLower() != SessionHelper.GetSession("verifycode").ToString())
            {
                return "code-error";
            }       
            try
            {
                var ecode = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = ecode }, protocol: Request.Url.Scheme);
                await UserManager.SendEmailAsync(user.Id, "修改密码通知", "您在学七天的账号" + user.UserName + "申请修改密码,点击以下链接前往修改<br>" + callbackUrl + "<br>(如果您无法点击此链接，请将它复制到浏览器地址栏后访问)<br>如确认非本人操作，请忽略此邮件，由此给您带来的不便请谅解！");
                return "ok";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }

        [AllowAnonymous]
        public async Task<string> ResetEmailStep2(ResetPwdViewModel model,int userid)
        {           
            if (!ModelState.IsValid)
            {
                return "error";
            }
            var result = await UserManager.ResetPasswordAsync(userid, model.Code, model.NewPassword);
            if (result.Succeeded)
            {
                return "ok";
            }
            // If we got this far, something failed, redisplay form
            return "error";
          
        }
        //
        // GET: /Account/ForgotPasswordConfirmation
        //[AllowAnonymous]
        //public ActionResult ForgotPasswordConfirmation()
        //{
        //    return View();
        //}

        ////
        //// GET: /Account/ResetPassword
        //[AllowAnonymous]
        //public ActionResult ResetPassword(string code)
        //{
        //    return code == null ? View("Error") : View();
        //}

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        //
        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public ActionResult ExternalLogin(string provider, string returnUrl)
        {
            // Request a redirect to the external login provider
            return new ChallengeResult(provider, Url.Action("ExternalLoginCallback", "Account", new { ReturnUrl = returnUrl }));
        }

        ////
        //// GET: /Account/SendCode
        //[AllowAnonymous]
        //public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        //{
        //    var userId = await SignInManager.GetVerifiedUserIdAsync();
        //    if (userId <0)
        //    {
        //        return View("Error");
        //    }
        //    var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);
        //    var factorOptions = userFactors.Select(purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();
        //    return View(new SendCodeViewModel { Providers = factorOptions, ReturnUrl = returnUrl, RememberMe = rememberMe });
        //}

        ////
        ////// POST: /Account/SendCode
        //[HttpPost]
        //[AllowAnonymous]
        //[ValidateAntiForgeryToken]
        //public async Task<ActionResult> SendCode(SendCodeViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View();
        //    }

        //    // Generate the token and send it
        //    if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
        //    {
        //        return View("Error");
        //    }
        //    return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        //}

        //
        // GET: /Account/ExternalLoginCallback
        [AllowAnonymous]
        public async Task<ActionResult> ExternalLoginCallback(string returnUrl)
        {
            var loginInfo = await AuthenticationManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                return RedirectToAction("Login");
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await SignInManager.ExternalSignInAsync(loginInfo, isPersistent: false);
            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal(returnUrl);
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = false });
                case SignInStatus.Failure:
                default:
                    // If the user does not have an account, then prompt the user to create an account
                    ViewBag.ReturnUrl = returnUrl;
                    ViewBag.LoginProvider = loginInfo.Login.LoginProvider;
                    return View("ExternalLoginConfirmation", new ExternalLoginConfirmationViewModel { Email = loginInfo.Email });
            }
        }

        //
        // POST: /Account/ExternalLoginConfirmation
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ExternalLoginConfirmation(ExternalLoginConfirmationViewModel model, string returnUrl)
        {
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Manage");
            }

            if (ModelState.IsValid)
            {
                // Get the information about the user from the external login provider
                var info = await AuthenticationManager.GetExternalLoginInfoAsync();
                if (info == null)
                {
                    return View("ExternalLoginFailure");
                }
                var user = new ApplicationUser { UserName = model.UserName, Email = model.Email };
                var result = await UserManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await UserManager.AddLoginAsync(user.Id, info.Login);
                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
                        return RedirectToLocal(returnUrl);
                    }
                }
                AddErrors(result);
            }

            ViewBag.ReturnUrl = returnUrl;
            return View(model);
        }

        //
        // POST: /Account/LogOff
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Index", "Product");
        }


        #region Helper
        /// <summary>  
        /// 检查用户名是否有重复  
        /// </summary>  
        /// <param name="userName">用户在页面(视图)表单中输入的UserName</param>  
        /// <returns>Json</returns> 
        [AllowAnonymous]
        public JsonResult CheckUserName(string userName)
        {
            var user = UserManager.FindByName(userName);
            bool result = false;
            if (user == null)
            {
                result = true;
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult CheckPhoneNumber(string number)
        {
            var user = UserManager.FindByPhoneNumber(number);
            bool result = false;
            if (user != null)
            {
                result = true;
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public async  Task<JsonResult> CheckEmail(string email)
        {
            var user =await UserManager.FindByEmailAsync(email);
            bool result = false;
            if (user != null)
            {
                result = true;
            }

            return Json(result, JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 图形验证码生成
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [AllowAnonymous]
        public ActionResult GetAuthCode()
        {
            return File(new VerifyCodeImg().GetVerifyCode(), @"image/Png");
        }


        /// <summary>
        /// 生成手机验证码
        /// </summary>
        /// <returns></returns>
        protected string GenerateCode()
        {
            Random r = new Random();
            string temMsg = string.Empty;
            for (int i = 0; i < 6; i++)
            {
                temMsg += r.Next(0, 9);
            }
            SessionHelper.SetSession("PhoneCode", temMsg);
            return temMsg;
        }

       /// <summary>
       /// 验证手机验证码
       /// </summary>
       /// <param name="code"></param>
       /// <returns></returns>
        protected bool VerifyPhoneCode(string code)
        {
            if (SessionHelper.GetSession("PhoneCode") != null && code == SessionHelper.GetSession("PhoneCode").ToString())
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        /// <summary>
        /// 销毁session
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        protected void DropSession(string name)
        {
            SessionHelper.Del(name);
        }

        #endregion

        #region 账户设置

        #endregion


        //
        // GET: /Account/ExternalLoginFailure
        [AllowAnonymous]
        public ActionResult ExternalLoginFailure()
        {
            return View();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }


        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }


       
        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                
                if (error == "UserId not found.")
                {
                    ModelState.AddModelError("", "用户id没找到");
                }
                else if (error.StartsWith("Passwords must have at least one lowercase")) {
                    ModelState.AddModelError("", "密码至少要包含一个小写字母");
                }
                else if (error.StartsWith("Passwords must have at least one digit"))
                {
                    ModelState.AddModelError("", "密码至少要包含一个数字");
                }
                else
                {
                    ModelState.AddModelError("", error.Replace("Email", "邮箱")
                                                      .Replace("is already taken","已经被使用"));
                }
               
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion
    }
}
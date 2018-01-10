using FYstudentMgr.Models;
using System.Data.Entity;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using StackExchange.Profiling;
using StackExchange.Profiling.EntityFramework6;
using System.Web.Http;

namespace FYstudentMgr
{
    // Note: For instructions on enabling IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=301868
    public class MvcApplication : System.Web.HttpApplication
    {

        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            //FYstudentMgr.Common.Payment.OrderInfoHelper.Instance.Start();
            //MiniProfilerEF6.Initialize();
        }
        protected void Application_BeginRequest()
        {
           // MiniProfiler.Start();
        }
        protected void Application_EndRequest()
        {
           // MiniProfiler.Stop();
             if (this.Request.HttpMethod.ToUpper().Equals("OPTIONS"))
             {
                 this.Response.Status = "200 OK";
                 this.Response.StatusCode = 200;
                 this.Response.StatusDescription = "OK";
                 this.Response.SubStatusCode = 200;
             }
        }
    }
}

using FYstudentMgr.Common;
using System.Web;
using System.Web.Optimization;

namespace FYstudentMgr
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;
            BundleTable.EnableOptimizations = true;
            BundleExtensions.ScriptsPath = "qweqwe";
            BundleExtensions.Version = "00020";
            const string ajaxCdnPath = "http://jing.xueqitian.com/";
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-3.1.1.min.js")
                        .Production(ajaxCdnPath, "Scripts", "jquery-3.1.1.min.js"));
           
            bundles.Add(new ScriptBundle("~/bundles/sea")
                      .Include(
                        "~/sea-modules/sea-debug.js")
                        .Production(ajaxCdnPath, "sea-modules", "sea-debug.js")
                        );
            bundles.Add(new ScriptBundle("~/bundles/sea-config")
                      .Include(
                        
                        "~/sea-modules/sea-js-config.js")

                        .Production(ajaxCdnPath, "sea-modules", "sea-js-config.js"));
            //bundles.Add(new ScriptBundle("~/bundles/sea").Include(
            //            "http://orkr8z49j.bkt.clouddn.com/sea-modules/sea-debug.js",
            //            "http://orkr8z49j.bkt.clouddn.com/sea-modules/sea-js-config.js"));
            bundles.Add(new ScriptBundle("~/bundles/ueditor").Include(                       
                        "~/Content/ueditor/ueditor.config.js",
                        "~/Content/ueditor/ueditor.all.js",
                        "~/Content/ueditor-utf8-net/lang/zh-cn/zh-cn.js"
                        ));
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js", "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css", 
                      "~/Content/Site.css",
                      
                      
                      "~/Content/assert/boao2.css"
                      
                      ));

          
        
        }
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace studentManager.Helps
{
    public static class HtmlExtensions
    {
        /// <summary>
        /// 根据当前类别建造面包屑
        /// </summary>
        /// <returns></returns>
        public static MvcHtmlString Menu(this HtmlHelper html, Chapter treeModel)
        {

            return new MvcHtmlString(MenuReverse(BindMenu(treeModel)));
        }

        /// <summary>
        /// 递归调用  得到 广州>中国>亚洲
        /// </summary>
        /// <returns></returns>
        private static string BindMenu(Chapter Model)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append(Model.ChapterName);
            if (Model.ParentChapter != null)
            {
                sb.Append(">");
                sb.Append(BindMenu(Model.ParentChapter));
            }
            return sb.ToString();
        }

        /// <summary>
        /// 反转字符串 并给最后一个加上黑体字标签
        /// </summary>
        /// <returns></returns>
        private static string MenuReverse(string menu)
        {
            return string.Join(">", menu.Split('>').Select((s, i) => i == 0 ? string.Format("<strong>{0}</Strong>", s) : s).Reverse().ToArray());
        }
    }
}
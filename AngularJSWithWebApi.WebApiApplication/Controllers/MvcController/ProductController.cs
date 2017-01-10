using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security.Infrastructure;

namespace AngularJSWithWebApi.WebApiApplication.Controllers.MvcController
{
    [Authorize]
    public class ProductController : Controller
    {
        /// <summary>
        /// Product
        /// </summary>
        /// <returns></returns>
        public ActionResult Product() {
            return View();
        }

        /// <summary>
        /// ProductInline
        /// </summary>
        /// <returns></returns>
        public ActionResult ProductInline() {
            return View();
        }

        /// <summary>
        /// GetCurrentUser
        /// </summary>
        /// <returns></returns>
        public string GetCurrentUser() {
            string UserName = Request.LogonUserIdentity.Name;
            TextInfo tf = new CultureInfo("en-US", false).TextInfo;
            return tf.ToTitleCase(UserName.Substring(UserName.IndexOf('\\') + 1).Replace('.', ' '));
        }
    }
}
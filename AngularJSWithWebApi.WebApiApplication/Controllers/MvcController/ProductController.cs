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
        // GET: Product
        public ActionResult Product() {
            return View();
        }

        public ActionResult ProductInline() {
            return View();
        }

        public string GetCurrentUser() {
            string UserName = Request.LogonUserIdentity.Name;
            TextInfo tf = new CultureInfo("en-US", false).TextInfo;
            return tf.ToTitleCase(UserName.Substring(UserName.IndexOf('\\') + 1).Replace('.', ' '));
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AngularJSWithWebApi.WebApiApplication.Controllers.MvcController
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult UserList()
        {
            return View();
        }

        public ActionResult UserLogin() {
            return View();
        }
    }
}
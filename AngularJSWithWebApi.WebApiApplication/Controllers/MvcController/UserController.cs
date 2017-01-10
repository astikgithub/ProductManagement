using System.Configuration;
using System.Data.SqlClient;
using System.Web.Mvc;


namespace AngularJSWithWebApi.WebApiApplication.Controllers.MvcController
{
    public class UserController : Controller
    {
        /// <summary>
        /// UserList
        /// </summary>
        /// <returns></returns>
        public ActionResult UserList()
        {
            return View();
        }

        /// <summary>
        /// UserLogin
        /// </summary>
        /// <returns></returns>
        public ActionResult UserLogin() {
            var connectionString = ConfigurationManager.ConnectionStrings["ProductsDatabaseEntities"].ConnectionString;
            if(!System.Data.Entity.Database.Exists(connectionString)) {
                var connectionString1 = ConfigurationManager.ConnectionStrings["ProductsDatabaseRestore"].ConnectionString;
                SqlConnection con = new SqlConnection(connectionString1);
                string backupPath = Server.MapPath(ConfigurationManager.AppSettings.Get("BackupPath"));
                string restoreQuery = @"RESTORE DATABASE ProductsDatabase FROM DISK ="+"'"+backupPath+"'";
                SqlCommand command = new SqlCommand(restoreQuery, con);
                con.Open();
                command.ExecuteNonQuery();
            }
            return View();
        }


    }
}
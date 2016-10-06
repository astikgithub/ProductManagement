using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AngularJSWithWebApi.Interfaces.BusinessManager;
using AngularJSWithWebApi.BussinessLogic;
using AngularJSWithWebApi.Entities;

namespace AngularJSWithWebApi.WebApiApplication.Controllers.WebApiController {
    /// <summary>
    /// UserWebApiController
    /// </summary>
    public class UserWebApiController : ApiController {

        /// <summary>
        /// iProductManager
        /// </summary>
        private IUserManager iUserManager
        {
            get; set;
        }

        /// <summary>
        /// UserWebApiController
        /// </summary>
        public UserWebApiController() {
            this.iUserManager = new UserManager();
        }

        /// <summary>
        /// UserWebApiController
        /// </summary>
        /// <param name="productManager"></param>
        public UserWebApiController(IUserManager userManager) {
            this.iUserManager = userManager;
        }

        /// <summary>
        /// GetUserList
        /// </summary>
        /// <returns></returns>
        public IEnumerable<UserEntity> GetUserList() {
            return iUserManager.GetUsersList();
        }

        /// <summary>
        /// GetUserById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public UserEntity GetUserById(int id) {
            return iUserManager.GetUserById(id);
        }

        /// <summary>
        /// AddUser
        /// </summary>
        /// <param name="value"></param>
        public UserEntity AddUser(UserEntity userEntity) {
            return iUserManager.AddUser(userEntity);
        }

        /// <summary>
        /// UpdateUser
        /// </summary>
        /// <param name="id"></param>
        /// <param name="value"></param>
        public UserEntity UpdateUser(UserEntity userEntity) {
            return iUserManager.UpdateUser(userEntity);
        }

        /// <summary>
        /// DeleteUser
        /// </summary>
        /// <param name="id"></param>
        public bool DeleteUser(int id) {
            return iUserManager.DeleteUser(id);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularJSWithWebApi.DataRepository;
using AngularJSWithWebApi.Entities;
using AngularJSWithWebApi.Interfaces.BusinessManager;
using AngularJSWithWebApi.Interfaces.DataRepository;

namespace AngularJSWithWebApi.BussinessLogic {

    /// <summary>
    /// UserManager
    /// </summary>
    public class UserManager : IUserManager {

        /// <summary>
        /// IUserManager
        /// </summary>
        private IUserDataRepository iUserDataRepository
        {
            get; set;
        }

        /// <summary>
        /// UserManager
        /// </summary>
        public UserManager() {

            this.iUserDataRepository = new UserDataRepository();
        }


        public UserEntity AddUser(UserEntity userEntity) {
           return iUserDataRepository.AddUser(userEntity);
        }

        public bool DeleteUser(int id) {
            return iUserDataRepository.DeleteUser(id);
        }

        public UserEntity GetUserById(int id) {
            return iUserDataRepository.GetUserById(id);
        }

        public IEnumerable<UserEntity> GetUsersList() {
            return iUserDataRepository.GetUsersList();
        }

        public UserEntity UpdateUser(UserEntity userEntity) {
            return iUserDataRepository.UpdateUser(userEntity);
        }
    }
}

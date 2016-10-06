using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularJSWithWebApi.Entities;
using AngularJSWithWebApi.Interfaces.DataRepository;

namespace AngularJSWithWebApi.DataRepository {
     public class UserDataRepository : IUserDataRepository {

        /// <summary>
        /// Initialize dbContext
        /// </summary>
        ProductsDatabaseEntities dbContext = new ProductsDatabaseEntities();

        public UserEntity AddUser(UserEntity userEntity) {
            tblUser userdata = new tblUser();
            userdata.Name = userEntity.Name;
            userdata.CreatedDate = DateTime.Now;
            userdata.MobileNo = userEntity.MobileNo;
            userdata.EmailId = userEntity.EmailId;
            userdata.Password = userEntity.Password;
            userdata.IsAdmin = userEntity.IsAdmin;
            userdata.UpdatedDate = DateTime.Now;
            dbContext.tblUsers.Add(userdata);
            dbContext.SaveChanges();
            userEntity.UserId = userdata.UserId;
            userEntity.CreatedDate = userdata.CreatedDate;
            userdata.UpdatedDate = userdata.UpdatedDate;
            return userEntity;
        }

        public bool DeleteUser(int id) {
            tblUser user = dbContext.tblUsers.FirstOrDefault(u => u.UserId == id);
            if(user != null) {
                dbContext.tblUsers.Remove(user);
                return true;
            }
            else {
                return false;
            }
            
        }

        public UserEntity GetUserById(int id) {
           var tblUser =  dbContext.tblUsers.FirstOrDefault(u => u.UserId == id);
            UserEntity userEntity = new UserEntity {
                Name = tblUser.Name,
                EmailId = tblUser.EmailId,
                Password = tblUser.Password,
                MobileNo = tblUser.MobileNo,
                IsAdmin = tblUser.IsAdmin,
                CreatedDate = tblUser.CreatedDate,
                UpdatedDate = tblUser.UpdatedDate,
                UserId = tblUser.UserId
            };
            return userEntity;
        }

        public IEnumerable<UserEntity> GetUsersList() {
            List<UserEntity> usersList = new List<UserEntity>();
            foreach(var user in dbContext.tblUsers) {
                UserEntity userEntity = new UserEntity();
                userEntity.Name = user.Name;
                userEntity.Password = user.Password;
                userEntity.UserId = user.UserId;
                userEntity.EmailId = user.EmailId;
                userEntity.IsAdmin = user.IsAdmin;
                userEntity.MobileNo = user.MobileNo;
                userEntity.CreatedDate = user.CreatedDate;
                userEntity.UpdatedDate = user.UpdatedDate;
                usersList.Add(userEntity);
            }
            return usersList;
        }

        public UserEntity UpdateUser(UserEntity userEntity) {
            var tblUser = dbContext.tblUsers.FirstOrDefault(u => u.UserId == userEntity.UserId);
            tblUser.Name = userEntity.Name;
            tblUser.MobileNo = userEntity.MobileNo;
            tblUser.EmailId = userEntity.EmailId;
            tblUser.Password = userEntity.Password;
            tblUser.IsAdmin = userEntity.IsAdmin;
            tblUser.UpdatedDate = DateTime.Now;
            dbContext.SaveChanges();
            userEntity.UpdatedDate = tblUser.UpdatedDate;
            return userEntity;
        }

        /// <summary>
        /// CheckUserLogin
        /// </summary>
        /// <param name="emailId"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public ResponseEntity CheckUserLogin(string emailId, string password) {
            ResponseEntity response =new ResponseEntity();
            var userData = dbContext.tblUsers.FirstOrDefault(u => u.EmailId == emailId && u.Password == password);
            if(userData != null) {
                response.Success = true;
                response.CurrentUser = userData.Name;
            }
            else {
                response.Error = true;
                response.Message = "Invalid emailId or password.";
            }
            return response;
        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularJSWithWebApi.Entities;

namespace AngularJSWithWebApi.Interfaces.DataRepository {
    /// <summary>
    /// IUserDataRepository
    /// </summary>
    public interface IUserDataRepository {

        /// <summary>
        /// GetUserList
        /// </summary>
        /// <returns></returns>
        IEnumerable<UserEntity> GetUsersList();

        /// <summary>
        /// GetUserById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        UserEntity GetUserById(int id);

        /// <summary>
        /// AddUser
        /// </summary>
        /// <param name="userEntity"></param>
        /// <returns></returns>
        UserEntity AddUser(UserEntity userEntity);

        /// <summary>
        /// UpdateUser
        /// </summary>
        /// <param name="userEntity"></param>
        /// <returns></returns>
        UserEntity UpdateUser(UserEntity userEntity);

        /// <summary>
        /// DeleteUser
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteUser(int id);

        /// <summary>
        /// CheckUserLogin
        /// </summary>
        /// <param name="emailId"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        ResponseEntity CheckUserLogin(string emailId, string password);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJSWithWebApi.Entities {
   public class UserEntity {

        public int UserId
        {
            get; set;
        }
        public string Name
        {
            get; set;
        }
        public string UserName
        {
            get; set;
        }

        public string Password
        {
            get; set;
        }

        public string EmailId
        {
            get; set;
        }

        public string MobileNo
        {
            get; set;
        }

        public bool? IsAdmin
        {
            get; set;
        }

        public DateTime? CreatedDate
        {
            get; set;
        }

        public DateTime? UpdatedDate
        {
            get; set;
        }
    }
}

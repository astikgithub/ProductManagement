using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJSWithWebApi.Entities {
   public class ResponseEntity {

        public bool Success
        {
            get; set;
        }

        public bool Error
        {
            get; set;
        }

        public string Message
        {
            get; set;
        }

        public string CurrentUser
        {
            get; set;
        }
    }
}

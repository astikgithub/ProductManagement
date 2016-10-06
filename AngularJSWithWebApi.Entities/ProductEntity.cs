using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularJSWithWebApi.Entities {
    public class ProductEntity {

        [Key]
        public int ProductId
        {
            get; set;
        }

        [Display(Name = "ProductName")]
        [Required(ErrorMessage = "ProductName can not be blank")]
        public string ProductName
        {
            get; set;
        }

        [Required(ErrorMessage = "Description can not be blank")]
        [Display(Name = "Description")]
        public string Description
        {
            get; set;
        }

        [Required(ErrorMessage = "Price can not be null")]
        [Display(Name = "Price")]
        public decimal? Price
        {
            get; set;
        }

        [Required(ErrorMessage = "Quantity can not be null")]
        [Display(Name = "Quantity")]
        public decimal? Quantity
        {
            get; set;
        }
    }
}

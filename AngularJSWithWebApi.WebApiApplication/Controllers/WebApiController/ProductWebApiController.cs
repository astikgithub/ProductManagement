using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Principal;
using System.Web.Http;
using AngularJSWithWebApi.BussinessLogic;
using AngularJSWithWebApi.Entities;
using AngularJSWithWebApi.Interfaces.BusinessManager;

namespace AngularJSWithWebApi.WebApiApplication.Controllers.WebApiController
{
    public class ProductWebApiController : ApiController
    {
        /// <summary>
        /// iProductManager
        /// </summary>
        private IProductManager iProductManager
        {
            get; set;
        }

        /// <summary>
        /// ProductWebApiController
        /// </summary>
        public ProductWebApiController() {
            this.iProductManager = new ProductManager();
        }

        /// <summary>
        /// ProductWebApiController
        /// </summary>
        /// <param name="productManager"></param>
        public ProductWebApiController(IProductManager productManager) {
            this.iProductManager = productManager;
        }

        /// <summary>
        /// GetProductById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ProductEntity GetProductById(int id) {
            return iProductManager.GetProductById(id);
        }

        /// <summary>
        /// GetProductsList
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ProductEntity> GetProductsList() {
            return iProductManager.GetProductsList();
        }

        /// <summary>
        /// AddProduct
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        public ProductEntity AddProduct(ProductEntity productEntity) {
            return iProductManager.AddProduct(productEntity);
           
        }

        /// <summary>
        /// UpdateProduct
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        public ProductEntity UpdateProduct(ProductEntity productEntity) {
            return iProductManager.UpdateProduct(productEntity);
        }

        /// <summary>
        /// DeleteProduct
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteProduct(int id) {
            return iProductManager.DeleteProduct(id);
        }
    }
}

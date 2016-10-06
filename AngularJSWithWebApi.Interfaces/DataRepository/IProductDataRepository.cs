using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AngularJSWithWebApi.Entities;
using AngularJSWithWebApi.Interfaces.BusinessManager;

namespace AngularJSWithWebApi.Interfaces.DataRepository {

    /// <summary>
    /// IProductDataRepository
    /// </summary>
    public interface IProductDataRepository {

        /// <summary>
        /// GetProductById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ProductEntity GetProductById(int id);

        /// <summary>
        /// GetProductsList
        /// </summary>
        /// <returns></returns>
        IEnumerable<ProductEntity> GetProductsList();

        /// <summary>
        /// AddProduct
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        ProductEntity AddProduct(ProductEntity productEntity);

        /// <summary>
        /// UpdateProduct
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        ProductEntity UpdateProduct(ProductEntity productEntity);

        /// <summary>
        /// DeleteProduct
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeleteProduct(int id);
    }
}

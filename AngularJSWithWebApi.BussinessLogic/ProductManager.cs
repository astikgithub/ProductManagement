using System.Collections.Generic;
using AngularJSWithWebApi.DataRepository;
using AngularJSWithWebApi.Entities;
using AngularJSWithWebApi.Interfaces.BusinessManager;
using AngularJSWithWebApi.Interfaces.DataRepository;

namespace AngularJSWithWebApi.BussinessLogic {
    public class ProductManager : IProductManager {

        /// <summary>
        /// productDataRepository
        /// </summary>
        private IProductDataRepository iProductDataRepository
        {
            get; set;
        }

        public ProductManager() {

            this.iProductDataRepository = new ProductDataRepository();
        }

        /// <summary>
        /// ProductManager
        /// </summary>
        /// <param name="productDataRepositoryObj"></param>
        public ProductManager(IProductDataRepository productDataRepositoryObj) {
            this.iProductDataRepository = productDataRepositoryObj;
        }

        /// <summary>
        /// GetProductById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ProductEntity GetProductById(int id) {
            return iProductDataRepository.GetProductById(id);
        }

        /// <summary>
        /// GetProductsList
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ProductEntity> GetProductsList() {
            return iProductDataRepository.GetProductsList();
        }

        /// <summary>
        /// Add Prodcut
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        public ProductEntity AddProduct(ProductEntity productEntity) {
            return iProductDataRepository.AddProduct(productEntity);
        }

        /// <summary>
        /// UpdateProduct
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        public ProductEntity UpdateProduct(ProductEntity productEntity) {
            return iProductDataRepository.UpdateProduct(productEntity);
        }

        /// <summary>
        /// DeleteProduct
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteProduct(int id) {
            return iProductDataRepository.DeleteProduct(id);
        }

    }
}

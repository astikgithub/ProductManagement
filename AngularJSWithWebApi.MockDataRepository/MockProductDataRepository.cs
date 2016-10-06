using System.Collections.Generic;
using System.Linq;
using AngularJSWithWebApi.Entities;
using AngularJSWithWebApi.Interfaces.DataRepository;

namespace AngularJSWithWebApi.MockDataRepository {

    /// <summary>
    /// MockProductDataRepository
    /// </summary>
    public class MockProductDataRepository : IProductDataRepository {

        /// <summary>
        /// Initialize productentity list
        /// </summary>
        public static List<ProductEntity> productList;
        public MockProductDataRepository() {
            if(productList == null) {
                productList = new List<ProductEntity>();
                for(var i = 0; i < 5; i++) {
                    ProductEntity productEntity = new ProductEntity {
                        ProductId = i + 1,
                        ProductName = "Product" + i,
                        Description = "Description" + i,
                        Price = i + 100,
                        Quantity = i + 5
                    };
                    productList.Add(productEntity);
                }
            }

        }

        /// <summary>
        /// GetProductById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ProductEntity GetProductById(int id) {
            return productList.Where(p => p.ProductId == id).FirstOrDefault();
        }

        /// <summary>
        /// GetProductsList
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ProductEntity> GetProductsList() {
            return productList;
        }

        /// <summary>
        /// AddProduct
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        public ProductEntity AddProduct(ProductEntity productEntity) {
            productList.Add(productEntity);
            return productEntity;
        }

        /// <summary>
        /// UpdateProduct
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        public ProductEntity UpdateProduct(ProductEntity productEntity) {
            ProductEntity productData = productList.Where(p => p.ProductId == productEntity.ProductId).FirstOrDefault();
            productData.ProductName = productEntity.ProductName;
            productData.Description = productEntity.Description;
            productData.Price = productEntity.Price;
            productData.Quantity = productEntity.Quantity;
            return productEntity;
        }

        /// <summary>
        /// DeleteProduct
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteProduct(int id) {
            ProductEntity productData = productList.Where(p => p.ProductId == id).FirstOrDefault();
            productList.Remove(productData);
            return true;
        }

    }
}

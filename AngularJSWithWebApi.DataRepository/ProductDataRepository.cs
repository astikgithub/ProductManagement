using System.Collections.Generic;
using System.Linq;
using AngularJSWithWebApi.Entities;
using AngularJSWithWebApi.Interfaces.DataRepository;

namespace AngularJSWithWebApi.DataRepository {

    /// <summary>
    /// ProductDataRepository
    /// </summary>
    public class ProductDataRepository : IProductDataRepository {

        /// <summary>
        /// Initialize dbContext
        /// </summary>
        ProductsDatabaseEntities dbContext = new ProductsDatabaseEntities();

        /// <summary>
        /// GetProductById
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ProductEntity GetProductById(int id) {
            tblProduct productData = new tblProduct();
            productData = dbContext.tblProducts.Where(s => s.ProductId == id).FirstOrDefault();
            ProductEntity productDataEntity = new ProductEntity {
                ProductId = productData.ProductId,
                ProductName = productData.ProductName,
                Description = productData.Description,
                Price = productData.Price,
                Quantity = productData.Quantity
            };
            return productDataEntity;
        }

        /// <summary>
        /// GetProductsList
        /// </summary>
        /// <returns></returns>
        public IEnumerable<ProductEntity> GetProductsList() {
            List<ProductEntity> productsList = new List<ProductEntity>();
            foreach(var productitem in dbContext.tblProducts) {
                ProductEntity productData = new ProductEntity();
                productData.ProductId = productitem.ProductId;
                productData.ProductName = productitem.ProductName;
                productData.Description = productitem.Description;
                productData.Quantity = productitem.Quantity;
                productData.Price = productitem.Price;
                productsList.Add(productData);
            }
            return productsList;
        }

        /// <summary>
        /// AddProduct
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        public ProductEntity AddProduct(ProductEntity productEntity) {
                tblProduct productDataEntity = new tblProduct();
                productDataEntity.ProductName = productEntity.ProductName;
                productDataEntity.Description = productEntity.Description;
                productDataEntity.Price = productEntity.Price;
                productDataEntity.Quantity = productEntity.Quantity;
                dbContext.tblProducts.Add(productDataEntity);
                dbContext.SaveChanges();
                productEntity.ProductId = productDataEntity.ProductId;
                return productEntity;
        }

        /// <summary>
        /// UpdateProduct
        /// </summary>
        /// <param name="productEntity"></param>
        /// <returns></returns>
        public ProductEntity UpdateProduct(ProductEntity productEntity) {
            tblProduct productDataEntity = new tblProduct();
            productDataEntity = dbContext.tblProducts.Where(s => s.ProductId == productEntity.ProductId).FirstOrDefault();
                productDataEntity.ProductName = productEntity.ProductName;
                productDataEntity.Description = productEntity.Description;
                productDataEntity.Price = productEntity.Price;
                productDataEntity.Quantity = productEntity.Quantity;
                dbContext.SaveChanges();
            return productEntity;
        }

        /// <summary>
        /// DeleteProduct
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteProduct(int id) {
            tblProduct productData = new tblProduct();
            productData = dbContext.tblProducts.Where(s => s.ProductId == id).FirstOrDefault();
            if(productData != null) {
                dbContext.tblProducts.Remove(productData);
                dbContext.SaveChanges();
                return true;
            }
            else {
                return false;
            }
        }
    }
}

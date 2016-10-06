using Microsoft.VisualStudio.TestTools.UnitTesting;
using AngularJSWithWebApi.Interfaces.BusinessManager;
using AngularJSWithWebApi.Entities;
using Microsoft.Practices.Unity;
using AngularJSWithWebApi.WebApiApplication.Controllers.WebApiController;
using AngularJSWithWebApi.WebApiApplication.Tests;

namespace AngularJSWithWebApi.WebApi.Tests.Controllers.WebApiControllers {
    /// <summary>
    /// Summary description for ProductWebApiControllerTest
    /// </summary>
    [TestClass]
    public class ProductWebApiControllerTest {

        /// <summary>
        /// productWebApiController
        /// </summary>
        private ProductWebApiController productWebApiController;

        private IProductManager iproductManager
        {
            get; set;
        }

        /// <summary>
        /// testContextInstance
        /// </summary>
        private TestContext testContextInstance;

        /// <summary>
        ///Gets or sets the test context which provides
        ///information about and functionality for the current test run.
        ///</summary>
        public TestContext TestContext
        {
            get
            {
                return testContextInstance;
            }
            set
            {
                testContextInstance = value;
            }
        }

        /// <summary>
        /// Inits this instance.
        /// </summary>
        [TestInitialize]
        public void Init() {
            iproductManager = Bootstrapper.Initialise().Resolve<IProductManager>();
            productWebApiController = new ProductWebApiController(iproductManager);
        }

        /// <summary>
        /// GetProductByIdTest
        /// </summary>
        [TestMethod]
        public void GetProductByIdTest() {
            var data = productWebApiController.GetProductById(1);
            Assert.IsNotNull(data);
        }

        /// <summary>
        /// GetProductLitTest
        /// </summary>
        [TestMethod]
        public void GetProductListTest() {
            var data = productWebApiController.GetProductsList();
            Assert.IsNotNull(data);
        }

        /// <summary>
        /// AddProductTest
        /// </summary>
        [TestMethod]
        public void AddProductTest() {
            ProductEntity productEntity = new ProductEntity();
            productEntity.ProductId = 6;
            productEntity.ProductName = "Product6";
            productEntity.Description = "Description6";
            productEntity.Price = 6000;
            productEntity.Quantity = 6;
            var afterSave = productWebApiController.AddProduct(productEntity);
            Assert.IsNotNull(afterSave);
        }

        /// <summary>
        /// updateProductTest
        /// </summary>
        [TestMethod]
        public void UpdateProductTest() {
            ProductEntity productEntity = new ProductEntity();
            productEntity.ProductId = 3;
            productEntity.ProductName = "Product31";
            productEntity.Description = "Description34";
            productEntity.Price = 3444;
            productEntity.Quantity = 34;
            var afterUpdate = productWebApiController.UpdateProduct(productEntity);
            Assert.IsNotNull(afterUpdate);
        }

        /// <summary>
        /// DeleteProductTest
        /// </summary>
        [TestMethod]
        public void DeleteProductTest() {
            var afterDelete = productWebApiController.DeleteProduct(3);
            Assert.IsTrue(afterDelete);

        }
    }
}

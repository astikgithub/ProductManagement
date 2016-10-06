using System;
using AngularJSWithWebApi.WebApiApplication.Controllers.MvcController;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace AngularJSWithWebApi.WebApiApplication.Tests.Controllers.MvcControllerTest {

    /// <summary>
    /// ProductControllerTest
    /// </summary>
    [TestClass]
    public class ProductControllerTest {

        /// <summary>
        /// productController
        /// </summary>
        private ProductController productController;

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
            productController = new ProductController();
        }

        /// <summary>
        /// ProductTest
        /// </summary>
        [TestMethod]
        public void ProductTest() {
            var data = productController.Product();
            Assert.IsNotNull(data);
        }

        /// <summary>
        /// ProductInlineTest
        /// </summary>
        [TestMethod]
        public void ProductInlineTest() {
            var data = productController.ProductInline();
            Assert.IsNotNull(data);
        }
    }
}

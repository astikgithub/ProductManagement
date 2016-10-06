using System;
using System.Linq;
using System.Web.Mvc;
using AngularJSWithWebApi.BussinessLogic;
using AngularJSWithWebApi.DataRepository;
using AngularJSWithWebApi.Interfaces.BusinessManager;
using AngularJSWithWebApi.Interfaces.DataRepository;
using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.Mvc;

namespace AngularJSWithWebApi.WebApiApplication {
    public static class Bootstrapper {
        public static IUnityContainer Initialise() {
            var container = BuildUnityContainer();

            DependencyResolver.SetResolver(new UnityDependencyResolver(container));

            return container;
        }

        private static IUnityContainer BuildUnityContainer() {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();    
            RegisterTypes(container);

            return container;
        }

        public static void RegisterTypes(IUnityContainer container) {
            container.RegisterType<IProductManager, ProductManager>();
            container.RegisterType<IProductDataRepository, ProductDataRepository>();
        }
    }
}
// -----------------------------------------------------------------------
//  <copyright file="MvcApplication.cs" author="Rimmon">
//      Copyright (c) Rimmon All rights reserved.
//  </copyright>
// -----------------------------------------------------------------------

namespace FromCSharpToJavaScript
{
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Optimization;
    using System.Web.Routing;

    public class MvcApplication : HttpApplication
    {
        #region Protected Methods

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            Filters.RegisterGlobalFilters(GlobalFilters.Filters);
            Routes.RegisterRoutes(RouteTable.Routes);
            Bundles.RegisterBundles(BundleTable.Bundles);
        }

        #endregion
    }
}